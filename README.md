# 🧴 Emmanuel.Skin - Pore-Clogging Ingredients Checker

A free, fast, and privacy-focused tool to check if your skincare products contain comedogenic (pore-clogging) ingredients.

## 🌟 Features

- ✅ **Instant Results** - Check ingredients in seconds
- ✅ **Science-Based** - Built on peer-reviewed research (Fulton 1989, Acne.org)
- ✅ **Privacy-First** - Everything runs in your browser, no data sent to servers
- ✅ **Mobile-Friendly** - Works perfectly on all devices
- ✅ **Free Forever** - No ads, no tracking, no cost
- ✅ **45+ Ingredients** - Comprehensive database of comedogenic ingredients

## 🚀 Live Demo

Visit: [emmanuel.skin](https://emmanuel.skin)

## 📁 Project Structure

```
emmanuel-skin/
├── index.html          # Main HTML page
├── style.css           # Styling
├── script.js           # Ingredient checking logic
├── ingredients.json    # Database of comedogenic ingredients
└── README.md          # This file
```

## 🛠️ Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript (No frameworks!)
- **Database**: JSON file (45+ ingredients)
- **Hosting**: Static hosting (Cloudflare Pages, Netlify, Vercel, GitHub Pages)

## 📦 Installation & Development

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/emmanuel-skin.git
   cd emmanuel-skin
   ```

2. **Open locally**
   - Simply open `index.html` in your browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. **View in browser**
   ```
   http://localhost:8000
   ```

## 🌐 Deployment

### Option 1: Cloudflare Pages (Recommended)

1. **Via Dashboard:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Workers & Pages → Create application → Pages → Connect to Git
   - Select your repository
   - Build settings: None (static site)
   - Deploy!

2. **Via Wrangler CLI:**
   ```bash
   npm install -g wrangler
   wrangler pages publish . --project-name=emmanuel-skin
   ```

### Option 2: Netlify

1. **Drag & Drop:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the project folder to the deploy area
   - Done!

2. **Via Git:**
   - Connect your GitHub repository
   - Build settings: None
   - Deploy!

### Option 3: Vercel

```bash
npm i -g vercel
vercel
```

### Option 4: GitHub Pages

1. Push to GitHub
2. Settings → Pages → Source: main branch
3. Your site will be at: `https://yourusername.github.io/emmanuel-skin`

## 📊 Database

The `ingredients.json` file contains:
- **45+ comedogenic ingredients**
- Ratings from 0-5 (based on scientific research)
- Alternate names for better matching
- Categories (oils, emollients, etc.)
- Descriptions

### Adding New Ingredients

Edit `ingredients.json`:

```json
{
  "id": 46,
  "name": "New Ingredient",
  "alternateNames": ["Alternate Name 1", "Alternate Name 2"],
  "rating": 4,
  "category": "Oil",
  "description": "Optional description"
}
```

## 🔍 How It Works

1. User pastes ingredient list
2. JavaScript parses the input
3. Matches against local JSON database
4. Displays flagged ingredients with ratings
5. All processing happens client-side (no server needed!)

## 📈 SEO Features

- ✅ Semantic HTML structure
- ✅ Meta tags optimized
- ✅ Open Graph tags
- ✅ Mobile-responsive
- ✅ Fast loading (no external dependencies)
- ✅ Educational content for ranking

## 🎨 Customization

### Change Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --danger-color: #ef4444;
    --success-color: #10b981;
}
```

### Update Content

All content is in `index.html` - easy to edit without touching code!

## 📚 Data Sources

- Fulton, J. E. (1989). "Comedogenicity and irritancy of commonly used ingredients in skin care products."
- Acne.org Comedogenic Ingredients Research
- Various peer-reviewed dermatology studies (1972-2006)

## 🤝 Contributing

Want to add more ingredients or improve the tool?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project however you like!

## 👤 Author

Created by **Emmanuel**

## 🙏 Acknowledgments

- Dr. James E. Fulton for groundbreaking comedogenicity research
- Acne.org for maintaining comprehensive ingredient databases
- All the skincare scientists who've studied these ingredients

## 💡 Future Ideas

- [ ] Mobile app version
- [ ] Save favorite products
- [ ] Barcode scanner
- [ ] Multi-language support
- [ ] More ingredients (expand to 100+)
- [ ] API for developers

## 📞 Support

Having issues? [Open an issue](https://github.com/yourusername/emmanuel-skin/issues)

---

**Built with ❤️ for people with acne-prone skin**
