import React from 'react';
import {Paper, Container} from "@mui/material";
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {ForgotPasswordForm} from "./ForgotPasswordForm";

const ForgotPassword = () => {
    const { theme } = useThemeContext();


    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{p: 4, overflow: 'hidden', borderRadius: 4, bgcolor: theme.background.paper}}>
                <ForgotPasswordForm/>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;