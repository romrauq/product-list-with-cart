// Define DOM element variables:
let desserts_items_container = document.getElementById("dessert-items-container");
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
                <span class="item-button-count">1</span>
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

			// Append the dessert item to the container
			desserts_items_container.appendChild(dessert_item);

			// Add event listener to the "Add to Cart" button
			const add_to_cart_button = dessert_item.querySelector(".add-to-cart-button");
			const default_button = dessert_item.querySelector(".button-content-default");
			const dynamic_button = dessert_item.querySelector(".button-content-dynamic");
			const item_button_count = dessert_item.querySelector(".item-button-count");
			const increment_icon = dessert_item.querySelector(".increment-icon");
			const decrement_icon = dessert_item.querySelector(".decrement-icon");

			add_to_cart_button.addEventListener("click", () => {
				// Change button background color:
				add_to_cart_button.style.backgroundColor = "hsl(14, 86%, 42%)";

				// Hide the default button content
				default_button.style.display = "none";

				// Show the dynamic button content
				dynamic_button.style.display = "flex";
			});

			// Event listener for increment icon
			increment_icon.addEventListener("click", () => {
				// Increase the count
				let current_count = parseInt(item_button_count.textContent);
				item_button_count.textContent = current_count + 1;
			});

			// Event listener for decrement icon
			decrement_icon.addEventListener("click", () => {
				// Decrease the count only if it's greater than 1
				let current_count = parseInt(item_button_count.textContent);
				if (current_count > 1) {
					item_button_count.textContent = current_count - 1;
				}
			});
		}
	})
	.catch((error) => console.error("Error:", error));
