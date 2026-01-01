import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Code2, Users, Target, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Hero */}
            <div className="text-center mb-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <Code2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About <span className="gradient-text">DSA Viz</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Making data structures and algorithms accessible through interactive visualizations
              </p>
            </div>

            {/* Mission */}
            <section className="glass-card p-8 rounded-2xl mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    DSA Viz was created with a simple goal: to help learners understand complex algorithms 
                    through visual, interactive experiences. We believe that seeing an algorithm in action 
                    is worth a thousand lines of pseudocode. Our platform provides step-by-step visualizations 
                    that break down sorting, searching, graph algorithms, and more into digestible, 
                    memorable learning moments.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <Sparkles className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
                <p className="text-muted-foreground">
                  Step through algorithms at your own pace, control playback speed, 
                  and see exactly what happens at each iteration.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-xl"
              >
                <Users className="w-8 h-8 text-info mb-4" />
                <h3 className="text-xl font-semibold mb-2">Built for Everyone</h3>
                <p className="text-muted-foreground">
                  Whether you're a student preparing for interviews, a self-taught developer, 
                  or a CS educator, DSA Viz adapts to your learning style.
                </p>
              </motion.div>
            </div>

            {/* Creator */}
            <section className="glass-card p-8 rounded-2xl text-center">
              <h2 className="text-2xl font-bold mb-4">Created By</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Akash Goud Sidduluri
              </p>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A passionate developer dedicated to making computer science education 
                more accessible and engaging for learners worldwide.
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
