// Define DOM element variables:
let desserts_items_container = document.getElementById("dessert-items-container");
let cart_items_container = document.getElementById("cart-items-container");
let empty_cart_image = document.getElementById("empty-cart-image");
let empty_cart_text = document.getElementById("empty-cart-text");

// Fetch data object from file:
fetch("../data/data.json")
	.then((response) => response.json())
	.then((data) => {
		for (let index = 0; index < data.length; index++) {
			const data_item = data[index];

			// Create a new dessert item element
			const dessert_item = document.createElement("div");
			dessert_item.className = "dessert-item";
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

			// Append the dessert item to the desserts container:
			desserts_items_container.appendChild(dessert_item);

			// Assign elements within the dessert item into variables:
			const add_to_cart_button = dessert_item.querySelector(".add-to-cart-button");
			const default_button = dessert_item.querySelector(".button-content-default");
			const dynamic_button = dessert_item.querySelector(".button-content-dynamic");
			const item_button_count = dessert_item.querySelector(".item-button-count");
			const increment_icon = dessert_item.querySelector(".increment-icon");
			const decrement_icon = dessert_item.querySelector(".decrement-icon");

			let cartItemElement = null; // Store reference to cart item

			// Add to cart functionality
			const addToCartHandler = () => {
				add_to_cart_button.style.backgroundColor = "hsl(14, 86%, 42%)";
				default_button.style.display = "none";
				dynamic_button.style.display = "flex";

				// Create a new cart item element if it doesn't exist
				if (!cartItemElement) {
					cartItemElement = document.createElement("div");
					cartItemElement.className = "cart-item-row";
					cartItemElement.innerHTML = `
            <div class="item-name-amount-price">
              <p class="item-name">${data_item.name}</p>
              <div class="item-prices-row">
                <p class="item-number"><span class="number-output">1</span>x</p>
                <p class="unit-amount">$<span class="unit-amount-output">${parseFloat(
							data_item.price
						).toFixed(2)}</span></p>
                <p class="total-amount">$<span class="total-amount-output">${parseFloat(
							data_item.price
						).toFixed(2)}</span></p>
              </div>
            </div>
            <img src="./resources/images/icon-remove-item.svg" alt="" class="remove-icon" />
          `;

					cart_items_container.appendChild(cartItemElement);
				}

				item_button_count.textContent = 1;

				// Remove the event listener after a click
				add_to_cart_button.removeEventListener("click", addToCartHandler);
			};

			// Attach the event listener to the "Add to Cart" button
			add_to_cart_button.addEventListener("click", addToCartHandler);

			// Event listener for increment icon
			increment_icon.addEventListener("click", () => {
				if (cartItemElement) {
					const number_output = cartItemElement.querySelector(".number-output");
					const total_amount_output = cartItemElement.querySelector(".total-amount-output");
					const unit_price = parseFloat(
						cartItemElement.querySelector(".unit-amount-output").textContent
					);

					// Increase the count
					let count = parseInt(number_output.textContent) + 1;
					number_output.textContent = count;
					item_button_count.textContent = count;

					// Update total price
					total_amount_output.textContent = (unit_price * count).toFixed(2);
				}
			});

			// Event listener for decrement icon
			decrement_icon.addEventListener("click", () => {
				if (cartItemElement) {
					const number_output = cartItemElement.querySelector(".number-output");
					const total_amount_output = cartItemElement.querySelector(".total-amount-output");
					const unit_price = parseFloat(
						cartItemElement.querySelector(".unit-amount-output").textContent
					);

					// Decrease the count
					let count = parseInt(number_output.textContent);
					if (count > 1) {
						count -= 1;
						number_output.textContent = count;
						item_button_count.textContent = count;
						total_amount_output.textContent = (unit_price * count).toFixed(2);
					} else {
						// Remove from cart if count reaches 0
						cart_items_container.removeChild(cartItemElement);
						cartItemElement = null; // Reset reference
						dynamic_button.style.display = "none";
						default_button.style.display = "flex";
						add_to_cart_button.style.backgroundColor = "#F0F0F0";
					}
				}
			});
		}
	})
	.catch((error) => console.error("Error:", error));
