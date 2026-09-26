const searchButton = document.querySelector(".search-btn");

// Filter functionality for properties page
const filterBtn = document.querySelector('.filter-btn');
if (filterBtn) {
  filterBtn.addEventListener('click', function () {
    const typeSelect = document.getElementById('filter-type');
    const locationSelect = document.getElementById('filter-location');
    const purposeSelect = document.getElementById('filter-purpose');
    const type = typeSelect ? typeSelect.value.trim() : '';
    const location = locationSelect ? locationSelect.value.trim() : '';
    const purpose = purposeSelect ? purposeSelect.value.trim() : '';

    const cards = document.querySelectorAll('.property-card');
    let count = 0;
    cards.forEach(card => {
      const matchesType = (type === 'All Properties' || type === '' || card.dataset.type === type);
      const matchesLocation = (location === 'All Locations' || location === '' || card.dataset.location === location);
      const matchesPurpose = (purpose === 'All Purposes' || purpose === '' || card.dataset.purpose === purpose);
      
      if (matchesType && matchesLocation && matchesPurpose) {
        card.style.display = 'block';
        count++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update property count if element exists
    const countEl = document.querySelector('.property-count');
    if (countEl) {
      countEl.textContent = `${count < 10 ? '0'+count : count} Properties Available`;
    }
  });
}


if (searchButton) {
    searchButton.addEventListener("click", function () {
        const lookingFor = document.getElementById("search-looking-for")?.value || "Buy Property";
        const propertyType = document.getElementById("search-property-type")?.value || "Any Type";
        const location = document.getElementById("search-location")?.value.trim() || "";
        const price = document.getElementById("search-price")?.value || "";
        const bhk = document.getElementById("search-bhk")?.value || "";

        // Save search information
        localStorage.setItem("lookingFor", lookingFor);
        localStorage.setItem("propertyType", propertyType);
        localStorage.setItem("location", location);
        localStorage.setItem("price", price);
        localStorage.setItem("bhk", bhk);

        // Open properties page with query parameters
        let queryParams = new URLSearchParams();
        if (lookingFor) queryParams.set("purpose", lookingFor);
        if (propertyType && propertyType !== "Any Type") queryParams.set("type", propertyType);
        if (location) queryParams.set("location", location);

        window.location.href = `properties.html?${queryParams.toString()}`;
    });
}

// Lightbox functionality for property details
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const galleryImgs = document.querySelectorAll(".gallery-img");

if (lightbox && galleryImgs.length > 0) {
    let currentIndex = 0;

    // Open lightbox
    galleryImgs.forEach((img, index) => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
            currentIndex = index;
        });
    });

    // Close lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Next image
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % galleryImgs.length;
        lightboxImg.src = galleryImgs[currentIndex].src;
    });

    // Prev image
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
        lightboxImg.src = galleryImgs[currentIndex].src;
    });

    // Close on clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

// Media Tab Switcher (📷 Photos → 🎥 Video Tour → 🗺️ Location)
document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll(".media-tab-btn");
    const tabContents = document.querySelectorAll(".media-tab-content");

    if (tabBtns.length > 0) {
        function switchTab(targetId) {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            const targetBtn = document.querySelector(`.media-tab-btn[data-tab="${targetId}"]`);
            const targetContent = document.getElementById(targetId);

            if (targetBtn) targetBtn.classList.add("active");
            if (targetContent) targetContent.classList.add("active");

            if (targetId === "tab-video") {
                if (typeof window.toggleAnandVideo === "function") {
                    window.toggleAnandVideo();
                }
            }
        }

        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                switchTab(btn.dataset.tab);
            });
        });

        // Auto activate video tab if URL has ?tab=video or #video
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("tab") === "video" || window.location.hash === "#video") {
            switchTab("tab-video");
        }
    }
});

// Homepage Buy / Rent / Sell Search Tabs Interactivity
document.addEventListener("DOMContentLoaded", () => {
    const searchTabs = document.querySelectorAll(".search-tab-btn");
    const lookingForSelect = document.getElementById("search-looking-for");

    if (searchTabs.length > 0 && lookingForSelect) {
        searchTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                searchTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                const purpose = tab.dataset.purpose;
                if (purpose) {
                    lookingForSelect.value = purpose;
                }
            });
        });
    }

    // Schedule Consultation Form Submission
    const consultForm = document.getElementById("consultationForm");
    if (consultForm) {
        consultForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("consultName")?.value || "Valued Client";
            const phone = document.getElementById("consultPhone")?.value || "";
            const interest = document.getElementById("consultInterest")?.value || "Buy Property";
            const date = document.getElementById("consultDate")?.value || "Soonest Available";

            // If lead system exists, record lead
            if (typeof window.recordLead === "function") {
                window.recordLead({
                    name: name,
                    phone: phone,
                    type: interest,
                    notes: `Consultation requested for ${date}`
                });
            }

            alert(`🎉 Thank you, ${name}!\n\nYour Consultation Request for ${interest} has been scheduled for ${date}.\nOur property consultant will call you shortly on ${phone}.`);
            consultForm.reset();
        });
    }
});