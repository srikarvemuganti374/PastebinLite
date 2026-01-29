let fakeNow = 1700000000000;

export function getNow() {
  if (process.env.TEST_MODE === "true") {
    return fakeNow;
  }
  return Date.now();
}

export function advanceTime(ms: number) {
  fakeNow += ms;
}
