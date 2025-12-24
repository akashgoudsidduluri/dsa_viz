import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Pause, Play, RotateCcw, SkipForward } from "lucide-react";

const algorithms = ["Bubble Sort", "Quick Sort", "Merge Sort", "Binary Search", "BFS", "DFS"];

export const Visualizer = () => {
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [step, setStep] = useState(0);

  const steps = [
    { description: "Compare elements at index 0 and 1", highlight: [0, 1] },
    { description: "64 > 34, swap them", highlight: [0, 1] },
    { description: "Compare elements at index 1 and 2", highlight: [1, 2] },
    { description: "64 > 25, swap them", highlight: [1, 2] },
    { description: "Compare elements at index 2 and 3", highlight: [2, 3] },
  ];

  return (
    <section id="visualizer" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="gradient-text-accent">Visualizer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch algorithms come to life with step-by-step visual explanations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Algorithm Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Select Algorithm</h3>
            <div className="space-y-2">
              {algorithms.map((algo) => (
                <button
                  key={algo}
                  onClick={() => setSelectedAlgo(algo)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    selectedAlgo === algo
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{algo}</span>
                    {selectedAlgo === algo && <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Visualization Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{selectedAlgo}</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Play className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Pause className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Array visualization */}
            <div className="flex justify-center gap-3 mb-8">
              {[64, 34, 25, 12, 22, 11, 90].map((val, i) => (
                <motion.div
                  key={i}
                  className={`node-box ${
                    steps[step]?.highlight.includes(i) ? "node-primary glow-primary" : "node-muted"
                  }`}
                  animate={{
                    scale: steps[step]?.highlight.includes(i) ? 1.1 : 1,
                  }}
                >
                  {val}
                </motion.div>
              ))}
            </div>

            {/* Step description */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <p className="text-sm font-mono text-center">
                Step {step + 1}: {steps[step]?.description}
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(Math.max(0, step - 1))}
                >
                  Prev
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
