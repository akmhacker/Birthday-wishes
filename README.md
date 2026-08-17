# 💖 Happy Birthday Sonam - Surprise Website

A beautiful, interactive multi-page birthday surprise website made just for **Sonam**.

### Features (Upgraded Version)
- Soft animated pastel gradients
- Custom heart cursor
- Typewriter greeting
- Floating hearts, stars & confetti
- "Reasons why you're amazing" reveal page
- Memories / photo-style cards page
- Smooth GSAP animations
- Fully responsive (mobile + desktop)
- Optional background music

---

## 🚀 How to Use

### Option 1: Open Locally (easiest)
1. Download the entire `sonam-surprise` folder
2. Double-click `index.html`
3. That’s it! The website will open in your browser.

### Option 2: Host Online (Free with GitHub Pages)
1. Create a new GitHub repository
2. Upload all the files from this folder
3. Go to **Settings → Pages → Source → Deploy from main branch**
4. Your site will be live at:  
   `https://your-username.github.io/repo-name/`

---

## ✏️ Easy Customization

### Change Messages
Open `reasons.js` and edit the `reasons` array:

```js
const reasons = [
    {
        text: "Your custom message here 💖",
        emoji: "🌟"
    },
    // add more...
];
```

### Change Name Everywhere
- `index.html` → title and heading
- `reasons.html` → heading
- `memories.html` → final message

### Add Real Photos
In `memories.html`, replace the emoji placeholders:

```html
<div class="memory-img">
    <img src="your-photo.jpg" alt="Memory" style="width:100%; height:100%; object-fit:cover;">
</div>
```

Just put your images in the same folder and update the `src`.

### Change Background Music
In `index.html`, replace the `<source>` URL with any direct MP3 link (or host your own file).

---

Made with ❤️ as a surprise gift for Sonam.
