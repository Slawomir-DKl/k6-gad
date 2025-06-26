import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";
import { chooseOptions, OptionsType } from "../src/options.ts";
import { prepareHeaders } from "../src/setup.ts";
import { Headers } from "../src/interfaces.ts";
import { BASE_API_URL } from "../config.ts";

export const options: Options = chooseOptions(OptionsType.runOnce);

const testWithAuthorization = true;
const endpoint = "messenger";
const params = "/unread";

export function setup(): Headers {
  const headers = prepareHeaders(testWithAuthorization);
  return headers;
}

export default function (headers: Headers) {
  const res = http.get(`${BASE_API_URL}/${endpoint}${params}`, { headers });

  check(res, {
    [`Status for GET request on endpoint "${endpoint}" - expected: 200, received: ${res.status}`]:
      (res) => res.status === 200,
  });
}
