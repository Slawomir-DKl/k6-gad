import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";
import { BASE_API_URL } from "../config.ts";
import { chooseOptions, OptionsType } from "../src/options.ts";
import { Headers } from "../src/interfaces.ts";

export const options: Options = chooseOptions(OptionsType.runOnce);

const headers: Headers = {
  Accept: "*/*",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
};

export function setup(): string {
  const res = http.post(`${BASE_API_URL}/login`, {
    email: "Moses.Armstrong@Feest.ca",
    password: "test1",
  });
  check(res, { "login status 200": (r) => r.status === 200 });

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

  return token;
}

// const endpoint = "articles";
// const params = "?_limit=6&_page=1&_sort=date&_order=DESC";
const endpoint = "messenger";
const params = "/unread";

export default function (token: string) {
  headers["Authorization"] = `Bearer ${token}`;
  const res = http.get(`${BASE_API_URL}/${endpoint}${params}`, { headers });
  check(res, {
    [`Status for GET request on endpoint "${endpoint}" - expected: 200, received: ${res.status}`]:
      (res) => res.status === 200,
  });
  console.log(headers, res.body);
}
