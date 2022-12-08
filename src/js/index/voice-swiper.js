/*
 * @Date: 2022-12-06 19:57:09
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-08 10:25:10
 * @FilePath: \shopify3.0\src\js\index\voice-swiper.js
 */
class vSlideshow {
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
        this.swiperImg = new Swiper(".user-voice .slideshow-thumbnail-container", {
          loop: true,
          slidesPerView: $(window).width() > 750 ? "auto" : "auto",
          clickable: true,
          watchSlidesProgress: true,
          effect: "slide",
          pagination: {
            el: '.slideshow-pagination-zzz',
            clickable: false,
            bulletClass: 'slideshow-pagination-item',
            bulletActiveClass: 'active pagination-active',
            clickableClass: 'slideshow-pagination-clickable',
            modifierClass: 'slideshow-pagination-',
            renderBullet: function (index, className) {
                var slideIndex = index,
                    number = (index <= 8) ? '0' + (slideIndex + 1) : (slideIndex + 1);

                var paginationItem = '<span class="slideshow-pagination-item">';
                paginationItem = (index <= 8) ? paginationItem +
                    '<span class="pagination-separator"><span class="pagination-separator-loader"></span></span>' :
                    paginationItem;
                paginationItem += '</span>';
                return paginationItem;
            },
        },
        });
        this.slideshow = new Swiper(this.DOM.el, {
            loop: true,
            speed: 500,
            preloadImages: true,
            updateOnImagesReady: true,
            lazy: true,
            effect: "fade",
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            on: {
                init: function () {
                    self.animate('next');
                },
            },

            thumbs: $(window).width() > 750 ? {
              swiper: this.swiperImg
            } : null,
        });
        this.initEvents();
    }
    initEvents() {
        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));
        const comments = document.querySelectorAll(".slideshow-thumbnail-container .swiper-slide .voice-user-comment-all")

        const slide_next = document.querySelector(".user-voice .voice-text .next-voice-btn")

        comments.forEach(items => {
            items.addEventListener('click', (e) => {
                const parant_ = items.parentNode
                const comment_ = parant_.querySelector(".voice-user-comment")
                const class_ = items.getAttribute('class') || ''

                if(class_.indexOf('voice-user-comment-active') !== -1) {
                    comment_.scrollTop = 0
                    items.classList.remove("voice-user-comment-active")
                    comment_.classList.remove("comment-active")
                    return
                }
                items.classList.add("voice-user-comment-active")
                comment_.classList.add("comment-active")
            })
        })

        slide_next.addEventListener("click", () => {
            this.slideshow.slideNext()
        })

        const t_d = document.querySelector(".user-voice .voice-text .slideshow-thumbnail-container .swiper-wrapper")
        const t_s_d = document.querySelector(".user-voice .voice-banner .thumbsSlider-slideshow .swiper-wrapper")
        if($(window).width() < 750) {
            t_d.classList.remove("swiper-no-swiping")
            t_s_d.classList.add("swiper-no-swiping")
            this.swiperImg.on('slidePrevTransitionStart', () => {
                this.slideshow.slidePrev()
            });
            this.swiperImg.on('slideNextTransitionStart', () => {
                this.slideshow.slideNext()
            });
        } else {
            t_d.classList.add("swiper-no-swiping")
            t_s_d.classList.remove("swiper-no-swiping")
        }
    }
    animate(direction = 'next') {
        gsap.set(this.DOM.el.querySelectorAll(".slide-content"), {
            opacity: 0
        })
        gsap.set(this.DOM.el.querySelectorAll(".slide-info"), {
            opacity: 0
        })

        this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
            this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
            this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-content'),
            this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');

        this.DOM.oldSlide = direction === "next" ? this.DOM.el.querySelector('.swiper-slide-prev') : this.DOM.el.querySelector('.swiper-slide-next');
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
        gsap.to(this.DOM.activeSlideImg, 1.5, {
            ease: "expo.out",
            startAt: {
                opacity: 1
            },
            x: 0,
        })

        gsap.to(this.DOM.activeSlide.querySelector(".slide-info"), .5, {
            ease: "power1.out",
            startAt: {
                y: '40px',
                opacity: 0
            },
            y: '0%',
            opacity: 1
        })


        // Get the active thum slide
        if($(window).width() > 750) {
            this.DOM.activeThum = document.querySelector(".user-voice .slideshow-thumbnail-container .swiper-slide-active")
            this.DOM.activeThumContent = this.DOM.activeThum.querySelector(".voice-content")

            gsap.set(document.querySelectorAll(".slideshow-thumbnail-container .swiper-slide"), {
                backgroundColor: '#FBFBFB'
            })
            gsap.set(this.DOM.activeThumContent, {
                opacity: 0
            })

            gsap.to(this.DOM.activeThum, .5, {
                ease: "power1.out",
                startAt: {
                    backgroundColor: '#FBFBFB'
                },
                delay: 0.3,
                backgroundColor: '#FD5000'
            })
            gsap.to(this.DOM.activeThumContent, .5, {
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
}

const voiceslideshow = new vSlideshow(document.querySelector('.slideshow3333'));

export default vSlideshow