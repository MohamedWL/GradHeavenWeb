import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector} from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Navbar from "scenes/navbar";
import UserImage from "components/UserImage";


const ProfilePage = () => {
    const { _id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dark = palette.background.alt;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const light = palette.primary.light;
    const neutralLight = palette.neutral.light;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [newNotificationsCount, setNewNotificationsCount] = useState(0);

    const findNotiForUser = async () => {
        try {
          const url = `http://localhost:3001/notifications/getnotificationstouser?userIdentification=${encodeURIComponent(
            _id
          )}`;
          const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          return data; // Return the data instead of assigning it to a variable
        } catch (error) {
          console.error("Error retrieving notifications for this user:", error);
        }
    };

    const fetchNotificationsCount = async () => {
        const data = await findNotiForUser();
        setNewNotificationsCount(data);
    };
      
    useEffect(() => {
        fetchNotificationsCount();
        getUser();
    }, []);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        birthday,
        phoneNumber,
        location,
        industry,
        friends,
        desiredPay,
        picturePath
    } = user;


    return (
        <Box sx={{}}>
            <Navbar notiCount= {newNotificationsCount}/>
            <form>
                    <Box
                        gap="10px"
                        sx={{
                            width:'600px',  
                            backgroundColor:neutralLight,
                            margin:'20px',
                            borderRadius:'15px',
                        }}
                    >
                        <Box 
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding:'10px',
                            }}  
                        >
                            <UserImage image={user.picturePath} />
                            <Typography
                                variant="h4"
                                color='white'
                                fontWeight="500"
                                fontSize={'35px'}
                            >
                                {user.firstName} {user.lastName}
                            </Typography>
                        </Box>

                        <Box
                            display="grid"
                            gap="15px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                width:'600px',  
                                backgroundColor:neutralLight,
                                padding:'15px',
                                borderRadius:'15px',
                            }}
                        >
                            <TextField
                                label="First Name"
                                value={user.firstName}
                                name="firstName"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Last Name"
                                value={user.lastName}
                                name="lastName"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Birthday"
                                value={user.birthday}
                                name="birthday"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Phone Number"
                                value={user.phoneNumber}
                                name="phoneNumber"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Location"
                                value={user.location}
                                name="location"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Industry"
                                value={user.industry}
                                name="industry"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Desired Pay"
                                value={user.desiredPay}
                                name="desiredPay"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    /*onDrop={(acceptedFiles) =>
                                        
                                        //setFieldValue("picture", acceptedFiles[0])
                                    }*/
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!user.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{user.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>

                            <TextField
                                label="Email"
                                value={user.email}
                                name="email"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={user.password}
                                name="password"
                                sx={{ gridColumn: "span 4" }}
                            />
                            
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    width:'421%',
                                    "&:hover": { color: main },
                                    marginTop:'10px',
                                }}
                            >
                                UPDATE YOUR INFORMATION
                            </Button>
                        </Box>
                    </Box>
            </form>
        </Box>
    );
};

export default ProfilePage;