# Queens Perfume & Beauty Boutique 👑

Luxury e-commerce boutique for premium perfumes, beauty, and skincare with Jordanian localization (JOD currency, CliQ payments, Cash on Delivery, WhatsApp orders, Scent Finder quiz, and store owner administrative panel).

---

## 🚀 How to Deploy to Vercel

### Method 1: Deploy via GitHub (Recommended & Easiest)

1. **Unzip the downloaded project** on your computer.
2. **Push the code to a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Queens Perfume Boutique"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/queens-perfume.git
   git push -u origin main
   ```
3. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." > "Project"**.
4. Import your GitHub repository (`queens-perfume`).
5. Vercel will automatically detect **Vite** thanks to `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build:client` (or `vite build`)
   - **Output Directory**: `dist`
6. Click **Deploy**. Your boutique will be live on a custom `.vercel.app` domain in less than 60 seconds!

---

### Method 2: Deploy using Vercel CLI

1. Open your terminal inside the project folder:
   ```bash
   npm install -g vercel
   vercel
   ```
2. Follow the interactive prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your personal account or team.
   - Link to existing project? **No**
   - Project name: `queens-perfume`
   - Directory: `./`
3. For production deployment:
   ```bash
   vercel --prod
   ```

---

## 🛠 Local Development

To run the boutique locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production preview
npm run build:client
npm run preview
```

---

## 📁 Project Structure

```
├── public/                 # Static assets (PWA manifest, icons, service worker)
│   ├── icon.svg            # Store logo / app icon
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker for offline & installability
├── src/
│   ├── components/         # All modular UI components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── CategoryShowcase.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── ProductDetailModal.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── CheckoutModal.tsx
│   │   ├── WishlistModal.tsx
│   │   ├── FragranceQuizModal.tsx
│   │   ├── AdminPanelModal.tsx
│   │   ├── InstallAppModal.tsx
│   │   ├── FloatingWhatsApp.tsx
│   │   ├── Footer.tsx
│   │   └── Toast.tsx
│   ├── data/               # Products catalog and seed data
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx             # Main application orchestrator
│   ├── main.tsx            # React 19 entry point
│   └── index.css           # Tailwind CSS imports & styles
├── index.html              # HTML entry point with luxury typography & meta tags
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment configuration
└── vite.config.ts          # Vite bundler configuration
```
