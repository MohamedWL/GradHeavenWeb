import { useState } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery, Button } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";


const Navbar = ({notiCount}) => {
    const notiAmount = notiCount.count;
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = user === null ? "Default User" : `${user.firstName} ${user.lastName}`;
    const [notifications, setNotifications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBadgeInvisible, setIsBadgeInvisible] = useState(false);

    const handleNotificationClick = async () => {
        // Call backend function to mark notifications as read
        const url = `http://localhost:3001/notifications/fetchnotifications?userIdentification=${encodeURIComponent(user._id)}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        const senders = data.map(notification => notification.sender);
  
        const users = await Promise.all(
            senders.map(async (sender) => {
            const userResponse = await fetch(`http://localhost:3001/users/${sender}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = await userResponse.json();
            return userData;
            })
        );
        console.log(users)
        setNotifications(users);
        // Show modal/pop-up with notifications
        setIsModalOpen(true);
    };

    const handleFriendRequestClick = async ({ senderId, receiverId, decision }) => {
        const url = `http://localhost:3001/notifications/deletenoti`;
        const payload = {
            senderId,
            receiverId,
            decision
        };
        
        try {
            const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
            });
            
            if (response.ok) {
            console.log("Notification deleted successfully");
            // Perform any additional actions after deleting the notification
            } else {
            console.error("Failed to delete notification");
            }
        } catch (error) {
            console.error("An error occurred while deleting the notification:", error);
        }
        setIsModalOpen(false);
        setIsBadgeInvisible(true);
        if(decision==="Accept"){
            window.location.reload();
        }
    };
    

    return (
        <FlexBetween padding={"1rem 6%"} backgroundColor={alt}>
            <FlexBetween gap={"1.75rem"}>
                <Typography
                    fontWeight={"bold"}
                    fontSize={"clamp(1rem, 2rem, 2.25rem)"}
                    color={"primary"}
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    GradHeaven
                </Typography>
                {!isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius={"9px"} gap={"3rem"} padding={"0.1rem 1.5rem"}>
                        <InputBase placeholder="Search a job or a person" />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/*DESKTOP NAV 
            with the changing of the mode light or dark here*/}
            {isNonMobileScreens ? (
                <FlexBetween gap={"2rem"}>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Badge badgeContent={notiAmount} color="error" invisible={isBadgeInvisible}>
                        <Notifications sx={{ fontSize: '25px' }} onClick={handleNotificationClick}/>
                    </Badge>
                    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div>
                            {notifications.map((notification) => (
                                //{const userFullname :`${notification.firstName} ${notification.lastName}`;}
                                <Box 
                                    key={notification._id}
                                    sx={{
                                        backgroundColor:'white',
                                        color:'black',
                                        width:'500px',
                                        height:'50px',
                                        marginTop:'80px',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                        display:'flex',
                                        borderRadius:'7px',
                                        marginLeft:'920px'
                                    }}
                                >
                                    
                                    <Typography sx={{marginLeft:'10px'}}>
                                        {notification.firstName} {notification.lastName} has sent you a friend request.
                                    </Typography>
                                    <Button 
                                        sx={{
                                            backgroundColor:'green',
                                            color:'white',
                                        }}
                                        onClick={() => handleFriendRequestClick({ senderId: notification._id, receiverId: user._id, decision: "Accept" })}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor:'red',
                                            color:'white',
                                            marginRight:'10px',
                                        }}
                                        onClick={() => handleFriendRequestClick({ senderId: notification._id, receiverId: user._id, decision: "Deny" })}
                                    >
                                        Deny
                                    </Button>
                                    
                                </Box>
                            ))}
                        </div>
                    </Modal>
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                padding: "0.25rem 1rem",
                                "& .MuiSvgIcon-root:": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}> <Menu /> </IconButton>
            )}
            {/*Mobile nav*/}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/*close icon */}
                    <Box display="flex" justifyContent="flex-end" padding="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/*Menu items */}

                    <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={"3rem"}>
                        <IconButton sx={{ fontSize: "25px" }} onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root:": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )
            }
        </FlexBetween >
    );
};

export default Navbar;
