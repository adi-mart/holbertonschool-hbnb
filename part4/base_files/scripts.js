
/**
 * HBnB Frontend - Client JavaScript
 * Handles authentication, places display, reviews and API calls
 */

// CONFIGURATION
const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';

// INITIALISATION DOM
document.addEventListener('DOMContentLoaded', async () => {
    checkAuthentication();
    
    // Index page - Places list
    if (document.getElementById('places-list')) {
        const places = await fetchPlaces();
        window.allPlaces = places; // Stocker pour le filtrage
        displayPlaces(places);
        
        // Ajouter le filtre de prix
        const priceFilter = document.getElementById('price-filter');
        if (priceFilter) {
            priceFilter.innerHTML = `
                <option value="All">All</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
            `;
            
            priceFilter.addEventListener('change', (event) => {
                const selectedPrice = event.target.value;
                let filteredPlaces;
                
                if (selectedPrice === "All" || selectedPrice === "") {
                    filteredPlaces = window.allPlaces;
                } else {
                    filteredPlaces = window.allPlaces.filter(place => 
                        Number(place.price) <= Number(selectedPrice)
                    );
                }
                displayPlaces(filteredPlaces);
            });
        }
    }
    
    // Place details page
    if (document.getElementById('place-details') && !document.getElementById('review-form')) {
        const placeId = getPlaceIdFromURL();
        if (placeId) {
            await fetchPlaceDetails(placeId);
            await fetchReviews(placeId);
        }
    }
    
    // Add review page
    if (document.getElementById('review-form')) {
        const placeId = getPlaceIdFromURL();
        if (placeId) {
            await fetchPlaceDetails(placeId);
            await fetchReviews(placeId);
        }
        
        document.getElementById('review-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const rating = document.getElementById('rating').value;
            const text = document.getElementById('review').value;
            
            if (!rating || !text.trim()) {
                alert('Please fill all fields');
                return;
            }
            
            const result = await submitReview(placeId, { rating, text });
            if (result && !result.error) {
                alert('Review submitted successfully!');
                window.location.href = `place.html?place_id=${placeId}`;
            } else if (result && result.error) {
                // Message d'erreur spécifique pour les commentaires sur sa propre place
                if (result.error.includes('cannot review your own place')) {
                    alert('❌ Erreur: Vous ne pouvez pas commenter votre propre lieu!\n\nVous ne pouvez laisser des avis que sur les lieux des autres utilisateurs.');
                } else {
                    alert('Erreur lors de l\'ajout du commentaire: ' + result.error);
                }
            }
        });
    }
    
    // Login page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email')?.value || document.getElementById('username')?.value;
            const password = document.getElementById('password').value;
            await loginUser(email, password);
        });
    }
});

// AUTHENTIFICATION
// Check user authentication status and update UI accordingly
function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');
    const btnContainer = document.getElementById('add-review-button-container');
    const reviewForm = document.getElementById('review-form');
    const path = window.location.pathname;
    
    if (token && loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.onclick = () => {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = 'login.html';
        };
        if (btnContainer) btnContainer.style.display = 'none';
        if (reviewForm) reviewForm.style.display = 'block';
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (btnContainer) btnContainer.style.display = 'block';
        if (reviewForm) reviewForm.style.display = 'none';

        if (path.includes('add_review.html')) {
            alert('You must be logged in to access this page.');
            window.location.href = 'index.html';
            return;
        }
    }
    
    return token;
}

// Authenticate user with email/password
async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const result = await handleApiResponse(response);
    
    if (result.error) {
        alert('Login failed: ' + result.error);
    } else {
        document.cookie = `token=${result.access_token}; path=/`;
        alert('Login successful!');
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || 'index.html';
        sessionStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    }
}

// API CALLS
// Fetch all places from API
async function fetchPlaces() {
    const token = getCookie('token');
    const headers = { 'Content-Type': 'application/json' };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/places/`, {
        method: 'GET',
        headers: headers
    });
    
    const result = await handleApiResponse(response);
    return result.error ? [] : result;
}

// Get detailed info for a specific place
async function fetchPlaceDetails(placeId) {
    const token = getCookie('token');
    const headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/places/${placeId}`, {
        method: 'GET',
        headers: headers
    });
    
    const result = await handleApiResponse(response);

    if (!result.error) {
        displayPlaceDetails(result);
        await checkReviewButton(result);
    }
}

// Fetch reviews for a specific place
async function fetchReviews(placeId) {
    const response = await fetch(`${API_BASE_URL}/places/${placeId}/reviews`);
    const result = await handleApiResponse(response);
    
    if (!result.error) {
        displayReviews(result);
    }
}

// Submit new review for a place (authenticated only)
async function submitReview(placeId, reviewData) {
    const token = getCookie('token');
    if (!token) {
        alert('You must be logged in');
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch(`${API_BASE_URL}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            place_id: placeId,
            rating: Number(reviewData.rating),
            text: reviewData.text
        })
    });

    return await handleApiResponse(response);
}

// DISPLAY FUNCTIONS
// Render places list on index page
function displayPlaces(places) {
    const container = document.getElementById('places-list');
    if (!container) return;

    container.innerHTML = '';

    if (!places || places.length === 0) {
        container.innerHTML = '<p>No places available</p>';
        return;
    }

    places.forEach(place => {
        const div = document.createElement('div');
        div.className = 'place-card';
        
        // Ajouter l'image si disponible
        const imageHtml = place.image_url ? 
            `<img src="${place.image_url}" alt="${place.title || place.name}" class="place-image">` : '';
        
        div.innerHTML = `
            ${imageHtml}
            <h3>${place.title || place.name}</h3>
            <p>Price per night: ${place.price}€</p>
            <p>${place.description || ''}</p>
            <button class="details-button" onclick="window.location.href='place.html?place_id=${place.id}'">View Details</button>
        `;
        container.appendChild(div);
    });
}

// Display detailed place info on place page
function displayPlaceDetails(place) {
    const container = document.querySelector('.place-info');
    if (!container) return;
    const ownerName = place.owner ? `${place.owner.first_name} ${place.owner.last_name}` : 'Unknown Host';

    // Mettre à jour le titre principal
    const placeTitle = document.getElementById('place-title');
    if (placeTitle) {
        placeTitle.textContent = place.title || place.name;
    }

    // Gérer l'image en dehors de .place-info pour respecter les paramètres obligatoires
    const placeDetails = document.querySelector('.place-details');
    if (placeDetails) {
        // Supprimer l'ancienne image si elle existe
        const existingImage = placeDetails.querySelector('.place-detail-image');
        if (existingImage) {
            existingImage.remove();
        }
        
        // Ajouter la nouvelle image si elle existe
        if (place.image_url) {
            const imageElement = document.createElement('img');
            imageElement.src = place.image_url;
            imageElement.alt = place.title || place.name;
            imageElement.className = 'place-detail-image';
            placeDetails.insertBefore(imageElement, container);
        }
    }

    container.innerHTML = `
        <p><strong>Host:</strong> ${ownerName}</p>
        <p><strong>Price:</strong> ${place.price}€/night</p>
        <p><strong>Description:</strong> ${place.description || 'No description'}</p>
        <p><strong>Amenities:</strong> ${place.amenities?.map(a => a.name).join(', ') || 'None'}</p>
    `;
}

// Render reviews list for a place
function displayReviews(reviews) {
    const container = document.getElementById('reviews');
    if (!container) return;
    
    const title = container.querySelector('h2');
    container.innerHTML = '';
    if (title) container.appendChild(title);
    
    if (!reviews?.length) {
        container.innerHTML += '<p>No reviews yet.</p>';
        return;
    }
    
    reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'review-card';
        const userName = review.user_name;
        div.innerHTML = `
            <p><strong>${userName}:</strong></p>
            <p>${review.text}</p>
            <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
        `;
        container.appendChild(div);
    });
}

// Check if user can review this place (not their own)
async function checkReviewButton(place) {
    const btn = document.getElementById('add-review-btn');
    if (!btn) return;
    
    const userId = await getCurrentUserId();
    if (!userId) {
        btn.textContent = 'Login to Add Review';
        btn.onclick = () => {
            sessionStorage.setItem('redirectAfterLogin', window.location.href);
            window.location.href = 'login.html';
        };
    } else if (place.owner_id === userId) {
        const container = document.getElementById('add-review-button-container');
        if (container) {
            container.style.display = 'none';
        }
    }
}

async function getCurrentUserId() {
    const token = getCookie('token');
    if (!token) return null;
    
    try {
        const response = await fetch(`${API_BASE_URL}/protected/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            const match = data.message.match(/Hello, user (.+)/);
            return match ? match[1] : null;
        }
    } catch (error) {
        console.error('Token validation failed:', error);
    }
    return null;
}

// UTILITIES
// Handle API response and errors uniformly
async function handleApiResponse(response) {
    if (response.ok) {
        return await response.json();
    } else {
        const errorData = await response.json();
        return { error: errorData.error || `HTTP ${response.status}` };
    }
}

// Get cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function getPlaceIdFromURL() {
    return new URLSearchParams(window.location.search).get('place_id');
}

function redirectToAddReview() {
    const placeId = getPlaceIdFromURL();
    if (placeId) {
        window.location.href = `add_review.html?place_id=${placeId}`;
    }
}
