import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Typography,
    Link, TextField
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import React, {useState} from "react";
import {useThemeContext} from "../contexts/ThemeContext.jsx";

export const AuthForm = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const { theme } = useThemeContext();

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
                        disabled={!formData.email || !formData.password}
                    >
                        Вход
                    </Button>
                </Box>
            </Box>
        </>
    );
};