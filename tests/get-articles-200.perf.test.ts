import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";
import { chooseOptions, OptionsType } from "../src/options.ts";
import { BASE_API_URL } from "../config.ts";

export const options: Options = {
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(99)<100"],
  },
  scenarios: {
    // arbitrary name of scenario
    average_load: {
      executor: "ramping-vus",
      stages: chooseOptions(OptionsType.rampingVus),
    },
  },
};

const endpoint = "articles";
const params = "?_limit=6&_page=1&_sort=date&_order=DESC";

export default function () {
  const res = http.get(`${BASE_API_URL}/${endpoint}${params}`);
  check(res, {
    [`Status 200 for GET request on endpoint: "${endpoint}"`]: (res) =>
      res.status === 200,
  });
}
