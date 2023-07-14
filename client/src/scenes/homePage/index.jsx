//imports
import { Box, useMediaQuery } from "@mui/material";
import { useSelector} from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import JobListWidget from "scenes/widgets/JobListWidget";
import AdWidget from "scenes/widgets/AdWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
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
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "26%" : undefined}
                    marginTop={isNonMobileScreens ? undefined : "2rem"}
                >
                    <JobListWidget />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
