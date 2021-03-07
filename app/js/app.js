$(function () {
    $.fn.serializeAssoc = function () {
        let data = {};
        $.each(this.serializeArray(), function (key, obj) {
            let a = obj.name.match(/(.*?)\[(.*?)\]/);
            if (a !== null) {
                let subName = a[1];
                let subKey = a[2];

                if (!data[subName]) {
                    data[subName] = [];
                }

                if (!subKey.length) {
                    subKey = data[subName].length;
                }

                if (data[subName][subKey]) {
                    if ($.isArray(data[subName][subKey])) {
                        data[subName][subKey].push(obj.value);
                    } else {
                        data[subName][subKey] = [];
                        data[subName][subKey].push(obj.value);
                    }
                } else {
                    data[subName][subKey] = obj.value;
                }
            } else {
                if (data[obj.name]) {
                    if ($.isArray(data[obj.name])) {
                        data[obj.name].push(obj.value);
                    } else {
                        data[obj.name] = [];
                        data[obj.name].push(obj.value);
                    }
                } else {
                    data[obj.name] = obj.value;
                }
            }
        });
        return data;
    };

    let filterDelay = 600;
    $("select").selectric();

    let priceSlider;
    let price_from;
    let price_to;
    let yearSlider;
    let powerSlider;

    if ($(".filter").length > 0) {

        $(".filter-row_toggle").on("click", function (e) {
            $(this).closest(".filter-row").toggleClass("open");
            e.preventDefault();
        });

        priceSlider = document.getElementById("price-slider");
        price_from = parseInt(priceSlider.getAttribute('data-from'));
        price_to = parseInt(priceSlider.getAttribute('data-to'));

        noUiSlider.create(priceSlider, {
            start: [price_from, price_to],
            connect: true,
            format: wNumb({
                thousand: " ",
                decimals: 0,
            }),
            range: {
                min: [price_from],
                max: [price_to],
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

        yearSlider = document.getElementById("year-slider");
        let year_from = parseInt(yearSlider.getAttribute('data-from'));
        let year_to = parseInt(yearSlider.getAttribute('data-to'));

        noUiSlider.create(yearSlider, {
            start: [year_from, year_to],
            connect: true,
            format: wNumb({
                thousand: "",
                decimals: 0,
            }),
            range: {
                min: [year_from],
                max: [year_to],
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

        powerSlider = document.getElementById("power-slider");
        let power_from = parseInt(powerSlider.getAttribute('data-from'));
        let power_to = parseInt(powerSlider.getAttribute('data-to'));
        noUiSlider.create(powerSlider, {
            start: [power_from, power_to],
            connect: true,
            format: wNumb({
                decimals: 0,
            }),
            range: {
                min: [power_from],
                max: [power_to],
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
                negative: false,
                thousandsSeparator: "",
            };

        for (let i = 0; i < years_numbers.length; i++) {
            IMask(years_numbers[i], maskOptionsYears);
        }

        let power_numbers = document.querySelectorAll(".power"),
            maskOptionsPowers = {
                // mask: "num л.с.",
                mask: Number,
                negative: false,
                maxLength: 4,
                thousandsSeparator: "",
            };

        for (let i = 0; i < power_numbers.length; i++) {
            IMask(power_numbers[i], maskOptionsPowers);
        }

    }

    let numbers = document.querySelectorAll(".number-format"),
        maskOptions = {
            mask: Number,
            negative: false,
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

    $('#brand').on('change', function () {
        let html = '';

        if ($(this).val() !== '') {
            $.each(brands[$(this).val()], function (i, val) {
                html += '<option value="' + val + '">' + val + '</option>';
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

    $('#photo').change(function () {
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

    console.log("%cCreated with ❤", "color: #000; padding: 5px 0px 1px; border-bottom:2px solid #000;");


    function delay(callback, ms) {
        let timer = 0;
        return function () {
            let context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

    function sort_cards(a, b){
        if ($('.sort').val() == 'asc')
            return ($(b).data('price')) < ($(a).data('price')) ? 1 : -1;
        else
            return ($(b).data('price')) > ($(a).data('price')) ? 1 : -1;
    }

    function initFilter() {
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: "post",
            dataType: 'json',
            data: $('.filter-form').serializeAssoc(),
            beforeSend: function () {
                $('.preloader').addClass('wait');
            },
            error: function () {
                $('.preloader').removeClass('wait');
            },
            success: function (result) {
                let
                    cars = result.cars,
                    html = '';

                $.each(cars, function (i, context) {
                    let source = $('#template-card').html();
                    let template = Handlebars.compile(source);
                    html += template(context);
                });

                $('.page-title > .title').html(result.title);
                $('.preloader').removeClass('wait');

                $('.catalog').html(html);
                let data = result.filter;
                let numbers = result.numbers;

                $(".catalog .card").sort(sort_cards).appendTo('.catalog');


                // $.each(numbers, function(option, option_array) {
                //
                //     let row = $('input[name="'+option+'[]"]').closest('.filter-row').find('.filter-options input');
                //
                //     $(option_array).each(function(key, array) {
                //         // console.log(array);
                //         // let checkbox_value_attr = $(input_element).val();
                //         // $(input_element).parent().find('.cnt').html('(' + val2[el_val] + ')')
                //     });
                //
                // });

                $.each(data, function(i, val) {
                    if (i !== 'price' && i !== 'year' && i !== 'power') {
                        let checkbox_values = $('.filter-options.wrapper-' + i).find('.checkbox input');

                        $.each(checkbox_values, function(i, el) {
                            let named = $(el).attr('name').replace('[]', '');

                            if (named == 'brand' || named == 'model') {
                                if (parseInt(val[$(el).val()]) > 0) {
                                    $(el).parent().removeClass('disabled');
                                    // let cnt_elemnt = $(el).closest('.checkbox').find('.cnt').html('(' + val[$(el).val()] + ')');
                                }

                                if (val[$(el).val()] == undefined) { // val - массив доступных свойств   // ar[Модель] //
                                    $(el).parent().addClass('disabled');
                                    // let cnt_elemnt = $(el).closest('.checkbox').find('.cnt').html('(0)');
                                }
                            }
                        });

                    }
                });
            }
        })
    }

    if ($(".filter").length > 0) {

        $('select.for_filter').on('change', function() {
            initFilter()
        });

        priceSlider.noUiSlider.on('change.one', delay(function (e) {
            initFilter();
        }, filterDelay));

        yearSlider.noUiSlider.on('change.one', delay(function (e) {
            initFilter();
        }, filterDelay));

        powerSlider.noUiSlider.on('change.one', delay(function (e) {
            initFilter();
        }, filterDelay));
    }

    $(".filter").on("change", '[type="checkbox"], [type="radio"]', delay(function (e) {
        initFilter();
    }, filterDelay));

    $(".callback-form").on("submit", function () {
        let th = $(this);
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: "POST",
            data: {
                action: 'callback_action',
                callback: $(this).serializeAssoc(),
            },
            success: function (data) {
                $(th).find('.success-hide').remove();
                $(th).find('.form-success').show();
            }
        });
        return false;
    });

    $("form.page").on("submit", function () {
        let th = $(this);

        let form_data = new FormData();

        if ($(this).find('[name="photo"]').length > 0) {
            let file_data = $(this).find('[name="photo"]').prop('files')[0];
            form_data.append('file', file_data);
        }

        form_data.append('action', 'trade_in_action');
        form_data.append('tradein', JSON.stringify(th.serializeAssoc()));

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {
                $(th)[0].reset();
                $(th).find('.filename').html('Загрузить файл (jpg, png)');
                $(th).find('.file-wrapper').removeClass('filled');
                $(th).find('#brand').val('').change().selectric('refresh');
                $('body').addClass('success');
            }
        });
        return false;
    });

    $(".attached").on("click", function () {
        $("#photo").val(null);
        $('.file-wrapper').removeClass('filled');
        $('.filename').html('Загрузить файл (jpg, png)');
    });

    $(".filter-reset_button").on("click", function (e) {
        $('.filter form')[0].reset();
        let priceSliderOptions = priceSlider.noUiSlider.options;
        let yearSliderOptions = yearSlider.noUiSlider.options;
        let powerSliderOptions = powerSlider.noUiSlider.options;
        $('.filter .checkbox').removeClass('disabled');

        priceSlider.noUiSlider.set([priceSliderOptions['start'][0], priceSliderOptions['start'][1]]);
        yearSlider.noUiSlider.reset([yearSliderOptions['start'][0], yearSliderOptions['start'][1]]);
        powerSlider.noUiSlider.reset([powerSliderOptions['start'][0], powerSliderOptions['start'][1]]);

        $('#price_from').val(priceSliderOptions['start'][0]);
        $('#price_to').val(priceSliderOptions['start'][1]);
        $('#year_from').val(yearSliderOptions['start'][0]);
        $('#year_to').val(yearSliderOptions['start'][1]);
        $('#power_to').val(powerSliderOptions['start'][1]);
        $('#power_from').val(powerSliderOptions['start'][1]);

        $('#brand-select').val('').change().selectric('refresh');
    });

    $(".callback-link").on("click", function () {
        $("body").addClass("callback-opened");
        return false;
    });

    $(".close-form_button").on("click", function () {
        $("body").removeClass("callback-opened success");
    });

    $(".scroll-to-form").on("click", function () {
        $('.forms-wrapper').addClass('opened');
        $("body, html").stop().animate({scrollTop: $('.forms-wrapper').offset().top - 85 + 'px'}, 1000);
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

    $(".success-overlay").on("click", function (e) {
        if ($(e.target).hasClass('success-overlay')) {
            $("body").removeClass("success");
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
        speed: 800,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        navigation: {
            nextEl: '.home-slider .swiper-button-next',
            prevEl: '.home-slider .swiper-button-prev',
        },
    });

});

let map;


function mapInit() {
    map = new ymaps.Map('map', {
        center: [55.315699, 86.145974],
        zoom: 16,
        autoFitToViewport: 'always'
    });

    let atom_pin = new ymaps.Placemark([55.315699, 86.145974], {});
    map.geoObjects.add(atom_pin);
    map.controls.add('zoomControl');
}

if ($('#map').length > 0) {
    setTimeout(function () {
        let element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = '//api-maps.yandex.ru/2.0/?load=package.standard&apikey=55dae701-255d-48f5-b274-7be50d3ef1e2&lang=ru-RU&onload=mapInit';
        document.getElementsByTagName('body')[0].appendChild(element);

    }, 1000);

}