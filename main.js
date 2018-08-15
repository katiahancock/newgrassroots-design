let searchResults;

function getAllBills() {
  return fetch(
    "https://openstates.org/api/v1/bills/?state=vt&apikey=2a939a8d-1448-4810-b036-79139a6a7f33&format=json&search_window=session"
  ).then(response => {
    return response.json();
  });
}

function displayResults(someResults) {

  for (let i = 0; i < results.length; i++) {
    const content = `
    <div className="billcard">
      <h1 className="card-bill-id">${results[i].bill_id}</h1>
      <h3 className="bill-type">${results[i].title}</h3>
      <button className="bill-details">Click for More Info</button>
    </div>
    `;
    const element = document.createElement("div");
    const allCards = document.getElementById("billDisplay");
    element.innerHTML = content;
    allCards.appendChild(element)
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

input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    search();
  }
})



