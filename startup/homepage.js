function getPlayerName() {
    return localStorage.getItem('userName') ?? 'User';
}

function loadFavorites () {
    let inputtedFavs = localStorage.getItem('inputtedFavs');
    let lol = inputtedFavs == true;
    console.log(inputtedFavs);
    console.log(lol);
    if (inputtedFavs) {
        let entry1 = document.getElementById('entry1');
        let entry2 = document.getElementById('entry2');
        let entry3 = document.getElementById('entry3');

        entry1.textContent = localStorage.getItem('entry1') ?? 'Favorite #1';
        entry2.textContent = localStorage.getItem('entry2') ?? 'Favorite #2';
        entry3.textContent = localStorage.getItem('entry3') ?? 'Favorite #3';
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

function changeFav(num) {
    let favTitle = getFavorite();
    let buttonID = 'entry' + num;
    localStorage.setItem(buttonID, favTitle);
    localStorage.setItem('inputtedFavs', true);
    let listID = document.getElementById(buttonID);
    listID.textContent = favTitle;
}