// do some DOM manipulation
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");

button1.addEventListener("click", () => {
  console.log("clicked");
  button2.classList.remove("invisible");
});
