import { check } from "k6";
import http from "k6/http";

export default function () {
  const url =
    "http://localhost:3000/api/articles?_limit=6&_page=1&_sort=date&_order=DESC";

  const res = http.get(url);
  check(res, { "response code was 200": (res) => res.status === 200 });
}
