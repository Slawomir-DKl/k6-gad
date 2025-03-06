import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";

export let options: Options = {
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(99)<100"],
  },
  scenarios: {
    // arbitrary name of scenario
    average_load: {
      executor: "ramping-vus",
      stages: [
        // ramp up to average load of 20 virtual users
        { duration: "10s", target: 20 },
        // maintain load
        { duration: "10s", target: 20 },
        // ramp down to zero
        { duration: "5s", target: 0 },
      ],
    },
  },
};

export default function () {
  const url =
    "http://localhost:3000/api/articles?_limit=6&_page=1&_sort=date&_order=DESC";
  const res = http.get(url);
  check(res, { "response code was 200": (res) => res.status === 200 });
}
