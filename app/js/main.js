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

  const languageStrings = {};

  function setLanguage(lang) {
    document.querySelectorAll("[data-leng]").forEach((element) => {
      const translationKey = element.getAttribute("data-leng");

      if (languageStrings[lang] && translationKey in languageStrings[lang]) {
        element.innerHTML = languageStrings[lang][translationKey];
      }
    });
  }

  function loadLanguageData(lang) {
    return fetch(`/assets/lang-strings/${lang}.json`)
      .then((response) => response.json())
      .then((data) => {
        languageStrings[lang] = data;
      })
      .catch((error) =>
        console.error(`Error loading ${lang} language data`, error)
      );
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  const langParam = getParameterByName("lang");

  if (langParam) {
    loadLanguageData(langParam).then(() => setLanguage(langParam));
  }
});
