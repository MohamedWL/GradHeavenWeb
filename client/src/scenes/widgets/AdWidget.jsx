import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="267px"
                alt="advert"
                src="http://localhost:3001/assets/info2.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0", objectFit: "cover" }}
            />
            <FlexBetween>
                <Typography color={main}>KFC</Typography>
                <Typography color={medium}>kfc.ca</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Come over with your family to one of our restaurants and enjoy the Double Bucket feast.
                An 8 pieces Original Recipe chicken served with a 4 tenders a popcorn Chick'N Share bucket, 3 large sides and 2 dips.
            </Typography>
        </WidgetWrapper>
    );
};

export default AdWidget;