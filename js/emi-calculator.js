// ==========================================
// HOME LOAN EMI CALCULATOR MODULE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const priceSlider = document.getElementById("emi-price-slider");
    const downPaymentSlider = document.getElementById("emi-dp-slider");
    const rateSlider = document.getElementById("emi-rate-slider");
    const tenureSlider = document.getElementById("emi-tenure-slider");

    const priceDisplay = document.getElementById("emi-price-val");
    const dpDisplay = document.getElementById("emi-dp-val");
    const rateDisplay = document.getElementById("emi-rate-val");
    const tenureDisplay = document.getElementById("emi-tenure-val");

    const emiMonthlyVal = document.getElementById("emi-monthly-result");
    const loanAmountVal = document.getElementById("emi-loan-amount");
    const totalInterestVal = document.getElementById("emi-total-interest");
    const totalPayableVal = document.getElementById("emi-total-payable");
    const progressPrincipal = document.getElementById("emi-progress-principal");

    const legendPrincipal = document.getElementById("legend-principal-pct");
    const legendInterest = document.getElementById("legend-interest-pct");
    const tenureBtns = document.querySelectorAll(".tenure-btn");

    if (!priceSlider || !downPaymentSlider || !rateSlider || !tenureSlider) return;

    function formatLakhsCr(val) {
        if (val >= 10000000) {
            return `₹${(val / 10000000).toFixed(2)} Cr`;
        } else if (val >= 100000) {
            return `₹${(val / 100000).toFixed(1)} Lacs`;
        }
        return `₹${val.toLocaleString('en-IN')}`;
    }

    function calculateEMI() {
        const price = parseFloat(priceSlider.value) || 6000000;
        const dpPercent = parseFloat(downPaymentSlider.value) || 20;
        const rate = parseFloat(rateSlider.value) || 8.5;
        const tenureYears = parseInt(tenureSlider.value) || 20;

        const downPaymentAmt = price * (dpPercent / 100);
        const principal = price - downPaymentAmt;

        // Displays
        priceDisplay.textContent = formatLakhsCr(price);
        dpDisplay.textContent = `${dpPercent}% (${formatLakhsCr(downPaymentAmt)})`;
        rateDisplay.textContent = `${rate.toFixed(1)}% p.a.`;
        tenureDisplay.textContent = `${tenureYears} Years`;

        // Monthly EMI Calculation
        // Formula: EMI = P * R * (1+R)^N / ((1+R)^N - 1)
        const monthlyRate = rate / (12 * 100);
        const totalMonths = tenureYears * 12;

        let emi = 0;
        if (monthlyRate > 0) {
            emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        } else {
            emi = principal / totalMonths;
        }

        const totalPayment = emi * totalMonths;
        const totalInterest = totalPayment - principal;

        // UI Updates
        emiMonthlyVal.textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
        loanAmountVal.textContent = formatLakhsCr(principal);
        totalInterestVal.textContent = formatLakhsCr(totalInterest);
        totalPayableVal.textContent = formatLakhsCr(totalPayment);

        // Percentages for Progress Bar
        const principalPct = Math.round((principal / totalPayment) * 100);
        const interestPct = 100 - principalPct;

        if (progressPrincipal) {
            progressPrincipal.style.width = `${principalPct}%`;
        }
        if (legendPrincipal) legendPrincipal.textContent = `Principal (${principalPct}%)`;
        if (legendInterest) legendInterest.textContent = `Interest (${interestPct}%)`;
    }

    // Event Listeners for Sliders
    priceSlider.addEventListener("input", calculateEMI);
    downPaymentSlider.addEventListener("input", calculateEMI);
    rateSlider.addEventListener("input", calculateEMI);
    tenureSlider.addEventListener("input", calculateEMI);

    // Tenure Quick Buttons
    tenureBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tenureBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            tenureSlider.value = btn.dataset.years;
            calculateEMI();
        });
    });

    // Initialize calculation
    calculateEMI();
});
