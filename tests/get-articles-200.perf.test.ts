import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";
import { BASE_API_URL } from "../config.ts";
import { chooseOptions, OptionsType } from "../src/options.ts";

export const options: Options = chooseOptions(OptionsType.rampingVus);

const endpoint = "articles";
const params = "?_limit=6&_page=1&_sort=date&_order=DESC";

export default function () {
  const res = http.get(`${BASE_API_URL}/${endpoint}${params}`);
  check(res, {
    [`Status 200 for GET request on endpoint: "${endpoint}"`]: (res) =>
      res.status === 200,
  });
}
