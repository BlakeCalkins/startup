const userName = document.querySelector('.user');
let person = localStorage.getItem("recentFriendViewer");
let hder = `${person}'s Homepage`
userName.textContent = hder;


//test if frriwnds work

async function retrieveArray(person) {
    try {
        const response = await fetch(`/${person}/entries`);
        const entriesArray = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to store data. Status: ${response.status}`);
        }
        return entriesArray;

    } catch (error) {
        console.error('Error:', error.message);
    }

}

async function loadFavorites() {
    try {
        const response = await fetch(`/${person}/currFavs`);
        console.log(response);
        const favObj = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to store data. Status: ${response.status}`);
        }
        fav1 = favObj.fav1;
        fav2 = favObj.fav2;
        fav3 = favObj.fav3;
        inputtedFavs = favObj.inputtedFavs;


    } catch (error) {
        console.error('Error:', error.message);
    }
    


    if (inputtedFavs) {
        let entry1 = document.getElementById('fav1');
        let entry2 = document.getElementById('fav2');
        let entry3 = document.getElementById('fav3');

        entry1.textContent = fav1;
        entry2.textContent = fav2;
        entry3.textContent = fav3;
        deleteTemp();
    }
}

function deleteTemp() {
    var button = document.getElementById('tempButton');
    var favs = document.getElementById('favorites');
    var temp = document.getElementById('temp');
  
    temp.style.display = 'none';
    button.style.display = 'none';
    favs.style.display = 'block';
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
    let entryArray = await retrieveArray(person);
    if (!entryArray) {
        return;
    }
    let entry2 = entryArray[entryArray.length - 2] ?? false;
    let entry1 = entryArray[entryArray.length - 1] ?? false;
    if (entry1) {
        renderAbbr(entry1);
        var temp = document.getElementById('tempEntry');
        temp.style.display = 'none';
    }
    if (entry2) {
        renderAbbr(entry2);
    }
}

async function retrieveSet(person) {
    try {
        const response = await fetch(`/api/${person}/friendSet`);
        console.log(response);
        const storedArray = await response.json();


        if (!response.ok) {
            console.error('Error:', response.status, response.statusText);
            throw new Error(`Failed to retrieve data. Status: ${response.status}`);
        }

        let retrievedArray = Array.isArray(storedArray) ? storedArray : [];
        let retrievedSet = new Set(retrievedArray);
        return retrievedSet;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }

}

async function renderFriend(friend) {
    let listElement = document.getElementById('friendList');
    let newFriend = document.createElement('li');
    newFriend.textContent = friend;
    listElement.appendChild(newFriend);
}

async function renderExistingFriends() {
    friendSet = await retrieveSet(person);
    if (friendSet) {
        friendSet.forEach(element => {
            renderFriend(element);
        });
    }
}

loadFavorites();
renderAbbreviatedEntries();
renderExistingFriends();