const products = [
  "Protection film",
  "TDT",
  "TCS&P (1.5 mic & Gen II pad)",
  "Thin flowable OCA",
  "PSA",
  "Novec fluids",
  "VHB, liquid adhesive",
  "Light management tape (Anti-lifting)",
  "APF–QWP",
  "Electronic conductive tape, gasket",
  "Shielding can tape, FFDM",
  "PSA (removable, H-L adhesion)",
  "EMI absorber",
  "Copper foil",
  "Ferrite sheet",
  "Composite FFDM absorber",
  "Absorber ribbon",
  "300LSE PSA",
  "ECM (20NF)",
];

const productList = document.getElementById("product-list");

products.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.className = "product-item";
  productDiv.textContent = product;
  productList.appendChild(productDiv);
});
