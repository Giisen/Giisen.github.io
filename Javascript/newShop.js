let shoppingCart = JSON.parse(localStorage.getItem("localStorageData")) || [];
const modal = document.getElementById("myModal");
const apilist = document.querySelector("#Weather-based-text");

async function getAPI() {
  // 57.71, 11.72;
  const url = new URL(
    "https://api.open-meteo.com/v1/forecast?latitude=61.71&longitude=12.72&current_weather=true&timezone=auto&daily=snowfall_sum"
  );

  const response = await fetch(url);
  if (response.status === 200) {
    const jsonResponse = await response.json();

    let totalSnow = 0.0;
    for (const snow of jsonResponse.daily.snowfall_sum) {
      totalSnow += snow;
    }
    filterSneakers(totalSnow);

    const cardText = document.createElement("div");
    cardText.innerText = totalSnow;
    if (totalSnow < 0.1) {
      cardText.innerText = `Barely any snow this week (less then 1cm), any sneaker will do!`;
    } else if (totalSnow < 10.0) {
      cardText.innerText = `Only some light snow this week (less then 10cm), we recommend these sneakers`;
    } else {
      cardText.innerText = `There has been some snow this week (more then 10cm), but what the hell, sneakers can be worn year round, espacially these`;
    }

    apilist.append(cardText);
  }
}
getAPI();

let proddata = shopItemsData;
let prodlist = document.querySelector("#products");

function clearFilter() {
  prodlist.replaceChildren();
  filterSneakers(0.0);
}

function filterSneakers(cm) {
  if (cm < 0.1) {
    proddata = shopItemsData;
  } else if (cm < 10.0) {
    proddata = shopItemsData.filter((element, index) => {
      return index % 2 === 0;
    });
  } else {
    proddata = shopItemsData.filter((element, index) => {
      return index % 2 !== 0;
    });
  }

  for (const prod of proddata) {
    //Skapa element
    const card = document.createElement("li");
    const cardheader = document.createElement("div");
    const cardbody = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardText = document.createElement("div");
    const cardPrice = document.createElement("div");
    const cardfooter = document.createElement("div");

    //Styla Element
    card.classList.add("card", "mb-4", "cursor-pointer");
    cardheader.classList.add("card-header", "fw-bold");
    cardbody.classList.add("card-body");
    cardText.classList.add("card-text");
    cardPrice.classList.add("card-price");
    cardfooter.classList.add("card-footer", "fw-light");
    cardImg.style.width = "100%";
    cardImg.style.height = "100%";
    cardImg.style.borderRadius = "15px";
    cardImg.alt = "${id.name}";

    // innehåll i element
    cardheader.innerText = prod.name;
    cardPrice.innerText = prod.price + " " + "kr";
    cardImg.src = prod.img;

    //sätta event på element
    card.onclick = () => {
      modal.style.display = "block";
      getItemInfo(prod.id, prod.name);
    };

    //Lägg till element i dom
    cardheader.append(cardPrice);
    cardfooter.append(cardPrice);
    cardbody.append(cardImg);
    card.append(cardheader, cardbody, cardfooter);
    prodlist.append(card);
  }
}

let addOneItem = (id) => {
  let selectedItem = id;
  let search = shoppingCart.find((x) => x.id == selectedItem.id);
  let sneaker = proddata.find((x) => x.id == selectedItem.id);
  if (search === undefined) {
    shoppingCart.push({
      id: selectedItem.id,
      price: sneaker.price,
      name: sneaker.name,
      img: sneaker.img,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItem.id);

  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

let removeOneItem = (id) => {
  let selectedItem = id;
  let search = shoppingCart.find((x) => x.id == selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  shoppingCart = shoppingCart.filter((x) => x.item !== 0);

  localStorage.setItem("localStorageData", JSON.stringify(shoppingCart));
};

let update = (id) => {
  let search = shoppingCart.find((x) => x.id == id);
  if (search === undefined) {
    return;
  } else {
    document.getElementById(id).innerHTML = search.item;
  }
  totalItemsInCart();
};

const totalItemsInCart = () => {
  let cartTotal = document.getElementById("cartAmount");
  const cartitems = shoppingCart.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartTotal.innerHTML = `
  <a>${cartitems}</a>
  <i class="bi bi-cart2"></i>
  `;
};
totalItemsInCart();

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function selectedName(name) {
  console.log(name);
  return name;
}

function getItemInfo(id) {
  const search = shopItemsData.find((x) => x.id === id) || [];

  const modalText = document.getElementById("modal-text");
  modalText.innerHTML = `
      <div id=product-id-${search.id} class="item">

        <div class="details">
          <h3>${search.name}</h3>
          <p>${search.decription}</p>
        </div>

        <div class="price-quantity">
                <h2>${search.price} kr</h2>
        </div>

        <div class="buttons">
          <i onclick="removeOneItem(${search.id})" class="bi bi-dash-lg">-</i>

          <div id=${search.id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
          </div>

          <i onclick="addOneItem(${search.id})" class="bi bi-plus-lg">+</i>
        </div>

      </div>
    `;

  update(id);
}
