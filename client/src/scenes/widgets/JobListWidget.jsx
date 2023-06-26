import React, { useEffect, useState } from 'react';
import { Box, useTheme, Typography, Button } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const JobListWidget = () => {
    const [jobs, setJobs] = useState([]);
    const { palette } = useTheme();
    const dark = palette.background.alt;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const light = palette.primary.light;

    useEffect(() => {
        const fetchJobs = async () => {

            const response = await fetch("http://localhost:3001/jobs/joblist", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }); // Replace with your backend API endpoint
            const data = await response.json();
            setJobs(data);

        };

        fetchJobs();
    }, []);

    return (
        <WidgetWrapper
            backgroundColor={dark}
            sx={{
                alignContent: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                width: '620px',
            }}
        >
            <Box fontSize={'35px'}>Jobs that might interest you</Box>
            {jobs.map((job) => (
                <Box
                    key={job._id}
                    sx={{
                        margin: '15px 20px 15px 20px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '25px',
                            fontStyle: 'italic',
                        }}

                    >
                        {job.JobTitle}
                    </Typography>
                    <Typography marginBottom={'20px'}>
                        {job.jobDescription.length > 235
                            ? `${job.jobDescription.substring(0, 235)}...`
                            : job.jobDescription}
                    </Typography>
                    <FlexBetween>
                        <Typography>Location: {job.location}</Typography>
                        <Typography>Yearly pay: {job.pay}</Typography>
                        <Typography>Exp.date: {job.expiringDate.substring(0, 10)}</Typography>
                        <Button
                            type="submit"
                            sx={{
                                height: '25px',
                                width: '55px',
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                                fontWeight: 'bold',
                            }}
                        >
                            Apply
                        </Button>
                    </FlexBetween>
                    {/* Render other job details */}
                </Box>
            ))}
        </WidgetWrapper>
    );
};

export default JobListWidget;