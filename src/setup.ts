import http from "k6/http";
import { check } from "k6";
import { BASE_API_URL } from "../config";
import { defaultHeaders } from "./global-variables";
import { Headers } from "./interfaces.ts";

export function prepareHeaders(authorization: Boolean): Headers {
  const headers: Headers = defaultHeaders;

  if (authorization) {
    const res = http.post(`${BASE_API_URL}/login`, {
      email: "Moses.Armstrong@Feest.ca",
      password: "test1",
    });

    check(res, {
      [`Status for Login request - expected: 200, received: ${res.status}`]: (
        r,
      ) => r.status === 200,
    });

    let token: string = "";

    if (typeof res.body === "string") {
      let body;
      try {
        body = JSON.parse(res.body);
        token = body.access_token;
      } catch (error) {
        throw new Error(`Unable to parse response body: ${res.body}`);
      }
    } else {
      throw new Error(
        `Login request response body is not a string (unable to get token): ${res.body}`,
      );
    }

    console.log("Received token:", token);

    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}
