let searchResults;

function getAllBills() {
  return fetch(
    "https://openstates.org/api/v1/bills/?state=vt&apikey=2a939a8d-1448-4810-b036-79139a6a7f33&format=json&search_window=session"
  ).then(response => {
    return response.json();
  });
}

function displayResults(someResults) {
  let billMatch = document.getElementById("billDisplay");

  for (let i = 0; i < results.length; i++) {
    let billLink = document.createElement("li");
    billLink.className = "listItem";
    billMatch.appendChild(billLink).textContent = (results[i].bill_id + ': ' + results[i].title);
  }

  let list = document.getElementsByClassName("listItem");
  console.log(list);
  for (var i = 0; i < list.length; i++) {
    var text = list[i].textContent;
    list[i].textContent = "";
    var a = document.createElement("a");
    a.href = "#";
    a.textContent = text;
    list[i].appendChild(a);
  }

  console.log(results);
}

function search() {
  getAllBills().then(currentSessionBills => {
    document.getElementById("billDisplay").textContent = "";

    // fuse.js specs
    const options = {
      shouldSort: true,
      // tokenize: true,
      distance: 50,
      threshold: 0.4,
      location: 0,
      minMatchCharLength: 1,
      maxPatternLength: 32,
      shouldSort: true,
      keys: ["bill_id", "title"]
    };

    let searchTerms;
    searchTerms = document.getElementById("billSearch").value.trim();

    let fuse = new Fuse(currentSessionBills, options);

    results = fuse.search(searchTerms);
    displayResults(results);

    return searchResults;
  });
};

let input = document.getElementById("billSearch");

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    search(); 
  }
})



