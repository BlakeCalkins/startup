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
