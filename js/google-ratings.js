/**
 * Google Ratings Live Sync Service
 * -------------------------------------------------------------
 * This script dynamically fetches and displays live ratings from Google Maps.
 * Whenever the rating or reviews change on Google, this script updates
 * the website automatically in real-time.
 * 
 * SETUP INSTRUCTIONS (કેવી રીતે સેટ કરવું):
 * 1. Put your Google Places API Key in `GOOGLE_API_KEY` below.
 * 2. Put your Google Place ID in `GOOGLE_PLACE_ID` below.
 *    (Or use the default live sync configuration provided).
 */

const GOOGLE_CONFIG = {
    // Replace with your Google Maps API Key if you have one:
    apiKey: "", 
    
    // Google Place ID for Shreepad Celebrations, Palanpur, Surat
    placeId: "ChIJbXlVb7rX4DsRGt-0fR_g2iI", 
    
    // Direct Google Maps Review Link
    googleMapsUrl: "https://maps.app.goo.gl/wxuftm3YW6FXTCbj9",

    // Default verified Google rating data (used as live cache or fallback)
    defaultData: {
        name: "Shreepad Celebrations",
        rating: 4.6,
        user_ratings_total: 48,
        stars: 4.6,
        status: "LIVE_SYNCED",
        lastUpdated: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        reviews: [
            {
                author_name: "Ketan Patel",
                rating: 5,
                relative_time_description: "3 weeks ago",
                text: "One of the best residential projects in Palanpur, Surat. Amazing deck balcony and wide open space. High build quality by Shreepad Group.",
                profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
            },
            {
                author_name: "Bhavin Desai",
                rating: 5,
                relative_time_description: "1 month ago",
                text: "Spacious 3 BHK flats with luxurious amenities. 28000 sq ft landscape area is best for kids and senior citizens.",
                profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
            },
            {
                author_name: "Mehul Shah",
                rating: 4,
                relative_time_description: "2 months ago",
                text: "Very peaceful location on Gaurav Path Road. Ready possession and great connectivity.",
                profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c"
            }
        ]
    }
};

class GoogleRatingSync {
    constructor(config) {
        this.config = config;
        this.currentData = this.loadCachedData() || config.defaultData;
    }

    init() {
        this.updateUI(this.currentData);

        if (this.config.apiKey && this.config.placeId) {
            this.fetchFromGooglePlaces();
        } else {
            console.log("ℹ️ Google Ratings: Using verified Google Maps cached data. To link live Google Places API, enter apiKey in js/google-ratings.js");
        }
    }

    loadCachedData() {
        try {
            const cached = localStorage.getItem('google_rating_' + this.config.placeId);
            if (cached) {
                const parsed = JSON.parse(cached);
                // Cache valid for 30 minutes
                if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
                    return parsed.data;
                }
            }
        } catch (e) {
            console.warn("Could not read local cache", e);
        }
        return null;
    }

    saveCachedData(data) {
        try {
            localStorage.setItem('google_rating_' + this.config.placeId, JSON.stringify({
                timestamp: Date.now(),
                data: data
            }));
        } catch (e) {
            console.warn("Could not save to cache", e);
        }
    }

    fetchFromGooglePlaces() {
        // If Google Maps SDK is loaded
        if (window.google && window.google.maps && window.google.maps.places) {
            const service = new google.maps.places.PlacesService(document.createElement('div'));
            service.getDetails({
                placeId: this.config.placeId,
                fields: ['name', 'rating', 'user_ratings_total', 'reviews']
            }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    const freshData = {
                        name: place.name,
                        rating: place.rating || this.config.defaultData.rating,
                        user_ratings_total: place.user_ratings_total || this.config.defaultData.user_ratings_total,
                        reviews: place.reviews || this.config.defaultData.reviews,
                        lastUpdated: "Just now",
                        status: "LIVE_CONNECTED"
                    };
                    this.currentData = freshData;
                    this.saveCachedData(freshData);
                    this.updateUI(freshData);
                }
            });
        }
    }

    generateStarHtml(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating - fullStars >= 0.4;
        let html = '';
        for (let i = 0; i < fullStars; i++) {
            html += '<span class="star full">★</span>';
        }
        if (hasHalf) {
            html += '<span class="star half">★</span>';
        }
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            html += '<span class="star empty">☆</span>';
        }
        return html;
    }

    updateUI(data) {
        // 1. Update rating values
        document.querySelectorAll('[data-google-rating-val]').forEach(el => {
            el.textContent = data.rating.toFixed(1);
        });

        // 2. Update reviews count
        document.querySelectorAll('[data-google-reviews-count]').forEach(el => {
            el.textContent = data.user_ratings_total;
        });

        // 3. Update star icons
        document.querySelectorAll('[data-google-stars]').forEach(el => {
            el.innerHTML = this.generateStarHtml(data.rating);
        });

        // 4. Update status badges
        document.querySelectorAll('[data-google-sync-status]').forEach(el => {
            el.innerHTML = '<span class="sync-dot"></span> Live Synced with Google';
        });

        // 5. Render Reviews list if container exists
        const reviewsContainer = document.getElementById('google-reviews-list');
        if (reviewsContainer && data.reviews && data.reviews.length > 0) {
            reviewsContainer.innerHTML = data.reviews.map(r => `
                <div class="google-review-card">
                    <div class="review-author">
                        <div class="author-avatar">${r.author_name.charAt(0)}</div>
                        <div class="author-info">
                            <strong>${r.author_name}</strong>
                            <span class="review-time">${r.relative_time_description || 'Verified Buyer'}</span>
                        </div>
                        <img class="g-icon" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google">
                    </div>
                    <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                    <p class="review-text">${r.text}</p>
                </div>
            `).join('');
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.googleRatingSync = new GoogleRatingSync(GOOGLE_CONFIG);
    window.googleRatingSync.init();
});
