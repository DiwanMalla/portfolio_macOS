# 🚀 QUICK START GUIDE - Let's Build Together!

## 📍 You Are Here: Getting Started

Let's build your Mac OS portfolio step by step. Follow along and check off each task!

---

## 🎯 SESSION 1: Foundation (30-45 mins)

### Step 1: Environment Check ✓

**Open your terminal and run these commands:**

```bash
# Check if Node.js is installed
node --version
# Should show v18.0.0 or higher

# Check if npm is installed
npm --version
# Should show 8.0.0 or higher
```

**✅ If you see version numbers, you're good to go!**  
**❌ If not, install Node.js from: https://nodejs.org/**

---

### Step 2: Create Project

```bash
# 1. Navigate to where you want your project
cd ~/Desktop  # or wherever you prefer

# 2. Create Next.js project
npx create-next-app@latest macos-portfolio

# When prompted:
# - Would you like to use TypeScript? › No (or Yes if you prefer)
# - Would you like to use ESLint? › Yes
# - Would you like to use Tailwind CSS? › Yes ✓
# - Would you like to use `src/` directory? › Yes ✓
# - Would you like to use App Router? › Yes ✓
# - Would you like to customize the default import alias? › No

# 3. Enter project folder
cd macos-portfolio
```

**✅ Checkpoint:** You should see "Success! Created macos-portfolio" message!---

### Step 3: Install Dependencies

```bash
# 1. Install base packages
npm install

# 2. Start dev server to test
npm run dev
```

**✅ Checkpoint:** Browser should open with Vite + React page at `http://localhost:5173`

**📸 You should see:** A page with Vite and React logos

---

### Step 4: Install All Required Packages

**Copy and paste this entire block:**

```bash
npm install gsap @gsap/react zustand immer lucide-react react-tooltip react-pdf dayjs clsx
```

⏳ **This will take 2-3 minutes...**

**Note:** Tailwind CSS is already installed with Next.js!

**✅ Checkpoint:** No errors, all packages installed successfully

---

### Step 5: Setup Tailwind CSS

**1. Initialize Tailwind:**

```bash
npx tailwindcss init
```

**2. Update `vite.config.js`:**

Open `vite.config.js` and replace everything with:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": resolve(
        fileURLToPath(import.meta.url),
        "../src/components"
      ),
      "@constants": resolve(fileURLToPath(import.meta.url), "../src/constants"),
      "@store": resolve(fileURLToPath(import.meta.url), "../src/store"),
      "@hoc": resolve(fileURLToPath(import.meta.url), "../src/hoc"),
      "@windows": resolve(fileURLToPath(import.meta.url), "../src/windows"),
    },
  },
});
```

**3. Create `jsconfig.json` in root:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "#*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

**✅ Checkpoint:** Files saved without errors

---

### Step 6: Create Folder Structure

```bash
# Inside your project, create these folders:
mkdir -p src/components src/windows src/store src/hoc src/constants public/images public/files

# Remove default Next.js app structure
rm -rf src/app/page.js src/app/layout.js
```

**✅ Checkpoint:** Check VS Code, you should see all these folders

---

### Step 7: Update Global Styles

**Open `src/app/globals.css` and replace ALL content with:**

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

#root {
  width: 100%;
  height: 100%;
}

main {
  width: 100%;
  height: 100%;
  background: url("/images/wallpaper.jpg") center/cover no-repeat;
  position: relative;
  overflow: hidden;
}

/* Navigation Bar */
nav {
  @apply flex justify-between items-center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  padding: 0.5rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Welcome Section */
#welcome {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center;
  pointer-events: none;
}

#welcome p,
#welcome h1 {
  pointer-events: auto;
  user-select: none;
}

/* Dock */
#dock {
  @apply absolute bottom-5 left-1/2 transform -translate-x-1/2;
}

.dock-container {
  @apply flex items-end gap-2 px-3 py-2 rounded-2xl;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dock-icon {
  @apply w-14 h-14 cursor-pointer transition-transform;
  transform-origin: bottom;
}

/* Window Styles */
section[id^="terminal"],
section[id^="safari"],
section[id^="resume"],
section[id^="contact"],
section[id^="finder"],
section[id^="photos"],
section[id^="txt"],
section[id^="image"] {
  @apply bg-white rounded-lg shadow-2xl;
  min-width: 400px;
  min-height: 300px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
}

#window-header {
  @apply flex items-center gap-3 px-4 py-2 bg-gray-100 border-b;
}

#window-controls {
  @apply flex gap-2;
}

#window-controls > div {
  @apply w-3 h-3 rounded-full cursor-pointer;
}

.close {
  background: #ff5f57;
}
.minimize {
  background: #ffbd2e;
}
.maximize {
  background: #28c840;
}

.close:hover {
  background: #ff4136;
}
.minimize:hover {
  background: #ffaa00;
}
.maximize:hover {
  background: #20a030;
}

/* Icon Styles */
.icon {
  @apply w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity;
}

.icon-hover {
  @apply transition-transform hover:scale-110;
}

/* Small Screen Warning */
.small-screen {
  @apply hidden;
}

@media (max-width: 768px) {
  #welcome p,
  #welcome h1 {
    display: none;
  }

  .small-screen {
    @apply block text-center text-white text-xl px-5;
  }
}

/* Utility Classes */
.flex-center {
  @apply flex items-center justify-center;
}
```

**✅ Checkpoint:** CSS saved, no syntax errors

---

### Step 8: Clean Up App.jsx

**Open `src/App.jsx` and replace with:**

```jsx
import "./App.css";

function App() {
  return (
    <main>
      <h1 className="text-white text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Mac OS Portfolio
      </h1>
    </main>
  );
}

export default App;
```

**✅ Checkpoint:** You should see "Mac OS Portfolio" text in center

---

### Step 9: Add Temporary Wallpaper

**For now, create a simple wallpaper:**

1. Find any nice wallpaper image (1920x1080)
2. Rename it to `wallpaper.jpg`
3. Put it in `public/images/wallpaper.jpg`

**OR use a gradient temporarily by updating globals.css:**

```css
main {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}
```

**✅ Checkpoint:** You should see a nice background!

---

## 🎉 SESSION 1 COMPLETE!

### ✅ What You've Accomplished:

- ✓ Development environment setup
- ✓ All packages installed
- ✓ Tailwind CSS configured
- ✓ Folder structure created
- ✓ Basic styles applied
- ✓ Project running successfully

### 📸 Your screen should show:

- A nice gradient/wallpaper background
- "Mac OS Portfolio" text in the center
- No errors in console

---

## 🎯 READY FOR SESSION 2?

**Next up, we'll build:**

1. Constants file with all your data
2. State management stores
3. First components (Navbar, Welcome)

**Estimated time:** 45 minutes

**Take a break, grab some coffee ☕, and let's continue!**

---

## 🆘 Common Issues

### Issue: "Cannot find module '@tailwindcss/vite'"

**Solution:** Run `npm install @tailwindcss/vite` again

### Issue: "Port 5173 is already in use"

**Solution:**

- Close other terminals
- Or change port: `npm run dev -- --port 3000`

### Issue: Wallpaper not showing

**Solution:**

- Check file is in `public/images/wallpaper.jpg`
- Or use gradient background temporarily

### Issue: Styles not applying

**Solution:**

- Make sure `index.css` is imported in `main.jsx`
- Restart dev server: Press `Ctrl+C`, then `npm run dev`

---

## 📝 Before Next Session

**Quick Checklist:**

- [ ] Dev server runs without errors
- [ ] You can see the background
- [ ] No red errors in browser console
- [ ] You understand the folder structure
- [ ] You have your resume PDF ready to add later
- [ ] You have some project screenshots ready

---

**Great job! You're ready to build the actual portfolio! 🚀**

**Next:** When you're ready, tell me and we'll start Session 2!
