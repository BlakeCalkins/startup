function getPlayerName() {
    return localStorage.getItem('userName') ?? 'User';
}

function loadFavorites () {
    let inputtedFavs = localStorage.getItem('inputtedFavs');
    if (inputtedFavs) {
        let entry1 = document.getElementById('fav1');
        let entry2 = document.getElementById('fav2');
        let entry3 = document.getElementById('fav3');

        entry1.textContent = localStorage.getItem('fav1') ?? 'Favorite #1';
        entry2.textContent = localStorage.getItem('fav2') ?? 'Favorite #2';
        entry3.textContent = localStorage.getItem('fav3') ?? 'Favorite #3';
        addFav();
    }
}

const userName = document.querySelector('.user');
let hder = `${getPlayerName()}'s Homepage`
userName.textContent = hder;
loadFavorites();

function addFav() {
    var button = document.getElementById('tempButton');
    var favs = document.getElementById('favorites');
    var temp = document.getElementById('temp');
  
    temp.style.display = 'none';
    button.style.display = 'none';
    favs.style.display = 'block';
}

function getFavorite() {
    let userInput = prompt('Name of favorite restaurant: ')
    return userInput;
}

async function changeFav(num) {
    let favTitle = getFavorite();
    let buttonID = 'fav' + num;
    let favObj = {
        "favNum": buttonID,
        "favorite": favTitle,
        "inputtedFavs": true,
        "user": getPlayerName(),
    };
    try {
        const response = await fetch(`/${favObj.user}/favorites`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(favObj),
        });
        if (!response.ok) {
            throw new Error(`Failed to store data. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
    console.log("favTitle is: ", favTitle);
    localStorage.setItem(buttonID, favTitle);
    localStorage.setItem('inputtedFavs', true);
    let listID = document.getElementById(buttonID);
    listID.textContent = favTitle;
}