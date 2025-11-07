# English Reading Library

A beautiful bilingual English reading platform built with Next.js 15, designed to help Korean learners improve their English reading skills.

## 🌟 Features

- **Bilingual Content**: Switch between English, Korean, or side-by-side view
- **Interactive Reading**: Comprehension questions and vocabulary sections
- **Category Organization**: Content organized by topics
- **Table of Contents**: Quick navigation within articles
- **Responsive Design**: Works beautifully on all devices
- **Dark Mode Support**: Easy on the eyes
- **Static Site**: Fast loading with GitHub Pages

## 🚀 Live Demo

Visit the site: [https://qleo.github.io/english-reading-history](https://qleo.github.io/english-reading-history)

## 📁 Project Structure

```
english-reading-history/
├── web/                      # Next.js application
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities and helpers
│   └── content/             # Markdown files
├── CEFR B1/                 # Original markdown content
└── .github/workflows/       # GitHub Actions for deployment
```

## 📝 Adding New Content

1. Create a new markdown file in `CEFR B1/YYYY-MM/` directory
2. Add front matter at the top:

```yaml
---
title: "Your Article Title"
date: "2025-11-07"
category: "Category Name"
tags: ["tag1", "tag2"]
difficulty: "B1"
level: "CEFR-B1"
readingTime: "5 min"
---
```

3. Structure your content with these sections:
   - Reading Passage
   - Comprehension Questions
   - Korean Translation (한국어 번역)
   - Useful Expressions & Vocabulary

4. Push to GitHub - the site will automatically rebuild and deploy

## 🛠 Local Development

```bash
cd web
npm install
npm run dev
```

Visit `http://localhost:3000` to see your changes.

## 📦 Building

```bash
cd web
npm run build
```

The static site will be generated in the `web/out/` directory.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new reading materials
- Improve translations
- Enhance UI/UX
- Fix bugs

## 📄 License

This project is open source and available under the MIT License.
