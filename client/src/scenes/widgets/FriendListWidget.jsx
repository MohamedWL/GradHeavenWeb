import { Box, Typography, useTheme, Button, Divider } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

//

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const dark = palette.background.alt;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const light = palette.primary.light;
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [requestSent, setRequestButtonStyle] = useState(false);

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


    return (
        <WidgetWrapper>
            <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
                Add your friends
            </Typography>
            <Box display="flex" gap="1.5rem" justifyContent="space-between">
                <Box gap="0.5rem">
                    <Typography>Select a user:</Typography>
                    <select id="userSelect" onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">-- Select user --</option>
                        {users.map((user) => (
                            <option key={user._id} value={`${user.firstName} ${user.lastName}`}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                    <p>Selected User: {selectedUser}</p>
                    <Divider></Divider>
                    <Button
                        sx={{
                            height: '30px',
                            width: '118px',
                            backgroundColor: requestSent ? 'green' : 'palette.primary.main',
                            color: requestSent ? 'white' : 'palette.background.alt',
                            '&:hover': { color: requestSent ? 'white' : 'palette.primary.main' },
                            fontWeight: 'bold',
                            fontSize: '8px',
                        }}
                        onClick={handleSendRequest}
                        disabled={requestSent} // Disable the button when the request is sent
                        >
                        {requestSent ? 'Request sent' : `Send Request to ${selectedUser}`}
                    </Button>
                </Box>
                <Typography>Your friends:</Typography>
            </Box>
        </WidgetWrapper >
    );
};

export default FriendListWidget;