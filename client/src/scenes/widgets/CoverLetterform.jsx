import React from 'react'
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

const CoverLetterform = ({userIdent}) => {

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

    const coverLetterSchema = yup.object().shape({
        coverLetterContent: yup.string().required("You need to fill this field to create a cover letter or about me section"),
    });

    const initialValuesRegister = {
        coverLetterContent: "",
    }
    const addCoverLetter = async (values, onSubmitProps) => {
        const coverLetterData = {
            coverLetterContent: values.coverLetterContent,
        };
        try {
            const savedCoverLetterResponse = await fetch(`http://localhost:3001/coverletters/createcoverletter/${userIdent}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Set the content type header
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(coverLetterData), // Stringify the data as JSON
                }
            );
            const savedCoverLetter = await savedCoverLetterResponse.json();
            console.log(savedCoverLetter);
            onSubmitProps.resetForm();
            window.location.reload();
        } catch (error) {
            console.error("Error adding cover letter:", error);
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        await addCoverLetter(values, onSubmitProps);
    };

    return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues= {initialValuesRegister}
        validationSchema={coverLetterSchema}
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
                        label="Cover Letter/More about you"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.coverLetterContent}
                        name="coverLetterContent"
                        error={Boolean(touched.coverLetterContent) && Boolean(errors.coverLetterContent)}
                        helperText={touched.coverLetterContent && errors.coverLetterContent}
                        sx={{ 
                            gridColumn: "span 4",
                            "& .MuiOutlinedInput-root": {
                                height: '45px', // Adjust the height as needed
                            },
                        }}
                    />
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                marginTop: "0.25rem",
                                width:'428%',
                                height:"30px",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            Create your cover letter
                        </Button>
                    </Box>
                </Box>
            </form>
        )}
    </Formik>
    )
}

export default CoverLetterform