const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const carListDiv = document.getElementById("car-list");
const basketDiv = document.getElementById("basket");
const basketItemsDiv = document.getElementById("basket-items");
const basketTotalDiv = document.getElementById("basket-total");

const cars = [
  {
    image:
      "https://www.wyborkierowcow.pl/wp-content/uploads/2019/08/Honda-Accord-VIII-21-1.jpg",
    make: "Honda",
    model: "Accord",
    price: 50,
    bookings: [],
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg",
    make: "Toyota",
    model: "Camry",
    price: 55,
    bookings: [],
  },
  {
    image: "https://bi.im-g.pl/im/d6/22/16/z23210454IH,Ford-Fusion-2018.jpg",
    make: "Ford",
    model: "Fusion",
    price: 45,
    bookings: [],
  },
];

let basket = [];

function displayCars() {
  carListDiv.innerHTML = ""; // Clear the car list
  for (const car of cars) {
    const carDiv = document.createElement("div");
    carDiv.classList.add("car");
    carDiv.innerHTML = `
      <img src="${car.image}">
      <h3>${car.make} ${car.model}</h3>
      <div class="details">
        <div class="price">$${car.price}/day</div>
        <button class="book">Book</button>
      </div>
    `;
    carDiv.querySelector(".book").addEventListener("click", () => {
      addToBasket(car);
    });
    carListDiv.appendChild(carDiv);
  }
}

function addToBasket(car) {
  basket.push(car);
  updateBasket();
}

function updateBasket() {
  basketItemsDiv.innerHTML = ""; // Clear the basket items
  let total = 0;
  for (const car of basket) {
    const basketItemDiv = document.createElement("div");
    basketItemDiv.classList.add("basket-item");
    basketItemDiv.innerHTML = `
      <div>${car.make} ${car.model}</div>
      <div>$${car.price}/day</div>
      <div class="remove">X</div>
    `;
    basketItemDiv.querySelector(".remove").addEventListener("click", () => {
      removeFromBasket(car);
    });
    basketItemsDiv.appendChild(basketItemDiv);
    total += car.price;
  }
  basketTotalDiv.textContent = `Total: $${total}`;
  basketDiv.style.display = basket.length > 0 ? "block" : "none";
}

function removeFromBasket(car) {
  basket = basket.filter((c) => c !== car);
  updateBasket();
}

displayCars();

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  if (startDate > endDate) {
  } else {
    // Filter cars based on availability
    const availableCars = cars.filter((car) => {
      // Check if the car is booked within the selected dates
      for (const booking of car.bookings) {
        const bookingStart = new Date(booking.start);
        const bookingEnd = new Date(booking.end);
        if (
          (startDate >= bookingStart && startDate < bookingEnd) ||
          (endDate > bookingStart && endDate <= bookingEnd)
        ) {
          return false;
        }
      }
      return true;
    });
    displayCars(availableCars);
  }
});
