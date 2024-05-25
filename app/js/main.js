AOS.init({
    duration: 1200,
});

const header = document.querySelector('header');
const main = document.querySelector('main');
const setMainPadding = () => {
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = `${headerHeight}px`;
};

window.addEventListener('load', setMainPadding);
window.addEventListener('resize', setMainPadding);
/*--------------------------------mobile-menu---------------------------------*/
if (window.innerWidth < 992) {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.main-menu');
    const mobileMenuItems = document.querySelectorAll('.menu-item a');

    if (burgerMenu && mobileMenu && mobileMenuItems.length > 0) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('_lock');
        });

        mobileMenuItems.forEach((menuItem) => {
            menuItem.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('_lock');
            });
        });
    }
}


document.querySelectorAll('a.js-link-anchor[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.hash);
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetOffset = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        }
    });
});

if (document.querySelector('.user-phone')) {
    document.querySelectorAll('.user-phone').forEach(phone => {
        Inputmask({ "mask": "+7 (999) 999-99-99" }).mask(phone);
    });
}


Fancybox.bind('[data-fancybox]', {
    Thumbs: false,
});


const firstFrame = document.querySelector('.page > *:first-child');
const buttonUp = document.querySelector('.button-up');
const upHeader = document.querySelector('header');

if (firstFrame && buttonUp && upHeader) {
    const observerFirstFrame = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                buttonUp.classList.add('hidden');
            } else {
                buttonUp.classList.remove('hidden');
            }
        });
    }, { threshold: 0.2 });
    observerFirstFrame.observe(firstFrame);
}

const buttonMoveUp = document.querySelector('.button-up');
const firstFrameSection = document.querySelector('.page > *:first-child');

if (buttonMoveUp && firstFrameSection) {
    buttonMoveUp.addEventListener('click', () => {
        const headerHeight = upHeader.offsetHeight;
        window.scrollTo({
            top: firstFrameSection.offsetTop - headerHeight,
            behavior: "smooth"
        });
    });
}






