function retrieveSet() {
    let storedArray = localStorage.getItem('friendKey') ?? false;
    if (storedArray === false) {
        return false;
    }
    let retrievedArray = JSON.parse(storedArray);
    let retrievedSet = new Set(retrievedArray);
    return retrievedSet;
}

function storeSet(friendSet) {
    let friendArray = Array.from(friendSet);
    localStorage.setItem('friendKey', JSON.stringify(friendArray));
}
function storeFriend(friendSet, friend) {
    storeSet(friendSet);
    num = localStorage.getItem("friendNumber") ?? 0;
    num++;
    currFriend = 'friend' + num;
    localStorage.setItem(currFriend, friend);
    localStorage.setItem("friendNumber", num);
}

function addFriend(friend) {
    let friendSet = retrieveSet();
    if (friendSet) {
        if (friendSet.has(friend)) {
            alert("You are already friends with " + friend)
            return;
        } else {
            friendSet.add(friend);
            storeFriend(friendSet, friend);
        }
    } else {
        let friendSet = new Set([friend]);
        storeFriend(friendSet, friend);
    }
    if (document.getElementById("friendSearch")) {
        renderFriend(friend);
    }
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
    newFriend.id = "li" + friend;

    let newHomepageButton = document.createElement('button');
    newHomepageButton.type = 'button';
    newHomepageButton.textContent = "View Home Page";
    newHomepageButton.className = "btn btn-outline-primary";
    newHomepageButton.id = friend + "Home";
    
    let newRemoveButton = document.createElement('button');
    newRemoveButton.type = 'button';
    newRemoveButton.textContent = "Remove Friend";
    newRemoveButton.className = "btn btn-outline-danger";
    newRemoveButton.id = friend + "Remove";
    newRemoveButton.onclick = function () {
        removeFriend(friend);
    }


    let existingList = document.getElementById('friendList');
    existingList.appendChild(newFriend);
    existingList.appendChild(newHomepageButton);
    existingList.appendChild(newRemoveButton);
    var temp = document.getElementById('temp');
    temp.style.display = 'none';
}

function renderExistingFriends() {
    friendSet = retrieveSet();
    if (friendSet) {
        friendSet.forEach(element => {
            renderFriend(element);
        });
    }
}

function removeFriend(friend) {
    const userConfirmed = confirm("Remove " + friend + " as a friend?");
    if (userConfirmed) {
        // Find friend in localStorage using the value instead of the key,
        // then remove that friend
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const itemValue = localStorage.getItem(key);

            if (itemValue === friend) {
                localStorage.removeItem(key);
            }
        }
        // Remove friend from the set of friends stored in localStorage
        let friendSet = retrieveSet();
        friendSet.delete(friend);
        storeSet(friendSet);
        // Decrement the friend count in localStorage
        num = localStorage.getItem("friendNumber");
        num--;
        localStorage.setItem("friendNumber", num);

        // Remove the HTML elements
        const liFriendDelete = document.getElementById("li" + friend);
        const friendHome = document.getElementById(friend + "Home");
        const friendRemove = document.getElementById(friend + "Remove");
        liFriendDelete.remove();
        friendHome.remove();
        friendRemove.remove();
    }
}

if (document.getElementById("friendSearch")) {
    renderExistingFriends();
}