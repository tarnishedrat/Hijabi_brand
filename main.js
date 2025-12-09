/* -------Menu-------- */
const nav = document.querySelector('.nav');
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const burger = document.querySelector(".menu_icon");
    const closeIcon = document.querySelector(".menu_close");
    const nav = document.querySelector('.nav');

    burger.addEventListener("click", () => {
        menu.classList.add("active");
        nav.style.backgroundColor = '#000000';
        burger.classList.add("hide");
        closeIcon.classList.add("show");
        lockScroll();
    });

    closeIcon.addEventListener("click", () => {
        menu.classList.remove("active");
        nav.style.backgroundColor = 'transparent';
        closeIcon.classList.remove("show");
        burger.classList.remove("hide");
        unlockScroll();
    });
});

let scrollY = 0;

function lockScroll() {
    scrollY = window.scrollY;

    // Lock scrolling
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.width = "100%";

    // Hide scrollbar WITHOUT removing it (prevents shift)
    document.body.style.overflowY = "scroll";
}

function unlockScroll() {
    // Reset body styles
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.width = "";
    document.body.style.overflowY = "";

    // Restore scroll
    window.scrollTo(0, scrollY);
}


 




/* category */

let category = document.querySelector('.shop-category')
let categoryImgs = document.querySelectorAll('.shop-category img')



categoryImgs.forEach(img => {
    img.src ='images/product_pictures/prodimg3.webp'
})

/* nav */




window.addEventListener('scroll' , () =>{
    if(window.scrollY >= 140){
        nav.style.backgroundColor ='#000000'
    }
    else{
        nav.style.backgroundColor ='transparent'
    }
})

/* promo slider */


const promoText = document.querySelector(".promo-text");
const nextBtn = document.querySelector(".promo-next");
const prevBtn = document.querySelector(".promo-prev");

const promoMessages = [
    "Shipping is 7DT for all of Tunisia",
    "Black Friday Sale — Up to 40% Off",
    "New Arrivals Just Dropped",
    "Free Returns on All Orders",
    "Premium Quality. Luxury Fabrics."
];

let index = 0;
let autoSlide;

promoText.textContent = promoMessages[index];

/* Directions order */
const directions = ["up", "left", "right", "down"];
let dirIndex = 0;

function animateChange(newIndex, direction) {
    const exitClass = `exit-${direction}`;
    const enterClass = `enter-${direction}`;

    promoText.classList.add(exitClass);

    setTimeout(() => {
        promoText.textContent = promoMessages[newIndex];
        promoText.classList.remove(exitClass);

        promoText.classList.add(enterClass);

        setTimeout(() => {
            promoText.classList.add("enter-active");

            setTimeout(() => {
                promoText.classList.remove(enterClass, "enter-active");
            }, 50);

        }, 20);

    }, 400);

    index = newIndex;
}

function startAuto() {
    autoSlide = setInterval(() => {

        const direction = directions[dirIndex];
        dirIndex = (dirIndex + 1) % directions.length;

        let newIndex = (index + 1) % promoMessages.length;
        animateChange(newIndex, direction);

    }, 3000);
}

startAuto();

/* Manual Left */
prevBtn.addEventListener("click", () => {
    clearInterval(autoSlide);
    let newIndex = index - 1;
    if (newIndex < 0) newIndex = promoMessages.length - 1;

    animateChange(newIndex, "left");
    startAuto();
});

/* Manual Right */
nextBtn.addEventListener("click", () => {
    clearInterval(autoSlide);
    let newIndex = (index + 1) % promoMessages.length;

    animateChange(newIndex, "right");
    startAuto();
});

/* sectionss video */


const sectionMain = document.querySelector('.sections__video-box')
const sectionVideo = document.querySelector('.sections__video-box video')
const sectionPause = document.querySelector('.sections__video-box .pausebtn')
const sectionPlay = document.querySelector('.sections__video-box .playbtn')

console.log(sectionVideo)
const PauseVideo = () =>{
    sectionVideo.pause()
    sectionPause.style.display ='none'    
    sectionPlay.style.display ='block'    

}
const PlayVideo = () =>{
    sectionVideo.play()
    sectionPlay.style.display ='none'
    sectionPause.style.display ='block'
}


sectionPause.addEventListener('click' , PauseVideo)
sectionPlay.addEventListener('click' , PlayVideo)


/* sSCROLL */


const slider = document.querySelector('.latest-products.--best-sellers .--latest__card__scroll');
let isDragging = false;
let startX, scrollStart;

slider.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollStart = slider.scrollLeft;
    slider.classList.add('dragging');
    e.preventDefault();
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.classList.remove('dragging');
});
slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.classList.remove('dragging');
});

slider.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollStart - walk;
});

