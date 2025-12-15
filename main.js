/* -------Menu-------- */
const nav = document.querySelector('.nav__main');
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const burger = document.querySelector(".menu_icon");
    const closeIcon = document.querySelector(".menu_close");
    const nav = document.querySelector('.nav__main');
    console.log(nav)
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
const sectionVideo = document.querySelectorAll('.sections__video-box .sections__video')

const sectionPause = document.querySelectorAll('.sections__video-box .pausebtn')
const sectionPlay = document.querySelectorAll('.sections__video-box .playbtn')

console.log(sectionVideo , sectionPause , sectionPlay)
const PauseVideo = () =>{
    sectionVideo.forEach(vid => vid.pause())
    sectionPause.forEach(p => p.style.display ='none' )
    sectionPlay.forEach(p => p.style.display ='block' )
 

}
const PlayVideo = () =>{
    sectionVideo.forEach(vid => vid.play())
    sectionPlay.forEach(p => p.style.display ='none' )
    sectionPause.forEach(p => p.style.display ='block' )
}


sectionPause.forEach(p =>p.addEventListener('click' , PauseVideo))
sectionPlay.forEach(p =>p.addEventListener('click' , PlayVideo))





/* shop by category  */





/* CATEGORY SHOP SLIDER  */



const shopCategorySection = document.querySelector('.shop-category');
const headlineContainer = document.querySelector('.shop__headline__container');
const headline = document.querySelector('.shop__headline');
const shopContainer = document.querySelector('.shop__container');
const productCards = document.querySelectorAll('.shop__prod__container');
const productLinks = document.querySelectorAll('.shop__prod__container a');
const imgBoxes = document.querySelectorAll('.shop__img-box');
const images = document.querySelectorAll('.shop__img');
const arrows = document.querySelectorAll('.shop__title svg');
const slideRR = document.querySelector('.shop__slider');
const sliderLeft = document.querySelector('.shop__slider .fa-chevron-left');
const sliderRight = document.querySelector('.shop__slider .fa-chevron-right');
const shopSliderSpan = document.querySelector('.shop__slider span')
const productCardsLength = productCards.length;
const scrollableWidth = shopContainer.scrollWidth - shopContainer.clientWidth;

// how much scroll corresponds to **one card**
const scrollPerCard = scrollableWidth / productCardsLength;


/* cardscroll */
const latestCardScroll = document.querySelector('.--latest__card__scroll')
/*  */


let hasScrolledShop = false;
let hasScrolledBestSellers = false;

window.addEventListener('scroll', () => {

    // ----- SHOP CONTAINER -----
    const shopBottom = shopContainer.offsetTop + shopContainer.offsetHeight;
    if (!hasScrolledShop && window.scrollY + window.innerHeight >= shopBottom) {
        hasScrolledShop = true;
        const shopHalf = (shopContainer.scrollWidth - shopContainer.clientWidth) / 2;
        shopContainer.scrollLeft = shopHalf; // instant
    }

    // ----- BEST SELLERS -----
    const bestSellersBottom = latestCardScroll.offsetTop + latestCardScroll.offsetHeight;
    if (!hasScrolledBestSellers && window.scrollY + window.innerHeight >= bestSellersBottom) {
        hasScrolledBestSellers = true;
        const bestHalf = (latestCardScroll.scrollWidth - latestCardScroll.clientWidth) / 2;
        latestCardScroll.scrollLeft = bestHalf; // instant
    }

});

(function () {
  // Select elements inside the IIFE to avoid external dependency
  const shopContainer = document.querySelector('.shop__container');
  const productCards = document.querySelectorAll('.shop__prod__container');
  const shopSliderSpan = document.querySelector('.shop__slider span');
  const sliderLeft = document.querySelector('.shop__slider .fa-chevron-left');
  const sliderRight = document.querySelector('.shop__slider .fa-chevron-right');

  // Bail early with helpful logs if required elements aren't found
  if (!shopContainer) { console.warn('Shop slider: .shop__container not found'); return; }
  if (!productCards || productCards.length === 0) { console.warn('Shop slider: .shop__prod__container not found'); return; }
  if (!shopSliderSpan) { console.warn('Shop slider: counter span not found (.shop__slider span)'); /* continue, counter optional */ }

  const productCardsLength = productCards.length;

  // Measurements and state
  let maxScroll = Math.max(0, shopContainer.scrollWidth - shopContainer.clientWidth);
  let scrollPerCard = productCardsLength > 1 ? maxScroll / (productCardsLength - 1) : maxScroll;
  const TOLERANCE = 6; // px tolerance for near-start / near-end
  let currentIndex = 0;

  // Recalculate sizes (call on init and resize)
  function recalc() {
    maxScroll = Math.max(0, shopContainer.scrollWidth - shopContainer.clientWidth);
    scrollPerCard = productCardsLength > 1 ? maxScroll / (productCardsLength - 1) : maxScroll;
  }
  recalc();

  // Map scrollLeft -> index
  function computeIndexFromScroll() {
    const s = shopContainer.scrollLeft;

    if (s + TOLERANCE >= maxScroll) return productCardsLength - 1;
    if (s <= TOLERANCE) return 0;

    const ratio = maxScroll === 0 ? 0 : s / maxScroll;
    const idx = Math.round(ratio * (productCardsLength - 1));
    return Math.min(Math.max(0, idx), productCardsLength - 1);
  }

  // Update the counter DOM
  function updateCounter(idx) {
    if (shopSliderSpan) shopSliderSpan.textContent = `${idx + 1}/${productCardsLength}`;
  }

  // Compute proper left for an index
  function targetLeftForIndex(idx) {
    if (idx === productCardsLength - 1) return maxScroll; // exact end
    return Math.round(scrollPerCard * idx);
  }

  // Initialize based on current scroll position
  function init() {
    recalc();
    currentIndex = computeIndexFromScroll();
    updateCounter(currentIndex);
  }
  init();

  // Update while user scrolls (rAF)
  let raf = null;
  shopContainer.addEventListener('scroll', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      currentIndex = computeIndexFromScroll();
      updateCounter(currentIndex);
      raf = null;
    });
  }, { passive: true });

  // Arrow handlers (if arrows exist)
  function slideTo(idx, smooth = true) {
    const left = targetLeftForIndex(idx);
    if (smooth) shopContainer.scrollTo({ left, behavior: 'smooth' });
    else shopContainer.scrollLeft = left;
    currentIndex = idx;
    updateCounter(currentIndex);
  }

  if (sliderRight) {
    sliderRight.addEventListener('click', () => {
      const next = Math.min(productCardsLength - 1, currentIndex + 1);
      slideTo(next, true);
    });
  }
  if (sliderLeft) {
    sliderLeft.addEventListener('click', () => {
      const prev = Math.max(0, currentIndex - 1);
      slideTo(prev, true);
    });
  }

  // Recalc on resize (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const prev = currentIndex;
      recalc();
      // if layout changed, re-evaluate index then keep visual at same index
      currentIndex = computeIndexFromScroll();
      updateCounter(currentIndex);
      // snap visual to previous index so UI stays predictable
      shopContainer.scrollLeft = targetLeftForIndex(prev);
    }, 120);
  });

  // Observe container size changes (optional)
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
      recalc();
      currentIndex = computeIndexFromScroll();
      updateCounter(currentIndex);
    });
    ro.observe(shopContainer);
  }

  // Expose a debug method if you want to inspect values in console:
  window.__shopSliderDebug = () => ({
    maxScroll, scrollPerCard, productCardsLength, currentIndex, scrollLeft: shopContainer.scrollLeft
  });

  // final log for dev
  console.info('Shop slider initialized:', { productCardsLength, maxScroll, scrollPerCard });
})();



// ---- FORTH LINE PROMO FADE SLIDER (robust) ----
(function () {
  const root = document.querySelector('.--desktop__forth_line');
  if (!root) return;

  // source slides (we read text from these)
  const slidesSource = Array.from(root.querySelectorAll('.forth__slide'));
  if (!slidesSource.length) return;

  // try to find existing counter/arrows inside the section
  const counterSpan = root.querySelector('.forth__slider span');
  const leftBtn = root.querySelector('.forth__slider .fa-chevron-left');
  const rightBtn = root.querySelector('.forth__slider .fa-chevron-right');

  // CREATE visible text area if not present or if hidden
  // We'll create a wrapper `.forth__visible` with h2 and p to show text reliably.
  let visibleWrap = root.querySelector('.forth__visible');
  if (!visibleWrap) {
    visibleWrap = document.createElement('div');
    visibleWrap.className = 'forth__visible';
    // basic inline styles so it's visible — you can move these to CSS later
    visibleWrap.style.width = '100%';
    visibleWrap.style.display = 'flex';
    visibleWrap.style.flexDirection = 'column';
    visibleWrap.style.alignItems = 'center';
    visibleWrap.style.gap = '12px';
    // create headline + paragraph
    const vh = document.createElement('h2');
    vh.className = 'forth__headline'; // keep same class so your CSS applies
    const vp = document.createElement('p');
    vp.className = 'forth_paragraph';
    visibleWrap.appendChild(vh);
    visibleWrap.appendChild(vp);

    // insert visibleWrap at the top of root before slides container
    const slidesContainer = root.querySelector('.forth__slides-container');
    root.insertBefore(visibleWrap, slidesContainer);
  }

  const visibleHeadline = visibleWrap.querySelector('.forth__headline');
  const visibleParagraph = visibleWrap.querySelector('.forth_paragraph');

  // ensure CSS fade classes exist (we rely on .fade-out to set opacity:0)
  // initialize styles: visible by default
  visibleHeadline.classList.remove('fade-out');
  visibleParagraph.classList.remove('fade-out');

  // settings
  let idx = 0;
  const total = slidesSource.length;
  const AUTO_MS = 4000;
  const FADE_MS = 800; // match your CSS transition duration
  let autoInt = null;
  let swapTimeout = null;

  // helper to set initial content immediately
  function setInitial() {
    const first = slidesSource[0];
    visibleHeadline.textContent = first.querySelector('h2')?.textContent || '';
    visibleParagraph.textContent = first.querySelector('p')?.textContent || '';
    if (counterSpan) counterSpan.textContent = `1/${total}`;
  }

  // swap to index with fade-out -> change -> fade-in
  function goToIndex(newIndex) {
    if (newIndex === idx) {
      resetAuto();
      return;
    }

    // clear any pending timeouts
    if (swapTimeout) {
      clearTimeout(swapTimeout);
      swapTimeout = null;
    }

    // start fade out immediately
    visibleHeadline.classList.add('fade-out');
    visibleParagraph.classList.add('fade-out');

    // after half the fade duration, swap text then fade in
    swapTimeout = setTimeout(() => {
      const src = slidesSource[newIndex];
      visibleHeadline.textContent = src.querySelector('h2')?.textContent || '';
      visibleParagraph.textContent = src.querySelector('p')?.textContent || '';
      if (counterSpan) counterSpan.textContent = `${newIndex + 1}/${total}`;

      // force reflow then remove fade-out to trigger fade-in
      void visibleHeadline.offsetWidth;
      visibleHeadline.classList.remove('fade-out');
      visibleParagraph.classList.remove('fade-out');

      idx = newIndex;
      swapTimeout = null;
    }, FADE_MS / 2);

    resetAuto();
  }

  function next() {
    let n = idx + 1;
    if (n >= total) n = 0;
    goToIndex(n);
  }
  function prev() {
    let p = idx - 1;
    if (p < 0) p = total - 1;
    goToIndex(p);
  }

  function startAuto() {
    stopAuto();
    autoInt = setInterval(next, AUTO_MS);
  }
  function stopAuto() {
    if (autoInt) {
      clearInterval(autoInt);
      autoInt = null;
    }
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }

  // wire arrow buttons if they exist
  if (rightBtn) rightBtn.addEventListener('click', next);
  if (leftBtn) leftBtn.addEventListener('click', prev);

  // initialize visible content and start auto
  setInitial();
  startAuto();

  // cleanup on unload just in case
  window.addEventListener('beforeunload', () => {
    stopAuto();
    if (swapTimeout) clearTimeout(swapTimeout);
  });
})();




/* carddsss */


/* 

console.log(swipe)
const swipeLeft = () =>{
    latestCardScroll.scrollLeft -= swipe
}

const swipeRight = () =>{
    latestCardScroll.scrollLeft += swipe
}

cardChevronLeft.addEventListener('click' , swipeLeft)
cardChevronRight.addEventListener('click' , swipeRight)

 */






(() => {
    let cardChevronRight = document.querySelector('.latest-products .chevron__right')
    let cardChevronLeft = document.querySelector('.latest-products .chevron__left')
    const shopContainer = document.querySelector(".--latest__card__scroll");
    let swipe = latestCardScroll.clientWidth + latestCardScroll.scrollWidth
    
    if (!cardChevronRight || !cardChevronLeft || !shopContainer) return;

    // Your original working handlers
    cardChevronRight.addEventListener("click", () => {
        latestCardScroll.scrollLeft += swipe
    });

    cardChevronLeft.addEventListener("click", () => {
        latestCardScroll.scrollLeft -= swipe
    });

})();




/* FIX 100VW WIOTH 100%

*/



(function fixVW() {
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      // Skip cross-origin or protected stylesheets
      continue;
    }

    for (const rule of rules) {
      if (rule.style) {
        for (const prop of rule.style) {
          const value = rule.style.getPropertyValue(prop);
          if (value.includes("100vw")) {
            rule.style.setProperty(prop, value.replace("100vw", "100%"));
            console.log(`Replaced in:`, rule.selectorText, prop, "→", rule.style.getPropertyValue(prop));
          }
        }
      }
    }
  }
})();







/* SCROLL REVEALLLLLLLLL */




(function initUI() {
  // --------------------------
  // 1) Scroll reveal (safe)
  // --------------------------
  const revealEls = document.querySelectorAll('.scroll-reveal');
  if (revealEls && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target); // reveal once
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // --------------------------
  // 2) Shop slider / chevrons (safe)
  //    - runs only when elements exist
  // --------------------------
  (function shopSliderInit() {
    const section = document.querySelector('.latest-products.--best-sellers');
    if (!section) return; // nothing to init on this page

    const shopContainer = section.querySelector('.--latest__card__scroll');
    const productCards = section.querySelectorAll('.latest__card');
    const sliderSpan = section.querySelector('.latest__slider span') || section.querySelector('.latest__slider .counter') || section.querySelector('.shop__slider span') || section.querySelector('.shop__slider'); // tolerant
    // safe arrow selectors - adapt if your classes differ
    const chevronLeft = section.querySelector('.fa-chevron-left');
    const chevronRight = section.querySelector('.fa-chevron-right');

    // require the main pieces
    if (!shopContainer || !productCards || productCards.length === 0) return;

    // --- counter accurate mapping (uses maxScroll) ---
    const cardCount = productCards.length;
    let maxScroll = Math.max(0, shopContainer.scrollWidth - shopContainer.clientWidth);
    let perStep = cardCount > 1 ? maxScroll / (cardCount - 1) : maxScroll;
    const TOLERANCE = 6;
    let currentIndex = 0;

    function recalc() {
      maxScroll = Math.max(0, shopContainer.scrollWidth - shopContainer.clientWidth);
      perStep = cardCount > 1 ? maxScroll / (cardCount - 1) : maxScroll;
    }
    recalc();

    function computeIndexFromScroll() {
      const s = shopContainer.scrollLeft;
      if (s + TOLERANCE >= maxScroll) return cardCount - 1;
      if (s <= TOLERANCE) return 0;
      const ratio = maxScroll === 0 ? 0 : s / maxScroll;
      return Math.min(Math.max(0, Math.round(ratio * (cardCount - 1))), cardCount - 1);
    }

    function updateCounter(idx) {
      if (!sliderSpan) return;
      // sliderSpan might be a span or other element; just set textContent
      sliderSpan.textContent = `${idx + 1}/${cardCount}`;
    }

    function targetLeftForIndex(idx) {
      return idx === cardCount - 1 ? maxScroll : Math.round(perStep * idx);
    }

    // init
    currentIndex = computeIndexFromScroll();
    updateCounter(currentIndex);

    // on scroll -> update counter (rAF)
    let raf = null;
    shopContainer.addEventListener('scroll', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        currentIndex = computeIndexFromScroll();
        updateCounter(currentIndex);
        raf = null;
      });
    }, { passive: true });

    // arrow click handlers (if arrows exist)
    if (chevronRight) {
      chevronRight.addEventListener('click', () => {
        currentIndex = Math.min(cardCount - 1, currentIndex + 1);
        shopContainer.scrollTo({ left: targetLeftForIndex(currentIndex), behavior: 'smooth' });
        updateCounter(currentIndex);
      });
    }
    if (chevronLeft) {
      chevronLeft.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        shopContainer.scrollTo({ left: targetLeftForIndex(currentIndex), behavior: 'smooth' });
        updateCounter(currentIndex);
      });
    }

    // recalc on resize (debounced)
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const prev = currentIndex;
        recalc();
        currentIndex = computeIndexFromScroll();
        updateCounter(currentIndex);
        // keep visual position on same index
        shopContainer.scrollLeft = targetLeftForIndex(prev);
      }, 120);
    });

    // optional: observe container changes
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => {
        recalc();
        currentIndex = computeIndexFromScroll();
        updateCounter(currentIndex);
      });
      ro.observe(shopContainer);
    }
  })(); // end shopSliderInit

  // --------------------------
  // 3) OPTIONAL: other page-specific inits can go here,
  //    always guard with `if (element) { ... }`
  // --------------------------

})(); // end initUI IIFE


