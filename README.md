# 🛠️ DevToolkit Lite

DevToolkit Lite is a premium, high-performance suite of developer utilities built with React. It focuses on privacy-first, client-side operations wrapped in a modern, highly animated, and responsive interface.

![Header](https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000)

## ✨ Features

- **JSON Formatter**: Instantly prettify or minify complex JSON payloads with built-in validation and syntax-style output.
- **Secure Password Generator**: Generate cryptographically secure passwords using the Web Crypto API. Customizable length and character sets.
- **Dark Mode Support**: A fully integrated theme system with smooth CSS transitions.
- **Premium UI/UX**: Built with Tailwind CSS, featuring glassmorphism, micro-interactions, and staggered entry animations.
- **Privacy Focused**: 100% client-side. Your data never leaves your browser.

## 🚀 Getting Started

### Prerequisites

To run this project locally, you simply need a modern web browser and a local development server (like VS Code Live Server, Vite, or a simple Python server).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/devtoolkit-lite.git
   ```
2. Navigate to the project root:
   ```bash
   cd devtoolkit-lite
   ```

## 💻 How to Run

Since this project uses ES Modules and `esm.sh` for dependencies, you don't necessarily need `npm install` for a quick preview, but a local server is required to handle the module imports correctly.

### Method 1: Using VS Code Live Server (Recommended)
1. Open the folder in VS Code.
2. Click **Go Live** in the bottom right corner.
3. The app will launch at `http://127.0.0.1:5500`.

### Method 2: Using Python
If you have Python installed, run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## 🏗️ How to Compile / Build

For a production-ready build using modern tooling (like Vite or Webpack), you would typically follow these steps:

1. **Initialize NPM** (if not already done):
   ```bash
   npm init -y
   ```
2. **Install Dependencies**:
   ```bash
   npm install react react-dom react-router-dom lucide-react
   npm install -D tailwindcss postcss autoprefixer vite
   ```
3. **Configure Tailwind**:
   Initialize `tailwind.config.js` and add the paths to all of your template files.
4. **Build for Production**:
   ```bash
   npm run build
   ```
   This will generate a `dist/` folder with optimized, minified assets ready for deployment on platforms like Vercel, Netlify, or GitHub Pages.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: Custom SVG + Lucide-style iconography
- **Animations**: CSS Keyframes + Tailwind Transitions
- **State Management**: React Context API (Theme) & Hooks

---

## 📸 Screenshots

### Dashboard
> *A clean, staggered entry of available tools with hover-lift effects.*

### JSON Formatter
> *High-contrast editor with instant validation and copy-to-clipboard functionality.*

### Password Generator
> *Interactive entropy lab with real-time strength indicators and military-grade security.*

---

## 🔒 Security
DevToolkit Lite uses `window.crypto.getRandomValues()` for all password generation. We do not use `Math.random()`, ensuring that your passwords have high entropy and are practically impossible to predict.

## 📄 License
MIT License - feel free to use this for your portfolio or personal projects!
