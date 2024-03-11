function login() {
    const nameEl = document.querySelector("#name");
    const pswd = document.querySelector("#password");
      
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", pswd.value);
    window.location.href = "homepage.html";
  }

  function randomImg() {
    return fetch('https://foodish-api.com/api/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => data.image)
    .catch(error => {
      console.error('Error:', error.message);
    });
  }

  function displayImg() {
    const imageElement = document.getElementById("loginImg");
    randomImg()
      .then(randomImageUrl => {
        imageElement.src = randomImageUrl;
    });
  }

  displayImg();