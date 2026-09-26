// ==========================================
// ENQUIRY / LEAD SYSTEM (Contact Broker)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Leads Pre-seeding (if empty)
    function getStoredLeads() {
        try {
            const data = localStorage.getItem("primenest_leads");
            if (!data) {
                const sampleLeads = [
                    {
                        id: "LEAD-101",
                        name: "Rajesh Sharma",
                        phone: "+91 98250 12345",
                        property: "Orchid Gardenia",
                        message: "Interested in 3 BHK flat. Want to schedule a site visit this weekend.",
                        date: "2026-09-24",
                        time: "04:15 PM",
                        status: "New"
                    },
                    {
                        id: "LEAD-102",
                        name: "Priya Patel",
                        phone: "+91 99090 87654",
                        property: "Anand Aspire",
                        message: "Please share floor plan and discount offers for 2 BHK.",
                        date: "2026-09-24",
                        time: "02:30 PM",
                        status: "Contacted"
                    },
                    {
                        id: "LEAD-103",
                        name: "Amit Desai",
                        phone: "+91 98981 44332",
                        property: "Shreepad Inspire",
                        message: "Looking for ready-to-move 4 BHK penthouse. Please call back.",
                        date: "2026-09-23",
                        time: "11:45 AM",
                        status: "Closed"
                    }
                ];
                localStorage.setItem("primenest_leads", JSON.stringify(sampleLeads));
                return sampleLeads;
            }
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    }

    // Save Lead to LocalStorage
    function saveLead(leadData) {
        const leads = getStoredLeads();
        leads.unshift(leadData); // Add new lead to top
        localStorage.setItem("primenest_leads", JSON.stringify(leads));
    }

    // Inject Contact Broker Modal into DOM
    function injectLeadModal() {
        if (document.getElementById("contactBrokerModal")) return;

        const modalHTML = `
            <div id="contactBrokerOverlay" class="lead-modal-overlay"></div>
            <div id="contactBrokerModal" class="lead-modal">
                <div class="lead-modal-header">
                    <div>
                        <h3>📞 Contact Broker / Agent</h3>
                        <p>Fill in your details and our property advisor will call you back within 15 minutes.</p>
                    </div>
                    <span id="closeLeadModalBtn" class="lead-modal-close">&times;</span>
                </div>
                <form id="leadCaptureForm" class="lead-form">
                    <div class="lead-field">
                        <label for="lead-name">Full Name *</label>
                        <input type="text" id="lead-name" placeholder="e.g. Rahul Mehta" required>
                    </div>
                    <div class="lead-field">
                        <label for="lead-phone">Mobile Number *</label>
                        <input type="tel" id="lead-phone" placeholder="+91 98765 43210" required>
                    </div>
                    <div class="lead-field">
                        <label for="lead-property">Property Interested</label>
                        <select id="lead-property">
                            <option value="General Enquiry">General Enquiry</option>
                            <option value="Orchid Gardenia">Orchid Gardenia (Palanpur)</option>
                            <option value="Anand Aspire">Anand Aspire (Jahangirabad)</option>
                            <option value="Rameshwaram Ivaan">Rameshwaram Ivaan (Palanpur)</option>
                            <option value="Shreepad Celebrations">Shreepad Celebrations (Gaurav Path)</option>
                            <option value="Shreepad Inspire">Shreepad Inspire (Palanpur-Pal)</option>
                        </select>
                    </div>
                    <div class="lead-field">
                        <label for="lead-message">Message / Details</label>
                        <textarea id="lead-message" rows="3" placeholder="Tell us about your requirement or preferred visit date..."></textarea>
                    </div>
                    <button type="submit" class="lead-submit-btn">
                        🚀 Send Enquiry to Broker
                    </button>
                </form>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", modalHTML);

        document.getElementById("closeLeadModalBtn")?.addEventListener("click", closeLeadModal);
        document.getElementById("contactBrokerOverlay")?.addEventListener("click", closeLeadModal);

        // Form Submission
        document.getElementById("leadCaptureForm")?.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("lead-name").value.trim();
            const phone = document.getElementById("lead-phone").value.trim();
            const property = document.getElementById("lead-property").value;
            const message = document.getElementById("lead-message").value.trim() || "Interested in booking a site visit.";

            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newLead = {
                id: "LEAD-" + Math.floor(100 + Math.random() * 900),
                name: name,
                phone: phone,
                property: property,
                message: message,
                date: dateStr,
                time: timeStr,
                status: "New"
            };

            saveLead(newLead);
            closeLeadModal();
            showLeadSuccessAlert(name, phone);
        });
    }

    function openLeadModal(defaultProp = "") {
        injectLeadModal();
        const modal = document.getElementById("contactBrokerModal");
        const overlay = document.getElementById("contactBrokerOverlay");
        const propSelect = document.getElementById("lead-property");

        if (defaultProp && propSelect) {
            for (let i = 0; i < propSelect.options.length; i++) {
                if (propSelect.options[i].value.toLowerCase().includes(defaultProp.toLowerCase())) {
                    propSelect.selectedIndex = i;
                    break;
                }
            }
        }

        modal?.classList.add("open");
        overlay?.classList.add("open");
    }

    function closeLeadModal() {
        document.getElementById("contactBrokerModal")?.classList.remove("open");
        document.getElementById("contactBrokerOverlay")?.classList.remove("open");
    }

    function showLeadSuccessAlert(name, phone) {
        let toast = document.getElementById("leadSuccessToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "leadSuccessToast";
            toast.className = "wishlist-toast";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✅</span> Thank you <strong>${name}</strong>! Enquiry sent. Our broker will contact you at <strong>${phone}</strong>.`;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 5000);
    }

    // Attach click handlers to all "Contact Agent", "Contact Broker", "Talk to an Agent" buttons across site
    function bindLeadButtons() {
        const btns = document.querySelectorAll(".nav-btn, .secondary-btn, .contact-agent-btn");
        btns.forEach(btn => {
            if (btn.classList.contains("nav-btn") || btn.textContent.toLowerCase().includes("contact") || btn.textContent.toLowerCase().includes("agent") || btn.textContent.toLowerCase().includes("talk")) {
                btn.addEventListener("click", (e) => {
                    let propName = "";
                    const pageTitle = document.querySelector("h1, h2");
                    if (pageTitle && document.querySelector(".property-details-section")) {
                        propName = pageTitle.textContent.trim();
                    }
                    e.preventDefault();
                    openLeadModal(propName);
                });
            }
        });
    }

    // Expose openLeadModal globally
    window.openContactBrokerModal = openLeadModal;

    injectLeadModal();
    bindLeadButtons();
});


// ==========================================
// SITE VISIT REQUEST SYSTEM (Customer & Broker)
// ==========================================

function getStoredVisits() {
    try {
        const data = localStorage.getItem("primenest_site_visits");
        if (!data) {
            const sampleVisits = [
                {
                    id: "VISIT-401",
                    name: "Jignesh Patel",
                    phone: "+91 98251 98765",
                    property: "Orchid Gardenia",
                    visitDate: "2026-09-28",
                    timeSlot: "10:00 AM - 12:00 PM",
                    pickup: "Free Broker Cab Pickup",
                    notes: "2 Persons visiting. Need Vastu consultation.",
                    status: "Pending",
                    createdTime: "2026-09-25 10:30 AM"
                },
                {
                    id: "VISIT-402",
                    name: "Sneha Shah",
                    phone: "+91 99799 12345",
                    property: "Shreepad Inspire",
                    visitDate: "2026-09-27",
                    timeSlot: "02:00 PM - 04:00 PM",
                    pickup: "Self Arrival",
                    notes: "Looking for ready-to-move 3BHK flat.",
                    status: "Approved",
                    createdTime: "2026-09-24 03:15 PM",
                    brokerNote: "Assigned Executive: Mr. Chirag Patel (+91 98765 00000)"
                },
                {
                    id: "VISIT-403",
                    name: "Karan Verma",
                    phone: "+91 98980 55443",
                    property: "Anand Aspire",
                    visitDate: "2026-09-26",
                    timeSlot: "05:00 PM - 07:00 PM",
                    pickup: "Free Broker Cab Pickup",
                    notes: "Needs home loan valuation.",
                    status: "Rejected",
                    createdTime: "2026-09-24 11:20 AM",
                    brokerNote: "Slot full on 26th. Please reschedule for Sunday 28th."
                }
            ];
            localStorage.setItem("primenest_site_visits", JSON.stringify(sampleVisits));
            return sampleVisits;
        }
        return JSON.parse(data);
    } catch(e) {
        return [];
    }
}

function saveVisit(visitData) {
    const visits = getStoredVisits();
    visits.unshift(visitData);
    localStorage.setItem("primenest_site_visits", JSON.stringify(visits));
}

// Inject Site Visit Booking Modal
function injectSiteVisitModal() {
    if (document.getElementById("siteVisitModal")) return;

    const modalHTML = `
        <div id="siteVisitOverlay" class="visit-modal-overlay"></div>
        <div id="siteVisitModal" class="visit-modal">
            <div class="visit-modal-header">
                <div>
                    <h3>🚗 Schedule Free Site Visit</h3>
                    <p>Select your preferred date & time. Our broker will confirm cab pickup & site pass.</p>
                </div>
                <span id="closeVisitModalBtn" class="visit-modal-close">&times;</span>
            </div>
            <form id="siteVisitForm" class="visit-form">
                <div class="visit-field">
                    <label>Full Name *</label>
                    <input type="text" id="visit-name" placeholder="e.g. Ramesh Patel" required>
                </div>
                <div class="visit-field">
                    <label>Mobile / WhatsApp Number *</label>
                    <input type="tel" id="visit-phone" placeholder="+91 98765 43210" required>
                </div>
                <div class="visit-field">
                    <label>Select Property</label>
                    <select id="visit-property">
                        <option value="Orchid Gardenia">Orchid Gardenia (Palanpur)</option>
                        <option value="Anand Aspire">Anand Aspire (Jahangirabad)</option>
                        <option value="Shreepad Inspire">Shreepad Inspire (Palanpur-Pal)</option>
                        <option value="Shreepad Celebrations">Shreepad Celebrations (Gaurav Path)</option>
                        <option value="Rameshwaram Ivaan">Rameshwaram Ivaan (Palanpur)</option>
                        <option value="Pyramid Altura">Pyramid Altura (Gaurav Path)</option>
                    </select>
                </div>
                <div class="visit-form-row">
                    <div class="visit-field">
                        <label>Visit Date *</label>
                        <input type="date" id="visit-date" required>
                    </div>
                    <div class="visit-field">
                        <label>Preferred Time Slot *</label>
                        <select id="visit-timeslot">
                            <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Morning)</option>
                            <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon)</option>
                            <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM (Evening)</option>
                        </select>
                    </div>
                </div>
                <div class="visit-field">
                    <label>Pickup & Travel Preference</label>
                    <select id="visit-pickup">
                        <option value="Free Broker Cab Pickup">🚕 Free Broker Cab Pickup (From your location)</option>
                        <option value="Self Arrival">🚗 Self Arrival (Direct meeting at site office)</option>
                    </select>
                </div>
                <button type="submit" class="visit-submit-btn">
                    📅 Confirm Site Visit Request
                </button>
            </form>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const dateInput = document.getElementById("visit-date");
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    document.getElementById("closeVisitModalBtn")?.addEventListener("click", closeSiteVisitModal);
    document.getElementById("siteVisitOverlay")?.addEventListener("click", closeSiteVisitModal);

    document.getElementById("siteVisitForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("visit-name").value.trim();
        const phone = document.getElementById("visit-phone").value.trim();
        const property = document.getElementById("visit-property").value;
        const visitDate = document.getElementById("visit-date").value;
        const timeSlot = document.getElementById("visit-timeslot").value;
        const pickup = document.getElementById("visit-pickup").value;

        const visitId = "VISIT-" + Math.floor(1000 + Math.random() * 9000);
        const now = new Date();
        const createdTime = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newVisit = {
            id: visitId,
            name: name,
            phone: phone,
            property: property,
            visitDate: visitDate,
            timeSlot: timeSlot,
            pickup: pickup,
            status: "Pending",
            createdTime: createdTime
        };

        saveVisit(newVisit);
        closeSiteVisitModal();
        showVisitBookingConfirmation(newVisit);
    });
}

function openSiteVisitModal(defaultProp = "") {
    injectSiteVisitModal();
    const modal = document.getElementById("siteVisitModal");
    const overlay = document.getElementById("siteVisitOverlay");
    const propSelect = document.getElementById("visit-property");

    if (defaultProp && propSelect) {
        for (let i = 0; i < propSelect.options.length; i++) {
            if (propSelect.options[i].value.toLowerCase().includes(defaultProp.toLowerCase())) {
                propSelect.selectedIndex = i;
                break;
            }
        }
    }

    modal?.classList.add("open");
    overlay?.classList.add("open");
}

function closeSiteVisitModal() {
    document.getElementById("siteVisitModal")?.classList.remove("open");
    document.getElementById("siteVisitOverlay")?.classList.remove("open");
}

function showVisitBookingConfirmation(visit) {
    alert(`🎉 Site Visit Request Submitted!\n\nRequest ID: ${visit.id}\nProperty: ${visit.property}\nDate: ${visit.visitDate} (${visit.timeSlot})\nStatus: 🟡 PENDING BROKER APPROVAL\n\nOur broker will review your request and send your confirmation & cab details shortly.`);
}

window.openSiteVisitModal = openSiteVisitModal;
window.getStoredVisits = getStoredVisits;

