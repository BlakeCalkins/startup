const userName = document.querySelector('.user');
let person = localStorage.getItem("recentFriendViewer");
let hder = `${person}'s Homepage`
userName.textContent = hder;