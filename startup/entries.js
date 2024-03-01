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

function renderEntry(entryObj) {
    
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
    renderEntry(entryObj);
    const [month, day] = getMonthandDay(date);
    entryDateString = 'entry' + month + day;
    entryDateString = checkForMultipleEntries(entryDateString, 1);
    const entryObjString = JSON.stringify(entryObj);
    localStorage.setItem(entryDateString, entryObjString);

}
