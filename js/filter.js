let repBtn = document.getElementById("repcheck");
let demBtn = document.getElementById("demcheck");
let indBtn = document.getElementById("indcheck");

// making array of checkbox values ("R","D", "I")
const checkBox = () => {
  //making array of checkboxnodes
  var checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  );
  let check = []; //getting values insteaad of nodes
  for (i = 0; i < checkboxes.length; i++) {
    check.push(checkboxes[i].value);
  }
  return check;
};

// listeting for clicks on checkboxes
repBtn.addEventListener("change", () => {
  let check = checkBox(); // get array of checked checkboxes
  //let arr = makeArr(data);
  let filtered = makeFilterArray(); // calling function from below that filters and fills table
});

demBtn.addEventListener("change", () => {
  let check = checkBox();
  //let arr = makeArr(data);
  let filtered = makeFilterArray();
});

indBtn.addEventListener("change", () => {
  let check = checkBox();
  //let arr = makeArr(data);
  let filtered = makeFilterArray();
});

const makeFilterArray = () => {
  let check = checkBox(); // gets array with filterboxes taht are checked
  let state = document.getElementById("inputGroupSelect01").value; // gets value from dropdown for states
  let members = makeArr(data); // makes usable array with function from main.js using data from json data
  let filterarr = []; // creating new empty array that serves as temp to populate new array
  if (check.length == 0 && state == "ALL") {
    // case 1: NO Checkboxes; NO Dropdown states => default state
    filterarr = members;
  } else {
    members.forEach(element => {
      if (check.length !== 0 && state == "ALL") {
        // case 2: YES Checkboxes are checked; NO Dropdown states
        //filterarr = members; // think this is unneccessary JL 7.2.20
        if (check.includes(element.party)) {
          filterarr.push(element);
        }
      } else if (check.length == 0 && state !== "ALL") {
        // case 3: NO Checkboxes are checked; YES Dropdown states
        if (element.state == state) {
          filterarr.push(element);
        }
      } else {
        if (check.includes(element.party) && element.state == state) {
          // case 4: YES Checkboxes are checked; YES Dropdown states

          filterarr.push(element);
        }
      }
    }); // end of foreach=> temp array fiterarry is full of desired data
  }
  fillTable(filterarr);
};

//--------------------------------------------------------------
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
// DOM manipulation to fill Dropdown
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

  let listSingleStates = countStates(listOfSortedStates);

  for (i = 0; i < listSingleStates.length; i++) {
    let opt = document.createElement("option");
    opt.setAttribute("id", listSingleStates[i]);
    opt.setAttribute("value", listSingleStates[i]);

    opt.innerHTML = listSingleStates[i];
    document.getElementById("inputGroupSelect01").appendChild(opt);
  }
  return listSingleStates;
};
fillDropdown();
// Sort algorithm to sort the States array
function dynamicSort(property) {
  return function(a, b) {
    return a[property].localeCompare(b[property]);
  };
}
// eventlistener for drop down usage
document
  .getElementById("inputGroupSelect01")
  .addEventListener("change", event => {
    makeFilterArray();
  });
