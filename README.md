# 📚 PYQ App — Amravati University (Mechanical)

This repository contains a mobile-first PYQ (previous-year question) app focused on the Mechanical Engineering branch of Sant Gadge Baba Amravati University. The app is built with Expo and expo-router and provides an organized viewer for past question papers by semester, subject and year.

### 🎯 Key goals

- ✅ Provide students quick access to previous-year question papers (PYQs) for Mechanical Engineering.
- 🔎 Make papers easy to browse by semester, subject, and year.
- ⚡ Lightweight, offline-capable viewer and simple bookmarking/download support.

## 📁 What you'll find in this repo

- `app/` — expo-router routes and screens. Main route groups include:
  - `(bottomtabs)/` — main tab layout, account and core navigation
  - `(stack)/paper/` — paper listing and details (by id)
  - `(stack)/sem/`, `(stack)/sub/`, `(stack)/viewer/` — semester, subject and viewer pages
- `components/` — reusable UI components and small unit tests
- `assets/` — images and fonts (SpaceMono included)
- `scripts/` — utilities like `reset-project.js`

## ✨ Features (planned / implemented)

- 📚 Browse papers by semester and subject
- 📄 View paper content in-app (PDF/webview)
- ⭐ Bookmark and quick-access recent papers
- 🌐 Responsive for both mobile and web via Expo

If you'd like to add features (example: offline caching of PDFs, search by keywords, or user accounts), open an issue or a PR.

## 🚀 Quick start (developer)

### 🧰 Prerequisites

- Node.js (recommend Node 18+)
- Git
- Expo CLI (optional — you can use the local npm scripts)

### 📦 Install

```zsh
npm install
```

### ▶️ Start the project

```zsh
npm run start
```

### 📱 Run on device/emulator

```zsh
npm run android    # Android device/emulator
npm run ios        # iOS simulator (macOS only)
npm run web        # Run in browser
```

### ✅ Tests and linting

```zsh
npm run test
npm run lint
```

### ♻️ Reset project

```zsh
npm run reset-project
```

## 🗂️ Data & content

This app expects paper data to be provided in a format consumable by the `paper`/`sem`/`sub` routes (for example: JSON lists with IDs and file URLs). The repository currently includes screens/routes to list and view papers — if you have a canonical source for PYQs (university website or a maintained dataset), we can wire an importer or an admin UI to manage them.

## 🏗️ EAS (production builds)

See `app.json` for Expo configuration and EAS-related project settings. To build production binaries using EAS:

```zsh
# requires EAS CLI and login
eas build -p android
eas build -p ios
```