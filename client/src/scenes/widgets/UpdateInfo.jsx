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
import UserImage from "components/UserImage";


const UpdateInfo = ({userId}) => {
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


    const [fName, setFirstName] = useState("");
    const [lName, setLastName] = useState("");
    const [bday, setBirthday] = useState("");
    const [pNumber, setPhoneNumber] = useState("");
    const [loc, setLocation] = useState("");
    const [indus, setIndustry] = useState("");
    const [pay, setDesiredPay] = useState("");
    const [emailAdress, setEmail] = useState("");
    const [image, setImage] = useState(null);

    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [isEditingBirthday, setIsEditingBirthday] = useState(false);
    const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [isEditingIndustry, setIsEditingIndustry] = useState(false);
    const [isEditingDesiredPay, setIsEditingDesiredPay] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [firstNameLabelValue, setFirstNameLabelValue] = useState("");
    const [lastNameLabelValue, setLastNameLabelValue] = useState("");
    const [birthdayLabelValue, setBirthdayLabelValue] = useState("");
    const [phoneNumberLabelValue, setPhoneNumberLabelValue] = useState("");
    const [locationLabelValue, setLocationLabelValue] = useState("");
    const [industryLabelValue, setIndustryLabelValue] = useState("");
    const [desiredPayLabelValue, setDesiredPayLabelValue] = useState("");
    const [emailLabelValue, setEmailLabelValue] = useState("");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create an updatedUser object with the modified data
        const updatedUser = {
            fName,
            lName,
            bday,
            pNumber,
            loc,
            indus,
            pay,
            emailAdress,
            picturePath: image ? image.name : user.picturePath,
        };
    
        // Update the user information
        const response = await fetch(`http://localhost:3001/users/updateinfo/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        });
    
        if (response.ok) {
            console.log('User information successfuly updated');
        } else {
            const data = await response.json();
            console.log('Error:', data.message);
        }
        window.location.reload();
    };

    const handleFocus = ({textFieldLabel}) => {
        if(textFieldLabel==="Last Name"){
            setIsEditingLastName(true);
            setLastNameLabelValue(textFieldLabel);  
        } else if(textFieldLabel==="First Name"){
            setIsEditingFirstName(true);
            setFirstNameLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Birthday"){
            setIsEditingBirthday(true);
            setBirthdayLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Phone Number"){
            setIsEditingPhoneNumber(true);
            setPhoneNumberLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Location"){
            setIsEditingLocation(true);
            setLocationLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Industry"){
            setIsEditingIndustry(true);
            setIndustryLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Desired Pay"){
            setIsEditingDesiredPay(true);
            setDesiredPayLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Email"){
            setIsEditingEmail(true);
            setEmailLabelValue(textFieldLabel);   
        }
    };

    const handleBlur = ({textFieldLabel,txtFieldContent}) => {
    if(txtFieldContent===""){
        if(textFieldLabel==="Last Name"){
            setIsEditingLastName(false);
        }else if(textFieldLabel==="First Name"){
            setIsEditingFirstName(false);
        }else if(textFieldLabel==="Birthday"){
            setIsEditingBirthday(false);
        }else if(textFieldLabel==="Phone Number"){
            setIsEditingPhoneNumber(false);
        }else if(textFieldLabel==="Location"){
            setIsEditingLocation(false);
        }else if(textFieldLabel==="Industry"){
            setIsEditingIndustry(false);
        }else if(textFieldLabel==="Desired Pay"){
            setIsEditingDesiredPay(false);
        }else if(textFieldLabel==="Email"){
            setIsEditingEmail(false);
        }
    }else{
        console.log("hello");
        if(textFieldLabel==="Last Name"){
            setIsEditingLastName(true);
            setLastNameLabelValue(textFieldLabel); 
        }else if(textFieldLabel==="First Name"){
            setIsEditingFirstName(true);
            setFirstNameLabelValue(textFieldLabel);
        }else if(textFieldLabel==="Birthday"){
            setIsEditingBirthday(true);
            setBirthdayLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Phone Number"){
            setIsEditingPhoneNumber(true);
            setPhoneNumberLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Location"){
            setIsEditingLocation(true);
            setLocationLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Industry"){
            setIsEditingIndustry(true);
            setIndustryLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Desired Pay"){
            setIsEditingDesiredPay(true);
            setDesiredPayLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Email"){
            setIsEditingEmail(true);
            setEmailLabelValue(textFieldLabel);   
        }
    }
    
    // Perform any additional logic if needed when the TextField loses focus.
    };


    return (
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
                            label={isEditingFirstName ? firstNameLabelValue:firstName}
                            placeholder={firstName}
                            onFocus={(e) =>handleFocus({textFieldLabel:"First Name",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"First Name",txtFieldContent:e.target.value})}
                            onChange={(e) => setFirstName(e.target.value)}
                            name="firstName"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label={isEditingLastName ? lastNameLabelValue: lastName}
                            placeholder={lastName}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Last Name",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Last Name",txtFieldContent:e.target.value})}
                            onChange={(e) => setLastName(e.target.value)}
                            name="lastName"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label={isEditingBirthday ? birthdayLabelValue: new Date(birthday).toISOString().substring(0, 10)}
                            placeholder={new Date(birthday).toISOString().substring(0, 10)}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Birthday",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Birthday",txtFieldContent:e.target.value})}
                            onChange={(e)=>setBirthday(e.target.value)}
                            name="birthday"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label={isEditingPhoneNumber ? phoneNumberLabelValue: phoneNumber}
                            placeholder={phoneNumber}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Phone Number",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Phone Number",txtFieldContent:e.target.value})}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            name="phoneNumber"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label={isEditingLocation ? locationLabelValue: location}
                            placeholder={location}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Location",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Location",txtFieldContent:e.target.value})}
                            onChange={(e)=>setLocation(e.target.value)}
                            name="location"
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label={isEditingIndustry ? industryLabelValue: industry}
                            placeholder={industry}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Industry",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Industry",txtFieldContent:e.target.value})}
                            onChange={(e)=>setIndustry(e.target.value)}
                            name="industry"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label={isEditingDesiredPay ? desiredPayLabelValue: desiredPay}
                            placeholder={desiredPay}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Desired Pay",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Desired Pay",txtFieldContent:e.target.value})}
                            onChange={(e)=>setDesiredPay(e.target.value)}
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
                                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])} // Store the dropped image in the state
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!user.picturePath && !image ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <FlexBetween>
                                                {image ? (
                                                    <Typography>{image.name}</Typography> // Show the image name if an image is selected but not saved yet
                                                ) : (
                                                    <Typography>{user.picturePath}</Typography> // Show the current picturePath if available
                                                )}
                                                <EditOutlinedIcon />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>

                        <TextField
                            label={isEditingEmail ? emailLabelValue: email}
                            placeholder={email}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Email",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Email",txtFieldContent:e.target.value})}
                            onChange={(e)=>setEmail(e.target.value)}
                            name="email"
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
                            onClick={handleSubmit}
                        >
                            UPDATE YOUR INFORMATION
                        </Button>
                    </Box>
                </Box>
        </form>
    );
};

export default UpdateInfo;