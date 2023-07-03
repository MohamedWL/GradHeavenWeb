import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const sendFriendRequest = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/add-friend`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ friendId: selectedUser._id }),
            });
            const data = await response.json();
            dispatch(setFriends(data.friends));
            setSelectedUser(null);
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    return (
        <WidgetWrapper>
            <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
                Add your friends
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography>Select a user:</Typography>
                    <select onChange={(e) => handleUserSelect(JSON.parse(e.target.value))}>
                        <option value="">-- Select user --</option>
                        {users.map((user) => (
                            <option key={user._id} value={JSON.stringify(user)}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                    <button onClick={sendFriendRequest} disabled={!selectedUser}>
                        Send Request
                    </button>
                </Box>
                <Typography>Your friends:</Typography>
                {friends.map((friend) => (
                    <Friend key={friend._id} friend={friend} />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;