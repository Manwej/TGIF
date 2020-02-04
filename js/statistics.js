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
  most_engaged: []
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
missedVotes(members);
const bubbleSort = obj => {
  for (var i = 0; i < obj.length; i++) {
    for (var j = 0; j < obj.length - i - 1; j++) {
      if (obj[j].missed_votes > obj[j + 1].missed_votes) {
        var temp = obj[j];
        obj[j] = obj[j + 1];
        obj[j + 1] = temp;
      }
    }
  }

  return obj;
};
let sorted = bubbleSort(missedVotes(members));

const engaged = (obj, val) => {
  let tenpct = Statistics.atGlance[3].number * 0.1;
  tenpct = Math.floor(tenpct);
  if (val == true) {
    for (i = 0; i < tenpct; i++) {
      if (
        obj[tenpct].missed_votes == obj[tenpct + 1].missed_votes ||
        obj[tenpct].missed_votes_pct == obj[tenpct + 1].missed_votes_pct
      ) {
        tenpct++;
      }
      let lEngaged = {
        name: obj[i].name,
        missed_votes: obj[i].missed_votes,
        missed_votes_pct: obj[i].missed_votes_pct
      };
      Statistics.least_engaged.push(lEngaged);
    }
  } else {
    for (i = obj.length - 1; i >= obj.length - tenpct; i--) {
      if (
        obj[tenpct].missed_votes == obj[tenpct - 1].missed_votes ||
        obj[tenpct].missed_votes_pct == obj[tenpct - 1].missed_votes_pct
      ) {
        tenpct--;
      }
      let mEngaged = {
        name: obj[i].name,
        missed_votes: obj[i].missed_votes,
        missed_votes_pct: obj[i].missed_votes_pct
      };
      Statistics.most_engaged.push(mEngaged);
    }
  }
};
engaged(sorted, true);
engaged(sorted, false);
// console.log(bubbleSort(missedVotes(members)));
/* old code */
//create three lists for each party
// let createPoliticianList = obj => {
//   let members = data.results[0].members;
//   let democratslist = [];
//   let republicanlist = [];
//   let independentlist = [];

//   for (i = 0; i < members.length; i++) {
//     let newInfo = {
//       firstname: members[i].first_name,
//       middlename: members[i].middle_name,
//       lastname: members[i].last_name,
//       party: members[i].party,
//       totalvotes: members[i].total_votes,
//       missedvotes: members[i].missed_votes,
//       voteswithparty: members[i].votes_with_party_pct
//     };
//     democratslist.push(newInfo);

//     if (members[i].party == "D") {
//       democratslist.push(newInfo);
//       sAtGlance.numofdemcrat++;
//     } else if (members[i].party == "R") {
//       republicanlist.push(newInfo);
//     } else if (members[i].party == "I") {
//       independentlist.push(newInfo);
//     }
//   }
//   return [democratslist, republicanlist, independentlist];
// };
