"use strict";

var _this = void 0;

function myFunction() {
  alert("Проверка работоспособности.");
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
document.addEventListener('DOMContentLoaded', function () {
  var seasons = ['summer', 'autumn', 'winter', 'spring'];
  var currentIndex = 0;
  var baseLayer = document.querySelector('.layers__base');
  var middleLayer = document.querySelector('.layers__middle');
  var gradientLayer = document.querySelector('.layers__sleep');
  var bigVImage = document.querySelector('.content__bigV');
  var weatherText = document.querySelector('.wheather');
  var leftButton = document.querySelector('.left');
  var rightButton = document.querySelector('.right');
  var isAnimating = false;

  function changeImage(direction) {
    if (isAnimating) return;
    isAnimating = true;

    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % 4;
    } else {
      currentIndex = (currentIndex - 1 + 4) % 4;
    }

    var baseImages = JSON.parse(baseLayer.getAttribute('data-images'));
    var middleImages = JSON.parse(middleLayer.getAttribute('data-images'));
    var bigVImages = JSON.parse(bigVImage.getAttribute('data-images'));
    var exitClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    var enterClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
    gradientLayer.classList.add('fade-out');
    bigVImage.classList.add(exitClass);
    setTimeout(function () {
      baseLayer.style.backgroundImage = "url(".concat(baseImages[currentIndex], ")");
      middleLayer.style.backgroundImage = "url(".concat(middleImages[currentIndex], ")");
      gradientLayer.classList.remove('fade-out');
      setTimeout(function () {
        bigVImage.src = bigVImages[currentIndex];
      }, 50);
      weatherText.textContent = seasons[currentIndex];
      bigVImage.classList.remove(exitClass);
      bigVImage.classList.add(enterClass);
      setTimeout(function () {
        bigVImage.classList.remove(enterClass);
        isAnimating = false;
      }, 300);
    }, 300);
  }

  leftButton.addEventListener('click', function () {
    changeImage('prev');
  });
  rightButton.addEventListener('click', function () {
    changeImage('next');
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      changeImage('prev');
    } else if (event.key === 'ArrowRight') {
      changeImage('next');
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.footer__nav-item').forEach(function (item) {
    var icon = item.querySelector('.footer__nav-icon');
    if (!icon || !icon.src.endsWith('.svg')) return;
    fetch(icon.src).then(function (r) {
      return r.text();
    }).then(function (svgText) {
      var parser = new DOMParser();
      var svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      var svg = svgDoc.querySelector('svg');
      if (!svg) return;
      svg.classList.add('footer__nav-icon');
      svg.querySelectorAll('[fill]').forEach(function (el) {
        el.style.fill = 'var(--icon-color, rgb(199, 0, 0))';
      });
      icon.replaceWith(svg);
    })["catch"](function (e) {
      return console.log('SVG error:', e);
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.header__nav-burger');
  var nav = document.querySelector('.header__nav'); // Открыть/закрыть меню

  burger.onclick = function () {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }; // Закрыть меню при клике на ссылку


  document.querySelectorAll('.header__nav-link').forEach(function (link) {
    link.onclick = function () {
      burger.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
    };
  });
});