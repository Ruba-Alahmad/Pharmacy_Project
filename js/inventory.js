const apiBase = "https://localhost:7131/api/pharmacist/Product"; // ضع رابط الباك هنا

// Fetch inventory on load
window.addEventListener("DOMContentLoaded", loadInventory);

async function loadInventory() {
  const tbody = document.getElementById("inventoryBody");
  tbody.innerHTML = "<tr><td colspan='10' class='text-center'>Loading...</td></tr>";

  try {
    const res = await fetch(apiBase);
    const data = await res.json();
    displayProducts(data);
  } catch (err) {
    tbody.innerHTML = "<tr><td colspan='10' class='text-center text-danger'>Error loading data</td></tr>";
  }
}

function displayProducts(products) {
  const tbody = document.getElementById("inventoryBody");
  tbody.innerHTML = "";

  products.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.productId}</td>
      <td>${p.productName}</td>
      <td>${p.category}</td>
      <td>${p.quantity}</td>
      <td>${p.barcode}</td>
      <td>${p.expiryDate}</td>
      <td>${p.supplierName}</td>
      <td>${p.purchasePrice}</td>
      <td>${p.salePrice}</td>
      <td>
        <button class="action-btn btn-edit" onclick="editProduct('${p.productId}')">
          <i class="fa fa-edit"></i> Edit
       </button>
       <button class="action-btn btn-delete" onclick="deleteProduct('${p.productId}')">
         <i class="fa fa-trash"></i> Delete
       </button>
      </td>`;

    tbody.appendChild(row);
  });
  }

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => filterProducts());
document.getElementById("categorySelect").addEventListener("change", () => filterProducts());

async function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = document.getElementById("categorySelect").value;

  const res = await fetch(apiBase);
  const data = await res.json();

  let filtered = data.filter(p =>
    p.productName.toLowerCase().includes(searchValue) ||
    p.barcode.toLowerCase().includes(searchValue)
  );

  if (selectedCategory) {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  displayProducts(filtered);
}

// Edit
function editProduct(id) {
  window.location.href = `edit-product.html?id=${id}`;
}

// Delete
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  await fetch(`${apiBase}/${id}`, { method: "DELETE" });
  loadInventory();
}
