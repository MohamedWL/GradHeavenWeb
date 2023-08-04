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
import AddResumeForm from "./AddResumeForm";

const ResumeWidget = ({userId}) => {

    const token = useSelector((state) => state.token);
    const [user, setUser] = useState(null);
    const [resume, setResume] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.background.alt;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const light = palette.primary.light;
    const neutralLight = palette.neutral.light;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [linkedIn, setLinkedLink] = useState("");
    const [portfolio, setPortfolioLink] = useState("");
    const [degree, setDegree] = useState("");
    const [field, setField] = useState("");
    const [establishment, setEstablishment] = useState("");
    const [graduation, setGraduation] = useState("");
    const [softSkills, setSoftSkills] = useState("");
    const [domSkills, setDomainSkills] = useState("");
    const [exper, setExperience] = useState("");
    const [firstRef, setFirstReference] = useState("");
    const [secondRef, setSecondReference] = useState("");
    const [isGrad, setGradStatus] = useState(false);

    const [addingResume, setAddingResume] = useState(false);

    const [isEditingLinkedIn, setIsEditingLinkedIn] = useState(false);
    const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
    const [isEditingDegree, setIsEditingDegree] = useState(false);
    const [isEditingField, setIsEditingField] = useState(false);
    const [isEditingEstablishment, setIsEditingEstablishment] = useState(false);
    const [isEditingGraduation, setIsEditingGraduation] = useState(false);
    const [isEditingSoftSkills, setIsEditingSoftSkills] = useState(false);
    const [isEditingDomainSkills, setIsEditingDomainSkills] = useState(false);
    const [isEditingExperience, setIsEditingExperience] = useState(false);
    const [isEditingFirstReference, setIsEditingFirstReference] = useState(false);
    const [isEditingSecondReference, setIsEditingSecondReference] = useState(false);

    const [linkedInLabelValue, setLinkedInLabelValue] = useState("");
    const [portfolioLabelValue, setPortfolioLabelValue] = useState("");
    const [degreeLabelValue, setDegreeLabelValue] = useState("");
    const [fieldLabelValue, setFieldLabelValue] = useState("");
    const [establishmentLabelValue, setEstablishmentLabelValue] = useState("");
    const [graduationLabelValue, setGraduationLabelValue] = useState("");
    const [softSkillsLabelValue, setSoftSkillsLabelValue] = useState("");
    const [domainSkillsLabelValue, setDomainSkillsLabelValue] = useState("");
    const [experienceLabelValue, setExperienceLabelValue] = useState("");
    const [firstReferenceLabelValue, setFirstReferenceLabelValue] = useState("");
    const [secondReferenceLabelValue, setSecondReferenceLabelValue] = useState("");

    const getResume = async () => {
        const response = await fetch(`http://localhost:3001/resumes/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setResume(data);
        if(data.resume !== null){
            setGradStatus(data.hasGraduated);
        }
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
        getResume();
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

    if (!resume) {
        return null;
    }
    const {
        linkedInLink,
        portfolioLink,
        highestDegree,
        fieldOfStudy,
        educationEstablishment,
        hasGraduated,
        graduationDate,
        skills,
        domainSkills,
        experience,
        firstReference,
        secondReference
    } = resume;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create an updatedUser object with the modified data
        const updatedResume = {
            linkedIn,
            portfolio,
            degree,
            field,
            establishment,
            graduation,
            softSkills,
            domSkills,
            exper,
            firstRef,
            secondRef,
            isGrad,
        };
    
        // Update the user information
        const response = await fetch(`http://localhost:3001/resumes/updateresume/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedResume),
        });
    
        if (response.ok) {
            console.log('User resume successfuly updated');
        } else {
            const data = await response.json();
            console.log('Error:', data.message);
        }
        window.location.reload();
    };


    const handleFocus = ({textFieldLabel}) => {
        if(textFieldLabel==="LinkedIn profile link"){
            setIsEditingLinkedIn(true);
            setLinkedInLabelValue(textFieldLabel);  
        } else if(textFieldLabel==="Link to your portfolio"){
            setIsEditingPortfolio(true);
            setPortfolioLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Highest Degree completed or not (mandatory)"){
            setIsEditingDegree(true);
            setDegreeLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Field of study (mandatory)"){
            setIsEditingField(true);
            setFieldLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="School or University (mandatory)"){
            setIsEditingEstablishment(true);
            setEstablishmentLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Graduation Date"){
            setIsEditingGraduation(true);
            setGraduationLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Soft skills"){
            setIsEditingSoftSkills(true);
            setSoftSkillsLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Skills specific to the field"){
            setIsEditingDomainSkills(true);
            setDomainSkillsLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Experience (mandatory)"){
            setIsEditingExperience(true);
            setExperienceLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Reference 1"){
            setIsEditingFirstReference(true);
            setFirstReferenceLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Reference 2"){
            setIsEditingSecondReference(true);
            setSecondReferenceLabelValue(textFieldLabel);   
        }
    };

    const handleBlur = ({textFieldLabel,txtFieldContent}) => {
    if(txtFieldContent===""){
        if(textFieldLabel==="LinkedIn profile link"){
            setIsEditingLinkedIn(false);
        } else if(textFieldLabel==="Link to your portfolio"){
            setIsEditingPortfolio(false);
        }else if(textFieldLabel==="Highest Degree completed or not (mandatory)"){
            setIsEditingDegree(false);   
        }else if(textFieldLabel==="Field of study (mandatory)"){
            setIsEditingField(false);   
        }else if(textFieldLabel==="School or University (mandatory)"){
            setIsEditingEstablishment(false);   
        }else if(textFieldLabel==="Graduation Date"){
            setIsEditingGraduation(false);   
        }else if(textFieldLabel==="Soft skills"){
            setIsEditingSoftSkills(false);   
        }else if(textFieldLabel==="Skills specific to the field"){
            setIsEditingDomainSkills(false);   
        }else if(textFieldLabel==="Experience (mandatory)"){
            setIsEditingExperience(false);   
        }else if(textFieldLabel==="Reference 1"){
            setIsEditingFirstReference(false);   
        }else if(textFieldLabel==="Reference 2"){
            setIsEditingSecondReference(false);   
        }
    }else{
        if(textFieldLabel==="LinkedIn profile link"){
            setIsEditingLinkedIn(true);
            setLinkedInLabelValue(textFieldLabel);  
        } else if(textFieldLabel==="Link to your portfolio"){
            setIsEditingPortfolio(true);
            setPortfolioLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Highest Degree completed or not (mandatory)"){
            setIsEditingDegree(true);
            setDegreeLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Field of study (mandatory)"){
            setIsEditingField(true);
            setFieldLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="School or University (mandatory)"){
            setIsEditingEstablishment(true);
            setEstablishmentLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Graduation Date"){
            setIsEditingGraduation(true);
            setGraduationLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Soft skills"){
            setIsEditingSoftSkills(true);
            setSoftSkillsLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Skills specific to the field"){
            setIsEditingDomainSkills(true);
            setDomainSkillsLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Experience (mandatory)"){
            setIsEditingExperience(true);
            setExperienceLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Reference 1"){
            setIsEditingFirstReference(true);
            setFirstReferenceLabelValue(textFieldLabel);   
        }else if(textFieldLabel==="Reference 2"){
            setIsEditingSecondReference(true);
            setSecondReferenceLabelValue(textFieldLabel);   
        }
    }
    // Perform any additional logic if needed when the TextField loses focus.
    };

    const handleYesButtonClick = () => {
        setGradStatus(true);
    };

    const handleNoButtonClick = () => {
        setGradStatus(false);
    };
    const handleAddResumeClick = () => {
        setAddingResume(true);
    };

    return (
        <WidgetWrapper height={'100%'}>
            <CenteredBox>
                <Typography fontWeight={'bold'} fontSize={"30px"}>Your Resume</Typography>
            </CenteredBox>
            {resume.resume === null  ? (

                addingResume === false ? (
                    <CenteredBox display="grid" paddingTop='20%'>
                        <Typography fontSize={"15px"}>You do not have a resume yet. Create your resume !</Typography>
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
                            onClick={handleAddResumeClick}
                        >
                            Create your resume
                        </Button>
                    </CenteredBox>
                ) : (
                    <AddResumeForm userIdent={userId}/>
                )
                
            ) : (
                // Render the form when resume is not null
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
                            label={isEditingDegree ? degreeLabelValue:highestDegree}
                            placeholder={highestDegree}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Highest Degree completed or not (mandatory)",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Highest Degree completed or not (mandatory)",txtFieldContent:e.target.value})}
                            onChange={(e) => setDegree(e.target.value)}
                            name="degree"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label={isEditingField ? fieldLabelValue:fieldOfStudy}
                            placeholder={fieldOfStudy}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Field of study (mandatory)",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Field of study (mandatory)",txtFieldContent:e.target.value})}
                            onChange={(e) => setField(e.target.value)}
                            name="field"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label={isEditingEstablishment ? establishmentLabelValue:educationEstablishment}
                            placeholder={educationEstablishment}
                            onFocus={(e) =>handleFocus({textFieldLabel:"School or University (mandatory)",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"School or University (mandatory)",txtFieldContent:e.target.value})}
                            onChange={(e) => setEstablishment(e.target.value)}
                            name="establishment"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />

                        <FlexBetween width={"210%"}>
                            <Typography width="400px">Did you graduate from university/college ?</Typography>
                            <Box>
                                <FlexBetween>
                                    <Button
                                        sx={{
                                            backgroundColor: isGrad ? palette.primary.main : palette.background.alt,
                                            color: isGrad ? palette.background.alt:palette.primary.main,
                                            marginRight:'10px',
                                        }}
                                        onClick={handleYesButtonClick}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor: isGrad ? palette.background.alt : palette.primary.main,
                                            color: isGrad ? palette.primary.main : palette.background.alt,
                                        }}
                                        onClick={handleNoButtonClick}
                                    >
                                        No
                                    </Button>
                                </FlexBetween>                                
                            </Box>
                        </FlexBetween>
                        <TextField
                            label={

                                isEditingGraduation && isGrad ? graduationLabelValue : ''
                            }                            
                            placeholder={isGrad ? new Date(graduationDate).toISOString().substring(0, 10) : ''}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Graduation Date",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Graduation Date",txtFieldContent:e.target.value})}
                            onChange={(e) => setGraduation(e.target.value)}
                            name="graduation"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                            disabled={!isGrad}
                        />
                        <TextField
                            label={isEditingExperience ? experienceLabelValue: experience}
                            placeholder={experience}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Experience (mandatory)",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Experience (mandatory)",txtFieldContent:e.target.value})}
                            onChange={(e) => setExperience(e.target.value)}
                            name="experience"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label={isEditingDomainSkills ? domainSkillsLabelValue: domainSkills}
                            placeholder={domainSkills}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Skills specific to the field",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Skills specific to the field",txtFieldContent:e.target.value})}
                            onChange={(e)=>setDomainSkills(e.target.value)}
                            name="domainSkills"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label={isEditingSoftSkills ? softSkillsLabelValue: skills}
                            placeholder={skills}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Soft skills",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Soft skills",txtFieldContent:e.target.value})}
                            onChange={(e)=>setSoftSkills(e.target.value)}
                            name="skills"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />                    
                        <TextField
                            label={isEditingLinkedIn ? linkedInLabelValue: linkedInLink}
                            placeholder={linkedInLink}
                            onFocus={(e) =>handleFocus({textFieldLabel:"LinkedIn profile link",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"LinkedIn profile link",txtFieldContent:e.target.value})}
                            onChange={(e)=>setLinkedLink(e.target.value)}
                            name="linkedInProfile"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label={isEditingPortfolio ? portfolioLabelValue: portfolioLink}
                            placeholder={portfolioLink}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Link to your portfolio",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Link to your portfolio",txtFieldContent:e.target.value})}
                            onChange={(e)=>setPortfolioLink(e.target.value)}
                            name="portfolio"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label={isEditingFirstReference ? firstReferenceLabelValue: firstReference}
                            placeholder={firstReference}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Reference 1",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Reference 1",txtFieldContent:e.target.value})}
                            onChange={(e)=>setFirstReference(e.target.value)}
                            name="firstReference"
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />   
                        <TextField
                            label={isEditingSecondReference ? secondReferenceLabelValue: secondReference}
                            placeholder={secondReference}
                            onFocus={(e) =>handleFocus({textFieldLabel:"Reference 2",txtFieldContent:e.target.value})}
                            onBlur={(e) =>handleBlur({textFieldLabel:"Reference 2",txtFieldContent:e.target.value})}
                            onChange={(e)=>setSecondReference(e.target.value)}
                            name="secondReference"
                            sx={{ 
                                gridColumn: "span 2",
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

export default ResumeWidget