import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Hero */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 1, 2026</p>
            </div>

            <div className="glass-card p-8 rounded-2xl prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  When you create an account on DSA Viz, we collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Email address for account authentication</li>
                  <li>Username for your public profile</li>
                  <li>Learning progress and quiz scores</li>
                  <li>Optional profile information (bio, date of birth)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and personalize the learning experience</li>
                  <li>Track your progress and achievements</li>
                  <li>Send important account-related notifications</li>
                  <li>Improve our platform and content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your data. 
                  Your password is encrypted and never stored in plain text. We use secure 
                  HTTPS connections for all data transmission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to access, update, or delete your personal information 
                  at any time through your account settings. You can also request a complete 
                  export of your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us 
                  at privacy@dsaviz.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
