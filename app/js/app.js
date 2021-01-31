$(function () {

    $("select").selectric();

    if ($(".filter").length > 0) {

        $(".filter-row_toggle").on("click", function (e) {
            $(this).closest(".filter-row").toggleClass("open");
            e.preventDefault();
        });

        let priceSlider = document.getElementById("price-slider");
        noUiSlider.create(priceSlider, {
            start: [0, 5000],
            connect: true,
            format: wNumb({
                thousand: " ",
                decimals: 0,
            }),
            range: {
                min: [0],
                max: [10000],
            },
        });

        let prices = [
            document.getElementById("price_from"),
            document.getElementById("price_to"),
        ];

        priceSlider.noUiSlider.on(
            "update",
            function (values, handle, unencoded, isTap, positions, noUiSlider) {
                prices[handle].value = values[handle];
            },
        );

        prices.forEach(function (input, handle) {
            input.addEventListener("change", function () {
                priceSlider.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener("keydown", function (e) {
                switch (e.which) {
                    case 13:
                        priceSlider.noUiSlider.setHandle(handle, this.value);
                        break;
                }
            });
        });


        //
        //
        //

        let yearSlider = document.getElementById("year-slider");

        noUiSlider.create(yearSlider, {
            start: [2000, 2021],
            connect: true,
            format: wNumb({
                thousand: "",
                decimals: 0,
            }),
            range: {
                min: [2000],
                max: [2021],
            },
        });

        let years = [
            document.getElementById("year_from"),
            document.getElementById("year_to"),
        ];

        yearSlider.noUiSlider.on(
            "update",
            function (values, handle, unencoded, isTap, positions, noUiSlider) {
                years[handle].value = values[handle];
            },
        );

        years.forEach(function (input, handle) {
            input.addEventListener("change", function () {
                yearSlider.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener("keydown", function (e) {
                switch (e.which) {
                    case 13:
                        priceSlider.noUiSlider.setHandle(handle, this.value);
                        break;
                }
            });
        });

        //
        //
        //

        let powerSlider = document.getElementById("power-slider");

        noUiSlider.create(powerSlider, {
            start: [90, 124],
            connect: true,
            format: wNumb({
                // suffix: ' л.с.',
                decimals: 0,
            }),
            range: {
                min: [0],
                max: [350],
            },
        });

        let powers = [
            document.getElementById("power_from"),
            document.getElementById("power_to"),
        ];

        powerSlider.noUiSlider.on(
            "update",
            function (values, handle, unencoded, isTap, positions, noUiSlider) {
                powers[handle].value = values[handle];
            },
        );

        powers.forEach(function (input, handle) {
            input.addEventListener("change", function () {
                powerSlider.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener("keydown", function (e) {
                switch (e.which) {
                    case 13:
                        powerSlider.noUiSlider.setHandle(handle, this.value);
                        break;
                }
            });
        });

        //
        //
        //

        let years_numbers = document.querySelectorAll(".number"),
            maskOptionsYears = {
                mask: Number,
                maxLength: 4,
                negative : false,
                thousandsSeparator: "",
            };

        for (let i = 0; i < years_numbers.length; i++) {
            IMask(years_numbers[i], maskOptionsYears);
        }

        let power_numbers = document.querySelectorAll(".power"),
            maskOptionsPowers = {
                // mask: "num л.с.",
                mask: Number,
                negative : false,
                maxLength: 4,
                thousandsSeparator: "",
                // blocks: {
                //     num: {
                //         mask: Number
                //     }
                // }
            };

        for (let i = 0; i < power_numbers.length; i++) {
            IMask(power_numbers[i], maskOptionsPowers);
        }

    }

    let numbers = document.querySelectorAll(".number-format"),
        maskOptions = {
            mask: Number,
            negative : false,
            thousandsSeparator: " ",
        };

    for (let i = 0; i < numbers.length; i++) {
        IMask(numbers[i], maskOptions);
    }

    if ($(".filter").length > 0 && !$('.filter').hasClass('mobile'))
        $(".nano").nanoScroller({iOSNativeScrolling: true});

    function filterInitScrollPosition() {
        if ($(".filter").is(":visible") && !$('.filter').hasClass('mobile')) {
            if ($(window).scrollTop() >= $("header").height() + $('.home-slider').outerHeight()) {
                $(".filter").addClass("filter-fixed");
                $("body").addClass("body-filter");
                filterInitPosition();
            } else {
                $(".filter").css("bottom", "0").removeClass("filter-fixed");
                $("body").removeClass("body-filter");
                $(".nano").nanoScroller({destroy: true});
                $(".nano").nanoScroller({iOSNativeScrolling: true});
            }
        }
    }

    let brands = '';

    if ($('.lazy-select').length > 0) {
        $.getJSON("/cars.json", function (data) {
            brands = data.list;
            let html = '<option value="">Выберите марку</option>';

            for (let k in brands) {
                html += '<option value="' + k + '">' + k + '</option>';
            }
            $('#brand').html(html);

            let selectric = $('.lazy-select').data('selectric');
            selectric.refresh();

        }).fail(function () {
            console.log("Ошибка при загрузке списка брендов");
        });
    }

    $('#brand').on('change', function() {
        let html = '';

        if ($(this).val() !== '') {
            $.each(brands[$(this).val()], function(i, val) {
                html += '<option value="'+ val +'">' + val + '</option>';
            });

            $('#model').html(html).removeAttr('disabled');

            let selectric = $('#model').data('selectric');
            selectric.refresh();
        } else {
            $('#model').html('').attr('disabled', true);

            let selectric = $('#model').data('selectric');
            selectric.init();
        }

    });

    $('#photo').change(function() {
        if ($(this)[0].files.length == 1) {
            $('.filename').html($(this)[0].files[0].name);
            $('.file-wrapper').addClass('filled');
        }
    });

    function getRectTop(el) {
        let rect = el.getBoundingClientRect();
        return rect.top;
    }

    function filterInitPosition() {
        if ($(".filter").is(":visible") && !$('.filter').hasClass('mobile')) {
            let bottom =
                window.innerHeight -
                ($("footer").offset().top - $(document).scrollTop());

            if (
                window.innerHeight -
                ($("footer").offset().top - $(document).scrollTop()) >
                0
            ) {
                $(".filter").css("bottom", bottom);
            } else {
                $(".filter").css("bottom", "0");
            }

            if (
                getRectTop($(".filter")[0]) +
                document.body.scrollTop +
                $(".filter").offsetHeight >=
                getRectTop($("footer")[0]) + document.body.scrollTop
            ) {
            } else {
            }

            // $(".filter form").css("height", window.innerHeight - 100 - bottom + 'px');
            // console.log(bottom, window.innerHeight);
            // console.log(Math.abs(bottom));

            $(".nano").nanoScroller({destroy: true});
            $(".nano").nanoScroller({iOSNativeScrolling: true});
        }
    }

    let phones = document.querySelectorAll("input.phone");
    for (let i = 0; i < phones.length; i++) {
        let phoneMask = IMask(
            phones[i], {
                mask: '+{7} (000) 000-00-00'
            });
    }


    let email = document.querySelectorAll("input.email");
    for (let i = 0; i < email.length; i++) {
        let emailMask = IMask(
            email[i], {
                mask: /^\S*@?\S*$/
            });
    }

    function setFilterHeight() {
        $(".filter form").css(
            "height",
            window.innerHeight -
            ($(".filter").offset().top - $(document).scrollTop()),
        );
    }

    $(window).on("scroll", function () {
        filterInitScrollPosition();
    });

    $(window).on("resize", function () {
        if ($(window).width() > 1024) {
            $(".nano").nanoScroller({iOSNativeScrolling: true});
            $('body').removeClass('filter-opened');
            $('.filter').removeClass('mobile');
        }
        filterInitPosition();
    });

    $(".burger-button").on("click", function () {
        $("body").addClass("menu-opened");
    });

    $(".attached").on("click", function () {
        $("#photo").val(null);
        $('.file-wrapper').removeClass('filled');
        $('.filename').html('Загрузить файл (jpg, png)');
    });

    $(".callback-link").on("click", function () {
        $("body").addClass("callback-opened");
        return false;
    });

    $(".close-form_button").on("click", function () {
        $("body").removeClass("callback-opened");
    });

    $(".scroll-to-form").on("click", function () {
        $("body, html").stop().animate({scrollTop: $('.forms-wrapper').offset().top + 'px'}, 1000);
    });

    $(".form-tabs").on("click", "a", function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.tabs-content .page').eq($(this).index()).show().siblings().hide();
        return false;
    });

    $(".overlay").on("click", function (e) {
        if ($(e.target).hasClass('overlay')) {
            $("body").removeClass("callback-opened");
        }
    });

    $(".filter-mobile_close").on("click", function () {
        $("body").removeClass("filter-opened");
        $(".filter").removeClass("mobile");
    });

    $(".mobile-filter_toggle").on("click", function () {
        $(".filter").addClass("mobile");
        $("body").addClass("filter-opened");
        $(".nano").nanoScroller({destroy: true});
    });

    $(".show_all-link").on("click", function () {
        $(this).closest('.filter-options').find('.filter-content').show();
        $(this).remove();
        return false;
    });

    $(".menu-close").on("click", function () {
        $("body").removeClass("menu-opened");
    });

    $(".toggle").on("click", function () {
        let bool = $(this).closest('.toggle-wrapper').hasClass('opened');
        $(this).closest('.toggle-wrapper').toggleClass("opened");
        if (!bool) {
            $(this).find('.text').html('Свернуть')
            return false;
        } else {
            $(this).find('.text').html('Развернуть')
            return false;
        }
    });

    filterInitScrollPosition();

    if ($(".filter").length > 0) $(".filter").addClass("fade-in");

    let swiper = new Swiper('.car-slider .swiper-container', {
        spaceBetween: 30,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            1220: {
                slidesPerView: 2,
            },
            1600: {
                slidesPerView: 3,
            },
        },
        navigation: {
            nextEl: '.car-slider .swiper-button-next',
            prevEl: '.car-slider .swiper-button-prev',
        },
    });
    let swiper_home = new Swiper('.home-slider .swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        navigation: {
            nextEl: '.home-slider .swiper-button-next',
            prevEl: '.home-slider .swiper-button-prev',
        },
    });
});
