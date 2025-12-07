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

