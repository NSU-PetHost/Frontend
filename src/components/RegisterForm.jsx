import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Typography,
    TextField, Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, {useContext, useState} from "react";
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {AuthContext} from "../contexts/AuthContext";
import {SuccessMessage} from "./SuccessMessage";

export const RegisterForm = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    const { theme } = useThemeContext();
    const { register, loading, error, clearError } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errorLocal, setErrorLocal] = useState(null);
    const [success, setSuccess] = useState(null);

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
        if (formData.password !== formData.password_confirmation) {
            setErrorLocal('Пароли не совпадают!');
            return;
        }

        try {
            await register({
                firstName: formData.name,
                lastName: formData.last_name,
                email: formData.email,
                password: formData.password
            });
            setSuccess('Регистрация прошла успешно! Пожалуйста проверьте ваш почтовый ящик для подтверждения.');
        } catch (err) {
            console.error('Registration failed:', err);
            setErrorLocal('Не удалось зарегистрироваться');
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
                Создать аккаунт
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
                    label="Имя"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Иван"
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
                    label="Фамилия"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Иванов"
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
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Повторить пароль"
                    type={isShowPasswordConfirm ? 'text' : 'password'}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}
                                    sx={{ color: theme.text.secondary }}
                                >
                                    {isShowPasswordConfirm ? <VisibilityOff /> : <Visibility />}
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

                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{width: '100%'}}
                        disabled={loading || !formData.name || !formData.last_name || !formData.email || !formData.password || !formData.password_confirmation}
                    >
                        {loading ? 'Загрузка...' : 'Регистрация'}
                    </Button>
                </Box>
            </Box>
        </>
    );
};