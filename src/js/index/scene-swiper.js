/*
 * @Date: 2022-12-02 15:16:12
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-08 10:27:50
 * @FilePath: \shopify3.0\src\js\index\scene-swiper.js
 */
class sceneSlideshow {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.config = {
            slideshow: {
                delay: 5000,
                pagination: {
                    duration: 5,
                }
            }
        };
        this.init();
    }
    init() {
        var self = this;
        this.swiperImg = new Swiper(".slideshow-thumbnail-container-scene", {
          spaceBetween: 10,
          loop: false,
          slidesPerView: 'auto',
          slidesPerGroup: 1,
          freeMode: true,
          watchSlidesProgress: true,
          direction: $(window).width() > 750 ? "vertical" : "horizontal",
          clickable: true,
        });
        this.slideshow = new Swiper(this.DOM.el, {
            speed: 500,
            preloadImages: true,
            updateOnImagesReady: true,
            lazy: true,
            effect: $(window).width() > 750 ? "slide" : "fade",
            direction: $(window).width() > 750 ? "vertical" : "horizontal",
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            on: {
                init: function () {
                    self.animate('next');
                },
            },
            thumbs: {
              swiper: this.swiperImg
            },
        });
        this.initEvents();
    }
    initEvents() {
        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));

        const this_ = this
        setTimeout(() => {
            $(".slideshow-thumbnail").each(function() {
              $(this).on('mouseenter', function() {
                const index_ = $(this)?.index() || 0
                this_.slideshow.slideTo(index_)
              });
            })
        }, 200);
    }
    animate(direction = 'next') {
        gsap.set(this.DOM.el.querySelectorAll(".slide-content"), {
            opacity: 0
        })
        gsap.set(this.DOM.el.querySelectorAll(".slide-info"), {
            opacity: 0
        })

        this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
            // this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
            this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-content'),
            this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');

        this.DOM.oldSlide = direction === "next" ? this.DOM.el.querySelector('.swiper-slide-prev') : this
            .DOM.el.querySelector('.swiper-slide-next');
        if (this.DOM.oldSlide) {
            this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-content')
        }

        // slider title
        gsap.to(this.DOM.activeSlideTitle, .5, {
            ease: "power1.out",
            startAt: {
                y: '40px',
                opacity: 0
            },
            y: '0%',
            opacity: 1
        })

        // Animate background
        // gsap.to(this.DOM.activeSlideImg, 1.5, {
        //     ease: "expo.out",
        //     startAt: {
        //         opacity: 1
        //     },
        //     x: 0,
        // })

        gsap.to(this.DOM.activeSlide.querySelector(".slide-info"), .5, {
            ease: "power1.out",
            startAt: {
                y: '40px',
                opacity: 0
            },
            y: '0%',
            opacity: 1
        })
    }
}

const slideshow = new sceneSlideshow(document.querySelector('.slideshowscene'));

export default sceneSlideshow