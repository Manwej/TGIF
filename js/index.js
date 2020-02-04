// do some DOM manipulation

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let str0 = document.getElementById("button1").innerText;
let str1 = document.getElementById("button2").innerHTML;

let elementIsClicked = false;
button1.addEventListener("click", () => {
  if (elementIsClicked == false) {
    elementIsClicked = true;
    changeText(elementIsClicked, "About Us");
  } else {
    elementIsClicked = false;
    changeText(elementIsClicked, "About Us");
  }
});
let elementIsClicked1 = false;
button2.addEventListener("click", () => {
  if (elementIsClicked1 == false) {
    elementIsClicked1 = true;
    changeText(elementIsClicked1, "History of Government Transparency");
  } else {
    elementIsClicked1 = false;
    changeText(elementIsClicked1, "History of Government Transparency");
  }
});
const changeText = (elem, str) => {
  if (elem == true) {
    let repl = str.replace(str, "Show Less");

    if (str === "About Us") {
      document.getElementById("button1").innerHTML = repl;
    } else {
      document.getElementById("button2").innerHTML = repl;
    }
  } else {
    let repl = str.replace("Show Less", str);
    if (str === "About Us") {
      document.getElementById("button1").innerHTML = repl;
    } else {
      document.getElementById("button2").innerHTML = repl;
    }
  }
};
