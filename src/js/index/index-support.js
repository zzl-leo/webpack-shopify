/*
 * @Date: 2022-12-07 16:21:06
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-08 10:27:16
 * @FilePath: \shopify3.0\src\js\index\index-support.js
 */
class IndexSupport {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.config = {};
        this.init();
    }
    init() {
        var $colContainer = $('.col-container');
        var colEase = "power1.out";

        gsap.set($colContainer[0], {
            flex: 1,
            alignItems: 'flex-start',
            padding: '1.04167vw 1.5625vw 1.5625vw 1.5625vw',
            background: '#DEDEDE'
        }, 0)
        gsap.set($colContainer.find('img')[0], {
            width: '4.6875vw',
            height: '4.6875vw',
            marginBottom: '0'
        }, 0)
        gsap.set($colContainer.find('.support-content')[0], {
            display: 'block',
            opacity: 1
        }, 0)
        $colContainer.each(function (index) {
            index !== 0 && gsap.set($colContainer.find('.support-content')[index], {
                display: 'none',
                opacity: 0
            }, 0)
            $(this).on('mouseenter', function () {
                var $thisContainer = $(this);
                var $ContainerExpandedWidth = 50;

                gsap.to($thisContainer, 0.3, {
                    flex: 1,
                    alignItems: 'flex-start',
                    padding: '1.04167vw 1.5625vw 1.5625vw 1.5625vw',
                    background: '#DEDEDE',
                    ease: colEase
                }, 0);
                gsap.to($thisContainer.find('img'), 0.3, {
                    width: '4.6875vw',
                    height: '4.6875vw',
                    marginBottom: '0'
                }, 0);
                gsap.to($thisContainer.find('.support-content'), 0.3, {
                    display: 'block',
                    opacity: 1
                }, 0);

                gsap.to($colContainer.not($thisContainer), 0.3, {
                    flex: 0,
                    alignItems: 'center',
                    padding: '3.75vw 0.83333vw 1.5625vw 0.83333vw',
                    background: '#E8E8E8',
                    ease: colEase
                }, 0);
                gsap.to($colContainer.not($thisContainer).find('img'), 0.3, {
                    width: '5.20833vw',
                    height: '5.20833vw',
                    marginBottom: '1.82292vw'
                }, 0);
                gsap.to($colContainer.not($thisContainer).find('.support-content'), 0.3, {
                    display: 'none',
                    opacity: 0
                }, 0);
            })
        });
    }
}
new IndexSupport()
export default IndexSupport