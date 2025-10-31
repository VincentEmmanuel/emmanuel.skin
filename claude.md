# Emmanuel.skin - Project Documentation for AI Assistants

## Project Overview

**Emmanuel.skin** is a client-side web application that helps users identify comedogenic (pore-clogging) ingredients in skincare products. It's designed for people with acne-prone skin who want to make informed decisions about their skincare purchases.

- **Live URL**: https://emmanuel.skin
- **Repository**: https://github.com/VincentEmmanuel/emmanuel.skin.git
- **Type**: Single-Page Application (SPA)
- **Purpose**: Free educational tool for skincare ingredient analysis
- **Privacy**: 100% client-side processing, no data sent to servers

## Tech Stack

### Core Technologies
- **HTML5**: Semantic markup, SEO-optimized structure
- **CSS3**: Modern features with CSS custom properties
- **Vanilla JavaScript**: ES6+, async/await, no frameworks
- **JSON**: Database storage for ingredients

### External Dependencies
- **Google Fonts**: Inter font family (weights 300-800)
- **No build tools**: Pure static site, no npm/webpack/bundlers
- **No JavaScript frameworks**: Intentionally framework-free for performance

### Hosting
- Designed for static hosting (Cloudflare Pages, Netlify, Vercel, GitHub Pages)
- No backend required
- CDN-friendly architecture

## Project Structure

```
/home/vincent/projects/emmanuel.skin/
├── index.html              # Main SPA page (205 lines)
├── style.css               # Complete styling (624 lines)
├── script.js               # Core functionality (240 lines)
├── ingredients.json        # Database of 150 ingredients (1097 lines)
├── favicon.svg             # SVG favicon with "E" logo
├── logo/
│   ├── EMMANUEL.png        # Primary logo (white text)
│   └── EMMANUEL-Black.png  # Alternative logo (black text)
├── README.md               # Main project documentation
├── QUICKSTART.md           # Quick deployment guide
├── DEPLOYMENT.md           # Detailed hosting instructions
├── claude.md               # This file - AI assistant guide
└── .gitignore              # Git ignore rules
```

## Key Files

### index.html
**Location**: `/home/vincent/projects/emmanuel.skin/index.html`

Main HTML structure with these sections:
- **Header**: Sticky navigation with logo
- **Hero Section**: Full-height introduction with CTA
- **Checker Section**: Main ingredient analysis tool
- **Educational Content**: SEO-optimized text (600+ words)
- **FAQ Section**: 6 common questions
- **Footer**: Attribution and links

**Important attributes**:
- Canonical URL: `https://emmanuel.skin`
- Meta tags for SEO, Open Graph, Twitter Cards
- Full-height sections (`height: 100vh`)
- Semantic HTML5 structure

### script.js
**Location**: `/home/vincent/projects/emmanuel.skin/script.js`

**Key Functions**:

1. **`loadIngredientsDatabase()`**
   - Fetches `ingredients.json` via fetch API
   - Handles errors gracefully
   - Caches database in memory

2. **`parseIngredients(input)`**
   - Parses user-pasted ingredient lists
   - Handles multiple formats: commas, semicolons, newlines
   - Cleans and trims entries
   - Removes duplicates

3. **`analyzeIngredients(ingredients, database)`**
   - Matches user ingredients against database
   - Checks main names and alternate names
   - Case-insensitive matching
   - Returns categorized results (flagged/safe)

4. **`displayResults(flagged, safe, total)`**
   - Dynamically updates DOM with results
   - Color-codes by rating (0-5)
   - Sorts flagged ingredients by rating (worst first)
   - Shows detailed info per ingredient

5. **`checkIngredients()`**
   - Main entry point
   - Orchestrates parsing → analysis → display
   - Keyboard shortcut: Ctrl+Enter

**Patterns Used**:
- Async/await for data loading
- DOM manipulation with vanilla JS
- Event-driven architecture
- Array methods (map, filter, sort, find)

### style.css
**Location**: `/home/vincent/projects/emmanuel.skin/style.css`

**Design System**:

**Color Palette**:
```css
--color-primary: #000000;      /* Black - primary text/backgrounds */
--color-accent: #D4AF37;       /* Gold - luxury accent */
--color-warning: #C41E3A;      /* Crimson Red - high ratings */
--color-bg: #FFFFFF;           /* White - backgrounds */
--color-text-muted: #666666;   /* Gray - secondary text */
```

**Typography**:
- Font: Inter (Google Fonts)
- Weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
- Hierarchy: h1 (3.5rem) → h2 (2.5rem) → h3 (1.5rem) → p (1.1rem)

**Responsive Breakpoints**:
- Desktop: > 768px
- Mobile: ≤ 768px
- Full-height sections scale to 100vh on desktop

**Rating Color System**:
- Rating 0: Green (#28A745) - Safe
- Rating 1-2: Yellow (#FFC107) - Low risk
- Rating 3: Orange (#FF9800) - Moderate
- Rating 4-5: Red (#C41E3A) - Avoid

**Layout Approach**:
- Full-height sections for modern feel
- Sticky header
- Mobile-first CSS
- Flexbox for alignment
- CSS Grid not currently used

### ingredients.json
**Location**: `/home/vincent/projects/emmanuel.skin/ingredients.json`

**Database Schema**:
```json
{
  "version": "2.0",
  "lastUpdated": "2025-10-30",
  "ingredients": [
    {
      "id": 1,
      "name": "Coconut Oil",
      "alternateNames": ["Cocos Nucifera Oil", "Refined Coconut Oil"],
      "rating": 4,
      "category": "Oil",
      "description": "Highly comedogenic saturated fat. Avoid if acne-prone."
    }
  ]
}
```

**Field Definitions**:
- **id**: Unique integer identifier
- **name**: Common/consumer name (title case)
- **alternateNames**: Array of INCI names, chemical names, variants
- **rating**: Integer 0-5 (0=safe, 5=very comedogenic)
- **category**: Oil, Butter, Wax, Emollient, Surfactant, Fatty Acid, Emulsifier, etc.
- **description**: Brief explanation with usage recommendations

**Current Stats**:
- 150 total ingredients
- Ratings distribution: ~30% rating 4-5, ~20% rating 0
- Scientific sources: Fulton 1989, Acne.org, CosDNA, various studies

## Code Conventions

### JavaScript
- **Style**: ES6+ modern JavaScript
- **No semicolons**: Except where required
- **Naming**: camelCase for functions and variables
- **Async**: Use async/await, not Promise chains
- **DOM Selection**: `document.getElementById()` or `document.querySelector()`
- **Comments**: Explain "why" not "what"

### HTML
- **Semantic**: Use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- **Accessibility**: Include `alt` text, ARIA labels where needed
- **IDs**: kebab-case (e.g., `ingredient-input`, `results-section`)
- **Classes**: BEM-like naming (e.g., `result-item`, `rating-badge`)

### CSS
- **Organization**: Grouped by component (global → header → sections → footer)
- **Custom Properties**: Use CSS variables for theme values
- **Units**: rem for typography, px for borders, % for layout
- **Mobile-First**: Base styles for mobile, `@media` for desktop
- **No preprocessors**: Pure CSS3

## Architecture & Design Patterns

### Client-Side MVC-Like Structure
- **Model**: `ingredients.json` (data)
- **View**: `index.html` + dynamic DOM updates
- **Controller**: `script.js` functions

### Key Design Decisions

1. **No Framework Choice**
   - Reason: Maximum performance, minimal load time
   - Tradeoff: Manual DOM manipulation
   - Benefit: No build step, easy to understand

2. **Client-Side Processing**
   - Reason: Privacy-first, no server costs
   - Tradeoff: Database limited by JSON size
   - Benefit: Works offline after first load

3. **Full-Height Sections**
   - Reason: Modern, app-like feel
   - Tradeoff: More scrolling required
   - Benefit: Clear visual separation, premium aesthetic

4. **Minimalist Design**
   - Reason: Chanel/Sephora luxury aesthetic
   - Inspiration: High-end skincare brands
   - Colors: Black, white, gold accent

## Development Workflow

### Running Locally

**Option 1: Python**
```bash
cd /home/vincent/projects/emmanuel.skin
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Option 2: npx**
```bash
npx http-server -p 8000
```

**Option 3: Direct File**
```bash
# Just open index.html in browser
# (fetch API requires server for ingredients.json)
```

### Making Changes

**To add an ingredient**:
1. Open `ingredients.json`
2. Add new object to `ingredients` array
3. Increment `id` (use next available number)
4. Set appropriate `rating` (0-5)
5. Add `alternateNames` array (INCI names, etc.)
6. Update `lastUpdated` date
7. Test by searching for the ingredient

**To modify styling**:
1. Open `style.css`
2. Modify CSS custom properties for theme changes
3. Edit component styles for layout changes
4. Test on mobile (≤768px) and desktop

**To update checker logic**:
1. Open `script.js`
2. Modify `analyzeIngredients()` for matching logic
3. Modify `displayResults()` for UI changes
4. Test with various ingredient lists

### Deployment

1. **Commit changes** to git
2. **Push to GitHub**
3. **Deploy to host**:
   - Cloudflare Pages: Auto-deploy from GitHub
   - Netlify: Drag-and-drop or GitHub integration
   - Vercel: GitHub integration
   - GitHub Pages: Settings → Pages

See `DEPLOYMENT.md` for detailed instructions.

## Common Tasks for AI Assistants

### Adding New Ingredients
- Always increment ID sequentially
- Research comedogenic rating from scientific sources
- Include all alternate names (INCI, chemical, common)
- Provide helpful description
- Categorize correctly
- Update `lastUpdated` date

### Improving SEO
- Add content to educational sections
- Ensure semantic HTML structure
- Update meta descriptions
- Add schema.org markup (future)
- Improve page speed

### Enhancing Features
- Maintain vanilla JS approach (no frameworks)
- Keep client-side only (no backend)
- Preserve privacy-first design
- Test mobile responsiveness
- Ensure accessibility (WCAG)

### Debugging Issues
- Check browser console for errors
- Verify `ingredients.json` is valid JSON
- Test fetch API (requires server, not file://)
- Check CSS specificity conflicts
- Validate HTML structure

## SEO & Marketing Features

### Current SEO Implementation
- Meta title and description
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URL
- Semantic HTML structure
- 600+ words of educational content
- Mobile-responsive design (Google ranking factor)
- Fast load times (no frameworks)

### Keywords Targeted
- "comedogenic ingredients checker"
- "pore clogging ingredients"
- "acne prone skin care"
- "skincare ingredient analyzer"

## Future Enhancement Ideas

From README.md, potential features to consider:
- Search/filter functionality for ingredient database
- Export results as PDF
- Save favorite products (localStorage)
- Offline PWA support
- Multi-language support
- Ingredient spotlight/education section
- User-submitted product lists (community)

## Testing Strategy

**Current approach**: Manual testing
- Test ingredient parsing with various formats
- Test database matching (main names + alternates)
- Test responsive design on mobile/desktop
- Verify all links work
- Check console for errors

**Recommended testing**:
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile device testing (iOS, Android)
- Accessibility testing (screen readers)
- Performance testing (Lighthouse)

## Git Workflow

- Remote: `https://github.com/VincentEmmanuel/emmanuel.skin.git`
- Branch: `main` (default)
- Commit style: Descriptive messages about changes
- Push before deploying to hosting platforms

## Important Notes for AI Assistants

1. **Maintain Zero Dependencies**: Don't add npm packages or frameworks
2. **Privacy First**: Never add tracking, analytics without explicit request
3. **Client-Side Only**: Don't add server-side code
4. **Mobile Responsive**: Always test changes on mobile breakpoint
5. **Semantic HTML**: Maintain clean, semantic structure
6. **Performance**: Keep load times fast (currently ~50KB total)
7. **Accessibility**: Maintain ARIA labels and alt text
8. **Scientific Accuracy**: Verify comedogenic ratings from reputable sources

## Resources & References

### Scientific Sources for Ratings
- Fulton, J.E., et al. (1989). "Comedogenicity of Current Therapeutic Products"
- Acne.org Comedogenic Database
- CosDNA Ingredient Analysis
- Various dermatology journals (see ingredients.json descriptions)

### Design Inspiration
- Chanel.com (minimalist luxury)
- Sephora.com (clean beauty aesthetic)
- High-end skincare brand websites

### Documentation Files
- `README.md`: Comprehensive project overview
- `QUICKSTART.md`: Fast deployment guide
- `DEPLOYMENT.md`: Detailed hosting instructions

---

**Last Updated**: 2025-10-31
**Project Version**: 2.0 (matches ingredients.json version)
**Maintainer**: Vincent Emmanuel
