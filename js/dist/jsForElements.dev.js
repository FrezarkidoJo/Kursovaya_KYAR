"use strict";

var _this = void 0;

function myFunction() {
  alert('hhd');
}

window.addEventListener('scroll', function (e) {
  document.documentElement.style.setProperty('--scrollTop', "".concat(_this.scrollY, "px"));
});
document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.card');
  var counter = document.querySelector('.updates__cardCounter');
  var allCards = document.querySelector('.updates__allCards');
  document.querySelector('.updates__rightButtonSlide').addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider(currentIndex);
  });
  document.querySelector('.updates__leftButtonSlide').addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider(currentIndex);
  });
  var currentIndex = 1;

  function updateSlider(index) {
    cards.forEach(function (card) {
      card.classList.remove('card--active', 'card--visible');
    });
    var prevIndex = (index - 1 + cards.length) % cards.length;
    var nextIndex = (index + 1) % cards.length;
    var cardsArray = Array.from(cards);
    var prevCard = cardsArray[prevIndex];
    var activeCard = cardsArray[index];
    var nextCard = cardsArray[nextIndex];
    allCards.innerHTML = '';
    allCards.appendChild(prevCard);
    allCards.appendChild(activeCard);
    allCards.appendChild(nextCard);
    prevCard.classList.add('card--visible');
    activeCard.classList.add('card--visible');
    nextCard.classList.add('card--visible');
    activeCard.classList.add('card--active');
    counter.textContent = "".concat(index + 1, "/").concat(cards.length);
  }

  updateSlider(currentIndex);
});