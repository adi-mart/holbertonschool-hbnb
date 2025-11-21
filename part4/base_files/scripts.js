/*
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

// Configuration de l'URL de l'API
const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';

// Fonction pour vérifier si l'utilisateur est connecté
function checkAuthentication() {
    const token = localStorage.getItem('token');
    const loginLink = document.getElementById('login-link');

    if (token && loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', logout);
    }
    return token;
}

// Fonction de déconnexion
function logout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Récupérer l'ID du lieu depuis l'URL
function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('place_id');
}

// Fonction pour récupérer les détails d'un lieu
async function fetchPlaceDetails(placeId) {
    try {
        const response = await fetch(`${API_BASE_URL}/places/${placeId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch place details');
        }
        const place = await response.json();
        displayPlaceDetails(place);
    } catch (error) {
        console.error('Error fetching place details:', error);
        alert('Error loading place details');
    }
}

// Fonction pour afficher les détails d'un lieu
function displayPlaceDetails(place) {
    const placeDetails = document.querySelector('.place-info');
    if (placeDetails) {
        placeDetails.innerHTML = `
            <h2>${place.title || place.name}</h2>
            <p><strong>Host:</strong> ${place.host?.first_name || 'Unknown'} ${place.host?.last_name || ''}</p>
            <p><strong>Price per night:</strong> ${place.price}€</p>
            <p><strong>Description:</strong> ${place.description || 'No description available'}</p>
            <p><strong>Amenities:</strong> ${place.amenities?.map(a => a.name).join(', ') || 'None'}</p>
        `;
    }
}

// Fonction pour récupérer les avis d'un lieu
async function fetchPlaceReviews(placeId) {
    try {
        const response = await fetch(`${API_BASE_URL}/places/${placeId}/reviews`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

// Fonction pour afficher les avis
function displayReviews(reviews) {
    const reviewsSection = document.getElementById('reviews');
    if (!reviewsSection) return;

    // Garder le titre et supprimer les anciennes cartes
    const title = reviewsSection.querySelector('h2');
    reviewsSection.innerHTML = '';
    if (title) {
        reviewsSection.appendChild(title);
    }

    if (!reviews || reviews.length === 0) {
        reviewsSection.innerHTML += '<p>No reviews yet. Be the first to review!</p>';
        return;
    }

    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <p><strong>${review.user?.first_name || 'Anonymous'}:</strong></p>
            <p>${review.text || review.comment}</p>
            <p>Rating: ${review.rating}/5</p>
        `;
        reviewsSection.appendChild(reviewCard);
    });
}

// Fonction pour soumettre un nouvel avis
async function submitReview(placeId, reviewData) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in to submit a review');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                place_id: placeId,
                rating: parseInt(reviewData.rating),
                text: reviewData.text
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit review');
        }

        const newReview = await response.json();
        alert('Review submitted successfully!');

        // Recharger les avis
        await fetchPlaceReviews(placeId);

        return newReview;
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Error submitting review: ' + error.message);
        throw error;
    }
}

// Fonction pour gérer la connexion
async function handleLogin(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access_token);

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Fonction pour récupérer tous les lieux (pour la page index)
async function fetchAllPlaces() {
    try {
        const response = await fetch(`${API_BASE_URL}/places`);
        if (!response.ok) {
            throw new Error('Failed to fetch places');
        }
        const places = await response.json();
        return places;
    } catch (error) {
        console.error('Error fetching places:', error);
        return [];
    }
}

// Fonction pour afficher tous les lieux (pour la page index)
function displayPlaces(places) {
    const placesContainer = document.getElementById('places-list');
    if (!placesContainer) return;

    placesContainer.innerHTML = '';

    if (!places || places.length === 0) {
        placesContainer.innerHTML = '<p>No places available</p>';
        return;
    }

    places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-card';
        placeCard.innerHTML = `
            <h3>${place.title || place.name}</h3>
            <p>Price: ${place.price}€/night</p>
            <p>${place.description?.substring(0, 100) || ''}...</p>
            <a href="place.html?place_id=${place.id}">View Details</a>
        `;
        placesContainer.appendChild(placeCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Vérifier l'authentification sur toutes les pages
    checkAuthentication();

    // Page place.html - Détails du lieu et avis
    if (document.getElementById('place-details')) {
        const placeId = getPlaceIdFromURL();

        if (placeId) {
            fetchPlaceDetails(placeId);
            fetchPlaceReviews(placeId);
        } else {
            console.warn('No place ID found in URL');
        }

        // Gérer la soumission du formulaire d'avis
        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const rating = document.getElementById('rating').value;
                const reviewText = document.getElementById('review').value;

                if (!rating) {
                    alert('Please select a rating');
                    return;
                }

                if (placeId) {
                    try {
                        await submitReview(placeId, {
                            rating: rating,
                            text: reviewText
                        });

                        // Réinitialiser le formulaire
                        reviewForm.reset();
                    } catch (error) {
                        // L'erreur est déjà gérée dans submitReview
                    }
                }
            });
        }
    }

    // Page login.html - Gestion de la connexion
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('email')?.value || document.getElementById('username')?.value;
            const password = document.getElementById('password').value;

            try {
                await handleLogin(email, password);
                alert('Login successful!');
                window.location.href = 'index.html';
            } catch (error) {
                alert('Login failed: ' + error.message);
            }
        });
    }

    // Page index.html - Liste des lieux
    if (document.getElementById('places-list')) {
        fetchAllPlaces().then(places => {
            displayPlaces(places);
        });
    }
});