function getPlayerName() {
    return localStorage.getItem('userName') ?? 'User';
}

function getMonthandDay(date) {
    let dateArray = date.split('-');
    let month = dateArray[1]
    let day = dateArray[2];
    return [month, day];
}

function getMonthName(date) {
    const [month, day] = getMonthandDay(date);
    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let monthStr = monthArray[month - 1];
    return [monthStr, day];
}

function renderEntry(entryObj) {
    let newDiv = document.createElement('div');
    newDiv.className = 'ruled';

    let dateP = document.createElement('p');
    const [monthStr, day] = getMonthName(entryObj.date);
    dateP.textContent = day + '/' + monthStr + " - " + entryObj.restaurant;

    let newUl = document.createElement('ul');

    let newLi = document.createElement('li');
    newLi.className = 'entry paper';
    newLi.textContent = entryObj.dish + " - " + entryObj.rating + " Star(s)"

    let thoughtP = document.createElement('p');
    thoughtP.className = 'paper';
    thoughtP.textContent = entryObj.thoughts;

    let entriesSection = document.getElementById('entries');
    entriesSection.appendChild(newDiv);
    newDiv.appendChild(dateP);
    newDiv.appendChild(newUl);
    newUl.appendChild(newLi);
    newUl.appendChild(thoughtP);
    var temp = document.getElementById('temp');
    temp.style.display = 'none';

}

async function renderExistingEntries() {
    let mapArray = await retrieveArray();
    console.log(mapArray, typeof mapArray);
    let entriesMap = new Map(mapArray);
    for (let [, value] of entriesMap) {
        renderEntry(value);
    }
}

function renderAbbr(entry) {
    let newDiv = document.createElement('div');
    newDiv.className = 'ruled';

    let newLi = document.createElement('li');
    newLi.className = 'entry paper';
    newLi.textContent = entry.restaurant + ' - ' + entry.dish;

    let newP = document.createElement('p');
    newP.className = 'paper';
    newP.textContent = entry.rating + " Stars - " + entry.blurb;

    let entriesUl = document.getElementById('entries');
    entriesUl.appendChild(newDiv);
    newDiv.appendChild(newLi);
    newDiv.appendChild(newP);
}

async function renderAbbreviatedEntries() {
    let entryArray = await retrieveArray();
    if (!entryArray) {
        return;
    }
    let entry2 = entryArray[entryArray.length - 2] ?? false;
    let entry1 = entryArray[entryArray.length - 1];
    let recentEntry1 = entry1[1];
    renderAbbr(recentEntry1);
    if (entry2) {
        let recentEntry2 = entry2[1];
        renderAbbr(recentEntry2);
    }
    var temp = document.getElementById('tempEntry');
    temp.style.display = 'none';
}

async function retrieveArray() {
    try {
        const response = await fetch(`/${getPlayerName()}/entries`);
        const mapArray = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to store data. Status: ${response.status}`);
        }
        return mapArray;

    } catch (error) {
        console.error('Error:', error.message);
    }

}

async function makeEntryObj() {
    let restaurant = document.getElementById('restaurant').value;
    let date = document.getElementById('date').value;
    let dish = document.getElementById('dish').value;
    let blurb = document.getElementById('blurb').value;
    let thoughts = document.getElementById('thoughts').value;

    var ratingButtons = document.querySelectorAll('input[name="rating"]');
    var selectedRating = 0;

  // Add a change event listener to the radio buttons
    ratingButtons.forEach(function(radio) {
        // Get the value of the selected radio button
        if (radio.checked) {
            selectedRating = radio.value;
        }
    });
    const entryObj = {
        'restaurant': restaurant,
        'date': date,
        'dish': dish,
        'blurb': blurb,
        'rating': selectedRating,
        'thoughts': thoughts,
    };
    renderEntry(entryObj);
    const entryObjString = JSON.stringify(entryObj);
    try {
        const response = await fetch(`/${getPlayerName()}/entry`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: entryObjString,
        });
        if (!response.ok) {
            throw new Error(`Failed to store data. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

if (document.getElementById("restaurant")) {
    renderExistingEntries();
} else {
    renderAbbreviatedEntries();
}