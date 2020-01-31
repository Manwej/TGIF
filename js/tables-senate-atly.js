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

// for (i = 0; i < memberobject.length; i++) {
//   let tr = document.createElement("tr"); // Create a <tr> node
//   let oneMember = memberobject[i];
//   //let link = data.results[0].members[i].api_uri;
//   for (const property in oneMember) {
//     let td = document.createElement("td");
//     //let hello = `${oneMember[voteswithparty]}`;
//     if (typeof oneMember[property] === "number") {
//       console.log("hello");
//       td.innerHTML = `${oneMember[property]}` + " %";
//     } else if (oneMember[property] === null) {
//       td.innerHTML = " ";
//     } else if (`${property}` == "firstname") {
//       td.innerHTML =
//         "<a href='" +
//         members[i].api_uri +
//         "'>" +
//         `${oneMember[property]}` +
//         "</a>";
//     } else {
//       td.innerHTML = `${oneMember[property]}`;
//     }
//     //td.innerHTML = `${oneMember[property]}`;
//     tr.appendChild(td);
//   }
//   document.getElementById("data").appendChild(tr);
// }
