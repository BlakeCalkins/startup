function login() {
    const nameEl = document.querySelector("#name");
    const pswd = document.querySelector("#password");
    if (nameEl.trim() === '' || pswd.trim() === '') {
        alert('Please enter a value before submitting.');
        return false;
      }
      
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", pswd.value);
    window.location.href = "homepage.html";
  }
  