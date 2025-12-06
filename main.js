/* MENUUU */
let menu = document.querySelector('.nav .menu');
let menuOpenIcon = document.querySelector('.menu_icon');
let menuCloseIcon =document.querySelector('.nav .menu_close');




const menuOpen = () =>{
    menuOpenIcon.style.opacity ="0"
    menuCloseIcon.style.opacity ='1'
    menu.style.opacity ='1'
    
    setTimeout(() =>{
        menuOpenIcon.style.display ='none'
        menuCloseIcon.style.display ='block'
        menu.style.display ="block"
    }, 300)
    
}

const menuClose = () =>{
    menuCloseIcon.style.opacity ="0"
    menuCloseIcon.style.display ='none'
    menuOpenIcon.style.opacity ='1'
    menuOpenIcon.style.display ='block'
    menu.style.display ='none'
   
}


menuOpenIcon.addEventListener('click' , menuOpen);
menuCloseIcon.addEventListener('click' , menuClose);


/* CARDSSS */
let cards = document.querySelectorAll('.latest__card')
let cardsImgs = document.querySelectorAll('.latest__card img')


for (let x = 0; x < cards.length; x++) {
    const cardAnimationOver = ()=> {
        
        setTimeout(() => {
            cardsImgs[x].src = 'images/product_pictures/prodimg2.webp'
            cardsImgs[x].style.opacity ='1'
        }, 200);
        
        
    }
    const cardAnimationOut = ()=> {
        cardsImgs[x].src = 'images/product_pictures/prodimg.webp'
    }


    cards[x].addEventListener('mouseover' , cardAnimationOver)
    cards[x].addEventListener('mouseout' , cardAnimationOut)
    
}

