// do some DOM manipulation
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button1");
let str = document.getElementById("button1").innerHTML;
let str1 = document.getElementById("button2").innerHTML;

let elementIsClicked = false;
button1.addEventListener("click", () => {
  if (elementIsClicked == false) {
    elementIsClicked = true;
    changeText(elementIsClicked, str);
  } else {
    elementIsClicked = false;
    changeText(elementIsClicked, str);
  }
});
let elementIsClicked1 = false;
button2.addEventListener("click", () => {
  if (elementIsClicked1 == false) {
    elementIsClicked1 = true;
    changeText(elementIsClicked1, str1);
  } else {
    elementIsClicked1 = false;
    changeText(elementIsClicked1, str1);
  }
});
const changeText = (elem, str) => {
  if (elem == true) {
    console.log("noooo");
    console.log(str);
    let repl = str.replace(str, "Show Less");
    if (str == "About Us") {
      document.getElementById("button1").innerHTML = repl;
    } else {
      document.getElementById("button2").innerHTML = repl;
    }
  } else {
    console.log("jooo");
    console.log(str);
    let repl = str.replace("Show Less", str);
    if (str == "About Us") {
      document.getElementById("button1").innerHTML = repl;
    } else {
      document.getElementById("button2").innerHTML = repl;
    }
  }
};
