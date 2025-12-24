import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrayVisualization } from "@/components/visualizations/ArrayVisualization";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Interactive Learning Platform</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Master{" "}
              <span className="gradient-text">Data Structures</span>
              {" "}& Algorithms
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Visualize, understand, and practice DSA concepts with interactive diagrams, 
              step-by-step explanations, quizzes, and mock tests.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl">
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-10">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Algorithms</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">200+</div>
                <div className="text-sm text-muted-foreground">Practice Problems</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-4 text-sm text-muted-foreground font-mono">bubble_sort.py</span>
              </div>
              <ArrayVisualization />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
