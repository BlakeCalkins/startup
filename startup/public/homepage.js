function getPlayerName() {
    return localStorage.getItem('userName') ?? 'User';
}

async function loadFavorites () {
    user = getPlayerName();
    try {
        const response = await fetch(`/${user}/currFavs`);
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

const userName = document.querySelector('.user');
let hder = `${getPlayerName()}'s Homepage`
userName.textContent = hder;
loadFavorites();

function deleteTemp() {
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
    let listID = document.getElementById(buttonID);
    listID.textContent = favTitle;
}