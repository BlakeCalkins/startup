    function checkForMultipleEntries(entryDateString, entryNum) {
    if (localStorage.getItem(entryDateString)) {
        while (localStorage.getItem(entryDateString)) {
            entryDateString = stripRepeat(entryDateString);
            entryNum++;
            entryDateString = entryDateString + " (" + entryNum + ")";
        }
    }
    return entryDateString;
}

function stripRepeat(entryDateString) {
    if (entryDateString[entryDateString.length - 1] == ')') {
        entryDateString = entryDateString.substring(0, entryDateString.length - 4)
    }
    return entryDateString;
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

function renderExistingEntries() {
    const regex = /entry([0-1][0-9][0-3][0-9])( \(.*\))*/;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (regex.test(key)) {
            const value = JSON.parse(localStorage.getItem(key));
            console.log(value);
            // console.log(`Rendering entry for key: ${key}`);
            renderEntry(value);
        }
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

function renderAbbreviatedEntries() {
    let entryArray = retrieveArray();
    if (!entryArray) {
        return;
    }
    let entryKey2 = entryArray[entryArray.length - 2] ?? false;
    let entryKey1 = entryArray[entryArray.length - 1];
    let recentEntry1 = JSON.parse(localStorage.getItem(entryKey1));
    renderAbbr(recentEntry1);
    if (entryKey2) {
        let recentEntry2 = JSON.parse(localStorage.getItem(entryKey2));
        renderAbbr(recentEntry2);
    }
    var temp = document.getElementById('tempEntry');
    temp.style.display = 'none';
}

function storeArray(toBeStored) {
    let arrayString = JSON.stringify(toBeStored);
    localStorage.setItem("entryKeys", arrayString);
}

function retrieveArray() {
    let storedArray = localStorage.getItem("entryKeys") ?? false;
    if (!storedArray) {
        return false;
    }
    let parsedArray = JSON.parse(storedArray);
    return parsedArray;
}

function storeEntryInArray(entryKey) {
    let storedArray = retrieveArray();
    if (!storedArray) {
        let newArray = [];
        newArray.push(entryKey);
        storeArray(newArray);
        return;
    }
    storedArray.push(entryKey);
    storeArray(storedArray);
}

function makeEntryObj() {
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
    console.log(entryObj);
    renderEntry(entryObj);
    const [month, day] = getMonthandDay(date);
    entryDateString = 'entry' + month + day;
    entryDateString = checkForMultipleEntries(entryDateString, 1);
    const entryObjString = JSON.stringify(entryObj);
    localStorage.setItem(entryDateString, entryObjString);
    storeEntryInArray(entryDateString);
}

if (document.getElementById("restaurant")) {
    renderExistingEntries();
} else {
    renderAbbreviatedEntries();
}