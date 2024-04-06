# Startup
notes file found [here](https://github.com/BlakeCalkins/startup/blob/main/notes.md).
## Specification Deliverable
### Elevator pitch
Have you ever been to a restaurant and thought "I've been here before, but I don't remember what I got... Darn, it was really good too." Food Joint Journal will allow you to record the foods you love (and hate), in order to help you remember the good menu items and try new items as well. Connect with your friends and see their preferences, or rank your own joints to see your favorites. 

### Design

An example of the user's customizable homepage.

![IMG_6494](https://github.com/BlakeCalkins/startup/assets/127635588/91785974-4a86-4c2f-86f2-b00e0de9922e)

Example of the journal entry section of the website, showing the current logged in user's recent entries.

![IMG_6493](https://github.com/BlakeCalkins/startup/assets/127635588/c829a239-45d5-47af-bb0d-9ec04516f942)

### Key features

- Log in and maintain your journal, where it is stored in the server database. 
- Create journal entries for restaurant visits
  - Add entries specifying the date, restaurant title and food you ate
  - Rate the food
  - Record notes on how the food tasted, what you liked or didn't like, if you would get it again
  - Search for restaurants using Google Maps to input specific locations
- Add friends
- View friends' homepages
- Rank restaurants you've been to on your own homepage
- See friend requests from others the moment they request you as a friend

### Technologies
This is how each of the following technologies will be used in my startup
- **HTML** - The structure of the different pages of the user's journal, as well as allowing them to navigae between pages with different functionalities.
- **CSS** - Displays an attractive UI of journal entries, homepages of the user and their friends, and of the interactive elements of the website.
- **Javascript** - Allows adding and editing of journal entries and customization of homepage.
- **Web Service** - Retrieves data for the following:
  - login
  - previously stored journal entries and homepage rankings
  - restaurants found on Google Maps
- **Authentication** - Create or login to your account in order to store your entries.
- **WebSocket** - Receive a live friend request notification when someone wants to become friends on the website, and maybe chat with your friends in real time.
- **Web Framework** - Uses React

## HTML Deliverable
For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Four pages are here with various functionalities. 
- **Links** - The Login button on the first page links to the User's homepage. I also have created a menu with links to all of the pages. 
- **Text** - The main function of my application is writing and storing text as journal entries about food.
- **3rd Party Services** - Searching for the restaurant page will pull up a list of known restaurants. 
- **Images** - I don't plan on including images in my startup page, however I did update the favicon with my own favicon, a juicy burg.
- **DB/Login** - Input box and submit button for login. Previous journal entries, friend lists and favorite restaurants are stored in the database. 
- **WebSocket** - Friend requests pop up to the user in realtime, allowing instant befriending.

## CSS Deliverable
For this deliverable, I styled my content with fonts, a snappy header, buttons from bootstrap, and other elements.

- **Header, Footer, and main content body**
- **Navigation elements** - Starting from bootstrap, I put nav elements in the header for the four pages, adding a color change on hover.
- **Responsive to window sizing** - Using some flex, I included responsive design so that the app looks good at any window size.
- **Application elements** - I added bootstrap button styling as well as a pop-up box style on friend notifications. 
- **Application text content** - Three fonts for different parts of the app (header, normal text, and handwritten style for entries).
- **Application images** - Added a paper-looking element for journal entries and I responsively sized the image on the login screen.

## JavaScript Deliverable
For this deliverable, I implemented the logic for my webpage in order for it to have basic functionality. 

- **Login** - The user's username and password are stored in localStorage and then their name is displayed on the homepage.html page.
- **Database** - Previous entries and a friendlist is displayed based off of the user's input. Currently this is stored and retrieved from local storage, but will be in database later. Viewing a friend's homepage also displays their page. This is currently a placeholder as well.
- **WebSocket** - Friend requests are displayed on the homepage as soon as the request is made from the other person. Currently this is a placeholder card that will still add the friend to the friendlist if accepted.
- **Application logic** - Entries and favorites can be entered by the user and will update their homepage.

## Service deliverable
For this deliverable I added backend endpoints that gets data from the user in prep to store it in the DB.

- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
-  **Calls to third party endpoints** - I'm calling a third party website to get a random food image and display it on the login page.
-  **Backend service endpoints** - Data manipulation moved to backend. Data stored locally on server now, waiting for DB transfer.
-  **Frontend calls service endpoints** - I called fetch to send data to and receive data from the server on my frontend.

## DB/Login deliverable
For this deliverable I added user creation, authentication, and encryption, as well as persistent storage of the user's favorite restaurants and their entries in mongoDB. 

- **MongoDB Atlas database created** - done!
- **Stores data in MongoDB** - Entries and Favorites of user are stored in MongoDB, as well as usernames and encrypted passwords.
- **User registration** - Creates a new account in the database.
- **existing user** - Logs user in if user already exists and pulls up their previously stored favorites and entries.
- **Use MongoDB to store credentials** - Stores user and their credentials.
- **Restricts functionality** - You can only use the website once you have logged in.
- **Note** - I didn't store the friends into the Database on this deliverable as I'm going to do that in the webSocket one so that friends have to accept your request before you can be their friend. 
