document.addEventListener("DOMContentLoaded", function () {
  fetch("/resources/components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
      updateFooterContent();
    })
    .catch((error) => console.error("Error loading footer:", error));
});

function updateFooterContent() {
  const footerElements = document.querySelectorAll("#footer [data-i18n]");
  footerElements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = i18next.t(key);
  });
}
