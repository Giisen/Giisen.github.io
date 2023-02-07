// let shop = document.getElementById("shop");

// let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];

// let generateShop = () => {
//   return (shop.innerHTML = shopItemsData
//     .map((x) => {
//       let { id, name, price, decription, img } = x;
//       let search = shoppingCart.find((x) => x.id === id) || [];
//       return `
//     <div id=product-id-${x.id} class="item">
//     <img class="shopImg" width="220px" height="217px"src=${x.img} alt=${x.name}>
//     <div class="details">
//         <h3>${x.name}</h3>
//         <p>${x.decription}</p>
//         <div class="price-quantity">
//             <h2>${x.price} kr</h2>
//             <div class="buttons">
//                 <i onclick="removeOneItem(${x.id})" class="bi bi-dash-lg"></i>
//                 <div id=${x.id} class="quantity">${
//         search.item === undefined ? 0 : search.item
//       }</div>
//                 <i onclick="addOneItem(${x.id})" class="bi bi-plus-lg"></i>
//             </div>
//         </div>
//     </div>
// </div>
//     `;
//     })
//     .join(""));
// };

// generateShop();

// let addOneItem = (id) => {
//   let selectedItem = id;
//   let search = shoppingCart.find((x) => x.id == selectedItem.id);

//   if (search === undefined) {
//     shoppingCart.push({
//       id: selectedItem.id,
//       item: 1,
//     });
//   } else {
//     search.item += 1;
//   }

//   update(selectedItem.id);
//   localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
// };
// let removeOneItem = (id) => {
//   let selectedItem = id;
//   let search = shoppingCart.find((x) => x.id == selectedItem.id);
//   if (search === undefined) return;
//   else if (search.item === 0) return;
//   else {
//     search.item -= 1;
//   }

//   update(selectedItem.id);
//   shoppingCart = shoppingCart.filter((x) => x.item !== 0);

//   localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
// };

// let update = (id) => {
//   let search = shoppingCart.find((x) => x.id == id);
//   document.getElementById(id).innerHTML = search.item;
//   totalItemsInCart();
// };

// let totalItemsInCart = () => {
//   let cartTotal = document.getElementById("cartAmount");
//   cartTotal.innerHTML = shoppingCart
//     .map((x) => x.item)
//     .reduce((x, y) => x + y, 0);
// };
// totalItemsInCart();

// // modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
