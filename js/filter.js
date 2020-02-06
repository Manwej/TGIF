let repBtn = document.getElementById("repcheck");
let demBtn = document.getElementById("demcheck");
let indBtn = document.getElementById("indcheck");

// making array of checkbox values, loop needed for retrieving values. than make new list by comparing to the array of vaule ("R","D", "I")
const test = () => {
  //making array of checkboxnodes
  var checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  );
  console.log(checkboxes);
};

repBtn.addEventListener("change", () => {
  test();
  if (repBtn.checked) {
    console.log("helloR");
    // delRows();
    fillTable(makeFilterArray("R"));
  } else {
    console.log("helloR2");
    // delRows();
    fillTable(makeArr(data));
  }
});
demBtn.addEventListener("change", () => {
  test();
  if (demBtn.checked) {
    console.log("helloD");
    // delRows();
    fillTable(makeFilterArray("D"));
  } else {
    console.log("helloD2");
    // delRows();
    fillTable(makeArr(data));
  }
});
indBtn.addEventListener("change", () => {
  test();
  if (indBtn.checked) {
    console.log("helloI");
    // delRows();
    fillTable(makeFilterArray("I"));
  } else {
    console.log("helloI2");
    // delRows();
    fillTable(makeArr(data));
  }
});
const makeFilterArray = str => {
  let arr = makeArr(data);
  let filterarr = [];
  arr.forEach(element => {
    if (element.party == str) {
      filterarr.push(element);
    }
  });
  return filterarr;
};
// const delRows = () => {
//   var elmTable = document.getElementById("data");
//   var tableRows = elmTable.getElementsByTagName("tr");
//   var rowCount = tableRows.length;
//   for (let i = rowCount - 1; i >= 0; i--) {
//     elmTable.removeChild(tableRows[i]);
//   }
// };
//______________---------------------___________--------------________----------_-_-_-_-__-_---_-
// Dropdown Filter for Region

// count states function
const countStates = arr => {
  let cStates = [];
  for (i = 0; i < arr.length; i++) {
    if (!cStates.includes(arr[i].state)) {
      cStates.push(arr[i].state);
    }
  }
  return cStates;
};
const fillDropdown = () => {
  let arr = makeArr(data);
  let states = [];
  for (i = 0; i < arr.length; i++) {
    let state = {
      state: arr[i].state
    };
    states.push(state);
  }
  let listOfSortedStates = states.sort(dynamicSort("state"));
  //   console.log(listOfSortedStates[1].state);
  let listSingleStates = countStates(listOfSortedStates);

  //let input = document.getElementById("inputGroupSelect01");
  for (i = 0; i < listSingleStates.length; i++) {
    let opt = document.createElement("option");
    opt.setAttribute("id", listSingleStates[i]);
    opt.innerHTML = listSingleStates[i];
    document.getElementById("inputGroupSelect01").appendChild(opt);
  }
  return listSingleStates;
};
fillDropdown();

function dynamicSort(property) {
  return function(a, b) {
    return a[property].localeCompare(b[property]);
  };
}
// const dropFilter = () => {
//   console.log("hello");
//   //   let filter = fillDropdown();
//   //   for (i = 0; i < filter.length; i++) {
//   //     dropOption = document.getElementById(filter[i]);
//   //     dropOption.addEventListener("change", () => {
//   //       console.log("hello");
//   //     });
//   // }
// };
dropOption = document.getElementById("inputGroupSelect01");
console.log(dropOption);
dropOption.addEventListener("change", () => {
  console.log("hello");
});
//   event => {
//     if (event.target.id == "ALL") {
//       console.log("hello");
//     }
//   },
//   false
// );
//dropFilter();
