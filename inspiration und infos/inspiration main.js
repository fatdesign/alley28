(function ($) {
    $(document).ready(function () {

        // aos animation
        // AOS.init(
        //     {
        //         once: true, 
        //     }
        // );


        // mobile veggeiburger
        $('.mobile-veggeiburger').on('click', function (event) {
            event.preventDefault();
            $('.mobile-menu-inner').toggleClass("active");
            $('.mobile-veggeiburger').toggleClass("active");

            if ($('.mobile-menu-inner').hasClass("active")) {
                lenis.stop(); // Disable scroll
            } else {
                lenis.start(); // Enable scroll
            }
        })





        // header scroll animation
        // $(window).scroll(function () {
        //     if ($(this).scrollTop() >= 300) {
        //       $('.falafel-header').addClass('scrollheader');
        //     } else {
        //       $('.falafel-header').removeClass('scrollheader');
        //     }
        // });


        // falafel bowl slider
        const swiperImages = new Swiper('.slider-images-js', {
            loop: true,
            slidesPerView: 'auto',
            updateOnWindowResize: true,
            centeredSlides: true,
            centeredSlidesBounds: true,
            spaceBetween: 110,
            initialSlide: 0,
            speed: 1000,
            autoplay: {
                delay: 2000,
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                loop: true,
            },

            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                1920: {
                    spaceBetween: 150,
                },
                2500: {
                    spaceBetween: 200,
                },
            },
        });
        swiperImages.on('slideChange', function () {
            var activeslide = swiperImages.realIndex;
            var totalslide = swiperImages.slides.length;

            var formattedActiveSlide = String(activeslide + 1).padStart(2, '0');
            var formattedTotalSlide = String(totalslide).padStart(2, '0');

            $(".activeslide").html(formattedActiveSlide);
            $(".totalslide").html(formattedTotalSlide);
        });




        // menu slide with arrow
        // $("body").css("overflow", "hidden");

        // Function to initialize OverlayScrollbars
        function initializeOverlayScrollbars() {
            // var osInstance = OverlayScrollbars(document.querySelector('body'), {
            //     className: "os-theme-dark",
            //     resize: "none",
            //     sizeAutoCapable: true,
            //     paddingAbsolute: true,
            //     overflowBehavior: {
            //     x: "hidden",   // kill horizontal scrolling
            //     y: "scroll"    // force normal vertical scroll
            // },
            //     scrollbars: {
            //         clickScrolling: true,
            //         autoHide: "scroll",
            //         dragScrolling: true,
            //         clickScrolling: true,
            //         touchSupport: true
            //     }
            // });


            // const osViewport = osInstance.getElements().viewport;

            //  Connect ScrollTrigger with OverlayScrollbars
            // ScrollTrigger.scrollerProxy(osViewport, {
            //     scrollTop(value) {
            //         if (arguments.length) {
            //             osInstance.scroll({ y: value });
            //         }
            //         return osInstance.scroll().position.y;
            //     },
            //     getBoundingClientRect() {
            //         return {
            //             top: 0, left: 0,
            //             width: window.innerWidth,
            //             height: window.innerHeight
            //         };
            //     }
            // });
            // ScrollTrigger.defaults({ scroller: osViewport });



            // Reinitialize AOS after OverlayScrollbars initialization
            AOS.init({
                once: true, // fix loop aos
            });

            // Trigger AOS refresh on custom scroll event
            lenis.on('scroll', function () {
                AOS.refresh(); // Refresh AOS on each scroll
                // Call the parallax function inside the custom scroll event handler
                handleParallaxScroll();
                hanleForkParallax()

                var $menuTabsFixed = $('.menu-tabs-fixed');
                var $menuTabWrapper = $('.menu-top-js');

                if ($menuTabWrapper.length > 0) {  // Check if the element exists
                    var wrapperTopPosition = $menuTabWrapper.offset().top - $(window).scrollTop();

                    if (wrapperTopPosition <= 0) {
                        $menuTabsFixed.addClass('scroll');
                        $('.menu-item-arrow').addClass('scroll');
                    } else {
                        $menuTabsFixed.removeClass('scroll');
                        $('.menu-item-arrow').removeClass('scroll');
                    }
                }


                // initAnimations();


            });

            // menu with arrow
            var isAnimating = false;

            $('.menu-left-arrow').click(function () {
                if (!isAnimating) {
                    $('.menu-tab-wrapper').animate({ scrollLeft: '-=150' }, 'slow', function () {
                        isAnimating = false;
                    });
                    isAnimating = true;
                }
            });
            $('.menu-right-arrow').click(function () {
                if (!isAnimating) {
                    $('.menu-tab-wrapper').animate({ scrollLeft: '+=150' }, 'slow', function () {
                        isAnimating = false;
                    });
                    isAnimating = true;
                }
            });
            $('.menu-tab-wrapper').mouseenter(function () {
                $('.menu-tab-wrapper').stop();
                isAnimating = false;
            });
            $('.menu-tab-wrapper').mouseleave(function () {
                isAnimating = false;
            });

            $('.tab-to-section').click(function (e) {
                e.preventDefault();
                var targetSelector = $(this).attr('href');
                var target = $(targetSelector);

                if (target.length) {
                    var scrollTo = target.offset().top - 70;

                    $('html, body').animate({ scrollTop: scrollTo }, 5, function () {
                        window.location.hash = targetSelector;
                        console.log('Updated hash to:', window.location.hash);
                    });
                } else {
                    console.log('Target not found for selector:', targetSelector);
                }
            });

            // ✅ Now your GSAP split-text animations will respect OverlayScrollbars
            initAnimations();

            // Refresh ScrollTrigger after everything
            ScrollTrigger.refresh();


        }



        // const falafelHeader = document.querySelector('.animation-loading .falafel-header');
        // console.log(falafelHeader)
        // if (falafelHeader) { // Check if the element exists
        //     const contactObjectImg = document.querySelector('.zoom-img');
        //     if (contactObjectImg) {
        //         contactObjectImg.classList.add('zoom-in-animation');
        //     }

        //     console.log("HELLO")

        //     setTimeout(function() {
        //         $(".about-banner.bottomtop .banner-headline").addClass("bannertxt");
        //         $(falafelHeader).fadeIn();
        //     }, 500);

        //     setTimeout(function() {
        //         $(".hidden-banner-img").removeClass("clip-text-video__text");
        //         $(".zoom-img").addClass("hidden");
        //     }, 1000);
        // }




        // Check if the animation loading class exists
        if ($("body").hasClass("animation-loading2")) {
            setTimeout(function () {
                $("body").css("overflow", "");
                initializeOverlayScrollbars();
            }, 4000);
        } else {
            setTimeout(function () {
                $("body").css("overflow", "");
                initializeOverlayScrollbars();
            }, 0);
        }



        // Scroll to the top before the page is reloaded
        if ($("body").hasClass("home")) {
            $(window).on("pageshow", function () {
                window.scrollTo(0, 0);
            });
        }



        // home video banner circle+ logo loading 1
        setTimeout(function () {
            $(".home-banner").addClass("bottomtop");
        }, 1500);
        // home video banner circle+ logo loading 2
        setTimeout(function () {
            $(".home-banner").addClass("active");
        }, 3000);
        // home header loading

        if ($("body").hasClass("home")) {
            // Hide initially
            $(".homeanimation-loading2 .falafel-header").hide();

            // Fade in after 3.5s
            setTimeout(function () {
                $(".animation-loading2 .falafel-header").fadeIn();
                // $(".home-banner.bottomtop .banner-headline").addClass("bannertxt");
            }, 3700);
        }


        // home video banner circle+ logo loading 1
        setTimeout(function () {
            $(".about-banner").addClass("bottomtop");
        }, 1000);
        // home video banner circle+ logo loading 2
        setTimeout(function () {
            $(".about-banner").addClass("active");
        }, 1500);
        // home header loading
        setTimeout(function () {
            if ($(".about-banner-headline")[0]) {
                gsap.to(".about-banner-headline", { opacity: 1, visibility: "visible", duration: 1 })
            }
            // $(".home .falafel-header").fadeIn();
            //$(".about-banner.bottomtop .banner-headline").addClass("bannertxt");
        }, 3000);


        // setTimeout(function() {
        //     $(".about-banner.bottomtop .banner-headline").addClass("bannertxt");
        // }, 1000);





        // Check viewport width on page load
        if ($(window).width() >= 768) {
            // If viewport width is greater than or equal to 768px
            // $('.menu-slider-js').each(function(index, element) {
            //     var menuSlider = new Swiper(element, {
            //         loop: false,
            //         slidesPerView: 'auto',
            //         spaceBetween: 60,
            //         slidesPerGroup: 3,
            //         initialSlide: 0,
            //         speed: 1000,
            //         navigation: {
            //             nextEl: '.swiper-button-next',
            //             prevEl: '.swiper-button-prev',
            //             loop: true,
            //         },
            //         pagination: {
            //             el: '.swiper-pagination',
            //             type: 'progressbar',
            //         },
            //         watchOverflow: false,

            //     });

            //     // Update active slide and total slide count on slide change
            //     $('.menus-slider-wrapper').each(function() {
            //         // Find the total number of slides within this wrapper
            //         var totalSlides = $(this).find('.swiper-slide').length;
            //         var formattedTotalSlide = String(totalSlides).padStart(2, '0');
            //         $(this).find('.totalslide').html(formattedTotalSlide);
            //     });

            //     menuSlider.on('slideChange', function () {
            //         var activeslide = menuSlider.realIndex;
            //         var totalslide = menuSlider.slides.length;

            //         var formattedActiveSlide = String(activeslide + 1).padStart(2, '0');
            //         var formattedTotalSlide = String(totalslide).padStart(2, '0');

            //         $(this.el).closest('.menus-slider-wrapper').find(".activeslide").html(formattedActiveSlide);
            //         $(this.el).closest('.menus-slider-wrapper').find(".totalslide").html(formattedTotalSlide);
            //     });
            // });
        }



        //Gallery Scroll Trigger




        const lenis = new Lenis({
            autoRaf: true,
        });





        //background-color change on eat sip hover
        // $('.box-hover').on('click', function(event) {
        //     event.preventDefault();
        // });
        $(".eat-box").hover(
            function () {
                $(".eat-sip").addClass("eat-bg");
            },
            function () {
                $(".eat-sip").removeClass("eat-bg");
            }
        );
        $(".sip-box").hover(
            function () {
                $(".eat-sip").addClass("sip-bg");
            },
            function () {
                $(".eat-sip").removeClass("sip-bg");
            }
        );


        function checkWindowSize() {
            if ($(window).width() >= 1025) {
                $('.eat-sip-img').addClass('img-move');
            } else {
                $('.eat-sip-img').removeClass('img-move');
            }
        }

        checkWindowSize();

        $(window).resize(function () {
            checkWindowSize();
        });







        const $eat = $('.eat-box');
        const $sip = $('.sip-box');

        let lastX = 0, lastY = 0;
        let ticking = false;
        let sipTicking = false;

        let sipLastX = 0, sipLastY = 0;

        let globalMouseX = 0, globalMouseY = 0; // track mouse relative to viewport





        let mouseMoveHandler, scrollHandler;


        function resetEatAndSip(box) {
            $img = $(box).find('.img-move');
            $img.css({
                left: "",
                top: "",
                transform: ""
            });

            const $movableLayers = $(box).find(".movable-layer");

            $movableLayers.each((i, el) => {
                gsap.set(el, { x: 0, y: 0, clearProps: "all" });
            })
        }

        function enableEatSip() {
            if (!mouseMoveHandler) {
                mouseMoveHandler = function (e) {
                    globalMouseX = e.clientX;
                    globalMouseY = e.clientY;
                    handleEat($eat[0]);
                    handleSip($sip[0]);
                };
                $(window).on("mousemove", mouseMoveHandler);
            }

            if (!scrollHandler) {
                scrollHandler = function (e) {
                    handleEat($eat[0]);
                    handleSip($sip[0]);
                };
                lenis.on("scroll", scrollHandler);
            }
        }

        function disableEatSip() {
            if (mouseMoveHandler) {
                $(window).off("mousemove", mouseMoveHandler);
                mouseMoveHandler = null;
            }

            if (scrollHandler) {
                lenis.off("scroll", scrollHandler);
                scrollHandler = null;
            }
            setTimeout(() => {
                resetEatAndSip($eat[0]);
                resetEatAndSip($sip[0]);
            }, 2000);

        }

        function checkViewport() {
            if (window.innerWidth > 768) {
                lenis.start();
            }
            if ($eat[0]) {
                if (window.innerWidth > 1024) {
                    enableEatSip();
                } else {
                    disableEatSip();
                }
            }
        }

        checkViewport()


        function handleEat(box) {
            const rect = box.getBoundingClientRect(),
                $img = $(box).find('.img-move'),
                $video = $(box).find('.eat-video');

            if ($img.length > 0) {
                const mouseX = globalMouseX - rect.left;
                const mouseY = globalMouseY - rect.top;

                // img follows instantly
                $img.css({
                    left: `${mouseX}px`,
                    top: `${mouseY}px`
                });

                if (!ticking) {
                    requestAnimationFrame(() => {
                        const dx = mouseX - lastX;
                        const dy = mouseY - lastY;

                        const strength = -5;
                        let targetX = dx * strength;
                        let targetY = dy * strength;

                        const maxOffset = 150;
                        targetX = Math.max(-maxOffset, Math.min(maxOffset, targetX));
                        targetY = Math.max(-maxOffset, Math.min(maxOffset, targetY));

                        gsap.to($video, {
                            x: targetX,
                            y: targetY,
                            duration: 1,
                            ease: "power3.out",
                        });

                        lastX = mouseX;
                        lastY = mouseY;
                        ticking = false;
                    });
                    ticking = true;
                }
            }
        }

        function handleSip(box) {
            const rect = box.getBoundingClientRect(),
                $img = $(box).find('.img-move');
            if ($img.length > 0) {
                const mouseX = globalMouseX - rect.left;
                const mouseY = globalMouseY - rect.top;

                $img.css({
                    transform: `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`
                });

                const $movableLayers = $(box).find(".movable-layer");

                if (!sipTicking) {
                    requestAnimationFrame(() => {
                        const dx = mouseX - sipLastX;
                        const dy = mouseY - sipLastY;

                        $movableLayers.each((i, el) => {
                            const strength = el.dataset.strength;

                            let targetX = dx * strength;
                            let targetY = dy * strength;

                            const maxOffset = 100;
                            targetX = Math.max(-maxOffset, Math.min(maxOffset, targetX));
                            targetY = Math.max(-maxOffset, Math.min(maxOffset, targetY));

                            gsap.to(el, {
                                x: targetX,
                                y: targetY,
                                scale: ($(el).hasClass("sip-bg-img"))
                                    ? 1.4
                                    : (($(el).hasClass("sip-glass")) ? 1.3 : 1),
                                duration: 1,
                                ease: "power3.out",
                            });
                        });

                        sipLastX = mouseX;
                        sipLastY = mouseY;
                        sipTicking = false;
                    });
                    sipTicking = true;
                }
            }
        }



        $(window).on("resize", checkViewport);





        // blog slider
        const blogSlideSwiper = new Swiper('.blog-slider-wrapper', {
            // Optional parameters
            loop: true,
            slidesPerView: '1',
            spaceBetween: 40,
            speed: 1000,
            // autoplay: {
            //     delay: 2000,
            //     disableOnInteraction: true
            // },

            breakpoints: {
                769: {
                    slidesPerView: '3',
                    spaceBetween: 1,
                },
                // 1690:{
                //     slidesPerView: '3',
                //     spaceBetween: 5,
                // }
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                loop: true,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            on: {
                init: function () {
                    $('.inner-single-blog.swiper-slide').filter(function (index) {
                        // Check if index is odd
                        return index % 2 !== 0;
                    }).each(function () {
                        // Do something with odd-indexed elements
                        console.log($(this));
                        $(this).find('.popular-single-img').css({ order: '2' });
                    });
                },
            },
        });
        blogSlideSwiper.on('slideChange', function () {
            var activeslide = blogSlideSwiper.realIndex;
            var totalslide = blogSlideSwiper.slides.length;

            var formattedActiveSlide = String(activeslide + 1).padStart(2, '0');
            var formattedTotalSlide = String(totalslide).padStart(2, '0');

            $(".activeslide").html(formattedActiveSlide);
            $(".totalslide").html(formattedTotalSlide);
        });



        // parallax

        // parallax JS
        if ($("#parallax-banner")[0]) {
            var scene = document.getElementById('parallax-banner');
            var parallax = new Parallax(scene);
        }

        if ($("#parallax-banner-2")[0]) {
            var scene2 = document.getElementById('parallax-banner-2');
            var parallax2 = new Parallax(scene2);
        }




        // Parallax scroll function
        function handleParallaxScroll() {
            $(".parallax2").each(function () {
                var scrollPosition = $(window).scrollTop(); // Adjust this if necessary
                var offset = $(this).offset().top;
                var windowHeight = $(window).height();
                var speed = $(this).data('speed') * 2;
                var yPos = -(scrollPosition - offset) / speed;
                var xPos = 0; // Adjust this value as needed for translateX

                if (scrollPosition + windowHeight >= offset && offset + $(this).height() >= scrollPosition) {
                    // Dynamically set transform property to include both translateX and translateY
                    $(this).children(':first').css('transform', 'translateY(' + yPos + 'px) translateX(' + xPos + 'px)');
                }
            });
        }


        function hanleForkParallax() {
            $(".parallax3").each(function () {
                var scrollPosition = $(window).scrollTop(); // Adjust this if necessary
                var offset = $(this).offset().top;
                var windowHeight = $(window).height();
                var speed = $(this).data('speed') * 2;
                var yPos = -(scrollPosition - offset) / speed;
                var xPos = 0; // Adjust this value as needed for translateX

                if (scrollPosition + windowHeight >= offset && offset + $(this).height() >= scrollPosition) {
                    // Dynamically set transform property to include both translateX and translateY
                    $(this).css('transform', 'translateY(' + yPos + 'px) translateX(' + xPos + 'px)');
                }
            });
        }





        // video banner zoom on scroll

        // function run_gsap() {
        //     let gsap_loaded = setInterval(function() {
        //         const screenSize = window.screen.width >= 1025;
        //         if (window.gsap && window.ScrollTrigger && screenSize) {
        //             gsap.registerPlugin(ScrollTrigger);
        //             if (document.querySelector('.about-banner') && document.querySelector('.text-scale') && document.querySelector('.zoom-img')) {
        //                 overlay_zoom();
        //             }
        //             clearInterval(gsap_loaded);
        //         }
        //     }, 1000);

        //     function overlay_zoom() {
        //         const tl = gsap.timeline({
        //             scrollTrigger: {
        //                 trigger: '.about-banner',
        //                 start: "top top",
        //                 end: "100% end",
        //                 scrub: true,
        //                 pin: true,
        //                 // duration: 10
        //             }
        //         });

        //         // Add each animation step to the timeline
        //         tl.to('.text-scale', { scale: 2, duration: .5 })
        //             .to('.text-scale', { scale: 4, duration: .5 })
        //             .to('.text-scale', { scale: 6, duration: .5 })
        //             .to('.text-scale', { scale: 10, duration: .5 })
        //             .to('.text-scale', { scale: 50, duration: .5 })
        //             .to('.text-scale', { scale: 80, duration: .5 })
        //             .to('.text-scale', { scale: 200, duration: .5 })
        //             .to('.text-scale', { scale: 300, duration: .5 })

        //             .to('.zoom-img', { scale: 800, duration: .5 })
        //             .to('.zoom-img', { scale: 1500, duration: .5 });
        //     }
        // }
        //     run_gsap();



        // ********** last home banner js commented
        // window.addEventListener('load', function() {
        //     var scrollCount = 0;
        //     var maxScrolls = 100;

        //     setTimeout(function () {
        //         let interval = setInterval(greet, 15);
        //         function greet() {
        //             scrollCount++;
        //             zoomBanner();
        //             if (scrollCount >= maxScrolls) {
        //                 clearInterval(interval);
        //                 startNextAnimation(); // Start next animation when zooming completes
        //             }
        //         }
        //     }, 1500);

        //     setTimeout(function () {
        //         $('.about-banner-img').addClass('done');
        //     }, 6000);

        //     function zoomBanner(){
        //         let multiply = .05;
        //         if(scrollCount > 20) multiply = .1;
        //         if(scrollCount > 30) multiply = .2;
        //         if(scrollCount > 40) multiply = .3;
        //         if(scrollCount > 50) multiply = .4;
        //         if(scrollCount > 60) multiply = .6;
        //         if(scrollCount > 70) multiply = .8;
        //         if(scrollCount > 80) multiply = 1.2;
        //         if(scrollCount > 90) multiply = 4;
        //         if(scrollCount > 95) multiply = 10;

        //         if (scrollCount < maxScrolls) {
        //             var scale = 1 + scrollCount * multiply;
        //             $('.text-scale').css({
        //                 'transform': 'scale('+scale+')'
        //             });
        //         }
        //     }

        //     // This function will run after the zooming effect completes
        //     function startNextAnimation() {
        //         setTimeout(function() {
        //             $(".home .falafel-header").fadeIn();
        //             $(".about-banner.bottomtop .banner-headline").addClass("bannertxt");
        //         }, 1000);
        //     }
        // });





        // aniamted text background
        // let observerText = new IntersectionObserver(function(entries) {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             $(entry.target).removeClass('hidden');
        //             $(entry.target).addClass('inline-block');
        //             observerText.unobserve(entry.target);
        //         }
        //     });
        // }, { threshold: 0.5, rootMargin: '0px' });

        // $('.animated-text').each(function() {
        //     observerText.observe(this);
        // });


        // aniamted-text showup
        function textshowup() {
            function addShowUpClass(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('showup');
                        observer.unobserve(entry.target);
                    }
                });
            }

            let observer = new IntersectionObserver(addShowUpClass, {
                threshold: 0.1
            });

            $('.animated-text').each(function () {
                observer.observe(this);
            });
        }
        textshowup();




        document.addEventListener("DOMContentLoaded", function () {
            const animatedTextElements = document.querySelectorAll('.animated-text');

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('hidden');
                        entry.target.classList.add('inline-block');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            animatedTextElements.forEach(element => {
                observer.observe(element);
            });
        });


        // split text
        function onScrollTextFadeEffect() {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1; // Set opacity to 1 when it enters viewport
                        animateText(entry.target); // Animate the text
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 }); // Adjust threshold as needed

            document.querySelectorAll('.text-split').forEach(element => {
                element.style.opacity = 0; // Initially hide the elements
                observer.observe(element);
            });
        }

        function animateText(element) {
            const splitTextElements = new SplitText(element, {
                type: 'chars'
            });

            const charsElements = splitTextElements.chars;

            gsap.from(charsElements, {
                delay: 0.5, // Adjust delay as needed
                opacity: 0,
                stagger: 0.08,
                duration: 0.1,
                x: 40,
                ease: 'none',
            });
        }

        onScrollTextFadeEffect();




        // white space text
        var tricksWord = document.getElementsByClassName("tricks");
        for (var i = 0; i < tricksWord.length; i++) {
            var wordWrap = tricksWord.item(i);
            wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword">$2</span>');
        }
        var tricksLetter = document.getElementsByClassName("tricksword");
        for (var i = 0; i < tricksLetter.length; i++) {
            var letterWrap = tricksLetter.item(i);
            letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        }

        var miraclefade1 = anime.timeline({
            loop: false,
            autoplay: false,
        });
        miraclefade1.add({
            targets: '.miraclefade1 .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1500,
            delay: (el, i) => 20 * (i + 1)
        });

        $('#miraclein1').one('inview', function (event, isInView) {
            if (isInView) {
                miraclefade1.play();
            }
        });


        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('active');
                } else {
                    $(entry.target).removeClass('active');
                }
            });
        }

        let observer = new IntersectionObserver(handleIntersect, {
            threshold: 0.1
        });

        $('.miraclefade1').each(function () {
            observer.observe(this);
        });





        var fadeside2 = anime.timeline({
            loop: false,
            autoplay: false,
        });
        fadeside2.add({
            targets: '.fadeside2 .letter',
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1800,
            delay: (el, i) => 20 * i
        });
        $('#fadein2').one('inview', function (event, isInView) {
            if (isInView) {
                fadeside2.play();
            } else { }
        });


        var fadeside3 = anime.timeline({
            loop: false,
            autoplay: false,
        });
        fadeside3.add({
            targets: '.fadeside3 .letter',
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1800,
            delay: (el, i) => 25 * i
        });
        $('#fadein3').one('inview', function (event, isInView) {
            if (isInView) {
                fadeside3.play();
            } else { }
        });



        // single page lightbox video
        // $("#watch-btn").on("click", function() {
        //     $("#lightbox").fadeIn(1000);
        //     $(this).hide();
        //     var videoURL = $('#video-wrapper iframe').prop('src');
        //     videoURL += "?autoplay=1";
        //     $('#video-wrapper iframe').attr('src',videoURL);
        // });

        // $("#close-btn").on("click", function() {
        //     $("#lightbox").fadeOut(500);
        //     $("#watch-btn").show(250);
        //     var videoURL = $('#video-wrapper iframe').prop('src');
        //     videoURL = videoURL.replace("?autoplay=1", "");
        //     $('#video-wrapper iframe').prop('src', '');
        //     $('#video-wrapper iframe').prop('src', videoURL);
        // });

        // var video = document.getElementById("videoPlayer");

        // video.pause();
        // $("#watch-btn").click(function(){
        //     if (video.paused) {
        //         video.play();
        //     } else {
        //         video.pause();
        //     }
        // });




        //   temp hide light box and need to change class (shn)

        //   $(".roundborder").on("click", function() {
        //     $("#lightbox").fadeIn(1000);
        //     $(this).hide();
        //     var videoURL = $('#video-wrapper iframe').prop('src');
        //     videoURL += "?autoplay=1";
        //     $('#video-wrapper iframe').attr('src',videoURL);
        //   });

        //   $("#close-btn").on("click", function() {
        //     $("#lightbox").fadeOut(500);
        //     $(".roundborder").show(250);
        //     var videoURL = $('#video-wrapper iframe').prop('src');
        //     videoURL = videoURL.replace("?autoplay=1", "");
        //     $('#video-wrapper iframe').prop('src', '');
        //     $('#video-wrapper iframe').prop('src', videoURL);
        //   });

        // Contact Form
        // let selector = '.wpcf7 input, .wpcf7 textarea';

        // $( selector ).on( 'focus', function() {
        //    let $this = $( this ),
        //        $value = $this.val(),
        //        $label = $this.parent().siblings( 'label' );

        //     $label.addClass( 'has-value' );
        // });

        //  $( selector ).on( 'blur', function() {
        //    let $this = $( this ),
        //        $value = $this.val(),
        //        $label = $this.parent().siblings( 'label' );

        //     if( $value === '' ) {
        //         $label.removeClass( 'has-value' ); 
        //     }
        // });

        // gallery btn block
        window.addEventListener('load', function () {
            setTimeout(function () {
                const svg = document.querySelector('.gallary .section-btn svg');
                if (svg) {
                    svg.style.display = 'flex';

                    setTimeout(function () {
                        svg.classList.add('block');
                    }, 200);

                }
            }, 300);
        });

        function animateGallery(name) {
            let gallery = document.querySelector(name);
            if (gallery) {
                let items = gallery.querySelectorAll(".gallery-element");
                gsap.set(items, { opacity: 0, y: 50 });

                items.forEach((img) => {
                    gsap.to(img, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: img,
                            start: "top 75%",   // adjust when you want animation to start
                            toggleActions: "play none none none", // animate once
                            markers: false
                        }
                    });
                });
            }
        }

        function animateMenu() {
            var menuWrapper = document.querySelector(".menu-category-wrapper")
            if (menuWrapper) {
                let items = document.querySelectorAll(".swiper-slide")
                gsap.set(items, { opacity: 0, y: 50 });
                setTimeout(() => {
                    items.forEach((img, index) => {
                        gsap.to(img, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: img,
                                start: index < 3 ? "top 100%" : "top 75%",   // adjust when you want animation to start
                                toggleActions: "play none none none", // animate once
                                markers: false
                            }
                        });
                    });
                }, 500);
            }

        }


        function animateContact() {
            var contactPage = document.querySelector(".contact-banner")
            if (contactPage) {

                var contactImages = contactPage.querySelectorAll(".contact-object-img img, .contact-round-img, .contact-right-bg")
                console.log(contactImages, "all")
                setTimeout(() => {
                    contactImages.forEach((img) => {
                        gsap.to(img, {
                            duration: 2,
                            ease: "power2.inOut",
                            webkitMaskSize: "1000% 100%", // for Safari/Chrome
                            maskSize: "1000% 100%",       // for Firefox
                        });
                    })
                }, 1000);


                var contactContent = contactPage.querySelectorAll(".contact-items")

                gsap.set(contactContent, { opacity: 0, x: -50 });
                setTimeout(() => {
                    contactContent.forEach((item, index) => {
                        console.log(item, 'contents')
                        gsap.to(item, {
                            opacity: 1,
                            x: 0,
                            duration: 0.6,
                            ease: "power2.out",
                            delay: index * 0.3,
                            scrollTrigger: {
                                trigger: item,
                                start: "top 90%",   // adjust when you want animation to start
                                toggleActions: "play none none none", // animate once
                                markers: false
                            }
                        });
                    });
                }, 1000);

            }
        }






        // text spliting with scroll
        gsap.registerPlugin(ScrollTrigger);

        function initAnimations() {
            // Kill existing ScrollTriggers to avoid overlap
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            setTimeout(() => {
                animateGallery(".gallary-top")
                animateGallery(".gallary-bottom")
            }, 3000);

            animateMenu()

            animateContact()


            gsap.fromTo(".green-leaf-wrapper",
                {
                    x: "150%",
                },
                {
                    x: "0%",
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".footer-middle",
                        start: "top 90%",
                        end: "bottom 80%",
                        toggleActions: "play none none reverse",
                        markers: false
                    }
                }
            );

            // Select all elements with .split-text class
            const splitTextElements = document.querySelectorAll(".split-text-scroll");

            // Variable to keep track of cumulative delay
            let cumulativeDelay = 0;


            const getStartValue = () => {
                return window.innerWidth < 768 ? "20px 75%" : "15% 80%";
            };

            splitTextElements.forEach((element, elementIndex) => {
                // Initialize SplitType for each .split-text element
                const split = new SplitType(element, { types: "words, chars" });

                // Set initial state for all characters in this element
                gsap.set(split.chars, {
                    opacity: 0,
                    transform: "translate(0%, -15%) scale(0.7, 1)",
                    transformOrigin: "50% 0%",
                    willChange: "opacity, transform"
                });

                // Create a timeline for this specific element
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: getStartValue(),
                        end: "+=30%",
                        scrub: 2,
                        markers: false, // Set to false for production
                    }
                });

                // Animate characters for this element
                split.chars.forEach((char, index) => {
                    const totalChars = split.chars.length;
                    const initialOpacity = Math.min(0.2 + index * 0.1, 0);

                    gsap.set(char, { opacity: initialOpacity });

                    tl.to(
                        char,
                        {
                            opacity: 1,
                            transform: "translate(0px, 0px)",
                            duration: 0.3,
                            ease: "none"
                        },
                        index * 0.04
                    );
                });

                const lastCharIndex = split.chars.length - 1;
                const timelineDuration = (lastCharIndex * 0.1) + 0.3;
                if (elementIndex > 0) {
                    tl.delay(cumulativeDelay);
                }
                cumulativeDelay += timelineDuration;
            });

            // Refresh ScrollTrigger after initialization
            ScrollTrigger.refresh();
        }

        // Initial call
        initAnimations();

        // Debounce function to limit resize calls
        function debounce(func, wait) {
            let timeout;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(func, wait);
            };
        }

        // Refresh on resize
        let lastWidth = window.innerWidth;

        window.addEventListener(
            'resize',
            debounce(() => {
                if (window.innerWidth !== lastWidth) {
                    lastWidth = window.innerWidth;

                    // Only run if width changed
                    SplitType.revert('.split-text-scroll');
                    initAnimations();
                }
            }, 250)
        );

        // Refresh on visibility change (tab switch)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                ScrollTrigger.refresh();
            }
        });









    });

})(jQuery);