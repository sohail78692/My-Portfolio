# Portfolio OS

A **macOS‑style web portfolio** built with **React** and **Vite** that showcases projects in a fully animated, glass‑morphism desktop environment.  It features a dynamic **TopBar**, **Dock**, **Control Center**, **Safari** browser, **Terminal**, **Mail**, **Finder**, and more, all styled with a premium, glassy UI that adapts to light and dark themes.

---

## ✨ Features

- **macOS‑inspired UI** – Glass‑morphism, smooth animations, and responsive layout.
- **Dynamic theming** – Light and dark modes with automatic wallpaper switching.
- **Custom branding** – Replace the Apple logo with your own avatar/logo.
- **Fully functional apps**:
  - **Safari** – Displays your projects using the `Projects` component.
  - **Terminal** – Interactive command line with basic commands.
  - **Mail** – Contact form integrated via the `Contact` component.
  - **Finder** – File‑browser‑like UI with dark/light aware styling.
- **Responsive design** – Works on desktop and mobile browsers.
- **SEO‑ready** – Proper `<title>`, meta description, and semantic HTML.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React (hooks) + Vite |
| **Styling** | Vanilla CSS with CSS variables for theming |
| **Animations** | Framer Motion |
| **Icons** | Lucide‑React |
| **3D / Canvas** | Three.js (optional) |
| **Deployment** | Any static‑host (Netlify, Vercel, GitHub Pages) |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/portfolio-os.git
cd portfolio-os

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open <http://localhost:5173> in your browser.

---

## 📸 Screenshots

![Light Mode Screenshot](file:///C:/Users/sohai/.gemini/antigravity/brain/c69b2ee2-df00-4b66-b5bd-1cff3c355c53/uploaded_image_0_1763890821876.png)

![Dark Mode Screenshot](file:///C:/Users/sohai/.gemini/antigravity/brain/c69b2ee2-df00-4b66-b5bd-1cff3c355c53/uploaded_image_1_1763890821876.png)

---

## 🎨 Customization

- **Logo** – Replace `/assets/logo.png` with your own image.
- **Wallpapers** – Update the URLs in `src/components/os/Desktop.jsx` for light/dark backgrounds.
- **Projects** – Edit `src/components/Projects.jsx` to showcase your own work.

---

## 📜 License

MIT License – feel free to fork, modify, and deploy.

---

*Built with love by **Sohail** – a creative developer passionate about immersive web experiences.*
