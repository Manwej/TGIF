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
  // missed_votes: [], //take out
  least_engaged: [],
  most_engaged: [],
  least_loyal: [],
  most_loyal: []
};
//get right "path" from data json object
let members = data.results[0].members;
//function for calculating the average
const avgPct = (a, b) => {
  let sum = 0;
  let avg;
  sum = sum + a;
  avg = sum / b;
  return avg;
};
// count party members and update object
// create logic for atglance table
const glanceParty = obj => {
  for (i = 0; i < members.length; i++) {
    if (members[i].party == "D") {
      Statistics.atGlance[0].number++;
      Statistics.atGlance[0].pct += members[i].votes_with_party_pct;
    } else if (members[i].party == "R") {
      Statistics.atGlance[1].number++;
      if (typeof members[i].votes_with_party_pct == "number") {
        Statistics.atGlance[1].pct += members[i].votes_with_party_pct;
      } else {
        Statistics.atGlance[1].pct += 0;
      }
    } else if (members[i].party == "I") {
      Statistics.atGlance[2].number++;
      Statistics.atGlance[2].pct += members[i].votes_with_party_pct;
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
  Statistics.atGlance[3].number = members.length; // assign total value
};
glanceParty(data);

//Logic for attendance page Least and most engaged
//make help array object with data
const missedVotes = obj => {
  let votes = [];

  for (i = 0; i < obj.length; i++) {
    let mVotes = {
      name: obj[i].last_name,
      missed_votes: obj[i].missed_votes,
      missed_votes_pct: obj[i].missed_votes_pct
    };

    votes.push(mVotes);
  }
  return votes;
};
//if (obj[i].missed_votes !== 0 || obj[j].missed_votes !== null ||obj[i].missed_votes_pct !== 0 || obj[j].missed_votes_pct !== null) {
// missedVotes(members);
const partyVotes = obj => {
  let pVotes = [];
  for (i = 0; i < obj.length; i++) {
    let votesWp = (obj[i].votes_with_party_pct / 100) * obj[i].total_votes;
    votesWp = Math.floor(votesWp);
    let partyVotes = {
      name: obj[i].last_name,
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
let sortedMvotes = bubbleSort(missedVotes(members), "missed_votes");
let sortedPvotes = bubbleSort(partyVotes(members), "votes_with_party_pct");

const engaged = (obj, bol, val1, val2) => {
  let tenpct = Statistics.atGlance[3].number * 0.1;
  tenpct = Math.floor(tenpct);
  if (bol == true) {
    for (i = 0; i < tenpct; i++) {
      if (
        obj[tenpct][val1] == obj[tenpct + 1][val1] ||
        obj[tenpct][val2] == obj[tenpct + 1][val2]
      ) {
        tenpct++;
      }
      if (val1 == "missed_votes") {
        let lEngaged = {
          name: obj[i].name,
          missed_votes: obj[i][val1],
          missed_votes_pct: obj[i][val2]
        };
        Statistics.least_engaged.push(lEngaged);
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
        Statistics.most_engaged.push(mEngaged);
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

let whuuuut = document.getElementsByClassName("det")[0].innerText;
let whuuuut2 = document.getElementsByClassName("det")[1].innerText;

if (whuuuut == "Attendance" && whuuuut2 == "Senate at a glance") {
  engaged(sortedMvotes, true, "missed_votes", "missed_votes_pct");
  engaged(sortedMvotes, false, "missed_votes", "missed_votes_pct");
} else if (whuuuut == "Attendance" && whuuuut2 == "House at a glance") {
  engaged(sortedMvotes, true, "missed_votes", "missed_votes_pct");
  engaged(sortedMvotes, false, "missed_votes", "missed_votes_pct");
} else if (whuuuut == "Party Loyalty" && whuuuut2 == "Senate at a glance") {
  engaged(sortedPvotes, true, "votes_with_party", "votes_with_party_pct");
  engaged(sortedPvotes, false, "votes_with_party", "votes_with_party_pct");
} else if (whuuuut == "Party Loyalty" && whuuuut2 == "House at a glance") {
  engaged(sortedPvotes, true, "votes_with_party", "votes_with_party_pct");
  engaged(sortedPvotes, false, "votes_with_party", "votes_with_party_pct");
}

//use switch and change titel instead of two det classes

// sortedPvotes;
