document.addEventListener("DOMContentLoaded", function () {
  fetch("/resources/components/header-homepage.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-homepage").innerHTML = data;
      updateHeaderContent();
      updateFlagImage();
      updateLanguageDropdown();
      updateFieldOfOperationImage();
    })
    .catch((error) => console.error("Error loading header home page:", error));
});

function updateHeaderContent() {
  const headerElements = document.querySelectorAll(
    "#header-homepage [data-i18n]"
  );
  headerElements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = i18next.t(key);
  });
}

function updateFieldOfOperationImage() {
  const savedLanguage = localStorage.getItem("language") || "en";
  const operationImg = document.querySelector("#field-of-operation img");

  if (operationImg) {
    operationImg.src =
      savedLanguage === "vn"
        ? "resources/images/field_of_operation_vn.svg"
        : "resources/images/field_of_operation.svg";
  }
}

function updateFlagImage() {
  const savedLanguage = localStorage.getItem("language") || "en";
  const flagImage = document.querySelector(
    "#header-homepage .current-flag img"
  );

  flagImage.src =
    savedLanguage === "vn"
      ? "/resources/images/ic_vn.svg"
      : "/resources/images/ic_en.svg";
}

function updateLanguageDropdown() {
  const savedLanguage = localStorage.getItem("language") || "en";
  const languageItems = document.querySelectorAll(
    "#header-homepage .language-item"
  );

  languageItems.forEach((item) => {
    item.classList.remove("selected");
    if (
      item.textContent.includes(
        savedLanguage === "vn" ? "Tiếng Việt" : "English"
      )
    ) {
      item.classList.add("selected");
    }
  });
}
