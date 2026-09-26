// ==========================================
// WISHLIST & FAVORITES SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Property Master Catalog
    const wishlistCatalog = {
        "orchid-gardenia": {
            id: "orchid-gardenia",
            title: "Orchid Gardenia",
            location: "Gauravpath Road, Palanpur, Surat",
            price: "₹45.0L - ₹78.0 Lacs",
            details: "2 & 3 BHK",
            img: "https://imgcdn.houssed.com/assets/Files/Projects/2738/Project%20Image/4edf7dffff6cd501059c3e67a46bbb29.webp",
            fallbackImg: "https://housing-images.n7net.in/4f2250e8/1f2becc3ae2c66b9953d6d7c3b319258/v0/large/orchid_gardenia-palanpur_gam-surat-orchid_corp.jpg",
            link: "orchid-gardenia.html"
        },
        "anand-aspire": {
            id: "anand-aspire",
            title: "Anand Aspire",
            location: "Beside D-Mart, Jahangirabad, Surat",
            price: "₹47.4L - ₹67.5 Lacs",
            details: "2 & 3 BHK",
            img: "https://www.balarhomes.com/images/aspire/slider/4.jpg",
            fallbackImg: "https://www.balarhomes.com/images/aspire/gallery-01.jpg",
            link: "anand-aspire.html"
        },
        "rameshwaram-ivaan": {
            id: "rameshwaram-ivaan",
            title: "Rameshwaram Ivaan",
            location: "Palanpur, Surat",
            price: "₹51.32 Lacs+",
            details: "2, 3 BHK",
            img: "images/media_1789368581313.png",
            fallbackImg: "images/media_1789368581313.png",
            link: "property-details.html"
        },
        "shreepad-celebrations": {
            id: "shreepad-celebrations",
            title: "Shreepad Celebrations",
            location: "Gaurav Path, Palanpur, Surat",
            price: "₹85L - ₹1.10 Cr",
            details: "3 BHK",
            img: "images/shreepad_celebrations_3.jpg",
            fallbackImg: "images/shreepad_celebrations_3.jpg",
            link: "shreepad-celebrations.html"
        },
        "shreepad-inspire": {
            id: "shreepad-inspire",
            title: "Shreepad Inspire",
            location: "Gaurav Path, Palanpur-Pal, Surat",
            price: "₹95L - ₹1.85 Cr",
            details: "3 & 4 BHK",
            img: "images/shreepad_inspire_1.jpg",
            fallbackImg: "images/shreepad_inspire_1.jpg",
            link: "shreepad_inspire_page.html"
        }
    };

    // Get Wishlist from LocalStorage
    function getWishlist() {
        try {
            return JSON.parse(localStorage.getItem("primenest_wishlist")) || [];
        } catch (e) {
            return [];
        }
    }

    // Save Wishlist to LocalStorage
    function saveWishlist(list) {
        localStorage.setItem("primenest_wishlist", JSON.stringify(list));
        updateWishlistBadges();
        renderWishlistDrawer();
    }

    // Update Counter Badges in Navbar
    function updateWishlistBadges() {
        const list = getWishlist();
        const count = list.length;
        document.querySelectorAll(".wishlist-badge").forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? "inline-block" : "inline-block";
        });
    }

    // Toast Notification
    function showToast(msg, icon = "💖") {
        let toast = document.getElementById("wishlistToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "wishlistToast";
            toast.className = "wishlist-toast";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>${icon}</span> ${msg}`;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }

    // Create & Inject Wishlist Drawer Modal
    function injectWishlistDrawer() {
        if (document.getElementById("wishlistDrawer")) return;

        const drawerHTML = `
            <div id="wishlistOverlay" class="wishlist-overlay"></div>
            <div id="wishlistDrawer" class="wishlist-drawer">
                <div class="wishlist-drawer-header">
                    <h3>💖 Saved Properties</h3>
                    <span id="closeWishlistBtn" class="wishlist-close">&times;</span>
                </div>
                <div id="wishlistDrawerItems" class="wishlist-drawer-body">
                    <!-- Items rendered here -->
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", drawerHTML);

        document.getElementById("closeWishlistBtn")?.addEventListener("click", closeWishlist);
        document.getElementById("wishlistOverlay")?.addEventListener("click", closeWishlist);
    }

    function openWishlist() {
        injectWishlistDrawer();
        renderWishlistDrawer();
        document.getElementById("wishlistDrawer")?.classList.add("open");
        document.getElementById("wishlistOverlay")?.classList.add("open");
    }

    function closeWishlist() {
        document.getElementById("wishlistDrawer")?.classList.remove("open");
        document.getElementById("wishlistOverlay")?.classList.remove("open");
    }

    // Render Drawer Content
    function renderWishlistDrawer() {
        const container = document.getElementById("wishlistDrawerItems");
        if (!container) return;

        const savedIds = getWishlist();

        if (savedIds.length === 0) {
            container.innerHTML = `
                <div class="wishlist-empty">
                    <div class="empty-heart">🤍</div>
                    <h4>Your Wishlist is Empty</h4>
                    <p>Click the heart icon on any property card to save your favorite homes for quick access!</p>
                    <a href="properties.html" onclick="document.getElementById('closeWishlistBtn').click()" class="primary-btn" style="display:inline-block; margin-top:15px; border-radius:8px; padding:10px 20px; text-decoration:none;">Explore Properties →</a>
                </div>
            `;
            return;
        }

        let html = "";
        savedIds.forEach(id => {
            const item = wishlistCatalog[id];
            if (item) {
                html += `
                    <div class="wishlist-item-card">
                        <img src="${item.img}" alt="${item.title}" onerror="this.src='${item.fallbackImg}'">
                        <div class="wishlist-item-details">
                            <h4>${item.title}</h4>
                            <p class="loc">📍 ${item.location}</p>
                            <p class="price">${item.price}</p>
                            <div class="actions">
                                <a href="${item.link}" class="view-btn">View Details →</a>
                                <button type="button" class="remove-wishlist-btn" data-id="${item.id}" title="Remove from Wishlist">🗑️</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        container.innerHTML = html;

        // Bind Remove buttons in drawer
        container.querySelectorAll(".remove-wishlist-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                toggleWishlist(id);
            });
        });
    }

    // Toggle Wishlist Item
    function toggleWishlist(propId) {
        let list = getWishlist();
        const index = list.indexOf(propId);
        let isSaved = false;

        if (index > -1) {
            list.splice(index, 1);
            showToast("Removed from Wishlist", "🗑️");
        } else {
            list.push(propId);
            isSaved = true;
            showToast("Saved to Wishlist!", "💖");
        }

        saveWishlist(list);
        updateCardHeartIcons();
    }

    // Sync Heart Icons on Cards
    function updateCardHeartIcons() {
        const list = getWishlist();
        document.querySelectorAll(".wishlist-heart-btn").forEach(btn => {
            const id = btn.getAttribute("data-id");
            if (list.includes(id)) {
                btn.innerHTML = "❤️";
                btn.classList.add("active");
                btn.setAttribute("title", "Remove from Wishlist");
            } else {
                btn.innerHTML = "🤍";
                btn.classList.remove("active");
                btn.setAttribute("title", "Save to Wishlist");
            }
        });
    }

    // Attach Heart Icons to Property Cards Automatically
    function attachHeartButtonsToCards() {
        const cards = document.querySelectorAll(".property-card");

        cards.forEach(card => {
            const titleEl = card.querySelector("h3");
            if (!titleEl) return;

            const titleText = titleEl.textContent.trim().toLowerCase();
            let matchedId = "";

            if (titleText.includes("orchid")) matchedId = "orchid-gardenia";
            else if (titleText.includes("aspire") || titleText.includes("anand")) matchedId = "anand-aspire";
            else if (titleText.includes("ivaan") || titleText.includes("rameshwaram")) matchedId = "rameshwaram-ivaan";
            else if (titleText.includes("celebrations")) matchedId = "shreepad-celebrations";
            else if (titleText.includes("inspire")) matchedId = "shreepad-inspire";

            if (matchedId && !card.querySelector(".wishlist-heart-btn")) {
                const imgContainer = card.querySelector(".property-image");
                if (imgContainer) {
                    if (getComputedStyle(imgContainer).position === "static") {
                        imgContainer.style.position = "relative";
                    }

                    const heartBtn = document.createElement("button");
                    heartBtn.type = "button";
                    heartBtn.className = "wishlist-heart-btn";
                    heartBtn.setAttribute("data-id", matchedId);
                    heartBtn.innerHTML = "🤍";

                    heartBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(matchedId);
                    });

                    imgContainer.appendChild(heartBtn);
                }
            }
        });

        updateCardHeartIcons();
    }

    // Bind Wishlist Buttons in Navbar
    document.querySelectorAll(".wishlist-nav-btn, #openWishlistBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openWishlist();
        });
    });

    // Initialize
    injectWishlistDrawer();
    attachHeartButtonsToCards();
    updateWishlistBadges();
});
