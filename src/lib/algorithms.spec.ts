// Simple smoke tests for algorithm step generation (no test runner required)
import * as Algo from "./algorithms";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

try {
  const bs = Algo.bubbleSort([3,2,1]);
  assert(Array.isArray(bs.steps), "bubbleSort should return steps array");

  const q = Algo.binarySearch([1,2,3,4,5], 3);
  assert(q.result === 2, "binarySearch should find index 2");

  const rev = Algo.reverseLinkedList({ val: 1, next: { val: 2, next: null } } as any);
  assert(rev.steps.length > 0, "reverseLinkedList should emit steps");

  console.log("algorithms.spec: OK");
} catch (err) {
  // eslint-disable-next-line no-console
  console.error("algorithms.spec failed:", err);
}
