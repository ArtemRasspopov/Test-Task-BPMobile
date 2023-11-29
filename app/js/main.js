$(function () {
  const LANG_PATH = "./assets/lang-strings/";
  const DEFAULT_LANG = "en";
  const IMAGE_PATH = "./assets/images/banner-img/";

  const userLanguage = navigator.language;
  const pixelDensity = Math.round(window.devicePixelRatio);
  let vh = window.innerHeight * 0.01;
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");

  document.documentElement.style.setProperty("--vh", `${vh}px`);

  async function loadLanguage(lang) {
    const jsonPath = `${LANG_PATH}${lang}.json`;

    try {
      const langData = await $.getJSON(jsonPath);
      applyLanguage(langData, lang);
    } catch (error) {
      console.error(`Failed to load language file for ${lang}: ${error}`);
      if (lang !== DEFAULT_LANG) {
        await loadLanguage(DEFAULT_LANG);
      } else {
        $(".bunner__inner").css("opacity", "1");
      }
    }
  }

  function applyLanguage(langData, lang) {
    document.querySelectorAll("[data-leng]").forEach((element) => {
      const translationKey = element.getAttribute("data-leng");
      if (langData && translationKey in langData) {
        element.innerHTML = langData[translationKey];
        $(element).html(langData[translationKey]).addClass(`lang_${lang}`);
        $(".bunner").addClass(`lang_${lang}`);
        $("html").attr("lang", lang);
        $(".bunner__inner").css("opacity", "1");
      }
    });
  }

  function setLanguage(lang) {
    loadLanguage(lang);
  }

  if (langParam) {
    setLanguage(langParam);
  } else if (userLanguage) {
    setLanguage(userLanguage);
  }

  if (pixelDensity <= 4) {
    $(".bunner__cards_list-item").each(function (index) {
      var imagePath = `${IMAGE_PATH}${index + 1}-${"x" + pixelDensity}.jpg`;
      $(this).css("background-image", `url('${imagePath}')`);
    });
  }

  $(".bunner__selectors_list-item").on("click", function () {
    $(".bunner__selectors_list-item").removeClass("--active");
    $(this).addClass("--active");
  });

  $("#continue_button").on("click", function () {
    const activeElementLink = $(".bunner__selectors_list-item.--active").attr(
      "data-link"
    );
    window.open(activeElementLink, "_blank");
  });
});
