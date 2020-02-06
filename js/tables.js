let atGlance = Statistics.atGlance;

const makeGlanceTable = obj => {
  for (i = 0; i < atGlance.length; i++) {
    let tr = document.createElement("tr");
    let oneRow = atGlance[i];
    for (const property in oneRow) {
      let td = document.createElement("td");
      td.innerHTML = `${oneRow[property]}`;
      tr.appendChild(td);
    }
    document.getElementById("data").appendChild(tr);
  }
};
makeGlanceTable(Statistics);

const makeTable = (obj, val) => {
  // if (val == true) {
  let leasttable = Statistics[val];
  for (i = 0; i < leasttable.length; i++) {
    let tr = document.createElement("tr");
    let oneRow = leasttable[i];
    for (const property in oneRow) {
      let td = document.createElement("td");
      td.innerHTML = `${oneRow[property]}`;
      tr.appendChild(td);
    }
    if (val == "least_engaged" || val == "least_loyal") {
      document.getElementById("least-data").appendChild(tr);
    } else if (val == "most_engaged" || val == "most_loyal") {
      document.getElementById("most-data").appendChild(tr);
    }
  }
};
makeTable(Statistics, "least_engaged");
makeTable(Statistics, "most_engaged");

makeTable(Statistics, "least_loyal");
makeTable(Statistics, "most_loyal");
