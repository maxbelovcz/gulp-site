const swiperContainer = document.querySelector(".create-project");
if (swiperContainer) {
    const swiperAction = new Swiper(".create-project", {
        direction: "horizontal",
        loop: !0,
        slidesPerView: "auto",
        spaceBetween: 32,
        allowTouchMove: !1,
        speed: 1e4,
        loopAdditionalSlides: 6,
        loopedSlides: 6,
        autoplay: {
            enabled: !0,
            delay: 1,
        },
    });

    window.addEventListener("resize", () => {
        swiperAction.update();
    });

    window.addEventListener("orientationchange", () => {
        swiperAction.update();
    });
}
