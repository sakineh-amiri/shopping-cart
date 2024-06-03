let $ = document;
let shopItems = $.querySelector(".shop-items");
let cartItems = $.querySelector(".cart-items");
let purchaseBtn = $.getElementsByClassName("btn btn-primary btn-purchase");
let spanTotalPrice = $.querySelector(".cart-total-price");
dataCards = [
  { id: 1, src: "Images/Album 1.png", price: 12.99 },
  { id: 2, src: "Images/Album 2.png", price: 15.59 },
  { id: 3, src: "Images/Album 3.png", price: 18.49 },
  { id: 4, src: "Images/Album 4.png", price: 10.78 },
  { id: 5, src: "Images/Shirt.png", price: 25.97 },
  { id: 6, src: "Images/Album 1.png", price: 13.45 },
];
dataCards.forEach(function (item) {
  let shopItemDiv = $.createElement("div");
  shopItemDiv.setAttribute("class", "shop-item");

  let spanName = $.createElement("span");
  spanName.setAttribute("class", "shop-item-title");
  spanName.innerHTML = "Album " + item.id;

  let imageElem = $.createElement("img");
  imageElem.setAttribute("class", "shop-item-image");
  imageElem.src = item.src;

  let shopItemDetailsDiv = $.createElement("div");
  shopItemDetailsDiv.setAttribute("class", "shop-item-details");

  let spanPrice = $.createElement("span");
  spanPrice.setAttribute("class", "shop-item-price");
  spanPrice.innerHTML = "$" + item.price;

  let buttonAdd = $.createElement("button");
  buttonAdd.setAttribute("class", "btn btn-primary shop-item-button");
  buttonAdd.type = "button";
  buttonAdd.innerHTML = "ADD TO CART";
  buttonAdd.addEventListener("click", addItemToCart);
  buttonAdd.id = item.id;

  //placement
  shopItemDetailsDiv.append(spanPrice, buttonAdd);
  shopItemDiv.append(spanName, imageElem, shopItemDetailsDiv);
  shopItems.append(shopItemDiv);
});
//this function give info and generate cart item
//event line 49
function addItemToCart(event) {
  // console.log(event);
  let cartRowDiv = $.createElement("div");
  cartRowDiv.setAttribute("class", "cart-row");

  let cartColumnDiv = $.createElement("div");
  cartColumnDiv.setAttribute("class", "cart-item cart-column");

  let imgCart = $.createElement("img");
  imgCart.setAttribute("class", "cart-item-image");
  //search array object e.g
  function checkId(value) {
    console.log(value.id, event.target.id);
    if (+value.id === +event.target.id) {
      return value;
    }
  }
  // console.log(dataCards.find(checkId));
  let item = dataCards.find(checkId);
  imgCart.src = item.src;
  cartColumnDiv.id = item.id;

  let spanCart = $.createElement("span");
  spanCart.setAttribute("class", "cart-item-title");
  spanCart.innerHTML = "Album " + item.id;

  let spanPriceCart = $.createElement("span");
  spanPriceCart.setAttribute("class", "cart-price cart-column");
  spanPriceCart.innerHTML = "$" + item.price;

  let cartQuantityDiv = $.createElement("div");
  cartQuantityDiv.setAttribute("class", "cart-quantity cart-column");

  var cartQuantityInput = $.createElement("input");
  cartQuantityInput.setAttribute("type", "number");
  cartQuantityInput.setAttribute("class", "cart-quantity-input");
  cartQuantityInput.value = "1";
  cartQuantityInput.addEventListener("change", totalCalculationPrice);

  let cartQuantityBtn = $.createElement("button");
  cartQuantityBtn.setAttribute("class", "btn btn-danger");
  cartQuantityBtn.innerHTML = "REMOVE";
  cartQuantityBtn.addEventListener("click", removeCartItem);

  //replace
  cartColumnDiv.append(imgCart, spanCart);
  cartQuantityDiv.append(cartQuantityInput, cartQuantityBtn);
  cartRowDiv.append(cartColumnDiv, spanPriceCart, cartQuantityDiv);
  cartItems.append(cartRowDiv);

  totalCalculationPrice();
}
//event for remove btn in line101
function removeCartItem(event) {
  event.target.parentNode.parentNode.remove();
  totalCalculationPrice();
}

//event for purchase btn
purchaseBtn[0].addEventListener("click", goToPay);

function goToPay() {
  let cartItemsToRemove = $.getElementsByClassName("cart-items");

  cartItemsToRemove[0].innerHTML = "";
  totalCalculationPrice();
}

function totalCalculationPrice() {
  let cartItemsToCalculateTotalPrice = $.getElementsByClassName("cart-items");
  let totalAmount = 0;
  if (Array.from(cartItemsToCalculateTotalPrice[0].children) === "") {
    console.log("yes");
    return totalAmount;
  } else {
    Array.from(cartItemsToCalculateTotalPrice[0].children).forEach(function (
      item
    ) {
      function checkId(data) {
        console.log(item.firstChild.id, data.id, data);
        if (+data.id === +item.firstChild.id) {
          return data;
        }
      }
      let id = dataCards.find(checkId);

      totalAmount += id.price * +item.lastChild.firstChild.value;
      console.log(totalAmount, item.lastChild.firstChild);
    });
  }
  spanTotalPrice.innerHTML = "$" + totalAmount.toFixed(2);
}
