# Beach Hydrovac WordPress Automated Setup

This script will automatically create all 7 pages (Home, Services, About, Contact + 3 blog posts) on your WordPress site.

## 📋 Prerequisites

1. **WordPress Admin Access** to https://silver-raccoon-464412.hostingersite.com/wp-admin
2. **Application Password** (we'll create this below)

---

## 🔑 Step 1: Get WordPress Credentials

### 1.1 Log into WordPress
Go to: https://silver-raccoon-464412.hostingersite.com/wp-admin

### 1.2 Create Application Password

1. Go to: **Users → Profile** (or click your name in top right)
2. Scroll down to **"Application Passwords"** section
3. Under "New Application Password Name", enter: `Beach Hydrovac Pages Script`
4. Click **"Add New Application Password"**
5. **IMPORTANT:** Copy the generated password immediately (it looks like: `xxxx xxxx xxxx xxxx xxxx xxxx`)
6. Save this password - you won't be able to see it again!

### 1.3 Note Your Username

Your WordPress username is the one you use to log into wp-admin (usually your email or a custom username).

---

## 🔧 Step 2: Configure Environment Variables

1. **In the `beachhydrovac-website` folder**, create a file named `.env`

2. **Add these lines** (replace with your actual credentials):

```env
BEACH_HYDROVAC_WP_USER=your_username_here
BEACH_HYDROVAC_WP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

**Example:**
```env
BEACH_HYDROVAC_WP_USER=admin
BEACH_HYDROVAC_WP_PASSWORD=AbCd EfGh IjKl MnOp QrSt UvWx
```

3. **Save the file**

---

## 🚀 Step 3: Run the Script

Open terminal in the `beachhydrovac-website` folder and run:

```bash
# Install dependencies (first time only)
npm install

# Run the page creator script
npm run create-pages
```

---

## ✅ What the Script Does

The script will automatically:

1. ✅ Create **Homepage** with hero section, services, capabilities
2. ✅ Create **Services Page** with detailed service breakdown
3. ✅ Create **About Page** with company story and AIM partnership
4. ✅ Create **Contact Page** with contact info (you'll add form later)
5. ✅ Create **3 Blog Posts**:
   - "What is Hydro Excavation? A Complete Guide"
   - "Understanding SUE Level A Verification and Why It Matters"
   - "Cold Weather Excavation: Why Hydro Excavation Works When Others Can't"
6. ✅ Set the homepage as your site's front page

---

## 📝 What You'll Need to Do After

### 1. Upload Hero Images
Each page has a placeholder `YOUR_HERO_IMAGE_URL` that needs replacing:

1. Go to: **Media → Add New**
2. Upload your hero image (truck on beach photo)
3. Click the image and copy the **File URL**
4. Go to each page and replace the placeholder URL

### 2. Add Featured Images to Blog Posts
1. Go to: **Posts → All Posts**
2. Edit each post
3. Click **"Set featured image"** in the right sidebar
4. Upload or select an image
5. Update the post

### 3. Create Navigation Menu
1. Go to: **Appearance → Menus**
2. Create new menu: `Primary Menu`
3. Add pages: Home, Services, About, Blog, Contact
4. Assign to: **Primary Navigation**
5. Save

### 4. Install Contact Form Plugin
For the Contact page:
1. Go to: **Plugins → Add New**
2. Search for: **Contact Form 7** or **WPForms**
3. Install and activate
4. Create a form with: Name, Email, Phone, Service Type, Message
5. Copy the shortcode
6. Edit the Contact page and replace the placeholder with your form shortcode

### 5. Customize Footer
1. Go to: **Appearance → Customize → Footer**
2. Add your contact information
3. Add AIM partnership mention
4. Publish changes

---

## 🎨 Styling Notes

All pages use the **Kadence child theme** brand colors:
- **Deep Atlantic**: #00416A (dark blue)
- **Safety Cyan**: #27AEFD (bright blue)
- **Warm Shoreline**: #D4A373 (tan/gold)

These colors are already configured in your child theme!

---

## ❓ Troubleshooting

### "Missing credentials" error
- Make sure your `.env` file is in the `beachhydrovac-website` folder
- Check that you named the variables exactly: `BEACH_HYDROVAC_WP_USER` and `BEACH_HYDROVAC_WP_PASSWORD`
- Don't add quotes around the values

### "401 Unauthorized" error
- Your application password might be incorrect
- Try creating a new application password
- Make sure you're using the **application password**, not your regular WordPress password

### "404 Not Found" error
- Make sure your WordPress site URL is correct in the script
- Check that WordPress REST API is enabled (it should be by default)

### Pages created but content looks wrong
- The script uses Gutenberg blocks
- Make sure you're viewing the page in **Visual Editor** mode, not Code Editor
- If blocks don't display correctly, you may need to manually adjust them in the WordPress editor

---

## 🔒 Security Notes

- The `.env` file is git-ignored and won't be committed to your repository
- Application passwords can be revoked anytime from your WordPress profile
- Only use application passwords, never hardcode your main WordPress password

---

## 📞 Need Help?

If you encounter issues:
1. Check the console output for detailed error messages
2. Verify your WordPress credentials are correct
3. Make sure the Kadence child theme is installed and active
4. Check that your hosting provider hasn't disabled WordPress REST API

---

**Ready? Let's create your WordPress site!** 🚀
