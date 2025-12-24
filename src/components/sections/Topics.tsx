import { motion } from "framer-motion";
import {
  Binary,
  GitBranch,
  Layers,
  Network,
  Repeat,
  Search,
  SortAsc,
  TreeDeciduous,
} from "lucide-react";

const topics = [
  {
    icon: Layers,
    title: "Arrays & Strings",
    description: "Linear data structures, manipulation techniques, and pattern matching",
    count: "12 lessons",
    color: "from-primary to-info",
  },
  {
    icon: GitBranch,
    title: "Linked Lists",
    description: "Singly, doubly, and circular linked lists with common operations",
    count: "8 lessons",
    color: "from-info to-primary",
  },
  {
    icon: Layers,
    title: "Stacks & Queues",
    description: "LIFO and FIFO structures with real-world applications",
    count: "6 lessons",
    color: "from-accent to-pink-500",
  },
  {
    icon: TreeDeciduous,
    title: "Trees",
    description: "Binary trees, BST, AVL, and tree traversal algorithms",
    count: "15 lessons",
    color: "from-success to-emerald-400",
  },
  {
    icon: Network,
    title: "Graphs",
    description: "BFS, DFS, shortest paths, and minimum spanning trees",
    count: "14 lessons",
    color: "from-warning to-orange-400",
  },
  {
    icon: SortAsc,
    title: "Sorting",
    description: "Bubble, merge, quick, heap sort and their complexities",
    count: "10 lessons",
    color: "from-pink-500 to-accent",
  },
  {
    icon: Search,
    title: "Searching",
    description: "Linear, binary search and advanced search techniques",
    count: "6 lessons",
    color: "from-primary to-accent",
  },
  {
    icon: Repeat,
    title: "Dynamic Programming",
    description: "Memoization, tabulation, and classic DP problems",
    count: "18 lessons",
    color: "from-info to-accent",
  },
];

export const Topics = () => {
  return (
    <section id="topics" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore <span className="gradient-text">DSA Topics</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive coverage of all essential data structures and algorithms
            with interactive visualizations
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-xl cursor-pointer group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <topic.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {topic.description}
              </p>
              <span className="text-xs font-medium text-primary">
                {topic.count}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
