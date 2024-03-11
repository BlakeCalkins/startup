function login() {
    const nameEl = document.querySelector("#name");
    const pswd = document.querySelector("#password");
    // if (nameEl.trim() === '' || pswd.trim() === '') {
    //     alert('Please enter a value before submitting.');
    //     return false;
    //   }
      
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", pswd.value);
    window.location.href = "homepage.html";
  }
  
  // function randomImg() {
  //   let imagesArray = ['burg.jpg', 'brownie.jpg', 'icecrm.jpg', 'tacos.jpg']
  //   const randomIndex = Math.floor(Math.random() * imagesArray.length);
  //   return imagesArray[randomIndex];
  // }

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
    // const imageUrl = randomImg();
    // imageElement.src = imageUrl;
    randomImg()
      .then(randomImageUrl => {
        imageElement.src = randomImageUrl;
    });
  }

  displayImg();