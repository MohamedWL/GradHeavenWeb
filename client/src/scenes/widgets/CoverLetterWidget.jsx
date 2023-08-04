import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import CenteredBox from "components/CenteredBox";
import { Formik } from "formik";
import * as yup from "yup";
import CoverLetterform from "./CoverLetterform";

const CoverLetterWidget = ({userId}) => {

    const token = useSelector((state) => state.token);
    const [user, setUser] = useState(null);
    const [coverletter, setCoverLetter] = useState(null);
    const [covletsend, setCovLetSens] = useState(null);
    const [addingCoverLetter, setAddingCoverLetter] = useState(false);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.background.alt;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const light = palette.primary.light;
    const neutralLight = palette.neutral.light;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [coverLetterLabelValue, setCoverLetterLabelValue] = useState("");
    const [isEditingCoverLetter, setIsEditingCoverLetter] = useState(false);

    const getCoverLetter = async () => {
        const response = await fetch(`http://localhost:3001/coverletters/getcoverletter/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCoverLetter(data);
        console.log(data);
    };

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        console.log(data)
    };

    useEffect(() => {
        getCoverLetter();
        getUser();
    }, []);

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
        desiredPay,
        email,
        picturePath
    } = user;

    if (!coverletter) {
        return null;
    }
    const {
        coverLetterContent,
    } = coverletter;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create an updatedUser object with the modified data
        const updatedCoverLetter = {
            covletsend
        };
    
        // Update the user information
        const response = await fetch(`http://localhost:3001/coverletters/updatecoverletter/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedCoverLetter),
        });
    
        if (response.ok) {
            console.log('User cover letter successfuly updated');
        } else {
            const data = await response.json();
            console.log('Error:', data.message);
        }
        window.location.reload();
    };

    const handleFocus = ({textFieldLabel}) => {
        if(textFieldLabel==="Cover Letter/More about you"){
            setIsEditingCoverLetter(true);
            setCoverLetterLabelValue(textFieldLabel);  
        }
    };
    const handleBlur = ({textFieldLabel,txtFieldContent}) => {
        if(txtFieldContent===""){
            if(textFieldLabel==="Cover Letter/More about you"){
                setIsEditingCoverLetter(false);
            } 
        }else{
            if(textFieldLabel==="Cover Letter/More about you"){
                setIsEditingCoverLetter(true);
                setCoverLetterLabelValue(textFieldLabel);  
            }
        }
    };

    const handleAddCoverLetterClick = () => {
        setAddingCoverLetter(true);
    };

    return (
        <WidgetWrapper height={'100%'}>
            <CenteredBox>
                <Typography fontWeight={'bold'} fontSize={"20px"}>About you/Cover Letter</Typography>
            </CenteredBox>
            
            {coverletter.coverletter === null  ? (

                addingCoverLetter === false ? (
                    <CenteredBox display="grid" >
                        <Typography fontSize={"15px"}>You do not have a cover letter yet. Talk a bit more about yourself!</Typography>
                        <Button 
                            type="submit"
                            sx={{
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: main },
                                marginTop:'10px',
                                fontSize:'15px',
                                paddingLeft:'-10px',
                                paddingRight:'-10px',
                            }}
                            onClick={handleAddCoverLetterClick}
                        >
                            Create your cover letter
                        </Button>
                    </CenteredBox>
                ) : (
                    <CoverLetterform userIdent={userId}/>
                )

                ) : (
                // Render the form when cover letter is not null
                <form>
                    
                    <Box
                        display="grid"
                        gap="15px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, 
                            borderRadius:'15px',
                            //backgroundColor:'blue'
                        }}
                    >
                        <TextField
                            label={isEditingCoverLetter ? coverLetterLabelValue: coverLetterContent}
                            placeholder={coverLetterContent}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Cover Letter/More about you",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Cover Letter/More about you",txtFieldContent:e.target.value})}
                            onChange={(e) => setCovLetSens(e.target.value)}
                            name="coverletter"
                            sx={{ 
                                gridColumn: "span 4",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />                
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                width:'428%',
                                "&:hover": { color: main },
                                fontSize:'15px'
                            }}
                            onClick={handleSubmit}
                        >
                            UPDATE YOUR INFORMATION
                        </Button>
                    </Box>
                </form>
                )}
        </WidgetWrapper>
    )
}

export default CoverLetterWidget