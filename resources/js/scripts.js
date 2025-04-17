document.addEventListener("DOMContentLoaded", function () {
  initI18next();

  const savedLanguage = localStorage.getItem("language") || "en";
  changeLanguageI18n(savedLanguage);

  const menuItems = document.querySelectorAll(".menu-item");
  const currentMenu = localStorage.getItem("activeMenu") || "/";

  menuItems.forEach((item) => {
    if (item.getAttribute("data-menu") === currentMenu) {
      item.classList.add("active");
    }

    item.addEventListener("click", function () {
      localStorage.setItem("activeMenu", this.getAttribute("data-menu"));
    });
  });
});

/* ====== Open Dropdown Change Language ====== */
function toggleLanguageDropdown(event) {
  event.preventDefault();
  const dropdown = event.currentTarget.nextElementSibling;
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Close Dropdown when clicking out
document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll(".dropdown-language");
  dropdowns.forEach((dropdown) => {
    if (!dropdown.previousElementSibling.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
});

/* ====== Handle Change Language I18N ======  */
function initI18next() {
  Promise.all([
    fetch("/resources/i18n/vn.json").then((response) => response.json()),
    fetch("/resources/i18n/en.json").then((response) => response.json()),
  ]).then((resources) => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18next.init(
      {
        lng: savedLanguage,
        resources: {
          vn: { translation: resources[0] },
          en: { translation: resources[1] },
        },
      },
      (err, t) => {
        updateContent();
        if (typeof updateHeaderContent === "function") {
          updateHeaderContent();
        }
      }
    );
  });
}

initI18next();

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = i18next.t(key);
  });
}

function changeLanguageI18n(lang) {
  // Lưu ngôn ngữ và hình ảnh vào localStorage
  localStorage.setItem("language", lang);

  const flagImage = document.querySelector(".current-flag img");
  flagImage.src =
    lang === "vn"
      ? "/resources/images/ic_vn.svg"
      : "/resources/images/ic_en.svg";
  localStorage.setItem("flagImage", flagImage.src);

  const operationImage = document.getElementById("operation-image");
  if (operationImage) {
    operationImage.src =
      lang === "vn"
        ? "/resources/images/field_of_operation_vn.svg"
        : "/resources/images/field_of_operation.svg";

    localStorage.setItem("operationImage", operationImage.src);
  }

  i18next.changeLanguage(lang, () => {
    updateContent();
    if (typeof updateHeaderContent === "function") {
      updateHeaderContent();
    }
  });

  const languageItems = document.querySelectorAll(".language-item");
  languageItems.forEach((item) => {
    item.classList.remove("selected");
  });

  const selectedItem = [...languageItems].find((item) =>
    item.textContent.includes(lang === "vn" ? "Tiếng Việt" : "English")
  );
  if (selectedItem) {
    selectedItem.classList.add("selected");
  }
}

function toggleDropdown(event) {
  event.preventDefault();
  const dropdown = event.target.closest("li").querySelector(".dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

function toggleDrawer() {
  const drawer = document.querySelector(".drawer");
  const overlay = document.querySelector(".overlay");

  if (drawer.classList.contains("open")) {
    drawer.classList.remove("open");
    overlay.style.display = "none";
  } else {
    drawer.classList.add("open");
    overlay.style.display = "block";
  }
}
