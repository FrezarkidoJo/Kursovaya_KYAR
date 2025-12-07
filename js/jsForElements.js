function myFunction(){
    alert('hhd');
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