import { Box, Typography, useTheme, Button, Divider } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import CloseIcon from '@mui/icons-material/Close';


//

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const dark = palette.background.alt;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const light = palette.primary.light;
    const neutralLight = palette.neutral.light;
    const token = useSelector((state) => state.token);
    //const friends = useSelector((state) => state.user.friends);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [requestSent, setRequestButtonStyle] = useState(false);
    const [friendIds, setFriendIdsList] = useState(null);
    const [friends, setFriendsList] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {

            const response = await fetch("http://localhost:3001/users/allusers", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }); // Replace with your backend API endpoint
            const data = await response.json();
            setUsers(data);
        };

        fetchJobs();
    }, []);

    const handleSendRequest = async () => {
        handleButtonRequestStyleChange();
        if (selectedUser) {
            const [firstName, lastName] = selectedUser.split(' '); // Splitting the selectedUser variable into first name and last name
            try {
                const url = `http://localhost:3001/users/userbyfullname?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                const receiverId = data._id;
                const senderId = userId;

                await fetch("http://localhost:3001/notifications/createnotification", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ senderId, receiverId, notiType: "Friend Request"}),
                });

                // Add your additional logic here if needed

                console.log("Friend request sent successfully");
            } catch (error) {
                console.error("Error sending friend request:", error);
            }
        }
    };

    const handleButtonRequestStyleChange = () => {
        // Update the state to indicate that the request is sent
        setRequestButtonStyle(true);
    
        // Reset the state after 5 seconds
        setTimeout(() => {
            setRequestButtonStyle(false);
        }, 5000);
    };

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            const fetchedFriendIds = data.friends;
            setFriendIdsList(fetchedFriendIds);
    
            if (fetchedFriendIds) {
                const friendsUser = await Promise.all(
                    fetchedFriendIds.map(async (friendId) => {
                        const userResponse = await fetch(`http://localhost:3001/users/${friendId}`, {
                            method: "GET",
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        const userData = await userResponse.json();
                        return userData;
                    })
                );
                setFriendsList(friendsUser);
            }
        };
        getUser();
    }, [userId, token]); // Add friendIds as a dependency

    const removeFriendClick = async ({ loggedUserIdentification, friendIdentification }) => {
        setFriendsList((prevFriends) => prevFriends.filter((friend) => friend._id !== friendIdentification));
        try {
          // Construct the URL for the endpoint
          const url = `http://localhost:3001/users/userfriend`;
          const payload = {
            loggedUserIdentification,
            friendIdentification,
          };
      
          // Make a PUT request using the Fetch API
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(payload),
          });
      
          // Check if the response is successful
          if (response.ok) {
            // Friend removed successfully
            console.log('Friend removed successfully');
          } else {
            // Handle the error if the response status is not 200
            const data = await response.json();
            console.log('Error:', data.message);
          }
        } catch (err) {
          console.error('Error:', err.message);
        }
    };


    return (
        <WidgetWrapper>         
            <Typography textAlign={'center'} color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
                Add your friends
            </Typography>  
            <Box sx={{justifyContent:'space-around', display:'flex', alignItems:'center'}}>
                <Typography marginLeft={'-20px'}>Select a user:</Typography>
                <Typography marginRight={'0px'}>Your friends:</Typography>
            </Box>
            <Box display="flex" gap="1rem" justifyContent="space-between">
                <Box gap="0.5rem">
                    <select id="userSelect" onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">-- Select user --</option>
                        {users.map((user) => (
                            <option key={user._id} value={`${user.firstName} ${user.lastName}`}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                    <Divider></Divider>
                    <Button
                        sx={{
                            height: '30px',
                            width: '118px',
                            backgroundColor: requestSent ? 'green' : palette.primary.main,
                            color: requestSent ? 'white' : palette.background.alt,
                            '&:hover': { color: requestSent ? 'white' : palette.primary.main },
                            fontWeight: 'bold',
                            fontSize: '8px',
                        }}
                        onClick={handleSendRequest}
                        disabled={requestSent} // Disable the button when the request is sent
                        >
                        {requestSent ? 'Request sent' : `Send Request to ${selectedUser}`}
                    </Button>
                </Box>
                    <Box 
                    sx={{
                        display:'row',
                    }} 
                >
                    {friends && friends.map((friend) => ( 
                            <Box key={friend._id} 
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    backgroundColor:neutralLight,
                                    width:'175px',
                                    borderRadius:'5px',
                                    marginBottom:'5px',
                                    height:'40px'
                                }}  
                            >
                                <UserImage image={friend.picturePath} size="30px"/>
                                <Typography 
                                    sx={{
                                        fontSize:'12px',
                                        textAlign:'center'
                                    }}
                                >
                                    {`${friend.firstName} ${friend.lastName}`.length > 15
                                    ? `${friend.firstName} ${friend.lastName}`.slice(0, 15) + '...'
                                    : `${friend.firstName} ${friend.lastName}`}
                                </Typography>
                                <Button 
                                    sx={{
                                        color:'white', 
                                        backgroundColor:'red', 
                                        padding:'2px', 
                                        minWidth:'20px', 
                                        borderRadius:'12px',
                                        '&:hover': { color:'red', backgroundColor:'white' },
                                    }}
                                    onClick={() => removeFriendClick({ loggedUserIdentification: userId, friendIdentification: friend._id })}
                                >
                                    <CloseIcon/>
                                </Button>
                            </Box>
                    ))}
                </Box>
            </Box>
        </WidgetWrapper >
    );
};

export default FriendListWidget;