function getPlayerName() {
    return localStorage.getItem('userName') ?? 'User';
}

const userName = document.querySelector('.user');
let hder = `${getPlayerName()}'s Homepage`
userName.textContent = hder;

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
    console.log('func entered');
    let favTitle = getFavorite();
    let buttonID = 'entry' + num;
    console.log(buttonID);
    let listID = document.getElementById(buttonID);
    listID.textContent = favTitle;
}