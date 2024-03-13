async function retrieveSet() {
    // let storedArray = [];
    try {
        const response = await fetch('/api/friendSet');
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

async function storeSet(friendSet) {
    try {
        const friendArray = Array.from(friendSet);

        // Make the POST request to the server
        const response = await fetch('/friends', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(friendArray),
        });

        if (!response.ok) {
            localStorage.setItem('friendSet', JSON.stringify(friendArray));            
            throw new Error(`Failed to store data. Status: ${response.status}`);
        }

        // Optionally, you can handle the response from the server
        const responseData = await response.json();
        console.log('Server response:', responseData);

        // Save to localStorage if needed
        localStorage.setItem('friendSet', JSON.stringify(friendArray));
    } catch (error) {
        console.error('Error:', error.message);
    }
}


function storeFriend(friendSet, friend) {
    storeSet(friendSet);
    num = localStorage.getItem("friendNumber") ?? 0;
    num++;
    // currFriend = 'friend' + num;
    // localStorage.setItem(currFriend, friend);
    localStorage.setItem("friendNumber", num);
}

async function addFriend(friend) {
    let friendSet = await retrieveSet();
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

function viewHomepage(person) {
    localStorage.setItem("recentFriendViewer", person)
    window.location.href = "placeholder.html";
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
    newHomepageButton.onclick = function() {
        viewHomepage(friend);
    }
    
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
    if (document.getElementById('friendSearch')) {
        existingList.appendChild(newRemoveButton);
    }
    var temp = document.getElementById('tempFriend');
    temp.style.display = 'none';
}

async function renderExistingFriends() {
    friendSet = await retrieveSet();
    if (friendSet) {
        friendSet.forEach(element => {
            renderFriend(element);
        });
    }
}

async function removeFriend(friend) {
    const userConfirmed = confirm("Remove " + friend + " as a friend?");
    if (userConfirmed) {
        // Find friend in localStorage using the value instead of the key,
        // then remove that friend
        // for (let i = 0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     const itemValue = localStorage.getItem(key);

        //     if (itemValue === friend) {
        //         localStorage.removeItem(key);
        //     }
        // }
        // Remove friend from the set of friends stored in localStorage
        let friendSet = await retrieveSet();
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

renderExistingFriends();