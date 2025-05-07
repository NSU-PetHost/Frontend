import React, { useState, useContext } from 'react';
import {Box, Button, Typography, TextField, IconButton, InputAdornment, Alert} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { useThemeContext } from '../contexts/ThemeContext';
import {useNavigate} from "react-router-dom";

export const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const { changePassword, loading, error, clearError } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errorLocal, setErrorLocal] = useState(null);

    const clearMessages = () => {
        setErrorLocal(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        if (formData.newPassword !== formData.confirmPassword) {
            setErrorLocal("Пароли не совпадают");
            return;
        }

        try {
            await changePassword(formData.currentPassword, formData.newPassword);
            navigate('/auth');
        } catch (err) {
            console.error('Password change failed:', err);
            setErrorLocal("Не удалось изменить пароль");
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
                Смена пароля
            </Typography>

            {errorLocal && (
                <Alert severity="error" onClose={clearMessages} sx={{ mb: 2 }}>
                    {errorLocal}
                </Alert>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Текущий пароль"
                    type={showPassword.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={(e) => {
                        setFormData({...formData, currentPassword: e.target.value});
                        if (error) clearError();
                    }}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
                                    edge="end"
                                >
                                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    variant="outlined"
                    label="Новый пароль"
                    type={showPassword.new ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={(e) => {
                        setFormData({...formData, newPassword: e.target.value});
                        if (error) clearError();
                    }}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                                    edge="end"
                                >
                                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    variant="outlined"
                    label="Подтвердите новый пароль"
                    type={showPassword.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                        setFormData({...formData, confirmPassword: e.target.value});
                        if (error) clearError();
                    }}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                                    edge="end"
                                >
                                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                >
                    {loading ? 'Сохранение...' : 'Сменить пароль'}
                </Button>
            </Box>
        </>
    );
};