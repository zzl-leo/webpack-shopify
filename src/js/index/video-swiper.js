/*
 * @Date: 2022-12-01 17:11:17
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-08 10:30:36
 * @FilePath: \shopify3.0\src\js\index\video-swiper.js
 */
class VideoSlideshow {
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
        this.slideshow = new Swiper(this.DOM.el, {
            loop: true,
            slidesPerView: "auto",
            spaceBetween: 30,
            centeredSlides: true,
            preloadImages: true,
            updateOnImagesReady: true,
            lazy: true,
            pagination: {
                el: '.slideshow-pagination',
                clickable: true,
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
            effect: $(window).width() > 750 ? "slide" : "fade",
            navigation: {
                nextEl: '.slideshow-navigation-button.next',
                prevEl: '.slideshow-navigation-button.prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            on: {
                init: function () {
                    self.animate('next');
                },
            }
        });
        this.initEvents();
    }
    initEvents() {
        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));
    }
    animate(direction = 'next') {
        gsap.set(this.DOM.el.querySelectorAll(".slide-content"), {
            opacity: 0
        })

        this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
            this.DOM.unctiveSlide = this.DOM.el.querySelectorAll('.swiper-slide:not(.swiper-slide-active)'),
            this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
            this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-content'),
            this.DOM.activeSlideVideo = this.DOM.activeSlide.querySelector('.slide-video'),
            this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');

        this.DOM.activeSlideTitleLetters = direction === "next" ? this.DOM.activeSlideTitleLetters : []
            .slice.call(this.DOM.activeSlideTitleLetters).reverse();

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
        gsap.to(this.DOM.activeSlideImg, 1.5, {
            ease: "expo.out",
            startAt: {
                opacity: 1
            },
            x: 0,
        })

        // video controy
        this.DOM.activeSlideVideo.play()
        this.DOM.unctiveSlide
        for(let index = 0; index < this.DOM.unctiveSlide.length; index++) {
            const video = this.DOM.unctiveSlide[index].querySelector(".slide-video")
            if(video) {
                video.pause()
                video.currentTime = 0
            }
        }
    }
}

const videoslideshow = new VideoSlideshow(document.querySelector('.video-slideshow'));

export default VideoSlideshow