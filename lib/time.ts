import { headers } from "next/headers";

export function getNow(): number {
  if (process.env.TEST_MODE !== "1") {
    return Date.now();
  }

  const h = headers();
  const testNow = h.get("x-test-now-ms");

  if (!testNow) {
    return Date.now(); // fallback allowed by spec
  }

  return Number(testNow);
}
