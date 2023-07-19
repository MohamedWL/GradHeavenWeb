let friendUserValue = null;

export const setFriendUserValue = (value) => {
  friendUserValue = value;
};

export const getFriendUserValue = () => {
  return friendUserValue;
};


/*

In index.jsx, import the setFriendUserValue function and use it:

import { setFriendUserValue } from './globalVar.js';

// ... Your other code ...

const handleFriendRequestClick = async ({ senderId, receiverId, decision }) => {
  // ... Your existing code ...

  // Set the friendUser value
  setFriendUserValue(data);

  // ... Your other code ...
};
Now, in other parts of your application, you can import getFriendUserValue from globalVar.js to access the value of friendUser:

import { getFriendUserValue } from './globalVar.js';

// Usage in other parts of the application
const friendUserValue = getFriendUserValue();
console.log(friendUserValue); // This will print the value of friendUser if it has been set befor

*/