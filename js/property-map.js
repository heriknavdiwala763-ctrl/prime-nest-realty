// ==========================================
// INTERACTIVE PROPERTY MAP ENGINE (Leaflet.js)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // Property Data Array (Surat Locations)
    const propertyData = [
        {
            id: 1,
            title: "Orchid Gardenia",
            locationName: "Gauravpath Road, Palanpur, Surat",
            areaKey: "Palanpur",
            lat: 21.2092,
            lng: 72.7845,
            price: "₹45.0L - ₹78.0 Lacs",
            details: "2 & 3 BHK | 720-1,350 sq.ft",
            img: "https://imgcdn.houssed.com/assets/Files/Projects/2738/Project%20Image/4edf7dffff6cd501059c3e67a46bbb29.webp",
            fallbackImg: "https://housing-images.n7net.in/4f2250e8/1f2becc3ae2c66b9953d6d7c3b319258/v0/large/orchid_gardenia-palanpur_gam-surat-orchid_corp.jpg",
            link: "orchid-gardenia.html",
            tag: "NEW LAUNCH"
        },
        {
            id: 2,
            title: "Anand Aspire",
            locationName: "Beside D-Mart, Jahangirabad, Surat",
            areaKey: "Jahangirabad",
            lat: 21.2225,
            lng: 72.7880,
            price: "₹47.4L - ₹67.5 Lacs",
            details: "2 & 3 BHK | 850-1,450 sq.ft",
            img: "https://www.balarhomes.com/images/aspire/slider/4.jpg",
            fallbackImg: "https://www.balarhomes.com/images/aspire/gallery-01.jpg",
            link: "anand-aspire.html",
            tag: "NEW LAUNCH"
        },
        {
            id: 3,
            title: "Rameshwaram Ivaan",
            locationName: "Palanpur, Surat",
            areaKey: "Palanpur",
            lat: 21.2050,
            lng: 72.7790,
            price: "₹51.32 Lacs+",
            details: "2, 3 BHK | 716-1,195 sq.ft",
            img: "images/media_1789368581313.png",
            fallbackImg: "images/media_1789368581313.png",
            link: "property-details.html",
            tag: "FOR SALE"
        },
        {
            id: 4,
            title: "Shreepad Celebrations",
            locationName: "Gaurav Path, Palanpur, Surat",
            areaKey: "Gaurav Path",
            lat: 21.2120,
            lng: 72.7865,
            price: "₹85L - ₹1.10 Cr",
            details: "3 BHK | 1,057 sq.ft",
            img: "images/shreepad_celebrations_3.jpg",
            fallbackImg: "images/shreepad_celebrations_3.jpg",
            link: "shreepad-celebrations.html",
            tag: "READY TO MOVE"
        },
        {
            id: 5,
            title: "Shreepad Inspire",
            locationName: "Gaurav Path, Palanpur-Pal, Surat",
            areaKey: "Gaurav Path",
            lat: 21.2005,
            lng: 72.7755,
            price: "₹95L - ₹1.85 Cr",
            details: "3 & 4 BHK | 1,220-2,545 sq.ft",
            img: "images/shreepad_inspire_1.jpg",
            fallbackImg: "images/shreepad_inspire_1.jpg",
            link: "shreepad_inspire_page.html",
            tag: "READY TO MOVE"
        }
    ];

    // Center of Surat real estate corridor
    const defaultCenter = [21.2100, 72.7820];
    const defaultZoom = 13;

    // Initialize Leaflet Map
    const map = L.map("map", {
        scrollWheelZoom: false
    }).setView(defaultCenter, defaultZoom);

    // Add OpenStreetMap HD Tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Icon Maker
    function createCustomPin(price) {
        return L.divIcon({
            className: "custom-map-pin",
            html: `<div class="pin-badge">📍 <span>${price}</span></div>`,
            iconSize: [120, 34],
            iconAnchor: [60, 34]
        });
    }

    const markersMap = new Map();
    const sidebarCardsContainer = document.getElementById("mapSidebarCards");

    // Render Markers & Sidebar Items
    function renderMapItems(items) {
        // Clear existing markers
        markersMap.forEach(marker => map.removeLayer(marker));
        markersMap.clear();

        if (sidebarCardsContainer) sidebarCardsContainer.innerHTML = "";

        items.forEach(prop => {
            // Popup HTML
            const popupContent = `
                <div class="popup-card">
                    <img class="popup-img" src="${prop.img}" alt="${prop.title}" onerror="this.src='${prop.fallbackImg}'">
                    <div class="popup-body">
                        <h4>${prop.title}</h4>
                        <p>📍 ${prop.locationName}</p>
                        <p style="font-weight:600; color:#475569; margin-bottom:6px;">${prop.details}</p>
                        <div class="popup-bottom">
                            <span class="popup-price">${prop.price}</span>
                            <a href="${prop.link}">View Details →</a>
                        </div>
                    </div>
                </div>
            `;

            // Marker
            const marker = L.marker([prop.lat, prop.lng], {
                icon: createCustomPin(prop.price.split(' ')[0])
            }).addTo(map);

            marker.bindPopup(popupContent, { maxWidth: 240 });
            markersMap.set(prop.id, marker);

            // Sidebar Card
            if (sidebarCardsContainer) {
                const card = document.createElement("div");
                card.className = "map-prop-card";
                card.dataset.id = prop.id;
                card.innerHTML = `
                    <img class="map-prop-img" src="${prop.img}" alt="${prop.title}" onerror="this.src='${prop.fallbackImg}'">
                    <div class="map-prop-info">
                        <h4>${prop.title}</h4>
                        <p>📍 ${prop.areaKey}, Surat</p>
                        <span class="price">${prop.price}</span>
                    </div>
                `;

                card.addEventListener("click", () => {
                    document.querySelectorAll(".map-prop-card").forEach(c => c.classList.remove("active"));
                    card.classList.add("active");

                    map.flyTo([prop.lat, prop.lng], 15, { duration: 1.2 });
                    marker.openPopup();
                });

                sidebarCardsContainer.appendChild(card);
            }
        });

        // Update count text
        const countEl = document.getElementById("mapPropCount");
        if (countEl) countEl.textContent = `${items.length} Properties`;
    }

    renderMapItems(propertyData);

    // Filter Buttons
    const filterBtns = document.querySelectorAll(".map-filter-btn[data-map-loc]");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const loc = btn.getAttribute("data-map-loc");
            if (loc === "all") {
                renderMapItems(propertyData);
                map.flyTo(defaultCenter, defaultZoom, { duration: 1 });
            } else {
                const filtered = propertyData.filter(p => p.areaKey.toLowerCase().includes(loc.toLowerCase()) || p.locationName.toLowerCase().includes(loc.toLowerCase()));
                renderMapItems(filtered);
                if (filtered.length > 0) {
                    const group = L.featureGroup(filtered.map(p => markersMap.get(p.id)).filter(Boolean));
                    map.fitBounds(group.getBounds().pad(0.2));
                }
            }
        });
    });

    // Find Properties Near Me Geolocation
    const geoBtn = document.getElementById("geoLocateBtn");
    let userMarker = null;

    if (geoBtn) {
        geoBtn.addEventListener("click", () => {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser.");
                return;
            }

            geoBtn.innerHTML = "⏳ Locating...";

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    if (userMarker) map.removeLayer(userMarker);

                    const userIcon = L.divIcon({
                        className: "user-loc-pin",
                        html: `<div class="user-pulse"></div>`,
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    });

                    userMarker = L.marker([userLat, userLng], { icon: userIcon }).addTo(map);
                    userMarker.bindPopup("<b>📍 You are here</b>").openPopup();

                    map.flyTo([userLat, userLng], 14, { duration: 1.5 });
                    geoBtn.innerHTML = "🎯 Found Near You!";
                    setTimeout(() => { geoBtn.innerHTML = "🎯 Find Near Me"; }, 4000);
                },
                (error) => {
                    console.warn("Geolocation fallback:", error.message);
                    alert("Showing central Surat property zone.");
                    map.flyTo(defaultCenter, 14, { duration: 1 });
                    geoBtn.innerHTML = "🎯 Find Near Me";
                }
            );
        });
    }
});
