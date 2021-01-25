$(function () {

  let $select = $('select');
  if ($select.length > 0)
      $select.selectric();

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

  var prices = [
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

  var numbers = document.querySelectorAll(".number-format"),
    maskOptions = {
      mask: Number,
      thousandsSeparator: " ",
    };

  for (let i = 0; i < numbers.length; i++) {
    IMask(numbers[i], maskOptions);
  }

  $(".nano").nanoScroller({ iOSNativeScrolling: true });

  function filterInitScrollPosition() {
    if ($('.filter').is(':visible')) {
      
      if ($(window).scrollTop() >= $("header").height()) {
        $(".filter").addClass("filter-fixed");
        $("body").addClass("body-filter");

        filterInitPosition();
      } else {
        $(".filter").css("bottom", "0");

        $(".filter").removeClass("filter-fixed");
        $("body").removeClass("body-filter");
        $(".nano").nanoScroller({ destroy: true });
        $(".nano").nanoScroller();
      }
    }
  }

  function getRectTop(el) {
    var rect = el.getBoundingClientRect();
    return rect.top;
  }

  function filterInitPosition() {

    if ($('.filter').is(':visible')) {
      let bottom =
        window.innerHeight - ($("footer").offset().top - $(document).scrollTop());

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
      console.log(bottom, window.innerHeight);
      // console.log(Math.abs(bottom));

      $(".nano").nanoScroller({ destroy: true });
      $(".nano").nanoScroller();
    }
  }

  filterInitScrollPosition();

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
    filterInitPosition();
  });

  $(".filter").addClass("fade-in");
});
