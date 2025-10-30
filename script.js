// Global variables
let ingredientsDB = [];

// Load ingredients database when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadIngredientsDatabase();
    setupEventListeners();
});

// Load ingredients from JSON file
async function loadIngredientsDatabase() {
    try {
        const response = await fetch('ingredients.json');
        const data = await response.json();
        ingredientsDB = data.ingredients;
        console.log(`✅ Loaded ${ingredientsDB.length} ingredients from database`);
    } catch (error) {
        console.error('❌ Error loading ingredients database:', error);
        alert('Error loading ingredients database. Please refresh the page.');
    }
}

// Setup event listeners
function setupEventListeners() {
    const checkBtn = document.getElementById('check-btn');
    const clearBtn = document.getElementById('clear-btn');
    const textarea = document.getElementById('ingredients-input');

    checkBtn.addEventListener('click', checkIngredients);
    clearBtn.addEventListener('click', clearInput);
    
    // Allow Enter key to trigger check (Ctrl+Enter in textarea)
    textarea.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            checkIngredients();
        }
    });
}

// Main function to check ingredients
function checkIngredients() {
    const input = document.getElementById('ingredients-input').value.trim();
    
    if (!input) {
        alert('Please paste some ingredients first!');
        return;
    }

    if (ingredientsDB.length === 0) {
        alert('Database still loading, please wait a moment...');
        return;
    }

    // Parse user input
    const userIngredients = parseIngredients(input);
    
    if (userIngredients.length === 0) {
        alert('No valid ingredients found. Please check your input.');
        return;
    }

    // Check against database
    const results = analyzeIngredients(userIngredients);
    
    // Display results
    displayResults(results);
}

// Parse ingredients from user input
function parseIngredients(input) {
    // Split by comma, semicolon, or newline
    const ingredients = input
        .split(/[,;\n]/)
        .map(ing => ing.trim())
        .filter(ing => ing.length > 2) // Filter out very short strings
        .map(ing => {
            // Remove parentheses content for cleaner matching
            return ing.replace(/\([^)]*\)/g, '').trim();
        });
    
    return ingredients;
}

// Analyze ingredients against database
function analyzeIngredients(userIngredients) {
    const flagged = [];
    const checked = new Set();
    
    userIngredients.forEach(userIng => {
        const lowerUserIng = userIng.toLowerCase();
        
        ingredientsDB.forEach(dbIng => {
            // Skip if already flagged
            if (checked.has(dbIng.id)) return;
            
            // Check main name
            const matchesName = lowerUserIng.includes(dbIng.name.toLowerCase()) ||
                               dbIng.name.toLowerCase().includes(lowerUserIng);
            
            // Check alternate names
            const matchesAlt = dbIng.alternateNames && dbIng.alternateNames.some(alt => 
                lowerUserIng.includes(alt.toLowerCase()) || 
                alt.toLowerCase().includes(lowerUserIng)
            );
            
            if (matchesName || matchesAlt) {
                flagged.push({
                    ...dbIng,
                    matchedIn: userIng
                });
                checked.add(dbIng.id);
            }
        });
    });
    
    // Sort by rating (worst first)
    flagged.sort((a, b) => b.rating - a.rating);
    
    return {
        totalChecked: userIngredients.length,
        flaggedCount: flagged.length,
        safeCount: userIngredients.length - flagged.length,
        flaggedIngredients: flagged
    };
}

// Display results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    const totalCheckedEl = document.getElementById('total-checked');
    const flaggedCountEl = document.getElementById('flagged-count');
    const safeCountEl = document.getElementById('safe-count');
    const flaggedListEl = document.getElementById('flagged-ingredients');
    
    // Update summary stats
    totalCheckedEl.textContent = results.totalChecked;
    flaggedCountEl.textContent = results.flaggedCount;
    safeCountEl.textContent = results.safeCount;
    
    // Clear previous results
    flaggedListEl.innerHTML = '';
    
    // Show results container
    resultsContainer.style.display = 'block';
    
    // Display flagged ingredients
    if (results.flaggedCount === 0) {
        flaggedListEl.innerHTML = `
            <div class="no-flagged">
                <h3>🎉 Great News!</h3>
                <p>No highly comedogenic ingredients detected in your product!</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">This doesn't guarantee the product won't cause breakouts, but it's a good sign.</p>
            </div>
        `;
    } else {
        const title = document.createElement('h3');
        title.textContent = '⚠️ Pore-Clogging Ingredients Found:';
        title.style.marginBottom = '15px';
        title.style.color = '#ef4444';
        flaggedListEl.appendChild(title);
        
        results.flaggedIngredients.forEach(ing => {
            const item = createFlaggedItem(ing);
            flaggedListEl.appendChild(item);
        });
    }
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Create a flagged ingredient item
function createFlaggedItem(ingredient) {
    const div = document.createElement('div');
    div.className = 'flagged-item';
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'ingredient-name';
    nameDiv.textContent = ingredient.name;
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'ingredient-details';
    
    // Category
    if (ingredient.category) {
        const categorySpan = document.createElement('span');
        categorySpan.className = 'ingredient-category';
        categorySpan.textContent = ingredient.category;
        detailsDiv.appendChild(categorySpan);
    }
    
    // Rating badge
    const ratingBadge = document.createElement('span');
    ratingBadge.className = 'rating-badge';
    
    if (ingredient.rating === 0) {
        ratingBadge.classList.add('rating-0');
    } else if (ingredient.rating <= 2) {
        ratingBadge.classList.add('rating-1');
    } else if (ingredient.rating === 3) {
        ratingBadge.classList.add('rating-3');
    } else {
        ratingBadge.classList.add('rating-4');
    }
    
    ratingBadge.textContent = `${ingredient.rating}/5`;
    detailsDiv.appendChild(ratingBadge);
    
    div.appendChild(nameDiv);
    div.appendChild(detailsDiv);
    
    // Add description if available
    if (ingredient.description) {
        const descDiv = document.createElement('div');
        descDiv.style.fontSize = '0.9rem';
        descDiv.style.color = '#6b7280';
        descDiv.style.marginTop = '8px';
        descDiv.style.width = '100%';
        descDiv.textContent = ingredient.description;
        div.appendChild(descDiv);
    }
    
    return div;
}

// Clear input and results
function clearInput() {
    document.getElementById('ingredients-input').value = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('ingredients-input').focus();
}

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Log when script is loaded
console.log('✅ Emmanuel.Skin Ingredient Checker loaded successfully');
