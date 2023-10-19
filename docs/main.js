(() => {
  const body = document.querySelector("body");
  fetch("questions/2023/autumn/am1/index.html")
    .then((response) => response.text())
    .then((data) => (body.innerHTML = data));
})();
