# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

# dsa_viz — Interactive DSA Visualizer

An interactive **Data Structures & Algorithms visualizer** built for clarity, learning, and intuition.

Visualize algorithms step-by-step with **synced pseudocode highlighting**, smooth animations, and full playback control — ideal for students, interview prep, and anyone who wants to deeply understand how algorithms work.

Built with **React + Vite + TypeScript + Tailwind CSS + shadcn-ui**.

---

## 🚀 Live Demo
(Coming soon — add your Vercel/Netlify URL here once deployed)

---

## ✨ Features

### 🔢 Sorting Algorithms
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort

### 🔍 Searching Algorithms
- Linear Search
- Binary Search

### 🌳 Tree Algorithms
- Binary Search Tree
- Insert / Delete / Search
- Traversals

### 🌐 Graph Algorithms
- BFS
- DFS
- Dijkstra's Algorithm
- Topological Sort

### 🎯 Learning-Focused Design
- Step-through execution
- Active pseudocode highlighting
- Adjustable animation speed
- Pause / resume / reset
- Clean, beginner-friendly visual interface

---

## 🧠 Why This Exists

Most visualizers are flashy but distracting. This project keeps the focus on thinking like an engineer:
- Every step is clear
- Code and animation stay in sync
- You control the flow
- Ideal for DSA learning & interviews

---

## 🛠 Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn-ui

Fast • Modern • Maintainable

---

## 📦 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/akashgoudsidduluri/dsa_viz
cd dsa_viz
```

### 2️⃣ Install dependencies
Using npm:
```bash
npm install
```
Or using pnpm:
```bash
pnpm install
```

### 3️⃣ Run the dev server
```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

### 4️⃣ Build for production
```bash
npm run build
npm run preview
```

---

## 🗂 Project Structure (high level)

- [src](src) — Application source
	- [src/main.tsx](src/main.tsx) — App entry
	- [src/App.tsx](src/App.tsx) — Top-level app component
	- [src/components](src/components) — UI components & sections
	- [src/lib](src/lib) — Algorithms logic & helpers
	- [src/data/dsaContent.ts](src/data/dsaContent.ts) — DSA content & metadata
	- [src/visualizations](src/visualizations) — Visual components (arrays, trees, graphs)

Explore the `src` folder to find algorithm implementations and their visualizers.

---

## 🧩 How to Use

- Select an algorithm from the UI.
- Use controls to play, pause, step forward/back, or reset.
- Adjust animation speed for faster/slower visualization.
- Follow the highlighted pseudocode to correlate visual steps with algorithm logic.

---

## 🤝 Contributing

Contributions are welcome! Suggested workflow:
- Fork the repo
- Create a feature branch (feature/awesome-visual)
- Make changes and add tests if applicable
- Open a PR with a clear description

Please follow existing code style and file structure. If adding a new algorithm visualizer, include:
- Clear step generator in `src/lib` or equivalent
- Visual component under `src/visualizations`
- A UI entry in the relevant `sections` page

---

## 📣 Deployment

Deploy with Vercel, Netlify, or any static host that supports Vite builds. After deployment, paste the demo URL in the Live Demo section above.

---

## 📜 License

This project is available under the MIT License. Add a `LICENSE` file to the repo if not present.

---

## 🙏 Acknowledgements

- Inspired by many DSA visualizers and educational tooling.
- Built with shadcn-ui and Tailwind CSS for a compact, accessible UI.

---

If you'd like, I can also add badges, a demo GIF, or commit this change for you.
