$(function () {
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

  priceSlider.noUiSlider.on("update", function (values, handle, unencoded, isTap, positions, noUiSlider) {
      prices[handle].value = values[handle];
    },
  );

  prices.forEach(function (input, handle) {
    input.addEventListener('change', function () {
      priceSlider.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function (e) {
      switch (e.which) {
        case 13:
          priceSlider.noUiSlider.setHandle(handle, this.value);
            break;
      }
    });
  });

  var
    numbers = document.querySelectorAll('.number-format'),
    maskOptions = {
      mask: Number,
      thousandsSeparator: ' '
    };

  for( let i = 0; i < numbers.length; i++) {
    IMask(numbers[i], maskOptions);
  }

  $(".nano").nanoScroller({ iOSNativeScrolling: true });
});
