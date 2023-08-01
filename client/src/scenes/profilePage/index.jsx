import { useState, useEffect } from "react";
import {
    Box,
    useMediaQuery,
} from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import UpdateInfo from "scenes/widgets/UpdateInfo";
import ResumeWidget from "scenes/widgets/ResumeWidget";
import CoverLetterWidget from "scenes/widgets/CoverLetterWidget";


const ProfilePage = () => {
    const { _id} = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width:600px)");
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
        <Box>
          <Navbar notiCount= {newNotificationsCount}/>
          <Box
              width="100%"
              padding="2rem 6%"
              display="flex"
              gap="0.5rem"
              justifyContent="space-between"
          >
              <Box>
                <UpdateInfo userId={_id}/>
              </Box>
              <Box width="49%" display="flex" flexDirection="column" justifyContent="space-between">
                <Box height="75%">
                  <ResumeWidget userId={_id} />
                </Box>
                <Box height="23%">
                  <CoverLetterWidget userId={_id}/>
                </Box>
              </Box>
          </Box>
        </Box>
    );
};

export default ProfilePage;