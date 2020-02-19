let urlH = "https://api.propublica.org/congress/v1/113/house/members.json";
let urlS = "https://api.propublica.org/congress/v1/113/senate/members.json";

let fetchEverything = url => {
  fetch(url, {
    headers: {
      "X-API-Key": "Sdkpx6o71kfbVCvisK7hF8JjqbSsxTzNkeDjnRB4"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      members = data.results[0].members;
      masterController(members);
      loadingData();
    })
    .catch(error => {
      console.log(error);
    });
};
const determineData = () => {
  if (document.title.includes("Senate")) {
    console.log("use senate");
    fetchEverything(urlS);
  }
  if (document.title.includes("House")) {
    console.log("use house");
    fetchEverything(urlH);
  }
};
determineData();

const masterController = members => {
  if (document.title.includes("Data")) {
    fillMainTable(makeTempArr(members));
    fillDropdown(makeTempArr(members));
    allEventListeners(makeTempArr(members));
  }
  if (document.title.includes("Attendance")) {
    glancePartyLogic(makeTempArr(members));
    let sortedMvotes = bubbleSort(missedVotes(members), "missed_votes");
    let sortedPvotes = bubbleSort(partyVotes(members), "votes_with_party_pct");
    engagedSiteDet(sortedMvotes, sortedPvotes);
    makeGlanceTable();
    makeEngagedTable(Statistics, "least_engaged");
    makeEngagedTable(Statistics, "most_engaged");
  }
  if (document.title.includes("Loyalty")) {
    glancePartyLogic(makeTempArr(members));
    let sortedMvotes = bubbleSort(missedVotes(members), "missed_votes");
    let sortedPvotes = bubbleSort(partyVotes(members), "votes_with_party_pct");
    engagedSiteDet(sortedMvotes, sortedPvotes);
    makeGlanceTable();
    makeEngagedTable(Statistics, "least_loyal");
    makeEngagedTable(Statistics, "most_loyal");
  }
};

const loadingData = () => {
  let loading = false;
  if (loading == false) {
    loading = true;
    console.log("true");
    if (
      document.title.includes("Attendance") ||
      document.title.includes("Loyalty")
    ) {
      document.getElementById("loader1").classList.add("d-none");
      document.getElementById("loader2").classList.add("d-none");
      document.getElementById("loader3").classList.add("d-none");
    } else {
      document.getElementById("loader").classList.add("d-none");
    }

    //document.querySelectorAll("div.lds-spinner").classList.add("d-none");
  }
};

// do some DOM manipulation
const domMaster = () => {
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
};
domMaster();

// ottavias example of more advanced stuff
// async function fetch() {
//   try {
//     let response = await fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
//       headers: {
//         "X-API-Key": "Sdkpx6o71kfbVCvisK7hF8JjqbSsxTzNkeDjnRB4"
//       }
//     })
//     let data = await response.json()
//     if (data) {

//     }
//   } catch (err) {
//     console.log(err)
//   }

// }
