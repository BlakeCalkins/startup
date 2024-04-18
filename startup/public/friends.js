function getPlayerName() {
    return localStorage.getItem('userName') ?? 'User';
}

async function retrieveSet(user = getPlayerName()) {
    // let storedArray = [];
    try {
        const response = await fetch(`/api/${user}/friendSet`);
        console.log(response);
        const storedArray = await response.json();
        console.log(storedArray);


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

async function storeSet(friendSet, user) {
    try {
        const friendArray = Array.from(friendSet);

        // Make the POST request to the server
        const response = await fetch(`/${user}/friends`, {
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



async function addFriend(friend) {
    let usersFriendSet = await retrieveSet();
    let friendsFriendSet = await retrieveSet(friend);
    if (!usersFriendSet) {
        let usersFriendSet = new Set();
    } 
    if (!friendsFriendSet) {
        let friendsFriendSet = new Set();
    }
    usersFriendSet.add(friend);
    storeSet(usersFriendSet, getPlayerName());
    friendsFriendSet.add(getPlayerName());
    storeSet(friendsFriendSet, friend);
    deleteRequest(friend, getPlayerName());
    if (document.getElementById("friendSearch")) {
        renderFriend(friend);
    }
}

async function sendRequest() {
    const friend = document.querySelector("#friendSearch").value;
    if (friend.trim() === '') {
        alert('Please enter a value before submitting.');
        return false;
      }
    let friendSet = await retrieveSet();
    if (friendSet) {
        if (friendSet.has(friend)) {
            alert("You are already friends with " + friend)
            return;
        } 
    } 
    let userBase = await retrieveAllUsers();
    if (!userBase.includes(friend)) {
        alert("There is no user named " + friend);
        return;
    }
    let friendRequestsArray = await retrieveRequests(friend);
    if (friendRequestsArray.includes(getPlayerName())) {
        alert("You already sent a friend request to " + friend + "and they haven't responded yet.")
        return;
    } else {
        sendOneRequest(friend, getPlayerName());
    }
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
        let friendSet = await retrieveSet();
        friendSet.delete(friend);
        storeSet(friendSet);
        let friendsFriendSet = await retrieveSet(friend);
        friendsFriendSet.delete(getPlayerName());
        storeSet(friendsFriendSet);
        

        // Remove the HTML elements
        const liFriendDelete = document.getElementById("li" + friend);
        const friendHome = document.getElementById(friend + "Home");
        const friendRemove = document.getElementById(friend + "Remove");
        liFriendDelete.remove();
        friendHome.remove();
        friendRemove.remove();
    }
}

async function retrieveAllUsers() {
    console.log("entered retrieveAllUsers");
    try {
        const response = await fetch('/allUsers');
        const storedArray = await response.json();
        console.log(storedArray);



        if (!response.ok) {
            console.error('Error:', response.status, response.statusText);
            throw new Error(`Failed to retrieve data. Status: ${response.status}`);
        }

        let retrievedArray = Array.isArray(storedArray) ? storedArray : [];
        console.log(retrievedArray);
        return retrievedArray;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }

}
function renderRequest(user) {
    let newRequest = document.createElement('div');
    if (document.getElementById("favorites")) {
        newRequest.innerHTML = user + " sent you a friend request.<br>";
    } else {
        newRequest.innerHTML = user + "<br>";
    }
    newRequest.className = 'box';
    let boxId = user + 'Request';
    newRequest.id = boxId;

    let newAcceptButton = document.createElement('button');
    newAcceptButton.type = 'button';
    newAcceptButton.textContent = "Accept";
    newAcceptButton.className = "btn btn-outline-success";
    newAcceptButton.onclick = function() {
        acceptRequest(boxId, user);
    }

    let newDismissButton = document.createElement('button');
    newDismissButton.type = 'button';
    newDismissButton.textContent = "Dismiss";
    newDismissButton.className = "btn btn-outline-secondary";
    newDismissButton.onclick = function() {
        dismissRequest(boxId);
    }

    let newDeclineButton = document.createElement('button');
    newDeclineButton.type = 'button';
    newDeclineButton.textContent = "Decline";
    newDeclineButton.className = "btn btn-outline-danger";
    newDeclineButton.onclick = function() {
        declineRequest(boxId, user);
    }
    let requestList = document.getElementById("requests");
    requestList.appendChild(newRequest);
    newRequest.appendChild(newAcceptButton);
    if (document.getElementById("favorites")) {
        newRequest.appendChild(newDismissButton);
    } else {
        newRequest.appendChild(newDeclineButton);
    }

}

async function retrieveRequests(user) {
    try {
        const response = await fetch(`/api/${user}/requests`);
        console.log(response);
        const storedArray = await response.json();
        console.log(storedArray);


        if (!response.ok) {
            console.error('Error:', response.status, response.statusText);
            throw new Error(`Failed to retrieve data. Status: ${response.status}`);
        }

        let retrievedArray = Array.isArray(storedArray) ? storedArray : [];
        return retrievedArray;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}

async function renderAllRequests() {
    let requests = await retrieveRequests(getPlayerName());
    if (requests) {
        requests.forEach(element => {
            renderRequest(element);
        });
    }
}

async function sendOneRequest(user, requester) {
    try {
        let requestObj = {
            'user': user,
            'requester': requester,
        }
        // Make the POST request to the server
        const response = await fetch(`/oneRequest`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestObj),
        });

        if (!response.ok) {
            throw new Error(`Failed to store data. Status: ${response.status}`);
        }
        // Optionally, you can handle the response from the server
        const responseData = await response.json();
        console.log('Server response:', responseData);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function deleteRequest (user, requester) {
    let requestObj = {
        'user': user,
        'requester': requester,
    }
    fetch('/deleteRequest', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestObj),
    })
}

function acceptRequest(boxId, friend) {
    dismissRequest(boxId);
    addFriend(friend);
}
function dismissRequest(boxId) {
    document.getElementById(boxId).style.display = 'none';
}
async function declineRequest(boxId, user) {
    await deleteRequest(getPlayerName(), user);
    dismissRequest(boxId);
}

renderExistingFriends();
renderAllRequests();

// inspect deleteRequest and make sure you are passing in the right user and requester