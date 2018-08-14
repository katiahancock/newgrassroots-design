let searchResults;

function getAllBills() {
  return fetch(
    "https://openstates.org/api/v1/bills/?state=vt&apikey=2a939a8d-1448-4810-b036-79139a6a7f33&format=json&search_window=session"
  ).then(response => {
    return response.json();
  });
  // .then(function (allBills) {
  //   console.log(`Got the bills: ${allBills}`)
  //   currentSessionBills = allBills;
  //   return currentSessionBills;
  // })
  // .catch(function (error) {
  //   console.error('Yikes! I should handle this better:\n', error);
  // });
}

// Modify displayResults function to create new HTML element for each item in the results array

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

document.getElementById("submitButton").addEventListener("click", event => {
  getAllBills().then(currentSessionBills => {
    document.getElementById("billDisplay").textContent = "";

    // fuse.js specs
    const options = {
      threshold: 0.3,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: true,
      keys: ["bill_id", "title"]
    };

    let searchTerms;
    searchTerms = document.getElementById("billSearch").value.trim();

    let fuse = new Fuse(currentSessionBills, options);

    results = fuse.search(searchTerms);

    console.log("hello");
    //TODO: modify with regex to account for spaces and obscure characters
    // for (let i = 0; i < results.length; i++) {
      // if (
        // results[i].bill_id.replace(/[\s]/, "") ===
          // searchTerms.replace(/[\W*_*]/gi, "") ||
        // results[i].title.replace(/[\s]/, "") ===
          // searchTerms.replace(/[\W*_*]/gi, "")
      // ) {
        displayResults(results);

        return searchResults;
    //  }
  //  }
  });
});
