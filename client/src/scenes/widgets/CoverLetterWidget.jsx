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

const CoverLetterWidget = ({userId}) => {

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

    return (
        <WidgetWrapper height={'100%'}>
            <CenteredBox>
                <Typography fontWeight={'bold'} fontSize={"30px"}>About you/Cover Letter</Typography>
            </CenteredBox>
            <CenteredBox display="grid" >
                <Typography fontSize={"15px"}>You do not have a cover letter yet. Talk  abit more about yourself!</Typography>
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
                >
                    Create your cover letter
                </Button>
            </CenteredBox>
        </WidgetWrapper>
    )
}

export default CoverLetterWidget