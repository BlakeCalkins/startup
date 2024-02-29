function makeEntryObj() {
    let restaurant = document.getElementById('restaurant').value;
    let date = document.getElementById('date').value;
    let dish = document.getElementById('dish').value;
    let blurb = document.getElementById('blurb').value;
    // let rating = document.querySelector('rating');
    let thoughts = document.getElementById('thoughts').value;
    console.log("vars declared");

    if (restaurant.trim() === '' || 
    date.trim() === '' || 
    blurb.trim() === '' || 
    dish.trim() === '' ||
    thoughts.trim() === '') {
        alert('Please enter a value before submitting.');
        return false;
      }
      console.log("if passed");

//     var ratingButtons = document.querySelectorAll('input[name="rating"]');

//   // Add a change event listener to the radio buttons
//     ratingButtons.forEach(function(button) {
//         // Get the value of the selected radio button
//         var selectedRating = document.querySelector('input[name="rating"]:checked').value;
//     });
    console.log('before obj creation');
    // const entryObj = {
    //     'restaurant': restaurant,
    //     'date': date,
    //     'dish': dish,
    //     'blurb': blurb,
    //     // 'rating': selectedRating,
    //     'thoughts': thoughts,
    // };
    // console.log(entryObj);
    console.log("pain");
}
