import React from 'react';
import {Paper, Container} from "@mui/material";
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {ChangePasswordForm} from "./ChangePasswordForm";

const ChangePassword = () => {
    const { theme } = useThemeContext();


    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{p: 4, overflow: 'hidden', borderRadius: 4, bgcolor: theme.background.paper}}>
                <ChangePasswordForm/>
            </Paper>
        </Container>
    );
};

export default ChangePassword;