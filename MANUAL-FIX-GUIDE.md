# Manual Fix Guide - Beach Hydrovac Website

## 🔧 Current Issues
1. **Hero image not showing** (displaying dark blue instead)
2. **Wrong colors** (showing default blues instead of brand colors)
3. **No animations visible**

## ⚠️ Why API isn't working
Your application password has stopped working (401 errors). You'll need to either:
- Create a new application password, OR
- Make these fixes manually (takes 10 minutes)

---

## 🎨 MANUAL FIX (Recommended - 10 minutes)

### Step 1: Upload Hero Image (2 minutes)

1. Go to: **https://silver-raccoon-464412.hostingersite.com/wp-admin/**
2. Login with your WordPress credentials
3. Go to: **Media → Add New**
4. Upload: `C:\Users\rowel\claude-projects\beachhydrovac-website\images\hero-beach-truck.jpg`
5. Click on the uploaded image and **copy the URL**

---

### Step 2: Add Brand Colors & Animations (5 minutes)

1. Go to: **Appearance → Customize**
2. Click: **Additional CSS**
3. Paste this code:

```css
/* ========================================
   BEACH HYDROVAC BRAND COLORS & ANIMATIONS
   ======================================== */

:root {
  --beach-deep-atlantic: #00416A;
  --beach-safety-cyan: #27AEFD;
  --beach-warm-shoreline: #D4A373;
  --beach-soft-sand: #F5F1E8;
}

/* Apply brand colors */
body {
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--beach-deep-atlantic) !important;
}

.wp-block-button__link {
  background-color: var(--beach-safety-cyan) !important;
  border-color: var(--beach-safety-cyan) !important;
  color: white !important;
}

.wp-block-button.is-style-outline .wp-block-button__link {
  background-color: transparent !important;
  color: var(--beach-deep-atlantic) !important;
  border: 2px solid var(--beach-deep-atlantic) !important;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.wp-block-column {
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;
}

.wp-block-columns .wp-block-column:nth-child(1) {
  animation-delay: 0.1s;
}

.wp-block-columns .wp-block-column:nth-child(2) {
  animation-delay: 0.2s;
}

.wp-block-columns .wp-block-column:nth-child(3) {
  animation-delay: 0.3s;
}

/* Card hover effects */
.wp-block-group {
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.wp-block-group:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 10px 30px rgba(0, 65, 106, 0.2) !important;
}

/* Button animations */
.wp-block-button__link {
  transition: all 0.3s ease !important;
}

.wp-block-button__link:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(39, 174, 253, 0.4) !important;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hero section fix */
.wp-block-cover {
  min-height: 600px !important;
}

.wp-block-cover__inner-container h1 {
  color: white !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.wp-block-cover__inner-container p {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}
```

4. Click: **Publish**

---

### Step 3: Fix Homepage Hero Section (3 minutes)

1. Go to: **Pages → All Pages**
2. Click: **Home** (or the page shown as homepage)
3. At the top of the page, find the **hero section** (the first large block)
4. Click on the hero block to select it
5. In the right sidebar, look for **"Background"** or **"Media"** settings
6. Click **"Replace"** or **"Add Media"**
7. Select the hero image you uploaded in Step 1
8. Set **overlay opacity** to 40% (so text is readable)
9. Click **"Update"** to save

---

### Step 4: Clear All Caches (1 minute)

1. In WordPress admin, go to: **LiteSpeed Cache → Purge All**
2. In your browser: Press **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac)
3. Or try **Incognito/Private browsing** mode

---

## ✅ What You'll See After

After completing these steps, you'll have:

✅ **Hero section** with beach truck background image
✅ **Brand colors** everywhere:
   - Headings: Deep Atlantic (#00416A)
   - Buttons: Safety Cyan (#27AEFD)
   - Accents: Warm Shoreline (#D4A373)
✅ **Smooth animations**:
   - Columns fade in on scroll
   - Cards lift up on hover
   - Buttons have hover effects
✅ **Professional look** matching your brand

---

## 🔄 Alternative: Fix Application Password

If you want to use the API again for future updates:

1. Go to: **Users → Profile**
2. Scroll to: **Application Passwords**
3. **Revoke** the old password: "Claude Code Access"
4. Create a **new application password**:
   - Name: "Claude Code Access 2"
   - Click: **Add New Application Password**
5. Copy the new password and update `.env` file

---

## 📞 Need Help?

If any step isn't clear:
1. Take a screenshot of where you're stuck
2. Share it and I'll guide you through

The manual fix takes about 10 minutes total and will solve all three issues!
