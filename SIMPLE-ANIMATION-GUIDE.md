# Simple Guide: Add Animations to Your Pages

Since the automated script isn't working perfectly, here's the EASIEST way to add animations manually (takes 5 minutes):

## ✨ Option 1: Add Custom CSS Block (Simplest!)

This will add animations to your ENTIRE site with one simple block:

### Step 1: Edit Homepage

1. Go to: https://silver-raccoon-464412.hostingersite.com/wp-admin/post.php?post=14&action=edit
2. Click the **[+]** button at the very top (before all content)
3. Search for: **"Custom HTML"**
4. Paste this code:

```html
<style>
/* Fade in animations */
.wp-block-column, .wp-block-group, .wp-block-heading {
  animation: fadeInUp 0.8s ease-out;
}

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

/* Hover effects on cards */
.wp-block-group {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wp-block-group:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 65, 106, 0.2) !important;
}

/* Button animations */
.wp-block-button__link {
  transition: all 0.3s ease;
}

.wp-block-button__link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(39, 174, 253, 0.4);
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}
</style>
```

5. Click **Update**
6. **Done!** Now visit your site and scroll - you'll see animations!

---

## ✨ Option 2: Add via Theme Customizer (Site-Wide!)

1. Go to: **Appearance → Customize**
2. Click: **Additional CSS**
3. Paste the same CSS code from above
4. Click: **Publish**

This applies to ALL pages automatically!

---

## 🎨 What You'll See:

- ✅ Elements fade in as page loads
- ✅ Cards lift up when you hover
- ✅ Buttons have hover effect with shadow
- ✅ Smooth scrolling for anchor links

---

## 🚀 Want More Effects?

If you want MORE dramatic animations, replace the code with this ADVANCED version:

```html
<style>
/* Advanced scroll animations */
.wp-block-columns {
  opacity: 0;
  animation: fadeIn 1s ease-out 0.2s forwards;
}

.wp-block-column:nth-child(1) {
  animation: slideInLeft 0.8s ease-out 0.3s forwards;
}

.wp-block-column:nth-child(2) {
  animation: slideInUp 0.8s ease-out 0.5s forwards;
}

.wp-block-column:nth-child(3) {
  animation: slideInRight 0.8s ease-out 0.7s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Glowing hover effect */
.wp-block-group:hover {
  transform: scale(1.02) translateY(-8px);
  box-shadow: 0 15px 40px rgba(39, 174, 253, 0.3) !important;
  border-color: #27AEFD !important;
}

/* Button pulse animation */
.wp-block-button__link {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(39, 174, 253, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(39, 174, 253, 0);
  }
}

/* Smooth everything */
* {
  transition: all 0.3s ease;
}

html {
  scroll-behavior: smooth;
}
</style>
```

---

## 📌 Which Option Should You Use?

- **Option 1** (Custom HTML block on homepage): Best if you only want animations on homepage
- **Option 2** (Additional CSS in Customizer): Best for site-wide animations

**Recommendation**: Use **Option 2** for easiest setup!

---

Try it now and let me know if you see the animations! 🎨
