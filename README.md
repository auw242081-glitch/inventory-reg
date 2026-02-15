# inventory-reg

## Project Summary
`inventory-reg` is a simple inventory registration portal built with:
- HTML (`index.html`)
- CSS (`styles.css`)
- JavaScript (`script.js`)
- JSON (`inventory.json`)

The app lets users register inventory items using a form and see each saved item in a list box immediately after saving.

## Features
- Inventory registration form with 5 input fields:
  - Item Name
  - SKU
  - Category
  - Quantity
  - Price (USD)
- One **Save** button to submit each inventory item
- Saved item details displayed in the list box on the page
- Local persistence using browser `localStorage`
- Initial seed data loaded from `inventory.json`

## File Details
- `index.html`
  - Defines the page layout, form inputs, save button, and list box UI.
- `styles.css`
  - Contains styling for layout, spacing, inputs, button, and list display.
- `script.js`
  - Handles form submission, data collection, save logic, list rendering, and data loading.
- `inventory.json`
  - Stores initial inventory data as a JSON array (currently empty: `[]`).

## How Save Works
1. User fills in the 5 fields and clicks **Save**.
2. JavaScript creates an inventory item object from form values.
3. The item is appended to the inventory array.
4. Data is saved to browser `localStorage`.
5. The list box refreshes and shows full details of the newly saved item.

## Running the Project
To run and validate this project, open `index.html` in any modern web browser.  
This is sufficient to review the interface and confirm whether the project is working as expected.
