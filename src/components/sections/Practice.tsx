import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code2, ExternalLink, Filter, Search } from "lucide-react";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: "49.2%",
    status: "solved",
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    acceptance: "72.8%",
    status: "solved",
  },
  {
    id: 3,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "73.5%",
    status: "attempted",
  },
  {
    id: 4,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "Strings",
    acceptance: "32.4%",
    status: null,
  },
  {
    id: 5,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked Lists",
    acceptance: "48.6%",
    status: null,
  },
  {
    id: 6,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Arrays",
    acceptance: "58.7%",
    status: null,
  },
];

export const Practice = () => {
  return (
    <section id="practice" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Practice <span className="gradient-text-accent">Problems</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharpen your skills with curated coding challenges across all difficulty levels
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-4 rounded-xl mb-6 flex flex-wrap items-center gap-4"
        >
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Difficulty
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Category
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Status
          </Button>
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-4 p-4 bg-secondary/30 text-sm font-medium text-muted-foreground border-b border-border">
            <div className="col-span-1">Status</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Acceptance</div>
          </div>

          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 p-4 items-center border-b border-border/50 hover:bg-secondary/20 transition-colors cursor-pointer group"
            >
              <div className="col-span-1">
                {problem.status === "solved" ? (
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                ) : problem.status === "attempted" ? (
                  <div className="w-5 h-5 rounded-full bg-warning/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-muted" />
                )}
              </div>
              <div className="col-span-5 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {problem.id}. {problem.title}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="col-span-2">
                <span className="text-sm text-muted-foreground">{problem.category}</span>
              </div>
              <div className="col-span-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    problem.difficulty === "Easy"
                      ? "bg-success/20 text-success"
                      : problem.difficulty === "Medium"
                      ? "bg-warning/20 text-warning"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">
                {problem.acceptance}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Button variant="hero-outline" size="lg">
            View All Problems
          </Button>
        </div>
      </div>
    </section>
  );
};
