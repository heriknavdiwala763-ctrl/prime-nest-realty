// ==========================================
// SMART AI PROPERTY MATCH SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const matcherForm = document.getElementById("propertyMatcherForm");
    const resultsContainer = document.getElementById("matcherResults");
    const summaryBadge = document.getElementById("matcherSummaryBadge");
    const matchedGrid = document.getElementById("matchedCardsGrid");

    if (!matcherForm || !matchedGrid) return;

    const propertyCatalog = [
        {
            id: "orchid-gardenia",
            name: "Orchid Gardenia",
            location: "Palanpur",
            fullLocation: "Gauravpath Road, Palanpur, Surat",
            bhk: [2, 3],
            minPrice: 45,
            maxPrice: 78,
            priceText: "₹45.0L - ₹78.0 Lacs",
            details: "2 & 3 BHK | 720-1,350 sq.ft",
            parking: "Yes",
            furnished: "Semi",
            vastu: true,
            img: "https://imgcdn.houssed.com/assets/Files/Projects/2738/Project%20Image/4edf7dffff6cd501059c3e67a46bbb29.webp",
            fallbackImg: "https://housing-images.n7net.in/4f2250e8/1f2becc3ae2c66b9953d6d7c3b319258/v0/large/orchid_gardenia-palanpur_gam-surat-orchid_corp.jpg",
            link: "orchid-gardenia.html"
        },
        {
            id: "anand-aspire",
            name: "Anand Aspire",
            location: "Jahangirabad",
            fullLocation: "Beside D-Mart, Jahangirabad, Surat",
            bhk: [2, 3],
            minPrice: 47.4,
            maxPrice: 67.5,
            priceText: "₹47.4L - ₹67.5 Lacs",
            details: "2 & 3 BHK | 850-1,450 sq.ft",
            parking: "Yes",
            furnished: "Semi",
            vastu: true,
            img: "https://www.balarhomes.com/images/aspire/slider/4.jpg",
            fallbackImg: "https://www.balarhomes.com/images/aspire/gallery-01.jpg",
            link: "anand-aspire.html"
        },
        {
            id: "shreepad-inspire",
            name: "Shreepad Inspire",
            location: "Palanpur-Pal",
            fullLocation: "Palanpur-Pal Link Road, Surat",
            bhk: [3, 4],
            minPrice: 95,
            maxPrice: 185,
            priceText: "₹95L - ₹1.85 Cr",
            details: "3 & 4 BHK | 1,220-2,545 sq.ft",
            parking: "Yes",
            furnished: "Full",
            vastu: true,
            img: "images/shreepad_inspire_1.jpg",
            fallbackImg: "images/shreepad_inspire_1.jpg",
            link: "shreepad_inspire_page.html"
        },
        {
            id: "shreepad-celebrations",
            name: "Shreepad Celebrations",
            location: "Gaurav Path",
            fullLocation: "Gaurav Path, Palanpur, Surat",
            bhk: [3],
            minPrice: 85,
            maxPrice: 110,
            priceText: "₹85L - ₹1.10 Cr",
            details: "3 BHK | 1,057 sq.ft",
            parking: "Yes",
            furnished: "Semi",
            vastu: true,
            img: "images/shreepad_celebrations_3.jpg",
            fallbackImg: "images/shreepad_celebrations_3.jpg",
            link: "shreepad-celebrations.html"
        },
        {
            id: "rameshwaram-ivaan",
            name: "Rameshwaram Ivaan",
            location: "Palanpur",
            fullLocation: "Palanpur Canal Road, Surat",
            bhk: [2, 3],
            minPrice: 51.32,
            maxPrice: 75,
            priceText: "₹51.32 Lacs+",
            details: "2, 3 BHK | 716-1,195 sq.ft",
            parking: "Yes",
            furnished: "Unfurnished",
            vastu: true,
            img: "images/media_1789368581313.png",
            fallbackImg: "images/media_1789368581313.png",
            link: "property-details.html"
        },
        {
            id: "pyramid-altura",
            name: "Pyramid Altura",
            location: "Gaurav Path",
            fullLocation: "Near Gaurav Path, Surat",
            bhk: [3],
            minPrice: 62,
            maxPrice: 92,
            priceText: "₹62.0L - ₹92.0 Lacs",
            details: "3 BHK | 1,150 sq.ft",
            parking: "Yes",
            furnished: "Semi",
            vastu: true,
            img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
            fallbackImg: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
            link: "pyramid-altura-brochure.html"
        },
        {
            id: "nakshatra-solitaire",
            name: "Nakshatra Solitaire",
            location: "Vesu",
            fullLocation: "Adajan-Vesu Link Road, Surat",
            bhk: [2, 3, 4],
            minPrice: 60,
            maxPrice: 125,
            priceText: "₹60.0L - ₹1.25 Cr",
            details: "2, 3 & 4 BHK | 1,350-2,200 sq.ft",
            parking: "Yes",
            furnished: "Semi",
            vastu: true,
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            fallbackImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            link: "nakshatra-solitaire-brochure.html"
        }
    ];

    function calculateMatchScore(prop, reqs) {
        let score = 0;

        // 1. Budget Score (max 35)
        if (reqs.budget) {
            if (prop.minPrice <= reqs.budget) {
                score += 35;
            } else if (prop.minPrice <= reqs.budget * 1.2) {
                score += 22;
            } else if (prop.minPrice <= reqs.budget * 1.4) {
                score += 10;
            }
        } else {
            score += 30;
        }

        // 2. BHK Score (max 30)
        if (reqs.bhk) {
            if (prop.bhk.includes(reqs.bhk)) {
                score += 30;
            } else if (prop.bhk.includes(reqs.bhk + 1) || prop.bhk.includes(reqs.bhk - 1)) {
                score += 18;
            }
        } else {
            score += 25;
        }

        // 3. Location Score (max 25)
        if (reqs.location && reqs.location !== "Any") {
            const propLoc = prop.location.toLowerCase();
            const reqLoc = reqs.location.toLowerCase();
            if (propLoc.includes(reqLoc) || prop.fullLocation.toLowerCase().includes(reqLoc)) {
                score += 25;
            } else {
                score += 15; // Surat prime connectivity match
            }
        } else {
            score += 22;
        }

        // 4. Parking Score (max 5)
        if (reqs.parking === "Yes" || reqs.parking === "Covered") {
            if (prop.parking === "Yes") score += 5;
        } else {
            score += 5;
        }

        // 5. Furnished Score (max 5)
        if (reqs.furnished && reqs.furnished !== "Any") {
            if (prop.furnished.toLowerCase().includes(reqs.furnished.toLowerCase())) {
                score += 5;
            } else {
                score += 3;
            }
        } else {
            score += 5;
        }

        // Cap at 98% for realistic feel
        const matchPercent = Math.min(98, Math.max(72, score));
        return matchPercent;
    }

    function runPropertyMatcher(e) {
        if (e) e.preventDefault();

        const budget = parseFloat(document.getElementById("match-budget")?.value) || 60;
        const location = document.getElementById("match-location")?.value || "Vesu";
        const bhk = parseInt(document.getElementById("match-bhk")?.value) || 2;
        const parking = document.getElementById("match-parking")?.value || "Yes";
        const furnished = document.getElementById("match-furnished")?.value || "Semi";

        const reqs = { budget, location, bhk, parking, furnished };

        // Score all properties
        const scored = propertyCatalog.map(prop => {
            const score = calculateMatchScore(prop, reqs);
            return { ...prop, matchScore: score };
        });

        // Sort descending by score
        scored.sort((a, b) => b.matchScore - a.matchScore);

        const topMatches = scored.slice(0, 5);
        const topScore = topMatches[0]?.matchScore || 94;

        // Render Summary
        if (summaryBadge) {
            summaryBadge.innerHTML = `🎯 <strong>${topScore}% Match Found</strong> — ${topMatches.length} properties match your criteria!`;
        }

        // Render Grid Cards
        let html = "";
        topMatches.forEach(prop => {
            const scoreClass = prop.matchScore >= 90 ? "high" : "medium";
            html += `
                <div class="matched-card">
                    <div class="matched-card-img">
                        <span class="match-score-badge ${scoreClass}">⚡ ${prop.matchScore}% Match</span>
                        <img src="${prop.img}" alt="${prop.name}" onerror="this.src='${prop.fallbackImg}'">
                    </div>
                    <div class="matched-card-body">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <h4 style="font-size:18px; font-weight:800; color:#0f172a;">${prop.name}</h4>
                            <strong style="font-size:15px; color:#2563eb;">${prop.priceText}</strong>
                        </div>
                        <p style="font-size:13px; color:#64748b;">📍 ${prop.fullLocation}</p>
                        <p style="font-size:12px; color:#334155; font-weight:600;">${prop.details}</p>

                        <div class="matched-specs-tags">
                            <span class="matched-spec-tag">✓ ${reqs.bhk} BHK Fit</span>
                            <span class="matched-spec-tag">✓ Budget Match</span>
                            <span class="matched-spec-tag">✓ ${prop.parking} Parking</span>
                            <span class="matched-spec-tag">✓ ${prop.furnished} Furnished</span>
                        </div>

                        <div style="display:flex; gap:8px; margin-top:14px;">
                            <a href="${prop.link}" style="flex:1; background:#0f172a; color:#fff; padding:10px; border-radius:8px; font-size:13px; font-weight:700; text-align:center; text-decoration:none;">
                                View Property →
                            </a>
                            <button type="button" onclick="window.openSiteVisitModal('${prop.name}')" style="background:#2563eb; color:#fff; border:none; padding:10px 14px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer;">
                                🚗 Visit
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        matchedGrid.innerHTML = html;
        if (resultsContainer) resultsContainer.style.display = "block";
    }

    matcherForm.addEventListener("submit", runPropertyMatcher);

    // Initial run on load with defaults (Budget: ₹60L, Location: Vesu, BHK: 2)
    runPropertyMatcher();
});
