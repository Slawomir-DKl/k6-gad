import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";
import { BASE_API_URL } from "../config.ts";
import { chooseOptions } from "../src/options.ts";
import { Headers } from "../src/interfaces.ts";
import { prepareHeaders } from "../src/setup.ts";
import { AuthorizationType, OptionsType } from "../src/enums.ts";

// Config
const authorizationType = AuthorizationType.noAuthorization;
const endpoint = "articles";
const params = "?_limit=6&_page=1&_sort=date&_order=DESC";

// Test
export const options: Options = chooseOptions(OptionsType.runOnce);

export function setup(): Headers {
  const headers = prepareHeaders(authorizationType);
  return headers;
}

export default function (headers: Headers) {
  const res = http.get(`${BASE_API_URL}/${endpoint}${params}`, { headers });

  check(res, {
    [`Status for GET request on endpoint "${endpoint}" - expected: 200, received: ${res.status}`]:
      (res) => res.status === 200,
  });
}
