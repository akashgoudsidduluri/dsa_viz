import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Trophy, XCircle, ArrowLeft, RotateCcw, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useAuth } from "@/contexts/AuthContext";

interface Question {
  q: string;
  options: string[];
  answer: string;
}

interface QuizData {
  topic: string;
  difficulty_level: string;
  question_count: number;
  questions: Question[];
}

const quizzesData: QuizData[] = [
  {
    topic: "Arrays & Strings",
    difficulty_level: "Easy–Medium",
    question_count: 15,
    questions: [
      {
        q: "What is the time complexity of Kadane's Algorithm for Maximum Subarray Sum?",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
        answer: "O(n)"
      },
      {
        q: "Which data structure is best to check duplicates in an array efficiently?",
        options: ["Stack", "Queue", "HashSet", "Priority Queue"],
        answer: "HashSet"
      },
      {
        q: "Two pointers technique works best when the array is:",
        options: ["Sorted", "Random", "Rotated", "Multidimensional"],
        answer: "Sorted"
      },
      {
        q: "Why is a hash map efficient for solving Two Sum?",
        options: ["O(1) lookup average", "Prevents collisions", "Less memory", "Binary search"],
        answer: "O(1) lookup average"
      },
      {
        q: "Sliding window technique generally involves:",
        options: ["Only growing window", "Only shrinking window", "Dynamic grow and shrink", "Static window"],
        answer: "Dynamic grow and shrink"
      },
      {
        q: "Why does Product of Array Except Self avoid division?",
        options: ["Division is slow", "Overflow issues", "Zero causes invalid division", "All of the above"],
        answer: "All of the above"
      },
      {
        q: "Longest Consecutive Sequence optimal solution uses:",
        options: ["Sorting", "Hashing", "DP", "Stack"],
        answer: "Hashing"
      },
      {
        q: "Minimum Window Substring is solved using:",
        options: ["Binary Search", "DFS", "Sliding Window", "Heap"],
        answer: "Sliding Window"
      },
      {
        q: "Largest Rectangle in Histogram is solved using:",
        options: ["DP", "Two Pointers", "Stack", "Greedy"],
        answer: "Stack"
      },
      {
        q: "Prefix sums help in:",
        options: ["Fast sum queries", "Reduced time complexity", "Needs O(n) space", "All of the above"],
        answer: "All of the above"
      },
      {
        q: "Optimal Time Complexity of Trapping Rain Water:",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
        answer: "O(n)"
      },
      {
        q: "Valid Anagram requires equal:",
        options: ["Length", "Characters", "Frequencies", "All above"],
        answer: "All above"
      },
      {
        q: "Two Sum brute-force complexity is:",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
        answer: "O(n^2)"
      },
      {
        q: "Subarray Sum Equals K uses:",
        options: ["Sorting", "Stack", "Prefix Sum + Hash Map", "Binary Search"],
        answer: "Prefix Sum + Hash Map"
      },
      {
        q: "Sliding Window Maximum uses:",
        options: ["Queue", "Stack", "Deque", "Heap"],
        answer: "Deque"
      }
    ]
  },
  {
    topic: "Linked Lists",
    difficulty_level: "Medium",
    question_count: 15,
    questions: [
      {
        q: "Which technique detects a cycle in a linked list?",
        options: ["DFS", "BFS", "Two-pointer", "Binary Search"],
        answer: "Two-pointer"
      },
      {
        q: "Time complexity of reversing a linked list?",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
        answer: "O(n)"
      },
      {
        q: "Best way to find middle of a list?",
        options: ["Count length", "Fast-slow pointers", "Recursion", "Binary Search"],
        answer: "Fast-slow pointers"
      },
      {
        q: "LRU Cache is implemented using:",
        options: ["Queue", "Stack", "Linked List + HashMap", "Binary Tree"],
        answer: "Linked List + HashMap"
      },
      {
        q: "Add Two Numbers in linked list uses:",
        options: ["Recursion", "Stack", "Traversal with carry", "Sorting"],
        answer: "Traversal with carry"
      },
      {
        q: "Remove Nth node from end requires:",
        options: ["One pointer", "Two pointers", "Stack", "DFS"],
        answer: "Two pointers"
      },
      {
        q: "Cycle detection can also return:",
        options: ["Boolean", "Start node", "Length", "All"],
        answer: "All"
      },
      {
        q: "Merging K sorted lists efficiently uses:",
        options: ["Stack", "BST", "Heap", "Hashing"],
        answer: "Heap"
      },
      {
        q: "Space complexity of in-place reverse:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        answer: "O(1)"
      },
      {
        q: "Why use Linked List over arrays?",
        options: ["Dynamic size", "Fast insertion", "No shifting", "All"],
        answer: "All"
      },
      {
        q: "Palindrome linked list can use:",
        options: ["Stack", "Reversal", "Both", "None"],
        answer: "Both"
      },
      {
        q: "Deleting node in O(1) requires:",
        options: ["Previous pointer", "Overwrite next node", "Dummy head", "Tail pointer"],
        answer: "Overwrite next node"
      },
      {
        q: "Detect cycle uses which algorithm?",
        options: ["Dijkstra", "Floyd", "Prim", "Kruskal"],
        answer: "Floyd"
      },
      {
        q: "Intersection of two linked lists found using:",
        options: ["Hashing", "Length equalization", "Both", "None"],
        answer: "Both"
      },
      {
        q: "Reverse in K-Groups complexity:",
        options: ["O(n)", "O(k)", "O(nk)", "O(n log k)"],
        answer: "O(n)"
      }
    ]
  },
  {
    topic: "Trees & BST",
    difficulty_level: "Medium–Hard",
    question_count: 15,
    questions: [
      {
        q: "Height of a tree refers to:",
        options: ["Node count", "Edges in longest path", "Leaf depth", "Level count"],
        answer: "Edges in longest path"
      },
      {
        q: "A tree is height-balanced if:",
        options: ["All nodes equal", "Height difference ≤ 1", "Binary", "Complete"],
        answer: "Height difference ≤ 1"
      },
      {
        q: "BST property is:",
        options: ["Random", "Left < Root < Right", "Balanced", "Min-heap"],
        answer: "Left < Root < Right"
      },
      {
        q: "Diameter of a tree means:",
        options: ["Height", "Width", "Longest path", "Max depth"],
        answer: "Longest path"
      },
      {
        q: "LCA is easiest in:",
        options: ["AVL", "Heap", "BST", "Trie"],
        answer: "BST"
      },
      {
        q: "Level order traversal uses:",
        options: ["Stack", "Queue", "Recursion", "Heap"],
        answer: "Queue"
      },
      {
        q: "Serialize/Deserialize is used for:",
        options: ["Storage", "Transfer", "Rebuild", "All"],
        answer: "All"
      },
      {
        q: "Max Path Sum considers:",
        options: ["Only leaves", "Any nodes", "Root only", "Left subtree"],
        answer: "Any nodes"
      },
      {
        q: "BST insert average complexity:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        answer: "O(log n)"
      },
      {
        q: "Sorted array to BST gives:",
        options: ["Skewed tree", "Unbalanced", "Balanced tree", "Heap"],
        answer: "Balanced tree"
      },
      {
        q: "Validate BST checks:",
        options: ["Local comparison", "Global value range", "Level order", "Parent only"],
        answer: "Global value range"
      },
      {
        q: "Boundary traversal order:",
        options: ["Leaves only", "BFS only", "Left + Leaves + Right-reverse", "Right only"],
        answer: "Left + Leaves + Right-reverse"
      },
      {
        q: "Kth smallest in BST uses:",
        options: ["Preorder", "Postorder", "Inorder", "BFS"],
        answer: "Inorder"
      },
      {
        q: "Path Sum usually refers to:",
        options: ["Any two nodes", "Root-to-leaf", "Only leaf pairs", "Root only"],
        answer: "Root-to-leaf"
      },
      {
        q: "Balanced BST guarantees:",
        options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
        answer: "O(log n)"
      }
    ]
  },
  {
    topic: "Graph Algorithms",
    difficulty_level: "Medium–Hard",
    question_count: 15,
    questions: [
      {
        q: "BFS uses which data structure?",
        options: ["Stack", "Queue", "Heap", "Array"],
        answer: "Queue"
      },
      {
        q: "DFS can be implemented using:",
        options: ["Queue only", "Stack/Recursion", "Heap", "Graph only"],
        answer: "Stack/Recursion"
      },
      {
        q: "Topological sort applies to:",
        options: ["Trees", "DAG", "Cyclic graph", "Undirected graph"],
        answer: "DAG"
      },
      {
        q: "Number of Islands uses:",
        options: ["BFS", "DFS", "Both", "None"],
        answer: "Both"
      },
      {
        q: "Cycle detection in a directed graph uses:",
        options: ["Queue", "Recursion stack", "Heap", "Sorting"],
        answer: "Recursion stack"
      },
      {
        q: "Shortest path in unweighted graph uses:",
        options: ["DFS", "BFS", "Dijkstra", "Bellman Ford"],
        answer: "BFS"
      },
      {
        q: "Dijkstra's algorithm fails when:",
        options: ["Graph is large", "Weights are negative", "Graph is sparse", "Graph is undirected"],
        answer: "Weights are negative"
      },
      {
        q: "Bellman-Ford supports:",
        options: ["Only positive weights", "Negative weights", "Unweighted only", "Tree only"],
        answer: "Negative weights"
      },
      {
        q: "Minimum Spanning Tree chooses edges with:",
        options: ["Maximum cost", "Minimum cost", "Random", "BFS order"],
        answer: "Minimum cost"
      },
      {
        q: "Kruskal's Algorithm uses:",
        options: ["Stack", "Queue", "Disjoint Set", "Heap only"],
        answer: "Disjoint Set"
      },
      {
        q: "Graph cloning requires:",
        options: ["Hash map", "Stack", "Heap", "Queue only"],
        answer: "Hash map"
      },
      {
        q: "Rotting Oranges uses:",
        options: ["DFS", "BFS multi-source", "Stack", "Greedy"],
        answer: "BFS multi-source"
      },
      {
        q: "Word Ladder shortest path uses:",
        options: ["DFS", "BFS", "Sorting", "DP"],
        answer: "BFS"
      },
      {
        q: "Adjacency list is ideal when graph is:",
        options: ["Dense", "Sparse", "Complete", "Weighted"],
        answer: "Sparse"
      },
      {
        q: "Topological ordering exists only when graph is:",
        options: ["Tree", "DAG", "Cyclic", "Bipartite"],
        answer: "DAG"
      }
    ]
  }
];

interface QuizState {
  quizIndex: number;
  currentQuestion: number;
  answers: (number | null)[];
  showResult: boolean;
  completed: boolean;
}

export const Quiz = () => {
  const [activeQuiz, setActiveQuiz] = useState<QuizState | null>(null);
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const { recordQuizCompleted } = useProgressTracking();
  const { user } = useAuth();

  // Load saved scores from database on mount - but we'll rely on the profile page to show stored history
  // For local session, we still track scores in state for immediate feedback

  const startQuiz = (index: number) => {
    setQuizStartTime(Date.now());
    setActiveQuiz({
      quizIndex: index,
      currentQuestion: 0,
      answers: new Array(quizzesData[index].questions.length).fill(null),
      showResult: false,
      completed: false,
    });
  };

  const handleAnswer = (optionIndex: number) => {
    if (!activeQuiz || activeQuiz.showResult) return;
    
    const newAnswers = [...activeQuiz.answers];
    newAnswers[activeQuiz.currentQuestion] = optionIndex;
    
    setActiveQuiz({
      ...activeQuiz,
      answers: newAnswers,
      showResult: true,
    });
  };

  const nextQuestion = async () => {
    if (!activeQuiz) return;
    
    const quiz = quizzesData[activeQuiz.quizIndex];
    
    if (activeQuiz.currentQuestion >= quiz.questions.length - 1) {
      // Calculate score
      const correctCount = activeQuiz.answers.reduce((count, answer, idx) => {
        const question = quiz.questions[idx];
        const correctIndex = question.options.indexOf(question.answer);
        return count + (answer === correctIndex ? 1 : 0);
      }, 0);
      
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      setQuizScores({ ...quizScores, [activeQuiz.quizIndex]: score });
      setActiveQuiz({ ...activeQuiz, completed: true });

      // Save to database if user is logged in
      if (user) {
        const timeTaken = quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : undefined;
        await recordQuizCompleted({
          quiz_topic: quiz.topic,
          score: correctCount,
          total_questions: quiz.questions.length,
          time_taken_seconds: timeTaken,
        });
      }
    } else {
      setActiveQuiz({
        ...activeQuiz,
        currentQuestion: activeQuiz.currentQuestion + 1,
        showResult: false,
      });
    }
  };

  const exitQuiz = () => {
    setActiveQuiz(null);
  };

  const restartQuiz = () => {
    if (activeQuiz) {
      startQuiz(activeQuiz.quizIndex);
    }
  };

  // Quiz Results View
  if (activeQuiz?.completed) {
    const quiz = quizzesData[activeQuiz.quizIndex];
    const score = quizScores[activeQuiz.quizIndex] || 0;
    const correctCount = Math.round((score / 100) * quiz.questions.length);
    
    return (
      <section id="quizzes" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto glass-card p-8 rounded-2xl text-center"
          >
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              score >= 80 ? 'bg-success/20' : score >= 50 ? 'bg-warning/20' : 'bg-destructive/20'
            }`}>
              <Trophy className={`w-12 h-12 ${
                score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-destructive'
              }`} />
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-6">{quiz.topic}</p>
            
            <div className="text-6xl font-bold gradient-text mb-4">{score}%</div>
            <p className="text-muted-foreground mb-8">
              You got {correctCount} out of {quiz.questions.length} questions correct
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={exitQuiz} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Quizzes
              </Button>
              <Button variant="hero" onClick={restartQuiz} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retry Quiz
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Active Quiz View
  if (activeQuiz) {
    const quiz = quizzesData[activeQuiz.quizIndex];
    const question = quiz.questions[activeQuiz.currentQuestion];
    const correctIndex = question.options.indexOf(question.answer);
    const progress = ((activeQuiz.currentQuestion + 1) / quiz.questions.length) * 100;
    
    return (
      <section id="quizzes" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={exitQuiz} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Exit Quiz
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{quiz.topic}</span>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Question {activeQuiz.currentQuestion + 1} of {quiz.questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {/* Question Card */}
            <motion.div
              key={activeQuiz.currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-8">{question.q}</h3>
              
              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  const isCorrect = index === correctIndex;
                  const isSelected = activeQuiz.answers[activeQuiz.currentQuestion] === index;
                  
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAnswer(index)}
                      disabled={activeQuiz.showResult}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        activeQuiz.showResult
                          ? isCorrect
                            ? "border-success bg-success/10"
                            : isSelected
                            ? "border-destructive bg-destructive/10"
                            : "border-border bg-secondary/30 opacity-50"
                          : isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                            activeQuiz.showResult
                              ? isCorrect
                                ? "bg-success/20 text-success"
                                : isSelected
                                ? "bg-destructive/20 text-destructive"
                                : "bg-muted text-muted-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium">{option}</span>
                        </div>
                        {activeQuiz.showResult && (
                          <>
                            {isCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
                            {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                          </>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              
              {activeQuiz.showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 ${
                    activeQuiz.answers[activeQuiz.currentQuestion] === correctIndex
                      ? "bg-success/10 border border-success/20"
                      : "bg-destructive/10 border border-destructive/20"
                  }`}
                >
                  <p className="text-sm">
                    {activeQuiz.answers[activeQuiz.currentQuestion] === correctIndex
                      ? `Correct! "${question.answer}" is the right answer.`
                      : `The correct answer is "${question.answer}".`}
                  </p>
                </motion.div>
              )}
              
              <Button
                variant="hero"
                className="w-full"
                onClick={activeQuiz.showResult ? nextQuestion : undefined}
                disabled={!activeQuiz.showResult}
              >
                {activeQuiz.currentQuestion >= quiz.questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Quiz List View
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
            Challenge yourself with quizzes covering 60 questions across 4 essential DSA topics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {quizzesData.map((quiz, index) => {
            const hasScore = quizScores[index] !== undefined;
            const score = quizScores[index];
            
            return (
              <motion.div
                key={quiz.topic}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl hover-lift cursor-pointer group"
                onClick={() => startQuiz(index)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    hasScore
                      ? score! >= 80 ? "bg-success/20 text-success"
                      : score! >= 50 ? "bg-warning/20 text-warning"
                      : "bg-destructive/20 text-destructive"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {hasScore ? (
                      <Trophy className="w-6 h-6" />
                    ) : (
                      <BookOpen className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    quiz.difficulty_level.includes("Hard")
                      ? "bg-destructive/20 text-destructive"
                      : quiz.difficulty_level.includes("Medium")
                      ? "bg-warning/20 text-warning"
                      : "bg-success/20 text-success"
                  }`}>
                    {quiz.difficulty_level}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {quiz.topic}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {quiz.question_count} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    ~{quiz.question_count} min
                  </span>
                </div>
                
                {hasScore ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Score</span>
                    <span className={`text-lg font-bold ${
                      score! >= 80 ? "text-success"
                      : score! >= 50 ? "text-warning"
                      : "text-destructive"
                    }`}>
                      {score}%
                    </span>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Start Quiz
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
