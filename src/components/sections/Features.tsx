import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Code2,
  LineChart,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Interactive Visualizations",
    description:
      "Watch algorithms execute step-by-step with animated diagrams and real-time state changes",
  },
  {
    icon: BookOpen,
    title: "Detailed Explanations",
    description:
      "Comprehensive guides with time/space complexity analysis and real-world use cases",
  },
  {
    icon: Brain,
    title: "Adaptive Quizzes",
    description:
      "Test your knowledge with quizzes that adapt to your learning pace and skill level",
  },
  {
    icon: Code2,
    title: "Code Playground",
    description:
      "Write and run code directly in your browser with multiple language support",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and performance insights",
  },
  {
    icon: Users,
    title: "Community & Discussions",
    description:
      "Connect with fellow learners, share solutions, and discuss problem-solving approaches",
  },
];

export const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">DSA Viz</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master data structures and algorithms in one place
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="glass-card p-6 rounded-xl relative h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
