import { Code2, Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Sorting", "Dynamic Programming"],
  Resources: ["Documentation", "API Reference", "Examples", "Blog", "Community"],
  Company: ["About", "Careers", "Contact", "Privacy", "Terms"],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">DSA Viz</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Master data structures and algorithms with interactive visualizations,
              step-by-step explanations, and hands-on practice.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <button
                onClick={() => window.open("https://github.com/akashgoudsidduluri", "_blank")}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  window.open("https://www.linkedin.com/in/akash-goud-sidduluri-68aba5322", "_blank")
                }
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 DSA Viz. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for learners worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
