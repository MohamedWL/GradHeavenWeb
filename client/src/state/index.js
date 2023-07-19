import { createSlice } from "@reduxjs/toolkit";
//state stored in global state, this data accessible for the whole app
const initialState = {
    mode: "light", //darkmode or light mode
    user: null,
    token: null, //auth operations
    resumes: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    //our actions, functions that'll do what we need
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            state.user.friends = action.payload.friends;
        },
        setJobs: (state, action) => {
            if (state.user) {
                state.user.jobs = action.payload.jobs;
            } else {
                console.error("user hasn't applied to any jobs.")
            }
        },
        setResumes: (state, action) => {
            state.resumes = action.payload.resumes;
        },
        setResume: (state, action) => {
            const updatedResumes = state.payload.map((resume) => {
                if (resume._id === action.payload.resume._id) return action.payload.resume;
                return resume;
            });
            state.resumes = updatedResumes;
        }
    }
})

export const { setMode, setJobs, setLogin, setLogout, setResume, setResumes, setFriends } = authSlice.actions;
export default authSlice.reducer;