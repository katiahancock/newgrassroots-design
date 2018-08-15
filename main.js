let searchResults;

function getAllBills() {
  return fetch(
    "https://openstates.org/api/v1/bills/?state=vt&apikey=2a939a8d-1448-4810-b036-79139a6a7f33&format=json&search_window=session"
  ).then(response => {
    return response.json();
  });
}



function displayResults(results) {

  for (let i = 0; i < results.length; i++) {
    
    let x = results[i];
    const content = `
    <div className="billcard" data-bill-id=${x.id}>
      <h1 className="card-bill-id">${x.bill_id}</h1>
      <h3 className="bill-type">${x.title}</h3>
      <button className="bill-details">Bill Details</button>
    </div>
    `;
    const element = document.createElement("div");
    const allCards = document.getElementById("billDisplay");
    element.innerHTML = content;
    allCards.appendChild(element);
    element.addEventListener('click', getBillDetails);
  }
}

function secondFetch(billId) {
  fetch(`https://openstates.org/api/v1/bills/${billId}/?apikey=2a939a8d-1448-4810-b036-79139a6a7f33&format=json`)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        console.log('DONE');
      }
    );
}

function getBillDetails(event) {
  let element = event.target;
  let parent = element.parentElement;
  console.log(parent.dataset.billId);
  secondFetch(parent.dataset.billId);
 }

//User search for bills
function search() {
  getAllBills().then(currentSessionBills => {
    document.getElementById("billDisplay").textContent = "";

    // fuse.js specs
    const options = {
      shouldSort: true,
      tokenize: true,
      // distance: 50,
      threshold: 0.5,
      // location: 0,
      // minMatchCharLength: 1,
      // maxPatternLength: 32,
      keys: ["bill_id", "title"]
    };

    let searchTerms;
    searchTerms = document.getElementById("billSearch").value.trim();

    let fuse = new Fuse(currentSessionBills, options);

    return displayResults(fuse.search(searchTerms));
  });
};

let input = document.getElementById("billSearch");

//User press Enter key
input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    search();
  }
})



