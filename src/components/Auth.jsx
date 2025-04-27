import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
import {Paper, Typography, Container, Divider, Link, IconButton, Box} from "@mui/material";
import {useThemeContext} from "../contexts/ThemeContext";
import {RegisterForm} from "./RegisterForm";
import google from '../assets/google.png';
import yandex from '../assets/yandex.png';
import vk from '../assets/vk.png';
import telegram from '../assets/telegram.png';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const {
        theme,
    } = useThemeContext();


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
                        <Box display="flex" justifyContent="center" gap={4}>
                            <IconButton>
                                <img
                                    src={google}
                                    alt="Google"
                                    style={{ width: 32, height: 32 }}
                                />
                            </IconButton>
                            <IconButton>
                                <img
                                    src={telegram}
                                    alt="Telegram"
                                    style={{ width: 32, height: 32 }}
                                />
                            </IconButton>
                            <IconButton>
                                <img
                                    src={yandex}
                                    alt="Yandex"
                                    style={{ width: 32, height: 32 }}
                                />
                            </IconButton>
                            <IconButton>
                                <img
                                    src={vk}
                                    alt="ВКонтакте"
                                    style={{ width: 32, height: 32 }}
                                />
                            </IconButton>
                        </Box>
                        <Typography mt={2} style={{fontSize: '0.9rem'}}>
                            У вас нет учетной записи?{' '}
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