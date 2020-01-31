//note for jeronimo> different approaches of storing the data. keep in mind how the table will be displayed
// clean up the code to work on values in declared object and not rewritingwriting the entire object all the time

// some magic for the Attendance and Senate at a Glance
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
  least_engaged: [
    {
      name: "name1",
      no_missed_votes: 0,
      pct_missed: 0
    },
    {
      name: "name2",
      no_missed_votes: 0,
      pct_missed: 0
    },
    {
      name: "name3",
      no_missed_votes: 0,
      pct_missed: 0
    }
  ],
  most_engaged: [
    {
      name: "name1",
      no_missed_votes: 0,
      pct_missed: 0
    },
    {
      name: "name2",
      no_missed_votes: 0,
      pct_missed: 0
    },
    {
      name: "name3",
      no_missed_votes: 0,
      pct_missed: 0
    }
  ]
};
let members = data.results[0].members;
const avgPct = (a, b) => {
  let sum = 0;
  let avg;
  sum = sum + a;
  avg = sum / b;
  return avg;
};
// count party members and update object
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
  for (i = 0; i < 3; i++) {
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
console.log(Statistics);

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
