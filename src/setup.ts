import http from "k6/http";
import { check } from "k6";
import { BASE_API_URL } from "../config.ts";
import { defaultHeaders } from "./global-variables.ts";
import { Headers } from "./interfaces.ts";
import { AuthorizationType } from "./enums.ts";

export function prepareHeaders(authorization: AuthorizationType): Headers {
  const headers: Headers = defaultHeaders;

  if (authorization != AuthorizationType.noAuthorization) {
    let userLogin = __ENV.USER_EMAIL;
    let userPassword = __ENV.USER_PASSWORD;

    if (authorization === AuthorizationType.adminUser) {
      userLogin = __ENV.ADMIN_EMAIL;
      userPassword = __ENV.ADMIN_PASSWORD;
    }

    const res = http.post(`${BASE_API_URL}/login`, {
      email: userLogin,
      password: userPassword,
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
