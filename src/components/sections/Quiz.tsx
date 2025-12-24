import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Trophy, XCircle } from "lucide-react";

const quizzes = [
  {
    id: 1,
    title: "Arrays & Strings",
    questions: 15,
    duration: "15 min",
    difficulty: "Easy",
    completed: true,
    score: 87,
  },
  {
    id: 2,
    title: "Linked Lists",
    questions: 12,
    duration: "12 min",
    difficulty: "Medium",
    completed: true,
    score: 75,
  },
  {
    id: 3,
    title: "Trees & BST",
    questions: 20,
    duration: "25 min",
    difficulty: "Hard",
    completed: false,
    score: null,
  },
  {
    id: 4,
    title: "Graph Algorithms",
    questions: 18,
    duration: "20 min",
    difficulty: "Hard",
    completed: false,
    score: null,
  },
];

const sampleQuestion = {
  question: "What is the time complexity of binary search?",
  options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
  correct: 1,
};

export const Quiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
  };

  return (
    <section id="quizzes" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Test Your <span className="gradient-text">Knowledge</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with quizzes and mock tests to reinforce your learning
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quiz List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">Available Quizzes</h3>
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 rounded-xl hover-lift cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        quiz.completed
                          ? "bg-success/20 text-success"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {quiz.completed ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{quiz.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {quiz.questions} questions • {quiz.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        quiz.difficulty === "Easy"
                          ? "bg-success/20 text-success"
                          : quiz.difficulty === "Medium"
                          ? "bg-warning/20 text-warning"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                    {quiz.score !== null && (
                      <p className="text-sm font-semibold text-primary mt-1">
                        {quiz.score}%
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Sample Question */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="px-2 py-1 bg-primary/20 text-primary rounded">
                Question 1/15
              </span>
              <span className="ml-auto flex items-center gap-1">
                <Clock className="w-4 h-4" />
                2:45
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-6">{sampleQuestion.question}</h3>

            <div className="space-y-3 mb-6">
              {sampleQuestion.options.map((option, index) => {
                const isCorrect = index === sampleQuestion.correct;
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      showResult
                        ? isCorrect
                          ? "border-success bg-success/10"
                          : isSelected
                          ? "border-destructive bg-destructive/10"
                          : "border-border bg-secondary/30"
                        : isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && (
                        <>
                          {isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 ${
                  selectedAnswer === sampleQuestion.correct
                    ? "bg-success/10 border border-success/20"
                    : "bg-destructive/10 border border-destructive/20"
                }`}
              >
                <p className="text-sm">
                  {selectedAnswer === sampleQuestion.correct
                    ? "🎉 Correct! Binary search has O(log n) time complexity."
                    : "The correct answer is O(log n). Binary search divides the search space in half each iteration."}
                </p>
              </motion.div>
            )}

            <Button
              variant="hero"
              className="w-full"
              onClick={() => {
                setSelectedAnswer(null);
                setShowResult(false);
              }}
            >
              {showResult ? "Next Question" : "Submit Answer"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
