// fill table with json data
let members = data.results[0].members;
// make array with relevant info
const makeArr = obj => {
  let memberobject = [];
  for (i = 0; i < members.length; i++) {
    let newInfo = {
      firstname: members[i].first_name,
      middlename: members[i].middle_name,
      lastname: members[i].last_name,
      party: members[i].party,
      state: members[i].state,
      voteswithparty: members[i].votes_with_party_pct
    };
    memberobject.push(newInfo);
  }
  return memberobject;
};
makeArr(data);

//create a tr for each member
const fillTable = obj => {
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
        td.innerHTML = `<a href='${members[i].api_uri}'>${oneMember[property]}</a>`;
      } else {
        td.innerHTML = `${oneMember[property]}`;
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return obj;
};
fillTable(makeArr(data));
