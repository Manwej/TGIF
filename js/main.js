console.log("hello");

let members = data.results[0].members;
// make array with relevant info
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
console.log(memberobject);

//create a tr for each member
for (i = 0; i < memberobject.length; i++) {
  let tr = document.createElement("tr"); // Create a <tr> node
  let oneMember = memberobject[i];
  for (const property in oneMember) {
    let td = document.createElement("td");
    //let hello = `${oneMember[voteswithparty]}`;
    //console.log(typeof oneMember.voteswithparty);
    if (typeof oneMember[property] === "number") {
      console.log("hello");
      td.innerHTML = `${oneMember[property]}` + "<p> %</p>";
    } else if (oneMember[property] === null) {
      td.innerHTML = " ";
    } else {
      td.innerHTML = `${oneMember[property]}`;
    }
    //td.innerHTML = `${oneMember[property]}`;
    tr.appendChild(td);
  }
  document.getElementById("senate-data").appendChild(tr);
}

//  //console.log(`${property}: ${object[property]}`);
// for (j = 0; j < memberarrayRelinf[j].length; j++) {
//   let td = document.createElement("td");
//   if (typeof memberarrayRelinf[i][j] === "number") {
//     td.innerHTML = memberarrayRelinf[i][j] + "<p> %</p>";
//   } else {
//     td.innerHTML = memberarrayRelinf[i][j];
//   }
//   tr.appendChild(td);
// }
// document.getElementById("senate-data").appendChild(tr);

// let textnode = document.createTextNode(test); // Create a text node
// node.appendChild(textnode); // Append the text to <tr>

/*
let node = document.createElement("tr"); // Create a <tr> node
let textnode = document.createTextNode(test); // Create a text node
node.appendChild(textnode); // Append the text to <tr>



document.getElementById("senate-data").appendChild(node); // Append <li> to <ul> with id="myList"

// to create nested html tags
var tag = document.createElement("li");
tag.innerHTML = '<span class="toggle">Jan</span>';

console.log(test);


console.log(data.results[0].members.length);


document.getElementById("senate-data").innerHTML = JSON.stringify(
  data,
  null,
  2
);
u;

//console.log(JSON.stringify({ x: 5, y: 6 }));*/

// difference between map and foreach
// let numbers = [1, 2, 3, 4];
// let newArray = numbers.map(oneN => oneN + 1);
// console.log(newArray);

// let newArray2 = [];
// numbers.forEach(oneN => newArray2.push(oneN + 1));
// console.log(newArray2);
