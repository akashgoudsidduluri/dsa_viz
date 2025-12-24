import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const initialArray = [64, 34, 25, 12, 22, 11, 90];

export const ArrayVisualization = () => {
  const [array, setArray] = useState(initialArray);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const bubbleSort = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setSorted([]);
    const arr = [...initialArray];
    setArray(arr);

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        await new Promise((r) => setTimeout(r, 500));

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
      setSorted((prev) => [...prev, arr.length - 1 - i]);
    }
    setSorted((prev) => [...prev, 0]);
    setComparing([]);
    setIsRunning(false);
  };

  useEffect(() => {
    const timer = setTimeout(bubbleSort, 1000);
    return () => clearTimeout(timer);
  }, []);

  const maxVal = Math.max(...array);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-center gap-2 h-48">
        {array.map((value, index) => {
          const isComparing = comparing.includes(index);
          const isSorted = sorted.includes(index);

          return (
            <motion.div
              key={index}
              layout
              className={`relative w-10 rounded-t-lg transition-colors duration-200 ${
                isComparing
                  ? "bg-warning"
                  : isSorted
                  ? "bg-success"
                  : "bg-primary"
              }`}
              style={{ height: `${(value / maxVal) * 160}px` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground">
                {value}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning" />
          <span className="text-xs text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success" />
          <span className="text-xs text-muted-foreground">Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-xs text-muted-foreground">Unsorted</span>
        </div>
      </div>

      <button
        onClick={bubbleSort}
        disabled={isRunning}
        className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 font-medium text-sm"
      >
        {isRunning ? "Sorting..." : "Run Bubble Sort"}
      </button>
    </div>
  );
};
