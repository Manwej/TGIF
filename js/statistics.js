// create object with calculated values, first set them to 0 and update them via functions
let Statistics = {
  atGlance: [
    {
      name: "Democrats",
      number: 0,
      pct: 0
    },
    {
      name: "Republican",
      number: 0,
      pct: 0
    },
    {
      name: "Independent",
      number: 0,
      pct: 0
    },
    {
      name: "Total",
      number: 0,
      pct: 0
    }
  ],
  least_engaged: [],
  most_engaged: [],
  least_loyal: [],
  most_loyal: []
};
//get right "path" from data json object
//function for calculating the average
const avgPct = (a, b) => {
  let sum = 0;
  let avg;
  sum = sum + a;
  avg = sum / b;
  return avg;
};
// create logic for atglance table
const glancePartyLogic = obj => {
  for (i = 0; i < obj.length; i++) {
    if (obj[i].party == "D") {
      Statistics.atGlance[0].number++;
      Statistics.atGlance[0].pct += obj[i].voteswithparty;
    } else if (obj[i].party == "R") {
      Statistics.atGlance[1].number++;
      if (typeof members[i].votes_with_party_pct == "number") {
        Statistics.atGlance[1].pct += obj[i].voteswithparty;
      } else {
        Statistics.atGlance[1].pct += 0;
      }
    } else if (obj[i].party == "I") {
      Statistics.atGlance[2].number++;
      Statistics.atGlance[2].pct += obj[i].voteswithparty;
    }
  }
  for (i = 0; i < Statistics.atGlance.length - 1; i++) {
    if (Statistics.atGlance[i].pct == 0) {
      Statistics.atGlance[i].pct = 0;
    } else {
      let num = avgPct(
        Statistics.atGlance[i].pct,
        Statistics.atGlance[i].number
      );

      Statistics.atGlance[i].pct = Math.floor(num * 100) / 100;
    }
  }
  Statistics.atGlance[3].number = obj.length;
  Statistics.atGlance[3].pct =
    Math.floor(
      ((Statistics.atGlance[0].pct +
        Statistics.atGlance[1].pct +
        Statistics.atGlance[2].pct) /
        3) *
        100
    ) / 100;
};
//Logic for attendance page Least and most engaged//make help array object with data
const missedVotes = obj => {
  let votes = [];
  for (i = 0; i < obj.length; i++) {
    let mVotes = {
      name: obj[i].first_name + " " + obj[i].last_name,
      missed_votes: obj[i].missed_votes,
      missed_votes_pct: obj[i].missed_votes_pct
    };
    votes.push(mVotes);
  }
  return votes;
};
//Logic for loyalty page Least and most engaged
const partyVotes = obj => {
  let pVotes = [];
  for (i = 0; i < obj.length; i++) {
    let votesWp = (obj[i].votes_with_party_pct / 100) * obj[i].total_votes;
    votesWp = Math.floor(votesWp);
    let partyVotes = {
      name: obj[i].first_name + " " + obj[i].last_name,
      votes_with_party_pct: obj[i].votes_with_party_pct,
      votes: obj[i].total_votes,
      votes_with_party: votesWp
    };
    pVotes.push(partyVotes);
  }
  return pVotes;
};
const bubbleSort = (obj, val) => {
  for (var i = 0; i < obj.length; i++) {
    for (var j = 0; j < obj.length - i - 1; j++) {
      if (obj[j][val] > obj[j + 1][val]) {
        var temp = obj[j];
        obj[j] = obj[j + 1];
        obj[j + 1] = temp;
      }
    }
  }
  return obj;
};
const engagedTable = (obj, bol, val1, val2) => {
  let tenpct = Statistics.atGlance[3].number * 0.1;
  tenpct = Math.floor(tenpct);
  if (bol == true) {
    // check if true to determine if most or least engaged
    for (i = 0; i < tenpct; i++) {
      if (
        // maybe while loop???????
        obj[tenpct - 1][val1] == obj[tenpct][val1] ||
        obj[tenpct - 1][val2] == obj[tenpct][val2]
      ) {
        tenpct++;
      }
      if (val1 == "missed_votes") {
        let lEngaged = {
          name: obj[i].name,
          missed_votes: obj[i][val1],
          missed_votes_pct: obj[i][val2]
        };
        Statistics.most_engaged.push(lEngaged);
      } else if (val1 == "votes_with_party") {
        let lEngaged2 = {
          name: obj[i].name,
          votes_with_party: obj[i][val1],
          votes_with_party_pct: obj[i][val2]
        };
        Statistics.least_loyal.push(lEngaged2);
      }
    }
  } else {
    for (i = obj.length - 1; i >= obj.length - tenpct; i--) {
      if (
        obj[tenpct][val1] == obj[tenpct - 1][val1] ||
        obj[tenpct][val2] == obj[tenpct - 1][val2]
      ) {
        tenpct--;
      }
      if (val1 == "missed_votes") {
        let mEngaged = {
          name: obj[i].name,
          missed_votes: obj[i][val1],
          missed_votes_pct: obj[i][val2]
        };
        Statistics.least_engaged.push(mEngaged);
      } else if (val1 == "votes_with_party") {
        let mEngaged2 = {
          name: obj[i].name,
          votes_with_party: obj[i][val1],
          votes_with_party_pct: obj[i][val2]
        };
        Statistics.most_loyal.push(mEngaged2);
      }
    }
  }
};
const engagedSiteDet = (sortedMvotes, sortedPvotes) => {
  let siteDeterminant = document.getElementsByTagName("title")[0].innerHTML;
  switch (siteDeterminant) {
    case "Senate Attendance":
      engagedTable(sortedMvotes, true, "missed_votes", "missed_votes_pct");
      engagedTable(sortedMvotes, false, "missed_votes", "missed_votes_pct");
      break;
    case "House Attendance":
      engagedTable(sortedMvotes, true, "missed_votes", "missed_votes_pct");
      engagedTable(sortedMvotes, false, "missed_votes", "missed_votes_pct");
      break;
    case "Senate Loyalty":
      engagedTable(
        sortedPvotes,
        true,
        "votes_with_party",
        "votes_with_party_pct"
      );
      engagedTable(
        sortedPvotes,
        false,
        "votes_with_party",
        "votes_with_party_pct"
      );
      break;
    case "House Loyalty":
      engagedTable(
        sortedPvotes,
        true,
        "votes_with_party",
        "votes_with_party_pct"
      );
      engagedTable(
        sortedPvotes,
        false,
        "votes_with_party",
        "votes_with_party_pct"
      );
      break;

    default:
      console.log("Sorry, something went wrong");
  }
};
// make the actual tables
const makeGlanceTable = () => {
  let atGlance = Statistics.atGlance;
  for (i = 0; i < atGlance.length; i++) {
    let tr = document.createElement("tr");
    let oneRow = atGlance[i];

    for (const property in oneRow) {
      let td = document.createElement("td");
      td.innerHTML = `${oneRow[property]}`;
      tr.appendChild(td);
    }
    document.getElementById("data_glance").appendChild(tr);
  }
};
const makeEngagedTable = (obj, val) => {
  let leasttable = obj[val];

  for (i = 0; i < leasttable.length - 1; i++) {
    let tr = document.createElement("tr");
    let oneRow = leasttable[i];
    for (const property in oneRow) {
      let td = document.createElement("td");
      if (`${property}` == "name") {
        td.innerHTML = `<a href='${members[i].api_uri}'>${oneRow[property]}</a>`;
      } else {
        td.innerHTML = `${oneRow[property]}`;
      }
      tr.appendChild(td);
    }

    if (val == "least_engaged" || val == "least_loyal") {
      document.getElementById("least-data").appendChild(tr);
    } else if (val == "most_engaged" || val == "most_loyal") {
      document.getElementById("most-data").appendChild(tr);
    }
  }
};

// makeEngagedTable(Statistics, "least_engaged");
// makeEngagedTable(Statistics, "most_engaged");

// makeEngagedTable(Statistics, "least_loyal");
// makeEngagedTable(Statistics, "most_loyal");
