function retrieveSet() {
    let storedArray = localStorage.getItem('friendKey') ?? false;
    if (storedArray === false) {
        return false;
    }
    let retrievedArray = JSON.parse(storedArray);
    let retrievedSet = new Set(retrievedArray);
    return retrievedSet;
}

function addFriend(friend) {
    let friendSet = retrieveSet();
    if (friendSet) {
        friendSet.add(friend);
    } else {
        let friendSet = new Set([friend]);
    }
    let friendArray = Array.from(friendSet);
    localStorage.setItem('friendKey', JSON.stringify(friendArray));
    // num = localStorage.getItem("friendNumber") ?? 1;
    // currFriend = 'friend' + num;
    // localStorage.setItem(currFriend, friend);
    // localStorage.setItem("friendNumber", ++num);
    renderFriend(friend);
}

function addFriendFromSearch() {
    const friendName = document.querySelector("#friendSearch").value;
    if (friendName.trim() === '') {
        alert('Please enter a value before submitting.');
        return false;
      }
    addFriend(friendName);
}

function renderFriend(friend) {
    let newFriend = document.createElement('li');
    newFriend.textContent = friend;
    newFriend.className = 'entry';

    let newHomepageButton = document.createElement('button');
    newHomepageButton.type = 'button';
    newHomepageButton.textContent = "View Home Page";
    newHomepageButton.className = "btn btn-outline-primary";
    
    let newRemoveButton = document.createElement('button');
    newRemoveButton.type = 'button';
    newRemoveButton.textContent = "Remove Friend";
    newRemoveButton.className = "btn btn-outline-danger";

    let existingList = document.getElementById('friendList');
    existingList.appendChild(newFriend);
    existingList.appendChild(newHomepageButton);
    existingList.appendChild(newRemoveButton);
}