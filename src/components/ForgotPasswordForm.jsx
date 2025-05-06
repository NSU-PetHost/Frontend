import React, { useState, useContext } from 'react';
import {Box, Button, Typography, TextField, Alert} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useThemeContext } from '../contexts/ThemeContext';
import {useNavigate} from "react-router-dom";

export const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const { resetPassword, loading, error, clearError } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [errorLocal, setErrorLocal] = useState(null);

    const clearMessages = () => {
        setErrorLocal(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        try {
            await resetPassword(email);
            navigate('/auth');
        } catch (err) {
            console.error('Password reset failed:', err);
            setErrorLocal("Не удалось отправить письмо для востановления")
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
                Восстановление пароля
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
                    label="Эл. почта"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) clearError();
                    }}
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

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || !email}
                >
                    {loading ? 'Отправка...' : 'Отправить ссылку'}
                </Button>
            </Box>
        </>
    );
};