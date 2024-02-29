function login() {
    const nameEl = document.querySelector("#name");
    const pswd = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", pswd.value);
    window.location.href = "homepage.html";
  }
  