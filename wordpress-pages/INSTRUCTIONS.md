# WordPress Page Setup Instructions

Follow these steps to recreate your BeachHydrovac website in WordPress with the Kadence child theme.

## ✅ Prerequisites

Make sure you have:
- [x] Kadence Theme installed and active
- [x] BeachHydrovac Child Theme installed and active
- [x] Hero image uploaded to WordPress Media Library

---

## 📸 Step 1: Upload Hero Image

1. Go to: **Media → Add New**
2. Upload: `hero-beach-truck.jpg` (the beach truck image)
3. After upload, click on the image
4. Copy the **File URL** (you'll need this)

---

## 🏠 Step 2: Create Homepage

### Create the Page:
1. Go to: **Pages → Add New**
2. Title: `Home` (or leave blank for no title)
3. Click the **⋮** menu (top right) → **Code editor**
4. **Delete everything** in the editor
5. Open: `01-homepage.txt`
6. **Copy ALL the content**
7. **Paste** into WordPress Code Editor
8. Click **⋮** menu → **Visual editor** (to see the preview)

### Update Hero Image URL:
9. In the first block (Hero/Cover), click **Replace**
10. Choose your uploaded hero image
11. Set **Opacity: 0%** (no overlay)

### Publish:
12. Click **Publish** button (top right)
13. Click **Publish** again to confirm

---

## 🏡 Step 3: Set as Homepage

1. Go to: **Settings → Reading**
2. Select: **A static page**
3. Homepage: Choose **Home** (the page you just created)
4. Click **Save Changes**

---

## 🎨 Step 4: Verify Brand Colors

1. Edit any page
2. Add a **Heading** block
3. Click the **Text color** button
4. You should see:
   - Deep Atlantic
   - Safety Cyan
   - Warm Shoreline

If you DON'T see these colors:
- Go to: **Appearance → Customize → Colors → Palette**
- Set:
  - Color 1: #00416A (Deep Atlantic)
  - Color 2: #27AEFD (Safety Cyan)
  - Color 3: #D4A373 (Warm Shoreline)

---

## 🎯 Step 5: Configure Header (Optional)

1. Go to: **Appearance → Customize → Header**
2. **Add Logo:**
   - Upload your BeachHydrovac logo
3. **Add Phone Button:**
   - Add Button element
   - Text: "757-785-5177"
   - Link: `tel:7577855177`
   - Style: Safety Cyan background

---

## 📝 Step 6: Create Menu

1. Go to: **Appearance → Menus**
2. Create new menu: `Primary Menu`
3. Add items (in this order):
   - Home
   - Services
   - About
   - Blog
   - Contact
4. Assign to: **Primary Navigation**
5. Save

**Pro Tip:** After creating all pages (Steps 8-9), come back and add them to the menu!

---

## 🎨 Step 7: Customize Footer

1. Go to: **Appearance → Customize → Footer**
2. Add your contact information:
   - Phone: 757-785-5177
   - Email: info@beachhydrovac.com
   - Address: Virginia Beach, VA
3. Add AIM Partnership mention
4. Publish changes

---

## 📄 Step 8: Create Additional Pages

Now that your homepage is set up, create these essential pages:

### 02 - Services Page

1. **Pages → Add New**
2. Title: `Services`
3. Click **⋮** menu → **Code editor**
4. Open: `02-services.txt`
5. Copy and paste all content
6. Update hero image URL (same as homepage or different)
7. **Publish**

### 03 - About Page

1. **Pages → Add New**
2. Title: `About`
3. Click **⋮** menu → **Code editor**
4. Open: `03-about.txt`
5. Copy and paste all content
6. Update hero image URL
7. **Publish**

### 04 - Contact Page

1. **Pages → Add New**
2. Title: `Contact`
3. Click **⋮** menu → **Code editor**
4. Open: `04-contact.txt`
5. Copy and paste all content
6. Update hero image URL
7. **Install Contact Form Plugin** (see instructions in the page)
   - Recommended: **Contact Form 7** or **WPForms**
   - Create form with: Name, Email, Phone, Service Type, Project Details
   - Replace placeholder paragraph with form shortcode
8. **Publish**

---

## ✍️ Step 9: Add Blog Posts

Create sample blog posts to populate your blog:

### Blog Post 1: What is Hydro Excavation?

1. **Posts → Add New**
2. Title: `What is Hydro Excavation? A Complete Guide`
3. Click **⋮** menu → **Code editor**
4. Open: `blog-post-1-what-is-hydro-excavation.txt`
5. Copy and paste content
6. Add **Featured Image** (upload a truck or excavation photo)
7. Set **Category**: Create "Industry Education" or "How-To"
8. **Publish**

### Blog Post 2: SUE Level A Verification

1. **Posts → Add New**
2. Title: `Understanding SUE Level A Verification and Why It Matters`
3. Click **⋮** menu → **Code editor**
4. Open: `blog-post-2-sue-level-a-verification.txt`
5. Copy and paste content
6. Add **Featured Image**
7. Set **Category**: "Industry Education" or "Best Practices"
8. **Publish**

### Blog Post 3: Winter Excavation

1. **Posts → Add New**
2. Title: `Cold Weather Excavation: Why Hydro Excavation Works When Others Can't`
3. Click **⋮** menu → **Code editor**
4. Open: `blog-post-3-winter-excavation.txt`
5. Copy and paste content
6. Add **Featured Image** (winter/frozen ground theme)
7. Set **Category**: "Seasonal Tips" or "How-To"
8. **Publish**

---

## ✅ Testing Checklist

After setup, verify:
- [ ] Homepage displays correctly
- [ ] Hero image shows with no dark overlay
- [ ] Brand colors work in color picker
- [ ] Buttons are rounded (pill shape)
- [ ] Buttons use Safety Cyan color
- [ ] Typography uses Inter/Roboto fonts
- [ ] Mobile responsive (check on phone)
- [ ] **Services page** displays all service cards
- [ ] **About page** shows AIM partnership section
- [ ] **Contact page** has working contact form
- [ ] **Blog page** shows all 3 posts
- [ ] Blog posts display correctly with featured images
- [ ] All internal links work (Home, Services, About, Contact, Blog)

---

## 🎨 Design Tips

### Using Brand Colors:
- **Headlines:** Deep Atlantic (#00416A)
- **Buttons/Links:** Safety Cyan (#27AEFD)
- **Accents:** Warm Shoreline (#D4A373)

### Button Style:
- Always use rounded corners (9999px)
- Primary: Safety Cyan background
- Secondary: Warm Shoreline or outline style

### Spacing:
- Use consistent padding (50-70px)
- White space between sections
- Generous margins around content

---

## 📊 Performance Tips

1. **Install LiteSpeed Cache Settings:**
   - Go to: **LiteSpeed Cache → Settings**
   - Enable: CSS Minify
   - Enable: JS Minify
   - Enable: Image Optimization

2. **Optimize Images:**
   - Use WebP format
   - Compress before upload
   - Set proper alt text (SEO)

3. **Test Speed:**
   - Visit: https://pagespeed.web.dev/
   - Test your site
   - Should get 95-100 score

---

## ❓ Troubleshooting

### Colors not showing?
- Check child theme is active
- Clear cache (LiteSpeed Cache → Purge All)
- Re-save customizer settings

### Buttons not rounded?
- Child theme CSS should handle this
- If not, add custom CSS in Customizer

### Images not showing?
- Check file paths in Media Library
- Re-upload if necessary
- Update image URLs in blocks

---

## 📞 Need Help?

If you encounter issues:
1. Check WordPress Admin → Tools → Site Health
2. Clear all caches
3. Deactivate plugins one by one to test
4. Check browser console for errors

---

**Your WordPress site should now match the static site design with full Kadence + Gutenberg power!** 🚀
