# Objective
Create a React + TypeScript application to display data in a grid format. [Setup](https://github.com/shubhammittalkv1/drag-drop-overlay?tab=readme-ov-file#setup)

## Integration Requirements and Features:

1. Drag and Drop: Allow users to drag and drop data cards.
2. Thumbnail Click: On clicking a thumbnail image, open an overlay of the image which can be closed by pressing the 'Esc' key.
3. If there are any changes, save the current state data to local storage every 5 seconds.
4. Ensure that upon reloading the page, the user lands in the same state as before.
5. Create a mock API using  https://github.com/mswjs/msw  to fetch default static data JSON.

## Thought Process while developing features:

1. Drag and Drop:

There are several npm libraries for drag and drop, such as react-beautiful-dnd, react-dnd, and react-sortable-hoc. However, I implemented this using the native HTML Drag and Drop API.

To manage the source and destination card information, I use the "onDrag" method to capture the source card index and store it in a state variable. Before dropping, I get the destination card details using the "onDragLeave" method and update the state. Once the card is dropped, By using "onDragEnd" method, I create a new array with the updated positions of the source and destination cards and replace the previous data. This approach enables seamless drag and drop functionality.

2. On clicking a thumbnail image, open an overlay of the image which can be closed by pressing the 'Esc' key:

I created a reusable card layout component displaying a title and image, establishing a parent-child relationship. When a user clicks the image in the child component, the image URL is sent to the parent via a props function. The parent then enables an overlay component and passes the image URL to it.

When the overlay mounts, a loader is active. Upon receiving the image URL, I check the loading state of the image. Once the image loads, I remove the spinner (using the "react-spinners" library) and display the image in the overlay.

Additionally, I added an event listener for the "keydown" event. If the "Escape" key is pressed, the overlay closes, enabling the close-on-Esc functionality.

3. Persistent State Management: Mock API Calls and localStorage Updates

Upon page load, I first check localStorage for data. If none exists, I fetch static data via a mock API ( creating by using https://github.com/mswjs/msw ), display it on the webpage, and store it in localStorage. If data is present in localStorage, I synchronize it with the displayed content.

Additionally, I set a 5-second timer to monitor for user-initiated changes, such as drag-and-drop actions. If changes occur, I update the localStorage; otherwise, no action is taken.

To optimize browser performance, I clear this timer when the component is no longer active, such as when the user leaves the page.

## IMPORTANT NOTE:

Because of adding https://github.com/mswjs/msw into the application. "Cannot read properties of undefined (reading 'url')" this error is coming while refreshing the page or opening multiple tabs in the same browser. This is an open bug in the library, For reference : [check this](https://github.com/mswjs/msw/issues/2146)

Resolution:
1. Check the application again in the incognito mode or
2. Close all the tabs of the application in the browser and reopen the application in the single tab.

## Setup

1. Clone the Repository
```
git clone https://github.com/shubhammittalkv1/drag-drop-overlay.git
```
2. Go inside the directory
```
cd drag-drop-overlay
```
3. Then install the dependencies:
```
npm install
```
4. Run the app:
```
npm start
```