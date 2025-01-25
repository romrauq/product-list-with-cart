// Define DOM element variables:
const desserts_items_container = document.getElementById("dessert-items-container");
const add_to_cart_button = document.getElementById("add-to-cart-button");
const empty_cart_image = document.getElementById("empty-cart-image");
const empty_cart_text = document.getElementById("empty-cart-text");

let dessert_data;

// Fetch data object from file:
fetch("../data/data.json")
	.then((response) => response.json())
	.then((data) => {
		// Use the imported data object
		console.log(data.length);

		for (let index = 0; index < data.length; index++) {
			const data_item = data[index];

			const dessert_item = document.createElement("div");
			dessert_item.innerHTML = `
		<div class="image-button-container">
							<img
								src="${data_item["image"]["desktop"]}"
								alt=""
								class="dessert-image"
								id="dessert-image"
							/>
							<button>
								<div class="button-content-default">
									<img
										src="./resources/images/icon-add-to-cart.svg"
										alt=""
										class="add-to-cart-button"
										id="add-to-cart-button"
									/>Add to Cart
								</div>

								<div class="button-content-dynamic">
									<img
										src="./resources/images/icon-decrement-quantity.svg"
										alt=""
										class="count-icon decrement-icon"
									/>
									<span class="item-button-count">4</span>
									<img
										src="./resources/images/icon-increment-quantity.svg"
										alt=""
										class="count-icon increment-icon"
									/>
								</div>
							</button>
						</div>

						<p class="dessert-type" id="dessert-type">${data_item.category}</p>
						<p class="dessert-specific" id="dessert-specific">${data_item.name}</p>
						<p class="dessert-price" id="dessert-price">$${parseFloat(data_item.price).toFixed(2)}</p>
	`;
			// Dynamically render (all) dessert item elements into container element:
			desserts_items_container.appendChild(dessert_item);
		}
	})
	.catch((error) => console.error("Error:", error));
