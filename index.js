const API_URL = "http://localhost:3000/sales";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sales-form");
  const tableBody = document.getElementById("sales-table-body");

  function getSalesRecords() {
    fetch(API_URL)
      .then(res => res.json())
      .then(sales => {
        sales.forEach(sale => loadSaleRecord(sale));
      })
      .catch(err => console.error("Fetch error:", err));
  }

  function editSale(id) {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(sale => {
        document.getElementById("productName").value = sale.productName;
        document.getElementById("productCategory").value = sale.category;
        document.getElementById("salesAmount").value = sale.amount;
        document.getElementById("productStatus").value = sale.status;
        
        form.dataset.editId = id;
        document.querySelector("#sales-form button[type='submit']").textContent = "Update Record";
        
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(err => console.error("Fetch error:", err));
  }

  function loadSaleRecord(sale) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", sale.id);
    
    row.innerHTML = `
      <td>${sale.id}</td>
      <td>${sale.productName}</td>
      <td>${sale.category}</td>
      <td>$${sale.amount}</td>
      <td>
        <span class="badge ${sale.status === 'In Stock' ? 'bg-success' : 'bg-danger'}">
          ${sale.status}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-warning edit-btn" data-id="${sale.id}">
          <i class="bi bi-pencil"></i> Edit
        </button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${sale.id}">
          <i class="bi bi-trash"></i> Delete
        </button>
      </td>
    `;
    
    tableBody.appendChild(row);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const productName = document.getElementById("productName").value;
    const productCategory = document.getElementById("productCategory").value;
    const salesAmount = document.getElementById("salesAmount").value;
    const productStatus = document.getElementById("productStatus").value;

    const saleObject = {
      productName: productName,
      category: productCategory,
      amount: salesAmount,
      status: productStatus
    };

    const editId = form.dataset.editId;

    if (editId) {
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saleObject)
      })
        .then(res => res.json())
        .then(() => {
          delete form.dataset.editId;
          document.querySelector("#sales-form button[type='submit']").textContent = "Add Record";
          form.reset();
          tableBody.innerHTML = "";
          getSalesRecords();
        })
        .catch(err => console.error("PUT error:", err));
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saleObject)
      })
        .then(res => res.json())
        .then(sale => {
          loadSaleRecord(sale);
          form.reset();
        })
        .catch(err => console.error("POST error:", err));
    }
  });

  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn") || e.target.closest(".edit-btn")) {
      const button = e.target.classList.contains("edit-btn") ? e.target : e.target.closest(".edit-btn");
      const id = button.getAttribute("data-id");
      editSale(id);
    }
  });

  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn") || e.target.closest(".delete-btn")) {
      const button = e.target.classList.contains("delete-btn") ? e.target : e.target.closest(".delete-btn");
      const id = button.getAttribute("data-id");
      
      if (confirm("Are you sure you want to delete this record?")) {
        fetch(`${API_URL}/${id}`, {
          method: "DELETE"
        })
          .then(() => {
            const row = document.querySelector(`tr[data-id="${id}"]`);
            row.remove();
          })
          .catch(err => console.error("DELETE error:", err));
      }
    }
  });

  getSalesRecords();
});