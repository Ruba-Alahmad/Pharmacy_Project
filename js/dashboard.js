// -----------------------------
// API PLACEHOLDERS
// غيري الروابط لاحقاً لما الباك يجهز
// -----------------------------
const API_PRODUCTS = "https://localhost:7131/api/pharmacist/Product";    // المنتجــات
const API_REVENUE  = "placeholder/api/revenue";                          // المبيعات
const API_SHORTAGE = "placeholder/api/shortage";                         // الأدوية الناقصة
const API_SOLD     = "placeholder/api/sold";                             // المنتجات المباعة
const API_INVOICES = "placeholder/api/invoices";                         // الفواتير
const API_USERS    = "placeholder/api/users";                            // المستخدمين
const API_ENTRY    = "placeholder/api/entry-vouchers";                   // سندات الإدخال
const API_EXIT     = "placeholder/api/exit-vouchers";                    // سندات الإخراج



// -----------------------------
// تحميل البيانات عند فتح الصفحة
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
    loadDashboardData();
    setupDownloadMenu();
});


// -----------------------------
// زر Visit Inventory
// -----------------------------
function goToInventory() {
    window.location.href = "inventory.html";
}



// -----------------------------
// تحميل بيانات الداشبورد
// -----------------------------
async function loadDashboardData() {

    try {
        // --------- 1) DATA FROM REAL API (Products) ----------
        const productRes = await fetch(API_PRODUCTS);
        const productData = await productRes.json();

        const categories = new Set(productData.map(p => p.category));

        document.getElementById("medCount").textContent = productData.length;
        document.getElementById("productCount").textContent = productData.length;
        document.getElementById("productCategory").textContent = categories.size;

        // --------- 2) PLACEHOLDER VALUES ----------
        document.getElementById("revValue").textContent      = "12000₪";
        document.getElementById("revMonth").textContent      = "January";
        document.getElementById("shortageCount").textContent = "5";

        document.getElementById("soldCount").textContent     = "320";
        document.getElementById("invoiceCount").textContent  = "47";

        document.getElementById("userCount").textContent     = "6";

        document.getElementById("entryCount").textContent    = "14";
        document.getElementById("exitCount").textContent     = "9";

        document.getElementById("qrMonth").textContent       = "January";

    } catch (err) {
        console.error("API Error:", err);
    }
}



// -----------------------------
// Download Button Dropdown
// -----------------------------
function setupDownloadMenu() {
    const btn = document.getElementById('downloadBtn');
    const menu = document.getElementById('downloadMenu');

    btn.onclick = (e) => {
        e.stopPropagation();
        menu.setAttribute("aria-hidden",
            menu.getAttribute("aria-hidden") === "true" ? "false" : "true");
    };

    document.onclick = e => {
        if (!btn.contains(e.target) && !menu.contains(e.target))
            menu.setAttribute("aria-hidden", "true");
    };
}


// -----------------------------
// تحميل الملفات (placeholder فقط)
// -----------------------------
function downloadFile(type) {
    alert("Download " + type + " will be implemented later.");
}
