import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import InterviewsPage from "scenes/interviewsPage";
import JobsPage from "scenes/jobsPage";
import MessagesPage from "scenes/messagesPage";
import SettingsPage from "scenes/settingsPage";
import YourJobsPage from "scenes/yourJobsPage";
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
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/profile/:userId" element={<ProfilePage />} />
                        <Route path="/jobsPage" element={<JobsPage />} />
                        <Route path="/messages/:userId" element={<MessagesPage />} />
                        <Route path="/settings/:userId" element={<SettingsPage />} />
                        <Route path="/interviews/userId" element={<InterviewsPage />} />
                        <Route path="/yourjobs/:userId" element={<YourJobsPage />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;


















