// ==========================================
// ADVANCED CONVERSATIONAL AI PROPERTY ASSISTANT
// Fully supports Gujarati, Gujlish & English
// Handles: Greetings, Slang/Abuse, Property Queries, Budget, Loans, Vastu, Site Visits, Jokes & Casual Chat
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const projectsCatalog = [
        {
            id: "orchid-gardenia",
            name: "Orchid Gardenia",
            location: "Gauravpath Road, Palanpur, Surat",
            areaKey: "palanpur",
            bhk: [2, 3],
            minPrice: 45,
            maxPrice: 78,
            priceText: "₹45.0L - ₹78.0 Lacs",
            details: "2 & 3 BHK | 720-1,350 sq.ft",
            status: "New Launch",
            vastu: "100% Vastu Compliant (East-West Entrance)",
            loan: "Approved by SBI, HDFC, ICICI, Bank of Baroda (up to 85% Loan)",
            builder: "Orchid Group",
            possession: "Dec 2026",
            amenities: "Clubhouse, Swimming Pool, Landscaping Garden, 24x7 Security, Gym",
            img: "https://imgcdn.houssed.com/assets/Files/Projects/2738/Project%20Image/4edf7dffff6cd501059c3e67a46bbb29.webp",
            fallbackImg: "https://housing-images.n7net.in/4f2250e8/1f2becc3ae2c66b9953d6d7c3b319258/v0/large/orchid_gardenia-palanpur_gam-surat-orchid_corp.jpg",
            link: "orchid-gardenia.html"
        },
        {
            id: "anand-aspire",
            name: "Anand Aspire",
            location: "Beside D-Mart, Jahangirabad, Surat",
            areaKey: "jahangirabad",
            bhk: [2, 3],
            minPrice: 47.4,
            maxPrice: 67.5,
            priceText: "₹47.4L - ₹67.5 Lacs",
            details: "2 & 3 BHK | 850-1,450 sq.ft",
            status: "New Launch",
            vastu: "Vastu Compliant with Podium Garden view balconies",
            loan: "Approved by HDFC, Axis Bank, SBI (up to 80% Loan)",
            builder: "Balar Homes / Anand Developers",
            possession: "Ready to Fit-out / Mid 2026",
            amenities: "Podium Park, Children Play Area, EV Charging, CCTV, Gazebo",
            img: "https://www.balarhomes.com/images/aspire/slider/4.jpg",
            fallbackImg: "https://www.balarhomes.com/images/aspire/gallery-01.jpg",
            link: "anand-aspire.html"
        },
        {
            id: "rameshwaram-ivaan",
            name: "Rameshwaram Ivaan",
            location: "Palanpur, Surat",
            areaKey: "palanpur",
            bhk: [2, 3],
            minPrice: 51.32,
            maxPrice: 75,
            priceText: "₹51.32 Lacs+",
            details: "2, 3 BHK | 716-1,195 sq.ft",
            status: "For Sale",
            vastu: "Vastu-planned floor layouts",
            loan: "Pre-approved home loans available",
            builder: "Rameshwaram Developers",
            possession: "2025-2026",
            amenities: "Indoor Games, Senior Citizen Sitout, High Speed Lifts",
            img: "images/media_1789368581313.png",
            fallbackImg: "images/media_1789368581313.png",
            link: "property-details.html"
        },
        {
            id: "shreepad-celebrations",
            name: "Shreepad Celebrations",
            location: "Gaurav Path, Palanpur, Surat",
            areaKey: "gaurav path",
            bhk: [3],
            minPrice: 85,
            maxPrice: 110,
            priceText: "₹85L - ₹1.10 Cr",
            details: "3 BHK | 1,057 sq.ft",
            status: "Ready to Move",
            vastu: "Vastu Compliant with double height entrance lobby",
            loan: "All leading nationalized & private banks approved",
            builder: "Shreepad Group",
            possession: "Ready Possession",
            amenities: "Multipurpose Hall, Designer Entrance Lobby, Temple, Banquet",
            img: "images/shreepad_celebrations_3.jpg",
            fallbackImg: "images/shreepad_celebrations_3.jpg",
            link: "shreepad-celebrations.html"
        },
        {
            id: "shreepad-inspire",
            name: "Shreepad Inspire",
            location: "Gaurav Path, Palanpur-Pal, Surat",
            areaKey: "palanpur-pal",
            bhk: [3, 4],
            minPrice: 95,
            maxPrice: 185,
            priceText: "₹95L - ₹1.85 Cr",
            details: "3 & 4 BHK | 1,220-2,545 sq.ft",
            status: "Ready to Move",
            vastu: "Premium Vastu Compliant 3 & 4 BHK Luxury Residences",
            loan: "Approved for maximum home loan funding",
            builder: "Shreepad Group",
            possession: "Ready Possession",
            amenities: "Sky Lounge, Fitness Center, Swimming Pool, Covered Parking",
            img: "images/shreepad_inspire_1.jpg",
            fallbackImg: "images/shreepad_inspire_1.jpg",
            link: "shreepad_inspire_page.html"
        }
    ];

    function injectAiWidget() {
        return; // Disabled AI Assistant widget
        if (document.getElementById("aiChatWidget")) return;

        const widgetHTML = `
            <!-- AI Floating Toggle Button -->
            <button type="button" id="aiChatToggleBtn" class="ai-chat-toggle-btn" title="Ask AI Property Assistant">
                <span class="ai-bot-icon">🤖</span>
                <span class="ai-btn-text">AI Assistant</span>
                <span class="ai-pulse-dot"></span>
            </button>

            <!-- AI Chat Window -->
            <div id="aiChatWidget" class="ai-chat-widget">
                <div class="ai-chat-header">
                    <div class="ai-header-info">
                        <div class="ai-avatar">🤖</div>
                        <div>
                            <h4>PrimeNest AI Assistant</h4>
                            <span class="ai-status">● Live • Smart Property Assistant</span>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button type="button" id="aiResetChatBtn" title="Reset Conversation" style="background:transparent; border:none; color:#94a3b8; cursor:pointer; font-size:14px;">🔄</button>
                        <button type="button" id="aiChatCloseBtn" class="ai-close-btn">&times;</button>
                    </div>
                </div>

                <div id="aiChatMessages" class="ai-chat-body">
                    <div class="ai-message bot">
                        👋 <strong>નમસ્તે! Kem chho!</strong><br>
                        હું તમારો સ્માર્ટ AI પ્રોપર્ટી આસિસ્ટન્ટ છું. તમે મારી સાથે સુરતમાં પ્રોપર્ટી, બજેટ, હોમ લોન, વાસ્તુ, સાઇટ વિઝિટ અથવા કોઈપણ વાતચીત કરી શકો છો!
                        <br><br>
                        <em>💡 દા.ત. "Maro budget ₹50 lakh chhe ane Surat ma 2BHK joie chhe." અથવા "Kem chho bhai?"</em>
                    </div>

                    <div class="ai-quick-suggestions">
                        <button type="button" class="ai-suggest-chip" data-msg="Maro budget ₹50 lakh chhe ane Surat ma 2BHK joie chhe.">
                            💡 2BHK under ₹50 Lakhs
                        </button>
                        <button type="button" class="ai-suggest-chip" data-msg="Vastu compliant flats kaya chhe?">
                            ✨ Vastu Compliant
                        </button>
                        <button type="button" class="ai-suggest-chip" data-msg="Home loan facility and interest rates?">
                            🏦 Home Loan & EMI
                        </button>
                        <button type="button" class="ai-suggest-chip" data-msg="Site visit booking and contact agent">
                            📞 Book Free Site Visit
                        </button>
                    </div>
                </div>

                <form id="aiChatForm" class="ai-chat-input-wrapper">
                    <input type="text" id="aiUserInput" placeholder="કોઈપણ પ્રશ્ન પૂછો / Type any query..." required autocomplete="off">
                    <button type="submit" class="ai-send-btn">🚀</button>
                </form>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", widgetHTML);

        const toggleBtn = document.getElementById("aiChatToggleBtn");
        const closeBtn = document.getElementById("aiChatCloseBtn");
        const resetBtn = document.getElementById("aiResetChatBtn");
        const widget = document.getElementById("aiChatWidget");

        toggleBtn?.addEventListener("click", () => {
            widget?.classList.toggle("open");
        });

        closeBtn?.addEventListener("click", () => {
            widget?.classList.remove("open");
        });

        resetBtn?.addEventListener("click", () => {
            const msgBox = document.getElementById("aiChatMessages");
            if (msgBox) {
                msgBox.innerHTML = `
                    <div class="ai-message bot">
                        🔄 <strong>ચેટ રીસેટ થઈ ગઈ છે!</strong><br>
                        બોલો ભાઈ, આજે હું તમને સુરતમાં કઈ પ્રોપર્ટી શોધવામાં મદદ કરું?
                    </div>
                    <div class="ai-quick-suggestions">
                        <button type="button" class="ai-suggest-chip" data-msg="Maro budget ₹50 lakh chhe ane Surat ma 2BHK joie chhe.">
                            💡 2BHK under ₹50 Lakhs
                        </button>
                        <button type="button" class="ai-suggest-chip" data-msg="Vastu compliant flats kaya chhe?">
                            ✨ Vastu Compliant
                        </button>
                        <button type="button" class="ai-suggest-chip" data-msg="Home loan facility and interest rates?">
                            🏦 Home Loan & EMI
                        </button>
                    </div>
                `;
                bindChips();
            }
        });

        function bindChips() {
            document.querySelectorAll(".ai-suggest-chip").forEach(chip => {
                chip.addEventListener("click", () => {
                    const msg = chip.getAttribute("data-msg");
                    if (msg) handleUserQuery(msg);
                });
            });
        }

        bindChips();

        document.getElementById("aiChatForm")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = document.getElementById("aiUserInput");
            const query = input.value.trim();
            if (query) {
                handleUserQuery(query);
                input.value = "";
            }
        });
    }

    function handleUserQuery(queryText) {
        const msgContainer = document.getElementById("aiChatMessages");
        if (!msgContainer) return;

        // User Message Bubble
        const userBubble = document.createElement("div");
        userBubble.className = "ai-message user";
        userBubble.textContent = queryText;
        msgContainer.appendChild(userBubble);
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // Typing Indicator
        const typingBubble = document.createElement("div");
        typingBubble.className = "ai-message bot typing";
        typingBubble.innerHTML = `<span>🤖 PrimeNest AI વિચાર કરી રહ્યું છે...</span>`;
        msgContainer.appendChild(typingBubble);
        msgContainer.scrollTop = msgContainer.scrollHeight;

        setTimeout(() => {
            typingBubble.remove();
            const replyHTML = generateConversationalResponse(queryText);

            const botBubble = document.createElement("div");
            botBubble.className = "ai-message bot";
            botBubble.innerHTML = replyHTML;

            msgContainer.appendChild(botBubble);
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }, 500);
    }

    // Comprehensive Conversational AI Engine
    function generateConversationalResponse(query) {
        const rawLower = query.toLowerCase().trim();
        const lower = rawLower.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "");

        // -------------------------------------------------------------
        // A. Slang / Abuse / Anger / Informal "Gar" handling (Gujarati/Hindi/English)
        // -------------------------------------------------------------
        const abuseKeywords = [
            "bhosdino", "bhosdina", "bhosdike", "bhosdika", "bhosdi", "lauda", "lode", 
            "gand", "chod", "chutiya", "kamina", "saala", "saale", "bc", "mc", "harami", 
            "gadhedo", "gandhu", "baki", "madarchod", "gandu", "fuck", "shit", "bastard"
        ];
        const detectedAbuse = abuseKeywords.find(kw => lower.includes(kw));
        let abusePrefix = "";

        if (detectedAbuse) {
            abusePrefix = `😅 <strong>એલા ભાઈ! શાંતિ શાંતિ! 😜</strong><br><em>તમે ગુસ્સામાં/સ્લેંગમાં વાત કરશો તો પણ હું તો તમારો મિત્ર જ રહીશ અને તમારા દરેક પ્રશ્નનો સાચો જવાબ આપીશ!</em><br><br>`;
        }

        let innerContent = "";

        // -------------------------------------------------------------
        // B. Greetings & Friendly Small Talk
        // -------------------------------------------------------------
        if (lower.match(/^(hi|hello|hey|kem chho|kem chhe|kem cho|kem choo|su chale|su khabar|namaste|good morning|good evening|good afternoon|jay shree krishna|radhe radhe|ram ram|hola|kya hal)/)) {
            innerContent = `
                👋 <strong>નમસ્તે! Kem chho!</strong><br>
                હું એકદમ મજામાં છું! PrimeNest Realty માં તમારું હાર્દિક સ્વાગત છે. 😊<br><br>
                આજે હું તમને સુરતમાં કેવું ઘર શોધી આપું? તમારું બજેટ (દા.ત. 45 લાખ, 60 લાખ, 1 કરોડ) અથવા લોકેશન (પાલનપુર, જહાંગીરાબાદ, ગૌરવ પથ) જણાવો!
            `;
        }
        // How are you / Su kare chhe / Su chalyu
        else if (lower.includes("su kare") || lower.includes("su kare chhe") || lower.includes("su chale") || lower.includes("how are you") || lower.includes("su khabar")) {
            innerContent = `
                😄 <strong>બસ તમારો ઇંતઝાર કરી રહ્યો હતો!</strong><br>
                હું સુરતના લેટેસ્ટ પ્રોજેક્ટ્સ અને ફ્લેટ્સની ડિટેલ્સ અપડેટ કરી રહ્યો છું.<br><br>
                તમે બોલો, આજે તમારી ડ્રીમ પ્રોપર્ટી શોધવાનું શરૂ કરીએ?
            `;
        }
        // Who are you / About Bot / Developer
        else if (lower.includes("kon chho") || lower.includes("tame kon") || lower.includes("who are you") || lower.includes("tu kon") || lower.includes("what is your name") || lower.includes("taru naam")) {
            innerContent = `
                🤖 <strong>હું PrimeNest AI પ્રોપર્ટી આસિસ્ટન્ટ છું!</strong><br>
                હું સુરતના પ્રીમિયમ રિયલ એસ્ટેટ પ્રોજેક્ટ્સમાં તમારો પર્સનલ ગાઇડ છું.<br><br>
                <strong>હું શું કરી શકું છું?</strong><br>
                ✔️ બજેટ અને BHK પ્રમાણે ફ્લેટ શોધવા<br>
                ✔️ Vastu Compliant ઘર બતાવવા<br>
                ✔️ SBI / HDFC હોમ લોન અને EMI ની ગણતરી<br>
                ✔️ ફ્રી સાઇટ મુલાકાત માટે બ્રોકર જોડે બુકિંગ કરવું
            `;
        }
        // Jokes / Fun Chat
        else if (lower.includes("joke") || lower.includes("જોક") || lower.includes("તમાશો") || lower.includes("હસાવ") || lower.includes("funny")) {
            innerContent = `
                😂 <strong>આ રહ્યો તમારા માટે કૂલ સુરતી જોક:</strong><br><br>
                <em>ગ્રાહક: ભાઈ, આ ફ્લેટમાંથી તાપી નદી દેખાય છે?<br>
                બિલ્ડર: ચોમાસામાં તો તાપી નદી સોફા સુધી આવી જાય છે! 🌊😜</em><br><br>
                ચિંતા ન કરો, અમારા બધા પ્રોજેક્ટ્સ 100% વોટરલોગિંગ-ફ્રી લક્ઝરી ફ્લેટ્સ છે! બજેટ બોલો તો બતાવું!
            `;
        }

        // -------------------------------------------------------------
        // C. Specific Real Estate Topics (Vastu, Loans, Amenities, Possession, Rent vs Buy)
        // -------------------------------------------------------------
        // 1. Vastu Queries
        else if (lower.includes("vastu") || lower.includes("વાસ્તુ") || lower.includes("east facing") || lower.includes("west facing")) {
            const vastuProjects = projectsCatalog.filter(p => p.vastu);
            let html = `✨ <strong>100% Vastu Compliant Projects in Surat:</strong><br>શાસ્ત્ર અને વાસ્તુ નિયમો મુજબ ડિઝાઈન કરેલા પ્રોજેક્ટ્સ:<br><br>`;

            vastuProjects.forEach(p => {
                html += `
                    <div class="ai-prop-recommend-card">
                        <img src="${p.img}" alt="${p.name}" onerror="this.src='${p.fallbackImg}'">
                        <div class="ai-card-info">
                            <strong>${p.name}</strong>
                            <span class="loc">📍 ${p.location}</span>
                            <span class="details" style="color:#16a34a; font-weight:600;">✔️ ${p.vastu}</span>
                            <div class="price-row">
                                <span class="price">${p.priceText}</span>
                                <a href="${p.link}" class="detail-btn">Details →</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            innerContent = html;
        }

        // 2. Home Loan & EMI & Bank Approvals
        else if (lower.includes("loan") || lower.includes("emi") || lower.includes("sbi") || lower.includes("hdfc") || lower.includes("bank") || lower.includes("લોન") || lower.includes("interest rate")) {
            innerContent = `
                🏦 <strong>Home Loan & Finance Guide:</strong><br>
                અમારા તમામ પ્રોજેક્ટ્સ <strong>RERA Approved</strong> અને બેંકો દ્વારા ચકાસાયેલા છે:<br>
                • <strong>Partner Banks:</strong> SBI, HDFC Bank, ICICI Bank, Bank of Baroda & Axis Bank.<br>
                • <strong>Funding Limit:</strong> 80% થી 85% સુધી લોન પ્રાપ્ય.<br>
                • <strong>EMI Example:</strong> ₹50 લાખની 20 વર્ષની લોન પર અંદાજે <strong>₹41,000/મહિને</strong> EMI આવે.<br><br>
                અમારી ફાઇનાન્સ ટીમ તમને ફ્રી ડોક્યુમેન્ટેશન ગાઇડન્સ આપશે!
                <br><button type="button" class="ai-contact-broker-btn" onclick="openContactBrokerModal('Home Loan Assistance')">📞 Request Free Loan Callback</button>
            `;
        }

        // 3. Possession & Ready to Move vs Under Construction
        else if (lower.includes("possession") || lower.includes("ready to move") || lower.includes("ready") || lower.includes("ક્યારે મળશે") || lower.includes("કબજો")) {
            innerContent = `
                🔑 <strong>Possession & Construction Status:</strong><br><br>
                🏡 <strong>Ready to Move:</strong><br>
                • <strong>Shreepad Celebrations</strong> (Gaurav Path, 3 BHK) - Immediate Possession<br>
                • <strong>Shreepad Inspire</strong> (Palanpur-Pal, 3 & 4 BHK) - Immediate Possession<br><br>
                🏗️ <strong>New Launch / Under Construction:</strong><br>
                • <strong>Orchid Gardenia</strong> (Palanpur) - Possession Dec 2026<br>
                • <strong>Anand Aspire</strong> (Jahangirabad) - Possession Mid 2026<br><br>
                <button type="button" class="ai-contact-broker-btn" onclick="openContactBrokerModal('Possession Details')">📞 Schedule Site Inspection</button>
            `;
        }

        // 4. Amenities & Facilities (Pool, Parking, Lift, Garden)
        else if (lower.includes("amenities") || lower.includes("facility") || lower.includes("pool") || lower.includes("parking") || lower.includes("lift") || lower.includes("garden") || lower.includes("gym")) {
            innerContent = `
                🌳 <strong>World-Class Amenities Offered:</strong><br>
                અમારા તમામ પ્રીમિયમ રેસિડેન્સમાં આપને મળશે:<br>
                ✔️ 24x7 3-Tier Security & CCTV Surveillance<br>
                ✔️ Covered Allocated Car Parking & EV Charging Stations<br>
                ✔️ Hi-Speed Automatic Lifts with Power Backup<br>
                ✔️ Modern Gym, Swimming Pool, Clubhouse & Landscape Podium Gardens<br>
                ✔️ Children Play Area & Senior Citizen Sitout Zone<br><br>
                તમારે કયા પ્રોજેક્ટની સ્પેસિફિક એમેનિટિઝ જાણવી છે?
            `;
        }

        // 5. Contact / Booking / Site Visit / Phone / Address / Broker
        else if (lower.includes("visit") || lower.includes("contact") || lower.includes("number") || lower.includes("broker") || lower.includes("call") || lower.includes("મુલાકાત") || lower.includes("ફોન") || lower.includes("address") || lower.includes("office")) {
            innerContent = `
                🚗 <strong>Free Site Visit & Consultation Booking:</strong><br>
                અમે તમને ફ્રી સાઇટ પીક-અપ એન્ડ ડ્રોપ તથા પ્રાઇસ બ્રોશર પ્રોવાઇડ કરીએ છીએ!<br><br>
                📍 <strong>Main Office:</strong> PrimeNest Realty, Gauravpath Road, Palanpur, Surat.<br>
                📞 <strong>Direct Call / WhatsApp:</strong> +91 98765 43210<br><br>
                તમારું નામ અને ફોન નંબર આપવા માટે નીચેના બટન પર કિલક કરો:
                <br><button type="button" class="ai-contact-broker-btn" onclick="openContactBrokerModal('Direct Site Visit Booking')">📞 Book Free Site Visit Now</button>
            `;
        }

        // 6. Project Comparison
        else if (lower.includes("vs") || lower.includes("compare") || lower.includes("difference") || lower.includes("સરખામણી")) {
            innerContent = `
                ⚖️ <strong>Top Project Comparison in Surat:</strong><br><br>
                🔹 <strong>Orchid Gardenia (Palanpur):</strong> ₹45L - ₹78L (2 & 3 BHK, 3.0 Acres Township, 8 Towers)<br><br>
                🔹 <strong>Anand Aspire (Jahangirabad):</strong> ₹47.4L - ₹67.5L (2 & 3 BHK, Beside D-Mart, Greenery)<br><br>
                🔹 <strong>Shreepad Inspire (Pal):</strong> ₹95L - ₹1.85 Cr (Ultra-Luxury 3 & 4 BHK, Ready to Move)<br><br>
                તમારા પરિવારની બજેટ અનુકૂળતા પ્રમાણે શ્રેષ્ઠ પસંદગી કરવા અમારી સાથે સંપર્ક કરો.
            `;
        }

        // 7. Cheap / Budget / Investment Queries
        else if (lower.includes("sastu") || lower.includes("cheap") || lower.includes("budget") || lower.includes("investment") || lower.includes("sasta") || lower.includes("ઓછા બજેટ")) {
            innerContent = `
                💰 <strong>Surat Value & Investment Properties:</strong><br>
                જો તમે સૌથી ઓછી કિંમતમાં હાઇ-રિટર્ન 2BHK / 3BHK શોધી રહ્યા હોવ તો આ શ્રેષ્ઠ વિકલ્પો છે:<br><br>
                1. <strong>Orchid Gardenia</strong> - ₹45.0 Lacs થી શરૂ<br>
                2. <strong>Anand Aspire</strong> - ₹47.4 Lacs થી શરૂ<br>
                3. <strong>Rameshwaram Ivaan</strong> - ₹51.3 Lacs થી શરૂ<br><br>
                આ પ્રોજેક્ટ્સમાં વાર્ષિક 10-12% એપ્રિશિયેશન અને સારું રેન્ટલ યીલ્ડ મળે છે.
            `;
        }
        else {
            // Check property matches
            const parsed = parseQuery(query);
            const matches = findMatchingProperties(parsed);

            if (matches.length > 0) {
                let text = `✅ <strong>તમારી જરૂરિયાત મુજબ શ્રેષ્ઠ પ્રોપર્ટીઝ:</strong><br>`;
                const filterSpecs = [];
                if (parsed.bhkNeeded) filterSpecs.push(`${parsed.bhkNeeded} BHK`);
                if (parsed.maxBudgetLakhs) filterSpecs.push(`બજેટ ₹${parsed.maxBudgetLakhs >= 100 ? (parsed.maxBudgetLakhs / 100) + ' Cr' : parsed.maxBudgetLakhs + ' Lacs'}`);
                if (parsed.location) filterSpecs.push(`લોકેશન: ${parsed.location.toUpperCase()}`);

                if (filterSpecs.length > 0) {
                    text += `<small style="color:#2563eb; font-weight:600;">(ફિલ્ટર: ${filterSpecs.join(' | ')})</small><br><br>`;
                } else {
                    text += `<br>`;
                }

                matches.forEach(p => {
                    text += `
                        <div class="ai-prop-recommend-card">
                            <img src="${p.img}" alt="${p.name}" onerror="this.src='${p.fallbackImg}'">
                            <div class="ai-card-info">
                                <strong>${p.name}</strong>
                                <span class="loc">📍 ${p.location}</span>
                                <span class="details">🛏 ${p.details}</span>
                                <div class="price-row">
                                    <span class="price">${p.priceText}</span>
                                    <a href="${p.link}" class="detail-btn">Details →</a>
                                </div>
                            </div>
                        </div>
                    `;
                });

                text += `<br><button type="button" class="ai-contact-broker-btn" onclick="openContactBrokerModal('${matches[0].name}')">📞 Talk to Broker for Best Price</button>`;
                innerContent = text;
            } else {
                // Friendly Smart Fallback
                innerContent = `
                    😊 <strong>હું તમારો પ્રશ્ન સમજી ગયો છું!</strong><br>
                    તમે સુરતમાં કોઈપણ પ્રોપર્ટી, લોકેશન કે બજેટ વિશે પૂછી શકો છો. આ રહ્યા અમારા સુપરહિટ રેસિડેન્શિયલ પ્રોજેક્ટ્સ:<br><br>
                    
                    <div class="ai-prop-recommend-card">
                        <img src="${projectsCatalog[0].img}" alt="${projectsCatalog[0].name}">
                        <div class="ai-card-info">
                            <strong>${projectsCatalog[0].name}</strong>
                            <span class="loc">📍 ${projectsCatalog[0].location}</span>
                            <span class="price">${projectsCatalog[0].priceText}</span>
                            <a href="${projectsCatalog[0].link}" class="detail-btn">View →</a>
                        </div>
                    </div>

                    <div class="ai-prop-recommend-card" style="margin-top:8px;">
                        <img src="${projectsCatalog[1].img}" alt="${projectsCatalog[1].name}">
                        <div class="ai-card-info">
                            <strong>${projectsCatalog[1].name}</strong>
                            <span class="loc">📍 ${projectsCatalog[1].location}</span>
                            <span class="price">${projectsCatalog[1].priceText}</span>
                            <a href="${projectsCatalog[1].link}" class="detail-btn">View →</a>
                        </div>
                    </div>

                    <br>વધુ માહિતી માટે લખો: <strong>"2BHK in Palanpur"</strong>, <strong>"50 lakh budget"</strong>, અથવા <strong>"Site Visit"</strong>!
                `;
            }
        }

        return abusePrefix + innerContent;
    }


    function parseQuery(text) {
        const lower = text.toLowerCase();
        let bhkNeeded = null;
        if (lower.includes("1bhk") || lower.includes("1 bhk") || lower.includes("1-bhk")) bhkNeeded = 1;
        else if (lower.includes("2bhk") || lower.includes("2 bhk") || lower.includes("2-bhk") || lower.includes("2 bhk")) bhkNeeded = 2;
        else if (lower.includes("3bhk") || lower.includes("3 bhk") || lower.includes("3-bhk") || lower.includes("3 bhk")) bhkNeeded = 3;
        else if (lower.includes("4bhk") || lower.includes("4 bhk") || lower.includes("4-bhk") || lower.includes("4 bhk")) bhkNeeded = 4;

        let maxBudgetLakhs = null;
        const lakhMatch = lower.match(/(\d+)\s*(lakh|lacs|lac|lakhs|l)/);
        const crMatch = lower.match(/(\d+(\.\d+)?)\s*(cr|crore|crores)/);

        if (lakhMatch) {
            maxBudgetLakhs = parseFloat(lakhMatch[1]);
        } else if (crMatch) {
            maxBudgetLakhs = parseFloat(crMatch[1]) * 100;
        }

        let location = null;
        if (lower.includes("palanpur-pal") || lower.includes("palanpur pal")) location = "palanpur-pal";
        else if (lower.includes("palanpur")) location = "palanpur";
        else if (lower.includes("jahangirabad") || lower.includes("dmart") || lower.includes("d-mart")) location = "jahangirabad";
        else if (lower.includes("gaurav path") || lower.includes("gauravpath") || lower.includes("gaurav")) location = "gaurav path";
        else if (lower.includes("pal")) location = "palanpur-pal";

        return { bhkNeeded, maxBudgetLakhs, location };
    }

    function findMatchingProperties(analysis) {
        return projectsCatalog.filter(p => {
            if (analysis.bhkNeeded && !p.bhk.includes(analysis.bhkNeeded)) return false;
            if (analysis.maxBudgetLakhs && p.minPrice > (analysis.maxBudgetLakhs * 1.15)) return false;
            if (analysis.location && !p.areaKey.includes(analysis.location) && !p.location.toLowerCase().includes(analysis.location)) return false;
            return true;
        });
    }

    injectAiWidget();
});
