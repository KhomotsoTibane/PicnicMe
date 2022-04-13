//array to store cart items for session storage
let cartStorage = [];
let cities = ["Pretoria", "Johannesburg"]

// set event listner to counter for number of products and check value for errors   
let quantityInputs = document.querySelectorAll(".cartQuantityInput");

quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener("change", quantityChanged)
});

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    cartUpdate();
}

//cart item constructor
class cartItem {
    constructor(imageSrc, itemName, itemPrice) {
        this.imageSrc = imageSrc;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
    }
}

//using session storage add items to cart when add to basket button is clicked
let addToCartButtons = document.querySelectorAll(".itemButton");

addToCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener("click", addToCartClicked);
});

function addToCartClicked(event) {


    //amimate the cart icon
    $(".cart").effect( "bounce", {times:1}, 1000 );
    

    let button = event.target;
    let item = button.parentElement;

    let newCartItem = new cartItem(
        item.querySelector(".img-thumbnail").src,
        item.querySelector(".itemTitle").innerText,
        item.querySelector(".itemPrice").innerText

    );

  
    cartStorage.push(newCartItem);

    sessionStorage.cartData = JSON.stringify(cartStorage);
    let c = document.getElementsByClassName(".cartTotalPrice");
    console.log(c);
    alert("item has been added to the cart and the total is: " + c);
    

   
}

if (sessionStorage.cartData) {

    cartStorage = JSON.parse(sessionStorage.cartData)

    cartStorage.forEach(single => {

        let cartRow = document.createElement("div");
        cartRow.classList.add("cartRow");
        let cartItems = document.querySelector(".cartItems");

        let cartRowContent = `
          <div class="cartItem cartColumn">
              <img class="cartItemImage" src="${single.imageSrc}" width="100" height="100" alt"try">
              <span class="cartItemTitle">${single.itemName}</span>
          </div>
              <span class="cartPrice cartColumn">${single.itemPrice}</span>
          <div class="cartQuantity cartColumn">
              <input class="cartQuantityInput" type="number" value="1">
              <button class="btn btn-danger " type="button">REMOVE</button>
          </div>
          `;

        console.log(cartRowContent);
        cartRow.innerHTML = cartRowContent;
        cartItems.append(cartRow);
        cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
        cartRow.querySelector(".cartQuantityInput").addEventListener("change", quantityChanged);


        function removeCartItem() {
            cartStorage.splice(single, 1);
            sessionStorage.cartData = JSON.stringify(cartStorage);
            location.reload();
        }

    });
    cartUpdate();
}

// update the cart so that the user can see
function cartUpdate() {
    let cartItemContainer = document.querySelectorAll(".cartItems")[0];
    let cartRows = cartItemContainer.querySelectorAll(".cartRow");
    let total = 0;
    let vatRate = 0.15;
    let vat = 0;

    cartRows.forEach(cartRow => {
        let priceElement = cartRow.querySelectorAll(".cartPrice")[0];
        let quantityElement = cartRow.querySelectorAll(".cartQuantityInput")[0];

        let price = parseFloat(priceElement.innerText.replace("R", " "));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        vat = total * vatRate;

    })

    total = Math.round(total * 100) / 100;
    vat = Math.round(vat * 100) / 100;
    document.querySelector(".cartVatTotalPrice").innerText = "R " + vat;
    total = total + vat;
    document.querySelector(".cartTotalPrice").innerText = "R " + total;
}

//generate a reference number when order is confirmed
let btnConfirm = document.querySelector(".btnConfirmOrder");

btnConfirm.addEventListener("click", () => {
    let refNum = "ord" + Math.random().toString(16).slice(2)
    alert("Your order has been confirmed, this is your order reference number" + refNum);
})



// function will show delivery cities when the deliver option is clicked, else it will hide the options
let collection = $("#optionCollection");

let deliver = $("#optionDelivery");

$("input[name=DeliverOption]").on("click", () => {
    if ($(collection).is(':checked')) {
        $(".dropbtn").hide()
    } else
    if ($(deliver).is(':checked')) {
        $(".dropbtn").show()
    }
});



//dropmenu for delivery locations
let x = $(".dropdownContent");
$(".dropbtn").on("click", () => {
    for (let index = 0; index <= cities.length - 1; index++) {
        let name = document.createElement("h6");
        name.innerText = cities[index];
        $(".dropdownContent").append(name);
    }
    $("#cityDropdown").toggleClass("visible");
});




  