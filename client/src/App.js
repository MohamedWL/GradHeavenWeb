import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import homePage from "scenes/homePage";
import loginPage from "scenes/loginPage";
import profilePage from "scenes/profilePage";
import interviewsPage from "scenes/interviewsPage";
import jobsPage from "scenes/jobsPage";
import messagesPage from "scenes/messagesPage";
import settingsPage from "scenes/settingsPage";
import yourJobsPage from "scenes/yourJobsPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {

    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<loginPage />} />
                        <Route path="/home" element={<homePage />} />
                        <Route path="/profile/:userId" element={<profilePage />} />
                        <Route path="/jobsPage" element={<jobsPage />} />
                        <Route path="/messages/:userId" element={<messagesPage />} />
                        <Route path="/settings/:userId" element={<settingsPage />} />
                        <Route path="/interviews/userId" element={<interviewsPage />} />
                        <Route path="/yourjobs/:userId" element={<yourJobsPage />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;


















