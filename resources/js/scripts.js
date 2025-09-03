document.addEventListener("DOMContentLoaded", function () {
  initI18next();

  const savedLanguage = localStorage.getItem("language") || "en";
  changeLanguageI18n(savedLanguage);

  setTimeout(() => {
    restoreCertificateImages();
  }, 100);

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
        restoreCertificateImages();
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
  if (flagImage) {
    flagImage.src =
      lang === "vn"
        ? "/resources/images/ic_vn.svg"
        : "/resources/images/ic_en.svg";
    localStorage.setItem("flagImage", flagImage.src);
  }

  const operationImage = document.getElementById("operation-image");
  if (operationImage) {
    operationImage.src =
      lang === "vn"
        ? "/resources/images/field_of_operation_vn.svg"
        : "/resources/images/field_of_operation.svg";

    localStorage.setItem("operationImage", operationImage.src);
  }

  setTimeout(() => {
    const certificate1Img = document.getElementById("certificate1-img");
    const certificate2Img = document.getElementById("certificate2-img");

    if (certificate1Img) {
      const newSrc1 = lang === "vn"
        ? "/resources/images/certificate1_vn.jpg"
        : "/resources/images/certificate1_en.jpg";
      certificate1Img.src = newSrc1;
      localStorage.setItem("certificate1Image", newSrc1);
    } else {
      console.log("certificate1-img element not found!");
    }

    if (certificate2Img) {
      const newSrc2 = lang === "vn"
        ? "/resources/images/certificate2_vn.jpg"
        : "/resources/images/certificate2_en.jpg";
      certificate2Img.src = newSrc2;
      localStorage.setItem("certificate2Image", newSrc2);
    } else {
      console.log("certificate2-img element not found!");
    }
  }, 100);

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

function restoreCertificateImages() {
  const savedLanguage = localStorage.getItem("language") || "en";
  const certificate1Img = document.getElementById("certificate1-img");
  const certificate2Img = document.getElementById("certificate2-img");

  if (certificate1Img) {
    const savedCertificate1Image = localStorage.getItem("certificate1Image");
    if (savedCertificate1Image) {
      certificate1Img.src = savedCertificate1Image;
    } else {
      certificate1Img.src =
        savedLanguage === "vn"
          ? "/resources/images/certificate1_vn.jpg"
          : "/resources/images/certificate1_en.jpg";
    }
  }

  if (certificate2Img) {
    const savedCertificate2Image = localStorage.getItem("certificate2Image");
    if (savedCertificate2Image) {
      certificate2Img.src = savedCertificate2Image;
    } else {
      certificate2Img.src =
        savedLanguage === "vn"
          ? "/resources/images/certificate2_vn.jpg"
          : "/resources/images/certificate2_en.jpg";
    }
  }
}
