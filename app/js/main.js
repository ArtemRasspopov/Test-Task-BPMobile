$(function () {
  $("#menu").on("click", "a", function (event) {
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });

  $(".bunner__selectors_list-item").on("click", function (event) {
    $(".bunner__selectors_list-item").removeClass("--active");
    $(this).addClass("--active");
  });

  $("#continue_button").on("click", function () {
    const activeElementLink = $(".bunner__selectors_list-item.--active").attr(
      "data-link"
    );
    window.open(activeElementLink, "_blank");
  });

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  function setLanguage(lang) {
    const jsonPath = `../assets/lang-strings/${lang}.json`;

    $.getJSON(jsonPath, function (langData) {
      document.querySelectorAll("[data-leng]").forEach((element) => {
        const translationKey = element.getAttribute("data-leng");

        if (langData && translationKey in langData) {
          element.innerHTML = langData[translationKey];
        }
      });
    }).fail(function (jqxhr, textStatus, error) {
      const err = textStatus + ", " + error;
      console.error("Request Failed: " + err);
    });
  }

  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");

  if (langParam) {
    setLanguage(langParam);
  }
});
