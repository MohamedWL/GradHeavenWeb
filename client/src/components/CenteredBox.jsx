import { Box } from "@mui/material";
import { styled } from "@mui/system";

const CenteredBox = styled(Box)(({ display }) => ({
  justifyContent: "center",
  alignContent: "center",
  display: display ? display : "flex", // If display prop is provided, use it; otherwise, default to "flex"
}));

export default CenteredBox;
