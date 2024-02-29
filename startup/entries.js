function makeEntryObj() {
    // event.preventDefault();
    let restaurant = document.getElementById('restaurant').value;
    let date = document.getElementById('date').value;
    let dish = document.getElementById('dish').value;
    let blurb = document.getElementById('blurb').value;
    // let rating = document.querySelector('rating');
    let thoughts = document.getElementById('thoughts').value;


    // if (restaurant.trim() === '' || 
    // date.trim() === '' || 
    // blurb.trim() === '' || 
    // dish.trim() === '' ||
    // thoughts.trim() === '') {
    //     alert('Please enter a value before submitting.');
    //     return false;
    //   }

    var ratingButtons = document.querySelectorAll('input[name="rating"]');
    var selectedRating = 0;

  // Add a change event listener to the radio buttons
    ratingButtons.forEach(function(radio) {
        // Get the value of the selected radio button
        if (radio.checked) {
            selectedRating = radio.value;
        }
    });
    const entryObj = {
        'restaurant': restaurant,
        'date': date,
        'dish': dish,
        'blurb': blurb,
        'rating': selectedRating,
        'thoughts': thoughts,
    };
    const entryObjString = JSON.stringify(entryObj);
    localStorage.setItem("")
}
