
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initNavScroll();
  initSearch();
  initPromoSlider();
  initSectionVideos();
  initShopCategorySlider();
  initBestSellersSlider();
  initForthLineSlider();
  initScrollReveal();
  fixVWUnits();
});

/* =============================================
   SCROLL LOCK UTILITIES
============================================= */
let scrollY = 0;

function lockScroll() {
  scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.width = '100%';
  document.body.style.overflowY = 'scroll';
}

function unlockScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.width = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, scrollY);
}

/* =============================================
   MENU (Burger/Close)
============================================= */
function initMenu() {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.menu_icon');
  const closeIcon = document.querySelector('.menu_close');
  const nav = document.querySelector('.nav');

  if (!menu || !burger || !closeIcon || !nav) return; 

  let menuOpen = false;

  burger.addEventListener('click', (e) => {
    e.stopPropagation(); 
    menu.classList.add('active');
    nav.style.backgroundColor = '#000000';
    burger.classList.add('hide');
    closeIcon.classList.add('show');
    lockScroll();
    menuOpen = true;
  });

  closeIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.remove('active');
    closeIcon.classList.remove('show');
    burger.classList.remove('hide');
    unlockScroll(); 
    menuOpen = false;
  });


  menu.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', () => {
    if (!menuOpen) return;
    menu.classList.remove('active');
    closeIcon.classList.remove('show');
    burger.classList.remove('hide');
    unlockScroll();
    menuOpen = false;
  });
}


/* =============================================
   NAV SCROLL BACKGROUND
============================================= */
function initNavScroll() {
  const nav = document.querySelector('.nav__main');
  if (!nav) return;

  window.addEventListener('scroll', () => {
   
    const menu = document.querySelector('.menu');
    if (menu && menu.classList.contains('active')) return;

    nav.style.backgroundColor = window.scrollY >= 140 ? '#000000' : 'transparent';
  });
}

/* =============================================
   SEARCH ANIMATION
============================================= */
function initSearch() {
  const searchIcon = document.querySelector('.search__icon');
  const searchBar = document.querySelector('.search__bar');
  const mainIcon = document.querySelector('.main-icon');
  const header = document.querySelector('header');

  if (!searchIcon || !header) return;

  searchIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    header.classList.add('search-open');
    if (mainIcon) mainIcon.style.opacity = '0';
    header.style.background ='#000000'
     mainIcon.style.pointerEvents ='none'
     
  });

  if (searchBar) {
    searchBar.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  document.addEventListener('click', () => {
    header.classList.remove('search-open');
    setTimeout(() => {
      if (mainIcon) mainIcon.style.opacity = '1';
             mainIcon.style.pointerEvents ='auto'
                    
    }, 300);
  });
}

/* =============================================
   PROMO SLIDER (Top Banner)
============================================= */
function initPromoSlider() {
  const promoText = document.querySelector('.promo-text');
  const nextBtn = document.querySelector('.promo-next');
  const prevBtn = document.querySelector('.promo-prev');

  if (!promoText) return;

  const promoMessages = [
    'Shipping is 7DT for all of Tunisia',
    'Black Friday Sale — Up to 40% Off',
    'New Arrivals Just Dropped',
    'Built with attention to detail and enduring materials.',
    'Premium Quality. Luxury Fabrics.',
  ];

  const directions = ['up', 'left', 'right', 'down'];
  let index = 0;
  let dirIndex = 0;
  let autoSlide;

  promoText.textContent = promoMessages[index];

  function animateChange(newIndex, direction) {
    const exitClass = `exit-${direction}`;
    const enterClass = `enter-${direction}`;

    promoText.classList.add(exitClass);

    setTimeout(() => {
      promoText.textContent = promoMessages[newIndex];
      promoText.classList.remove(exitClass);
      promoText.classList.add(enterClass);

      setTimeout(() => {
        promoText.classList.add('enter-active');
        setTimeout(() => {
          promoText.classList.remove(enterClass, 'enter-active');
        }, 50);
      }, 20);
    }, 400);

    index = newIndex;
  }

  function startAuto() {
    autoSlide = setInterval(() => {
      const direction = directions[dirIndex];
      dirIndex = (dirIndex + 1) % directions.length;
      const newIndex = (index + 1) % promoMessages.length;
      animateChange(newIndex, direction);
    }, 3000);
  }

  startAuto();

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoSlide);
      let newIndex = index - 1;
      if (newIndex < 0) newIndex = promoMessages.length - 1;
      animateChange(newIndex, 'left');
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoSlide);
      const newIndex = (index + 1) % promoMessages.length;
      animateChange(newIndex, 'right');
      startAuto();
    });
  }
}

/* =============================================
   SECTION VIDEOS (Play/Pause)
============================================= */
function initSectionVideos() {
  const sectionVideos = document.querySelectorAll('.sections__video-box .sections__video');
  const pauseBtns = document.querySelectorAll('.sections__video-box .pausebtn');
  const playBtns = document.querySelectorAll('.sections__video-box .playbtn');

  if (!sectionVideos.length) return;

  const pauseVideo = () => {
    sectionVideos.forEach((vid) => vid.pause());
    pauseBtns.forEach((p) => (p.style.display = 'none'));
    playBtns.forEach((p) => (p.style.display = 'block'));
  };

  const playVideo = () => {
    sectionVideos.forEach((vid) => vid.play());
    playBtns.forEach((p) => (p.style.display = 'none'));
    pauseBtns.forEach((p) => (p.style.display = 'block'));
  };

  pauseBtns.forEach((p) => p.addEventListener('click', pauseVideo));
  playBtns.forEach((p) => p.addEventListener('click', playVideo));
}

/* =============================================
   GENERIC HORIZONTAL SLIDER
   Reusable for shop categories, best sellers, etc.
============================================= */
function createHorizontalSlider(config) {
  const {
    container,
    cards,
    counterSpan,
    leftBtn,
    rightBtn,
    scrollToMiddleOnReveal = false,
  } = config;

  if (!container || !cards || cards.length === 0) return null;

  const cardCount = cards.length;
  const TOLERANCE = 6;
  let currentIndex = 0;

  function getMaxScroll() {
    return Math.max(0, container.scrollWidth - container.clientWidth);
  }

  function getScrollPerCard() {
    const maxScroll = getMaxScroll();
    return cardCount > 1 ? maxScroll / (cardCount - 1) : maxScroll;
  }

  function computeIndexFromScroll() {
    const s = container.scrollLeft;
    const maxScroll = getMaxScroll();

    if (s + TOLERANCE >= maxScroll) return cardCount - 1;
    if (s <= TOLERANCE) return 0;

    const ratio = maxScroll === 0 ? 0 : s / maxScroll;
    return Math.min(Math.max(0, Math.round(ratio * (cardCount - 1))), cardCount - 1);
  }

  function updateCounter(idx) {
    if (counterSpan) {
      counterSpan.textContent = `${idx + 1}/${cardCount}`;
    }
  }

  function targetLeftForIndex(idx) {
    const maxScroll = getMaxScroll();
    return idx === cardCount - 1 ? maxScroll : Math.round(getScrollPerCard() * idx);
  }

  function slideTo(idx, smooth = true) {
    const left = targetLeftForIndex(idx);
    if (smooth) {
      container.scrollTo({ left, behavior: 'smooth' });
    } else {
      container.scrollLeft = left;
    }
    currentIndex = idx;
    updateCounter(currentIndex);
  }

 
  currentIndex = computeIndexFromScroll();
  updateCounter(currentIndex);

 
  let raf = null;
  container.addEventListener(
    'scroll',
    () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        currentIndex = computeIndexFromScroll();
        updateCounter(currentIndex);
        raf = null;
      });
    },
    { passive: true }
  );


  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      const next = Math.min(cardCount - 1, currentIndex + 1);
      slideTo(next, true);
    });
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      const prev = Math.max(0, currentIndex - 1);
      slideTo(prev, true);
    });
  }

  
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const prev = currentIndex;
      currentIndex = computeIndexFromScroll();
      updateCounter(currentIndex);
      container.scrollLeft = targetLeftForIndex(prev);
    }, 120);
  });

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
      currentIndex = computeIndexFromScroll();
      updateCounter(currentIndex);
    });
    ro.observe(container);
  }

  
  if (scrollToMiddleOnReveal) {
    let hasScrolled = false;
    const checkReveal = () => {
      if (hasScrolled) return;
      const bottom = container.offsetTop + container.offsetHeight;
      if (window.scrollY + window.innerHeight >= bottom) {
        hasScrolled = true;
        const half = getMaxScroll() / 2;
        container.scrollLeft = half;
        window.removeEventListener('scroll', checkReveal);
      }
    };
    window.addEventListener('scroll', checkReveal, { passive: true });
  }

  return {
    slideTo,
    getCurrentIndex: () => currentIndex,
  };
}

/* =============================================
   SHOP CATEGORY SLIDER
============================================= */
function initShopCategorySlider() {
  const container = document.querySelector('.shop__container');
  const cards = document.querySelectorAll('.shop__prod__container');
  const counterSpan = document.querySelector('.shop__slider span');
  const leftBtn = document.querySelector('.shop__slider .fa-chevron-left');
  const rightBtn = document.querySelector('.shop__slider .fa-chevron-right');

  if (!container) return;

  createHorizontalSlider({
    container,
    cards,
    counterSpan,
    leftBtn,
    rightBtn,
    scrollToMiddleOnReveal: true,
  });
}

/* =============================================
   BEST SELLERS / LATEST PRODUCTS SLIDER
============================================= */
function initBestSellersSlider() {
  const container = document.querySelector('.--latest__card__scroll');
  if (!container) return;

  const section = container.closest('.latest-products');
  if (!section) return;

  const cards = container.querySelectorAll('.latest__card');
  const counterSpan = section.querySelector('.latest__slider span');
  const leftBtn = section.querySelector('.chevron__left, .fa-chevron-left');
  const rightBtn = section.querySelector('.chevron__right, .fa-chevron-right');

  createHorizontalSlider({
    container,
    cards,
    counterSpan,
    leftBtn,
    rightBtn,
    scrollToMiddleOnReveal: true,
  });
}

/* =============================================
   FORTH LINE PROMO FADE SLIDER
============================================= */
function initForthLineSlider() {
  const root = document.querySelector('.--desktop__forth_line');
  if (!root) return;

  const slidesSource = Array.from(root.querySelectorAll('.forth__slide'));
  if (!slidesSource.length) return;

  const counterSpan = root.querySelector('.forth__slider span');
  const leftBtn = root.querySelector('.forth__slider .fa-chevron-left');
  const rightBtn = root.querySelector('.forth__slider .fa-chevron-right');

  
  let visibleWrap = root.querySelector('.forth__visible');
  if (!visibleWrap) {
    visibleWrap = document.createElement('div');
    visibleWrap.className = 'forth__visible';
    visibleWrap.style.cssText =
      'width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;';

    const vh = document.createElement('h2');
    vh.className = 'forth__headline';
    const vp = document.createElement('p');
    vp.className = 'forth_paragraph';
    visibleWrap.appendChild(vh);
    visibleWrap.appendChild(vp);

    const slidesContainer = root.querySelector('.forth__slides-container');
    root.insertBefore(visibleWrap, slidesContainer);
  }

  const visibleHeadline = visibleWrap.querySelector('.forth__headline');
  const visibleParagraph = visibleWrap.querySelector('.forth_paragraph');

  if (!visibleHeadline || !visibleParagraph) return;

  visibleHeadline.classList.remove('fade-out');
  visibleParagraph.classList.remove('fade-out');

  let idx = 0;
  const total = slidesSource.length;
  const AUTO_MS = 4000;
  const FADE_MS = 800;
  let autoInt = null;
  let swapTimeout = null;

  function setInitial() {
    const first = slidesSource[0];
    visibleHeadline.textContent = first.querySelector('h2')?.textContent || '';
    visibleParagraph.textContent = first.querySelector('p')?.textContent || '';
    if (counterSpan) counterSpan.textContent = `1/${total}`;
  }

  function goToIndex(newIndex) {
    if (newIndex === idx) {
      resetAuto();
      return;
    }

    if (swapTimeout) {
      clearTimeout(swapTimeout);
      swapTimeout = null;
    }

    visibleHeadline.classList.add('fade-out');
    visibleParagraph.classList.add('fade-out');

    swapTimeout = setTimeout(() => {
      const src = slidesSource[newIndex];
      visibleHeadline.textContent = src.querySelector('h2')?.textContent || '';
      visibleParagraph.textContent = src.querySelector('p')?.textContent || '';
      if (counterSpan) counterSpan.textContent = `${newIndex + 1}/${total}`;

      void visibleHeadline.offsetWidth;
      visibleHeadline.classList.remove('fade-out');
      visibleParagraph.classList.remove('fade-out');

      idx = newIndex;
      swapTimeout = null;
    }, FADE_MS / 2);

    resetAuto();
  }

  function next() {
    goToIndex((idx + 1) % total);
  }

  function prev() {
    goToIndex(idx - 1 < 0 ? total - 1 : idx - 1);
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

  if (rightBtn) rightBtn.addEventListener('click', next);
  if (leftBtn) leftBtn.addEventListener('click', prev);

  setInitial();
  startAuto();

  window.addEventListener('beforeunload', () => {
    stopAuto();
    if (swapTimeout) clearTimeout(swapTimeout);
  });
}

/* =============================================
   SCROLL REVEAL
============================================= */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.scroll-reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}


function fixVWUnits() {
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      continue; 
    }

    if (!rules) continue;

    for (const rule of rules) {
      if (rule.style) {
        for (const prop of rule.style) {
          const value = rule.style.getPropertyValue(prop);
          if (value.includes('100vw')) {
            rule.style.setProperty(prop, value.replace('100vw', '100%'));
          }
        }
      }
    }
  }
}
