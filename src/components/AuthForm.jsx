import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Typography,
    Link, TextField, Alert
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import React, {useContext, useState} from "react";
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {AuthContext} from "../contexts/AuthContext";
import {SuccessMessage} from "./SuccessMessage";
import {useNavigate} from "react-router-dom";

export const AuthForm = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const { theme } = useThemeContext();
    const { login, loading, error, clearError } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorLocal, setErrorLocal] = useState(null);
    const [success, setSuccess] = useState(null);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const clearMessages = () => {
        setErrorLocal(null);
        setSuccess(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        try {
            await login(formData);
            setSuccess('Вы успешно вошли!');
            await sleep(2000);
            navigate('/protect');
        } catch (err) {
            console.error('Login failed:', err);
            setErrorLocal('Не удалось войти проверьте данные');
        }
    };

    return (
        <>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${theme.primary.main} 0%, ${theme.secondary.main} 90%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
            >
                Вход в аккаунт
            </Typography>

            {errorLocal && (
                <Alert severity="error" onClose={clearMessages} sx={{ mb: 2 }}>
                    {errorLocal}
                </Alert>
            )}

            <SuccessMessage
                message={success}
                onClose={clearMessages}
            />

            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete='off'
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Эл. почта"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            borderWidth: '2px',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.primary.main,
                            },
                        },
                    }}
                />

                <TextField
                    fullWidth
                    variant="outlined"
                    label="Пароль"
                    type={isShowPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                    sx={{ color: theme.text.secondary }}
                                >
                                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            borderWidth: '2px',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.primary.main,
                            },
                        },
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Link
                        href="/forgot-password"
                        underline="hover"
                        sx={{
                            color: theme.text.secondary,
                            fontSize: '0.875rem',
                            '&:hover': {
                                color: theme.primary.main,
                            }
                        }}
                    >
                        Забыли пароль?
                    </Link>
                </Box>
                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{width: '100%'}}
                        disabled={loading || !formData.email || !formData.password}
                    >
                        {loading ? 'Загрузка...' : 'Вход'}
                    </Button>
                </Box>
            </Box>
        </>
    );
};