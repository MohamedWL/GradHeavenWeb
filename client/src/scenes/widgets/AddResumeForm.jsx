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
import { Formik } from "formik";
import * as yup from "yup";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import CenteredBox from "components/CenteredBox";


const AddResumeForm = ({userIdent}) => {

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

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userIdent}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    const resumeSchema = yup.object().shape({
        highestDegree: yup.string().required("Your (in)completed highest degree is required"),
        fieldOfStudy: yup.string().required("The field of your studies is required"),
        educationEstablishment: yup.string().required("The college/university you attend(ed) is required"),
        experience: yup.string().required("Your experience is required"),
        hasGraduated: yup.boolean().required("required"),
        graduationDate: yup.date().when('hasGraduated', (hasGraduated, schema) => {
            return hasGraduated ? schema.required('Graduation date (YYYY-MM-DD) is required') : schema;
        }),
    });

    const initialValuesRegister = {
        highestDegree: "",
        fieldOfStudy: "",
        educationEstablishment: "",
        experience: "",
        hasGraduated: false,
        graduationDate: '2022-06-01',
    }

    const addResume = async (values, onSubmitProps) => {
        const resumeData = {
            highestDegree: values.highestDegree,
            fieldOfStudy: values.fieldOfStudy,
            educationEstablishment: values.educationEstablishment,
            hasGraduated: values.hasGraduated,
            graduationDate: values.graduationDate,
            experience: values.experience,
            domSkills: values.domSkills,
            softSkills: values.softSkills,
            linkedInInfo: values.linkedInInfo,
            portfolioInfo: values.portfolioInfo,
            firstRefer: values.firstRefer,
            secondRef: values.secondRef,
        };
    
        try {
            const savedResumeResponse = await fetch(`http://localhost:3001/resumes/createresume/${userIdent}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Set the content type header
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(resumeData), // Stringify the data as JSON
                }
            );
    
            const savedResume = await savedResumeResponse.json();
            console.log(savedResume);
    
            onSubmitProps.resetForm();
            window.location.reload();
            
        } catch (error) {
            console.error("Error adding resume:", error);
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        await addResume(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues= {initialValuesRegister}
            validationSchema={resumeSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="15px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        
                        <TextField
                            label="Highest degree completed or ongoing"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.highestDegree}
                            name="highestDegree"
                            error={Boolean(touched.highestDegree) && Boolean(errors.highestDegree)}
                            helperText={touched.highestDegree && errors.highestDegree}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="Field of Study (mandatory)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.fieldOfStudy}
                            name="fieldOfStudy"
                            error={Boolean(touched.fieldOfStudy) && Boolean(errors.fieldOfStudy)}
                            helperText={touched.fieldOfStudy && errors.fieldOfStudy}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="School/University (mandatory)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.educationEstablishment}
                            name="educationEstablishment"
                            error={Boolean(touched.educationEstablishment) && Boolean(errors.educationEstablishment)} // check if touched or if it has an error
                            helperText={touched.educationEstablishment && errors.educationEstablishment} //we show the error in the helper text i.e if a field is required
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
                                            backgroundColor: values.hasGraduated ? palette.primary.main : palette.background.alt,
                                            color: values.hasGraduated ? palette.background.alt:palette.primary.main,
                                            marginRight:'10px',
                                        }}
                                        onClick={() => {
                                            setFieldValue("hasGraduated", true);
                                            setFieldValue("graduationDate", ""); // Clear the graduationDate when switching to "Yes"
                                        }}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor: values.hasGraduated ? palette.background.alt : palette.primary.main,
                                            color: values.hasGraduated ? palette.primary.main : palette.background.alt,
                                        }}
                                        onClick={() => {
                                            setFieldValue("hasGraduated", false);
                                            setFieldValue("graduationDate", ""); // Clear the graduationDate when switching to "No"
                                        }}
                                    >
                                        No
                                    </Button>
                                </FlexBetween>
                            </Box>
                        </FlexBetween>

                        
                        <TextField
                            label="Graduation Date YYYY-MM-DD (mandatory if graduated)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hasGraduated ? values.graduationDate : " "}
                            name="graduationDate"
                            error={Boolean(touched.graduationDate) && Boolean(errors.graduationDate)}
                            helperText={touched.graduationDate && errors.graduationDate}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                            disabled={!values.hasGraduated}
                        />
                        <TextField
                            label="Experience (mandatory)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.experience}
                            name="experience"
                            error={Boolean(touched.experience) && Boolean(errors.experience)} // check if touched or if it has an error
                            helperText={touched.experience && errors.experience} //we show the error in the helper text i.e if a field is required
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="Domain Skills"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.domSkills}
                            name="domSkills"
                            error={Boolean(touched.domSkills) && Boolean(errors.domSkills)} // check if touched or if it has an error
                            helperText={touched.domSkills && errors.domSkills} //we show the error in the helper text i.e if a field is required
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="Soft Skills"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.softSkills}
                            name="softSkills"
                            error={Boolean(touched.softSkills) && Boolean(errors.softSkills)}
                            helperText={touched.softSkills && errors.softSkills}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="LinkedIn Profile link"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.linkedInInfo}
                            name="linkedInInfo"
                            error={Boolean(touched.linkedInInfo) && Boolean(errors.linkedInInfo)}
                            helperText={touched.linkedInInfo && errors.linkedInInfo}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="Portfolio Link"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.portfolioInfo}
                            name="portfolioInfo"
                            error={Boolean(touched.portfolioInfo) && Boolean(errors.portfolioInfo)}
                            helperText={touched.portfolioInfo && errors.portfolioInfo}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="Reference 1"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstRefer}
                            name="firstRefer"
                            error={Boolean(touched.firstRefer) && Boolean(errors.firstRefer)}
                            helperText={touched.firstRefer && errors.firstRefer}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                        <TextField
                            label="Reference 2"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.secondRef}
                            name="secondRef"
                            error={Boolean(touched.secondRef) && Boolean(errors.secondRef)}
                            helperText={touched.secondRef && errors.secondRef}
                            sx={{ 
                                gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                    height: '45px', // Adjust the height as needed
                                },
                            }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                marginTop: "0.75rem",
                                
                                height:"30px",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            Create your resume
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default AddResumeForm