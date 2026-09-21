# Dhruba.exe — Engineer in Progress
### Cyberpunk & Robotics Lab Personal Portfolio Website

[![System Status](https://img.shields.io/badge/System-Online-06b6d4?style=flat-square&logo=circuitverse)](https://github.com)
[![Discipline](https://img.shields.io/badge/Discipline-EEE%20%40%20JSTU-8b5cf6?style=flat-square)](https://jstu.ac.bd)
[![Hosting](https://img.shields.io/badge/Host-GitHub%20Pages-10b981?style=flat-square&logo=github)](https://pages.github.com/)

> **"I don't just want to learn technology. I want to use it to build something meaningful."**  
> *Student → Creator → Entrepreneur*

---

## ⚡ Overview

**Dhruba.exe** is a modern, futuristic, anime-inspired cyberpunk personal portfolio website crafted for **Dhruba Acharjee**, an Electrical & Electronic Engineering student at Jamalpur Science & Technology University (JSTU). 

Built to deploy seamlessly on **GitHub Pages** as a 100% static, client-side web application with zero backend dependencies, fast loading times, and responsive layouts across mobile, tablet, and ultra-wide screens.

---

## 🚀 Quick Start for Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local dev server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

3. **Build static production files for deployment:**
   ```bash
   npm run build
   ```
   This generates the pure static HTML, CSS, and JS bundle in the `dist/` directory.

---

## 🌐 Deploying to GitHub Pages

You can host this website on GitHub Pages for free in either of the two standard workflows:

### Method A: Automated GitHub Actions (Recommended)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a new repository (e.g. `dhruba-portfolio` or `<your-username>.github.io`).
2. **Push the codebase**:
   ```bash
   git init
   git add .
   git commit -m "Initialize Dhruba.exe portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages via Actions**:
   - In your GitHub repository, go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - Select the **Static HTML** or **Node.js** workflow, or push the pre-built `dist/` folder.

### Method B: Deploying the `dist/` folder directly

1. Build your static bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your `gh-pages` branch:
   ```bash
   npx gh-pages -d dist
   ```
3. In your repo's **Settings** → **Pages**, select the `gh-pages` branch. Your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

---

## 🛠️ How to Update Your Information (Modular Architecture)

All personal data, projects, activities, competitions, hobbies, and social links are centralized in a single configuration file:

📁 **`src/data/portfolioData.ts`**

You never need to edit complex HTML/JSX layouts to update your content!

### 1. How to Change Personal Information
Open `src/data/portfolioData.ts` and modify the `personalInfo` object:
```typescript
export const personalInfo = {
  name: "Dhruba Acharjee",
  age: 22,
  studentId: "24010608",
  department: "Electrical and Electronic Engineering",
  semester: "2nd Year — 2nd Semester",
  university: "Jamalpur Science & Technology University",
  presentAddress: "Jamalpur Sadar, Jamalpur, Bangladesh",
  permanentAddress: "Chandpur Sadar, Chandpur",
  ...
};
```

### 2. How to Add a New Project
In `src/data/portfolioData.ts`, find `export const projects = [...]` and add a new item:
```typescript
{
  id: "smart-solar-tracker",
  number: "05",
  title: "Dual-Axis Solar Tracker",
  category: "Renewable Energy / Embedded Systems",
  description: "An automated solar panel tracking system optimizing sun exposure via LDR differential sensing.",
  image: "/assets/projects/solar-tracker.jpg",
  technologies: ["Arduino Nano", "LDR Sensors", "Servo Motors", "Solar Cell"],
  githubUrl: "https://github.com/yourusername/solar-tracker",
  demoUrl: "#",
  features: [
    "Dual-axis motorized tracking",
    "Analog comparator sensitivity tuning",
    "Over-voltage charging protection"
  ]
}
```

### 3. How to Add Project Images
1. Save your project image inside the `public/assets/projects/` directory (e.g. `public/assets/projects/my-new-project.jpg`).
2. In `src/data/portfolioData.ts`, set the project's `image` property to:
   ```typescript
   image: "/assets/projects/my-new-project.jpg",
   ```
3. For your profile picture, place your image in `public/assets/profile/dhruba-avatar.jpg`.

### 4. How to Update Social Links & Contact Channels
In `src/data/portfolioData.ts`, update `export const socialLinks = [...]`:
```typescript
export const socialLinks = [
  {
    id: "email",
    platform: "Email",
    url: "mailto:your-real-email@gmail.com",
    handlePlaceholder: "your-real-email@gmail.com",
    iconName: "Mail",
  },
  {
    id: "github",
    platform: "GitHub",
    url: "https://github.com/your-real-github",
    handlePlaceholder: "github.com/your-real-github",
    iconName: "Github",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/your-real-profile",
    handlePlaceholder: "linkedin.com/in/your-real-profile",
    iconName: "Linkedin",
  },
  ...
];
```

---

## 🎨 Visual Identity & Key Highlights

- **Aesthetic**: Cyberpunk HUD + Robotics Laboratory + Futuristic Anime Visuals.
- **Narrative**: Clear visual evolution of **Student → Creator → Entrepreneur**.
- **Interactive CLI Terminal**: Visitors can click the terminal button or press `CLI` in the navbar to enter commands (`help`, `about`, `projects`, `skills`, `vision`, `contact`).
- **Web Audio Synthesizer**: Subtle retro sound effects on user interaction with a one-click mute toggle.
- **Zero Backend Required**: Fully client-side native mailto dispatch, clipboard copying, and responsive animations.
- **Accessible & Lightweight**: Optimized canvas particles, CSS animations, and `prefers-reduced-motion` compliance.

---

## 📄 License & Attribution

Designed for **Dhruba Acharjee** — Electrical and Electronic Engineering, Jamalpur Science & Technology University.
All rights reserved.
