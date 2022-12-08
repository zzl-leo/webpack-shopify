/*
 * @Date: 2022-11-26 17:17:45
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-08 12:45:47
 * @FilePath: \shopify3.0\src\js\index\slide-swiper.js
 */
class Slideshow {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.config = {
            slideshow: {
                delay: 25000,
                pagination: {
                    duration: 25,
                }
            }
        };
        this.init();
    }
    init() {
        var self = this;
        // Set the slider
        this.slideshow = new Swiper(this.DOM.el, {
            loop: true,
            autoplay: {
                delay: this.config.slideshow.delay,
                disableOnInteraction: false,
            },
            speed: 500,
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
            effect: "fade",
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
        // Init/Bind events.
        this.initEvents();
    }
    initEvents() {
        this.slideshow.on('paginationUpdate', (swiper, paginationEl) => setTimeout(() => {
            this.animatePagination(swiper, paginationEl)
        }, 100));
        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));
        setTimeout(() => {
            this.animatePagination(null)
        }, 200);
    }
    animate(direction = 'next') {
        gsap.set(this.DOM.el.querySelectorAll(".slide-content"), {
            opacity: 0
        })

        this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
            this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
            this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-content'),
            this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');

        this.DOM.activeSlideTitleLetters = direction === "next" ? this.DOM.activeSlideTitleLetters : []
            .slice.call(this.DOM.activeSlideTitleLetters).reverse();

        this.DOM.oldSlide = direction === "next" ? this.DOM.el.querySelector('.swiper-slide-prev') : this
            .DOM.el.querySelector('.swiper-slide-next');
        if (this.DOM.oldSlide) {
            this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-content')
        }

        gsap.to(this.DOM.activeSlideTitle, .5, {
            ease: "power1.out",
            startAt: {
                y: '40px',
                opacity: 0
            },
            y: '0%',
            opacity: 1
        })

        gsap.to(this.DOM.activeSlideImg, 1.5, {
            ease: "expo.out",
            startAt: {
                opacity: 1
            },
            x: 0,
        })
    }
    animatePagination(swiper, paginationEl) { // 分页动画
        const DOC = paginationEl || document
        this.DOM.paginationItemsLoader = DOC.querySelectorAll('.pagination-separator-loader');
        this.DOM.activePaginationItem = DOC.querySelector('.pagination-active');
        this.DOM.activePaginationItemLoader = this.DOM.activePaginationItem?.querySelector('.pagination-separator-loader');

        // 重置
        gsap.set(this.DOM.paginationItemsLoader, {
            scaleX: 0
        });
        gsap.to(this.DOM.activePaginationItemLoader, this.config.slideshow.pagination.duration, {
            startAt: {
                scaleX: 0
            },
            scaleX: 1,
        });
    }
}
new Slideshow(document.querySelector('.slide-swiper-container'))
window.Slideshow = Slideshow
export default Slideshow
