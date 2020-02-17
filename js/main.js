// fill table with json data // make array with relevant info
const makeTempArr = obj => {
  let memberobject = [];
  for (i = 0; i < obj.length; i++) {
    let newInfo = {
      firstname: obj[i].first_name,
      middlename: obj[i].middle_name,
      lastname: obj[i].last_name,
      party: obj[i].party,
      state: obj[i].state,
      voteswithparty: obj[i].votes_with_party_pct
    };
    memberobject.push(newInfo);
  }
  return memberobject;
};
//create a tr for each member
const fillMainTable = obj => {
  const table = document.getElementById("data");
  table.innerHTML = "";
  for (i = 0; i < obj.length; i++) {
    let tr = document.createElement("tr"); // Create a <tr> node
    let oneMember = obj[i];
    for (const property in oneMember) {
      let td = document.createElement("td");

      if (typeof oneMember[property] === "number") {
        td.innerHTML = `${oneMember[property]}` + " %";
      } else if (oneMember[property] === null) {
        td.innerHTML = " ";
      } else if (`${property}` == "firstname") {
        td.innerHTML = `<a href='${members[i].url}'>${oneMember[property]}</a>`;
      } else {
        td.innerHTML = `${oneMember[property]}`;
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return obj;
};
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
const allEventListeners = members => {
  document.getElementById("repcheck").addEventListener("change", () => {
    //let check = checkBox(); // get array of checked checkboxes
    //let arr = makeArr(data);
    makeFilterArray(members); // calling function from below that filters and fills table
  });

  document.getElementById("demcheck").addEventListener("change", () => {
    makeFilterArray(members);
  });

  document.getElementById("indcheck").addEventListener("change", () => {
    makeFilterArray(members);
  });

  document
    .getElementById("inputGroupSelect01")
    .addEventListener("change", () => {
      makeFilterArray(members);
    });
};
const makeFilterArray = members => {
  let check = checkBox(); // gets array with filterboxes taht are checked
  let state = document.getElementById("inputGroupSelect01").value; // gets value from dropdown for states
  //let members = makeArr(data); // makes usable array with function from main.js using data from json data
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

  fillMainTable(filterarr);
};
// Dropdown Filter for Region/ DOM manipulation to fill Dropdown
const fillDropdown = obj => {
  let states = [];
  for (i = 0; i < obj.length; i++) {
    if (!states.includes(obj[i].state)) {
      states.push(obj[i].state);
    }
  }
  let listOfSortedStates = states.sort();

  for (i = 0; i < listOfSortedStates.length; i++) {
    let opt = document.createElement("option");
    opt.setAttribute("id", listOfSortedStates[i]);
    opt.setAttribute("value", listOfSortedStates[i]);

    opt.innerHTML = listOfSortedStates[i];
    document.getElementById("inputGroupSelect01").appendChild(opt);
  }
  return listOfSortedStates;
};
