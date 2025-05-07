import React, {useEffect, useState} from 'react';
import { AuthForm } from './AuthForm';
import {Paper, Typography, Container, Divider, Link} from "@mui/material";
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {RegisterForm} from "./RegisterForm";
import {useSearchParams} from "react-router-dom";

const Auth = () => {
    const [searchParams] = useSearchParams();
    const [isLogin, setIsLogin] = useState(false);
    const {
        theme,
    } = useThemeContext();

    useEffect(() => {
        if (searchParams.get("page") === "login") {
            setIsLogin(true);
        }
    }, [searchParams])
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{p: 4, overflow: 'hidden', borderRadius: 4, bgcolor: theme.background.paper}}>
                {isLogin ? (
                    <>
                        <AuthForm/>
                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color={theme.text.secondary}>
                                или
                            </Typography>
                        </Divider>
                        <Typography mt={2} style={{fontSize: '0.9rem'}}>
                            Если у вас нет учетной записи?{' '}
                            <Link sx={{cursor: "pointer"}} color={theme.secondary.dark} onClick={()=>setIsLogin(false)}>
                                Зарегистрируйтесь
                            </Link>.
                        </Typography>
                    </>
                ) : (
                    <>
                        <RegisterForm/>
                        <Typography mt={2} style={{fontSize: '0.9rem'}}>
                            У вас уже учетной записи?{' '}
                            <Link sx={{cursor: "pointer"}} color={theme.secondary.dark} onClick={()=>setIsLogin(true)}>
                                Войдите
                            </Link>.
                        </Typography>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default Auth;