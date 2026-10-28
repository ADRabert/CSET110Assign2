const changePrice = () => {
	let totalPrice = 0;
	for (let i = 1; i < document.body.getElementsByClassName("cart-row").length; i++) {
		const cartPrice = Number(document.body.getElementsByClassName("cart-price")[i].innerText.replace('$', '')),
		cartQuant = Number(document.body.getElementsByClassName("cart-quantity-input")[i - 1].value);
		totalPrice += cartPrice * cartQuant;
	}
	document.body.getElementsByClassName("cart-total-price")[0].innerText = "$" + totalPrice.toFixed(2);
}, addToCart = (i) => {
	const shopItemTitle = document.body.getElementsByClassName("shop-item-title")[i].innerText,
	cartItemsArr = document.body.getElementsByClassName("cart-item-title");
	for (let n = 0; n < cartItemsArr.length; n++) if (cartItemsArr[n].innerText === shopItemTitle) {
		alert("Item already in cart.");
		return;
	}

	const cartRow = document.createElement("div");
	cartRow.className = "cart-row";
	document.body.getElementsByClassName("cart-items")[0].append(cartRow);

	const cartItem = document.createElement("div");
	cartItem.className = "cart-item cart-column";
	const cartPrice = document.createElement("span");
	cartPrice.className = "cart-price cart-column";
	const cartQuant = document.createElement("div");
	cartQuant.className = "cart-quantity cart-column";
	cartRow.append(...[cartItem, cartPrice, cartQuant]);

	const imgTag = document.createElement("img");
	imgTag.className = "cart-item-image",
	imgTag.src = document.body.getElementsByClassName("shop-item-image")[i].getAttribute("src");
	const titleTag = document.createElement("span");
	titleTag.className = "cart-item-title",
	titleTag.innerText = document.body.getElementsByClassName("shop-item-title")[i].innerText;
	cartItem.append(...[imgTag, titleTag]);

	cartPrice.innerText = document.body.getElementsByClassName("shop-item-price")[i].innerText;
	const quantInput = document.createElement("input");
	quantInput.className = "cart-quantity-input", quantInput.min = 1, quantInput.type = "number", quantInput.value = 1;
	quantInput.setAttribute("onclick", "changePrice(this)");
	const quantRemove = document.createElement("button");
	quantRemove.className = "btn btn-danger", quantRemove.innerText = "REMOVE", quantRemove.type = "button";
	quantRemove.setAttribute("onclick", "removeItem(this.parentNode)");
	cartQuant.append(...[quantInput, quantRemove]);

	changePrice();
}, removeItem = (node) => {
	node.parentNode.remove();
	changePrice();
}, purchaseItems = () => {
	const cartRows = document.body.getElementsByClassName("cart-row");
	if (!cartRows[1]) return;
	else while (cartRows[1]) cartRows[1].remove();
	document.body.getElementsByClassName("cart-total-price")[0].innerText = "$0.00";
	alert("Items purchased!");
}