const form = document.getElementById("inventoryForm");
const inventoryList = document.getElementById("inventoryList");
const statusText = document.getElementById("statusText");
const storageKey = "inventoryItems";

let inventoryItems = [];

function formatListItem(item) {
  const price = Number(item.price);
  const safePrice = Number.isFinite(price) ? price.toFixed(2) : "0.00";
  return `${item.itemName} | SKU: ${item.sku} | Category: ${item.category} | Qty: ${item.quantity} | $${safePrice}`;
}

function renderInventoryList() {
  inventoryList.innerHTML = "";

  if (!inventoryItems.length) {
    const option = document.createElement("option");
    option.textContent = "No inventory items saved yet.";
    option.disabled = true;
    option.selected = true;
    inventoryList.appendChild(option);
    return;
  }

  inventoryItems.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = `${item.sku}-${index}`;
    option.textContent = formatListItem(item);
    inventoryList.appendChild(option);
  });
}

function saveToLocalStorage() {
  localStorage.setItem(storageKey, JSON.stringify(inventoryItems));
}

async function loadInventoryData() {
  const savedData = localStorage.getItem(storageKey);

  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed)) {
        inventoryItems = parsed;
      }
    } catch (error) {
      console.error("Could not parse local storage data.", error);
    }
    renderInventoryList();
    return;
  }

  try {
    const response = await fetch("inventory.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load inventory.json (${response.status})`);
    }
    const fileData = await response.json();
    if (Array.isArray(fileData)) {
      inventoryItems = fileData;
      saveToLocalStorage();
    }
  } catch (error) {
    console.error("Could not load inventory.json.", error);
  }

  renderInventoryList();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const item = {
    itemName: form.itemName.value.trim(),
    sku: form.sku.value.trim(),
    category: form.category.value.trim(),
    quantity: Number(form.quantity.value),
    price: Number(form.price.value)
  };

  inventoryItems.push(item);
  saveToLocalStorage();
  renderInventoryList();

  statusText.textContent = `Saved: ${item.itemName} (${item.sku})`;
  form.reset();
  form.itemName.focus();
});

loadInventoryData();
