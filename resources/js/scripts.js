// Define DOM element variables:
let desserts_items_container = document.getElementById("dessert-items-container");
let cart_items_container = document.getElementById("cart-items-container");
let empty_cart_image = document.getElementById("empty-cart-image");
let empty_cart_text = document.getElementById("empty-cart-text");

let dessert_data;

// Fetch data object from file:
fetch("../data/data.json")
	.then((response) => response.json())
	.then((data) => {
		// Use the imported data object
		for (let index = 0; index < data.length; index++) {
			const data_item = data[index];

			// Create a new dessert item element
			const dessert_item = document.createElement("div");
			dessert_item.className = "dessert-item"; // Optional: Add a class for styling
			dessert_item.innerHTML = `
          <div class="image-button-container">
            <img
              src="${data_item["image"]["desktop"]}"
              alt=""
              class="dessert-image"
              id="dessert-image"
            />
            <button class="add-to-cart-button">
              <div class="button-content-default">
                <img
                  src="./resources/images/icon-add-to-cart.svg"
                  alt=""
                  class="add-to-cart-icon"
                />Add to Cart
              </div>
              <div class="button-content-dynamic" style="display: none;">
                <img
                  src="./resources/images/icon-decrement-quantity.svg"
                  alt=""
                  class="count-icon decrement-icon"
                />
                <span class="item-button-count">0</span>
                <img
                  src="./resources/images/icon-increment-quantity.svg"
                  alt=""
                  class="count-icon increment-icon"
                />
              </div>
            </button>
          </div>
          <p class="dessert-type">${data_item.category}</p>
          <p class="dessert-specific">${data_item.name}</p>
          <p class="dessert-price">$${parseFloat(data_item.price).toFixed(2)}</p>
      `;

			// Append the dessert item to the dessert items container:
			desserts_items_container.appendChild(dessert_item);

			// Assign elements within the dessert item into variables:
			const add_to_cart_button = dessert_item.querySelector(".add-to-cart-button");
			const default_button = dessert_item.querySelector(".button-content-default");
			const dynamic_button = dessert_item.querySelector(".button-content-dynamic");
			const item_button_count = dessert_item.querySelector(".item-button-count");
			const increment_icon = dessert_item.querySelector(".increment-icon");
			const decrement_icon = dessert_item.querySelector(".decrement-icon");
			const item_count = dessert_item.querySelector("number-output");
			const unit_amount = dessert_item.querySelector("unit-amount-output");
			const total_amount = dessert_item.querySelector("total-amount-output");
			const remove_item = dessert_item.querySelector("remove-icon");

			// Define the event handler function for the "Add to Cart" button
			const addToCartHandler = () => {
				add_to_cart_button.style.backgroundColor = "hsl(14, 86%, 42%)"; // Modify button background color.
				default_button.style.display = "none"; // Hide the default button content.
				dynamic_button.style.display = "flex"; // Show the dynamic button content.

				// Create a new cart item element
				let selected_dessert_element = document.createElement("div");
				selected_dessert_element.innerHTML = `
          <div class="cart-item-row">
            <div class="item-name-amount-price">
              <p class="item-name">${data_item.name}</p>
              <div class="item-prices-row">
                <p class="item-number"><span class="number-output"></span>x</p>
                <p class="unit-amount">$<span class="unit-amount-output"></span></p>
                <p class="total-amount">$<span class="total-amount-output"></span></p>
              </div>
            </div>
            <img src="./resources/images/icon-remove-item.svg" alt="" class="remove-icon" />
          </div>
        `;
				cart_items_container.appendChild(selected_dessert_element);

				item_button_count.textContent = parseInt(item_button_count.textContent) + 1;

				// Remove the event listener after a click
				add_to_cart_button.removeEventListener("click", addToCartHandler);
			};

			// Attach the event listener to the "Add to Cart" button
			add_to_cart_button.addEventListener("click", addToCartHandler);

			// Event listener for increment icon
			increment_icon.addEventListener("click", () => {
				// Increase the count
				item_button_count.textContent = parseInt(item_button_count.textContent) + 1;
				item_count.textContent = parseInt(item_button_count.textContent);
			});

			// Event listener for decrement icon
			decrement_icon.addEventListener("click", () => {
				// Decrease the count only if it's greater than 0
				if (parseInt(item_button_count.textContent) > 1) {
					item_button_count.textContent = parseInt(item_button_count.textContent) - 1;
					item_count.textContent = parseInt(item_button_count.textContent);
				} else {
					// Reset button styles and states
					dynamic_button.style.display = "none";
					default_button.style.display = "flex";
					add_to_cart_button.style.backgroundColor = "#F0F0F0"; // Reset the background color.
				}
			});
		}
	})
	.catch((error) => console.error("Error:", error));
