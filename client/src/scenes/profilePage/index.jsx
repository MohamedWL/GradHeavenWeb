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
import UpdateInfo from "scenes/widgets/UpdateInfo";


const ProfilePage = () => {
    const { _id} = useSelector((state) => state.user);
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
    }, []);


    return (
        <Box sx={{}}>
            <Navbar notiCount= {newNotificationsCount}/>
            <UpdateInfo userId={_id}/>
        </Box>
    );
};

export default ProfilePage;