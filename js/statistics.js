//note for jeronimo> different approaches of storing the data. keep in mind how the table will be displayed
// clean up the code to work on values in declared object and not rewritingwriting the entire object all the time

// some magic for the Attendance and Senate at a Glance
let sAtGlance = {
  atGlance: [
    {
      name: "democrats",
      number: 0,
      ptc: 0
    },
    {
      name: "total",
      number: 0,
      ptc: 0
    }
  ],
  numofdemcrat: 0,
  numofdrep: 0,
  numofindi: 0,
  numtotal: 0,
  voteswpartydemo: 0,
  voteswpartyrep: 0,
  voteswpartyindi: 0,
  votestotal: 0 // if this is a average, the total of % votes make no sense ??
};

//create three lists for each party
let createPoliticianList = obj => {
  let members = data.results[0].members;
  let democratslist = [];
  let republicanlist = [];
  let independentlist = [];

  for (i = 0; i < members.length; i++) {
    let newInfo = {
      firstname: members[i].first_name,
      middlename: members[i].middle_name,
      lastname: members[i].last_name,
      party: members[i].party,
      totalvotes: members[i].total_votes,
      missedvotes: members[i].missed_votes,
      voteswithparty: members[i].votes_with_party_pct
    };
    democratslist.push(newInfo);

    if (members[i].party == "D") {
      democratslist.push(newInfo);
      sAtGlance.numofdemcrat++;
    } else if (members[i].party == "R") {
      republicanlist.push(newInfo);
    } else if (members[i].party == "I") {
      independentlist.push(newInfo);
    }
  }
  return [democratslist, republicanlist, independentlist];
};

let getLength = () => {
  let arr = createPoliticianList(data);
  sAtGlance.numofdemcrat = arr[0].length;
  let numofdrep = arr[1].length;
  let numofindi = arr[2].length;
  return [numofdemcrat, numofdrep, numofindi];
};
let sumUp = arr => {
  let summe = 0;
  for (i = 0; i < arr.length; i++) {
    summe += arr[i];
  }
  return summe;
};
let length = getLength();
let numtotal = sumUp(length);

console.log(length);
sAtGlance = {
  numofdemcrat: length[0],
  numofdrep: length[1],
  numofindi: length[2],
  numtotal: sumUp(length),
  voteswpartydemo: 0,
  voteswpartyrep: 0,
  voteswpartyindi: 0,
  votestotal: 0 // if this is a average, the total of % votes make no sense ??
};

console.log(sAtGlance);
