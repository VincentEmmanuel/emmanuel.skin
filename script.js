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

// ============================================
// FEEDBACK FORM HANDLING
// ============================================

// Feedback form variables
let formOpenTime = null;
const MIN_SUBMISSION_TIME = 3000; // 3 seconds minimum
const MAX_SUBMISSIONS_PER_DAY = 3;
const WEB3FORMS_KEY = '915fd905-fbbd-4ee0-b53d-c09ffb90d8ac';

// Initialize feedback form
document.addEventListener('DOMContentLoaded', () => {
    initFeedbackForm();
});

function initFeedbackForm() {
    const form = document.getElementById('feedback-form');
    const messageInput = document.getElementById('feedback-message');
    const submitBtn = document.getElementById('feedback-submit');

    // Track when form becomes visible/ready
    formOpenTime = Date.now();

    // Enable submit button when form is valid
    if (form) {
        form.addEventListener('input', validateForm);
        form.addEventListener('submit', handleFeedbackSubmit);
    }

    // Check rate limiting on load
    checkRateLimit();
}

// Validate form and enable/disable submit button
function validateForm() {
    const message = document.getElementById('feedback-message');
    const submitBtn = document.getElementById('feedback-submit');
    const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]');

    const isValid =
        message.value.length >= 10 &&
        turnstileResponse && turnstileResponse.value !== '';

    if (submitBtn) {
        submitBtn.disabled = !isValid;
    }
}

// Check rate limiting
function checkRateLimit() {
    const submissions = getSubmissionsToday();

    if (submissions >= MAX_SUBMISSIONS_PER_DAY) {
        const submitBtn = document.getElementById('feedback-submit');
        const errorDiv = document.getElementById('feedback-error');
        const errorText = document.getElementById('error-text');

        if (submitBtn) submitBtn.disabled = true;
        if (errorDiv && errorText) {
            errorText.textContent = `You've reached the maximum of ${MAX_SUBMISSIONS_PER_DAY} submissions per day. Please try again tomorrow.`;
            errorDiv.style.display = 'block';
        }

        return false;
    }

    return true;
}

// Get submissions count for today
function getSubmissionsToday() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('feedbackSubmissions');

    if (!stored) return 0;

    try {
        const data = JSON.parse(stored);
        if (data.date === today) {
            return data.count;
        }
    } catch (e) {
        console.error('Error reading localStorage:', e);
    }

    return 0;
}

// Increment submissions count
function incrementSubmissions() {
    const today = new Date().toDateString();
    const count = getSubmissionsToday() + 1;

    localStorage.setItem('feedbackSubmissions', JSON.stringify({
        date: today,
        count: count
    }));
}

// Handle form submission
async function handleFeedbackSubmit(e) {
    e.preventDefault();

    // Check rate limiting
    if (!checkRateLimit()) {
        return;
    }

    // Honeypot check
    const honeypot = document.querySelector('input[name="website"]');
    if (honeypot && honeypot.value !== '') {
        console.log('🤖 Bot detected via honeypot');
        showFeedbackError('Invalid submission detected.');
        return;
    }

    // Time-based check
    const timeSinceOpen = Date.now() - formOpenTime;
    if (timeSinceOpen < MIN_SUBMISSION_TIME) {
        showFeedbackError('Please take a moment to review your feedback before submitting.');
        return;
    }

    // Get form data
    const form = e.target;
    const formData = new FormData(form);

    // Add Web3Forms access key
    formData.append('access_key', WEB3FORMS_KEY);

    // Add additional metadata
    formData.append('subject', 'Emmanuel.Skin Feedback');
    formData.append('from_name', 'Emmanuel.Skin Feedback Form');

    // Get Turnstile token
    const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]');
    if (!turnstileResponse || !turnstileResponse.value) {
        showFeedbackError('Please complete the verification challenge.');
        return;
    }

    // Disable submit button
    const submitBtn = document.getElementById('feedback-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Hide previous messages
    document.getElementById('feedback-success').style.display = 'none';
    document.getElementById('feedback-error').style.display = 'none';

    try {
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showFeedbackSuccess();
            incrementSubmissions();
            form.reset();
            formOpenTime = Date.now(); // Reset timer

            // Reset Turnstile
            if (window.turnstile) {
                window.turnstile.reset();
            }
        } else {
            showFeedbackError(result.message || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Submission error:', error);
        showFeedbackError('Network error. Please check your connection and try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Show success message
function showFeedbackSuccess() {
    const successDiv = document.getElementById('feedback-success');
    const errorDiv = document.getElementById('feedback-error');

    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

// Show error message
function showFeedbackError(message) {
    const errorDiv = document.getElementById('feedback-error');
    const errorText = document.getElementById('error-text');
    const successDiv = document.getElementById('feedback-success');

    if (successDiv) successDiv.style.display = 'none';
    if (errorDiv && errorText) {
        errorText.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Turnstile callback (called when verification completes)
window.onTurnstileSuccess = function() {
    validateForm();
};

console.log('✅ Feedback form initialized');
