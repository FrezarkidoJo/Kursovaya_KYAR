function myFunction(){
    alert("Проверка работоспособности.")
}


window.addEventListener('scroll', e => {
	document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`)
})


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const counter = document.querySelector('.updates__cardCounter');
    const allCards = document.querySelector('.updates__allCards');
    document.querySelector('.updates__rightButtonSlide').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length; 
        updateSlider(currentIndex);
    });
    document.querySelector('.updates__leftButtonSlide').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length; 
        updateSlider(currentIndex);
    });
    let currentIndex = 1;
    function updateSlider(index) {
        cards.forEach(card => {
            card.classList.remove('card--active', 'card--visible');
        });
        const prevIndex = (index - 1 + cards.length) % cards.length;
        const nextIndex = (index + 1) % cards.length;
        const cardsArray = Array.from(cards);
        const prevCard = cardsArray[prevIndex];
        const activeCard = cardsArray[index];
        const nextCard = cardsArray[nextIndex];
        allCards.innerHTML = '';
        allCards.appendChild(prevCard);
        allCards.appendChild(activeCard);
        allCards.appendChild(nextCard);
        prevCard.classList.add('card--visible');
        activeCard.classList.add('card--visible');
        nextCard.classList.add('card--visible');
        activeCard.classList.add('card--active');
        counter.textContent = `${index + 1}/${cards.length}`;
    }
    updateSlider(currentIndex);
});


document.addEventListener('DOMContentLoaded', function() {
    const seasons = ['summer', 'autumn', 'winter', 'spring'];
    let currentIndex = 0;
    const baseLayer = document.querySelector('.layers__base');
    const middleLayer = document.querySelector('.layers__middle');
    const gradientLayer = document.querySelector('.layers__sleep');
    const bigVImage = document.querySelector('.content__bigV');
    const weatherText = document.querySelector('.wheather');
    const leftButton = document.querySelector('.left');
    const rightButton = document.querySelector('.right');
    let isAnimating = false;
    function changeImage(direction) {
        if (isAnimating) return;
        isAnimating = true;
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % 4;
        } else {
            currentIndex = (currentIndex - 1 + 4) % 4;
        }
        const baseImages = JSON.parse(baseLayer.getAttribute('data-images'));
        const middleImages = JSON.parse(middleLayer.getAttribute('data-images'));
        const bigVImages = JSON.parse(bigVImage.getAttribute('data-images'));
        const exitClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        const enterClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
        gradientLayer.classList.add('fade-out');
        bigVImage.classList.add(exitClass);
        setTimeout(() => {
            baseLayer.style.backgroundImage = `url(${baseImages[currentIndex]})`;
            middleLayer.style.backgroundImage = `url(${middleImages[currentIndex]})`;
            gradientLayer.classList.remove('fade-out');
            setTimeout(() => {
                bigVImage.src = bigVImages[currentIndex];
            }, 50);
            weatherText.textContent = seasons[currentIndex];
            bigVImage.classList.remove(exitClass);
            bigVImage.classList.add(enterClass);
            setTimeout(() => {
                bigVImage.classList.remove(enterClass);
                isAnimating = false;
            }, 300);
        }, 300);
        
    }
    leftButton.addEventListener('click', function() {
        changeImage('prev');
    });
    rightButton.addEventListener('click', function() {
        changeImage('next');
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            changeImage('prev');
        } else if (event.key === 'ArrowRight') {
            changeImage('next');
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.footer__nav-item').forEach(item => {
        const icon = item.querySelector('.footer__nav-icon');
        if (!icon || !icon.src.endsWith('.svg')) return;
        fetch(icon.src)
            .then(r => r.text())
            .then(svgText => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svg = svgDoc.querySelector('svg');
                if (!svg) return;
                svg.classList.add('footer__nav-icon');
                svg.querySelectorAll('[fill]').forEach(el => {
                    el.style.fill = 'var(--icon-color, rgb(199, 0, 0))';
                });
                icon.replaceWith(svg);
            })
            .catch(e => console.log('SVG error:', e));
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__nav-burger');
    const nav = document.querySelector('.header__nav');
    
    // Открыть/закрыть меню
    burger.onclick = function() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };
    
    // Закрыть меню при клике на ссылку
    document.querySelectorAll('.header__nav-link').forEach(link => {
        link.onclick = function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        };
    });
});