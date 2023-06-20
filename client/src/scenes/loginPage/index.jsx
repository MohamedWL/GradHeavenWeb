import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const alt = theme.palette.background.alt;
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    return (
        <Box>
            <Box
                width={"100%"}
                backgroundColor={alt}
                padding={"1rem 6%"}
                textAlign={"center"}>
                <Typography
                    fontWeight={"bold"}
                    fontSize={"32px"}
                    color={"primary"}
                >
                    GradHeaven
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreen ? "50%" : "93%"}
                padding={"2rem"}
                margin={"2rem auto"}
                borderRadius={"1.5rem"}
                backgroundColor={alt}
            >
                <Typography
                    fontWeight={"500"}
                    variant="h5"
                    sx={{
                        marginBottom: "1.5rem",
                    }}
                    textAlign={"center"}
                >
                    Welcome to GradHeaven, the career board for students and graduates that will kickstart your career.
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;