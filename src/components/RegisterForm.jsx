import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Typography,
    TextField, Alert, LinearProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, {useContext, useEffect, useState} from "react";
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {AuthContext} from "../contexts/AuthContext";
import {SuccessMessage} from "./SuccessMessage";
import {generateNickname} from "../utils/utils";
import {useNavigate} from "react-router-dom";

export const RegisterForm = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { register, loading, error, clearError, confirmEmail, confirmCode, setLoginStatus, setUserData } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        nickname: generateNickname(),
        surname: '',
        patronymic: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errorLocal, setErrorLocal] = useState(null);
    const [codeMode, setCodeMode] = useState(false);
    const [success, setSuccess] = useState(null);
    const [confirmationCode, setConfirmationCode] = useState(null)

    useEffect(() => {
        if (formData.password) {
            let strength = 0;

            if (formData.password.length >= 8) strength += 1;
            if (formData.password.length >= 12) strength += 1;

            if (/\d/.test(formData.password)) strength += 1;

            if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) strength += 1;

            if (/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password)) strength += 1;

            setPasswordStrength(Math.min(strength, 5));
        } else {
            setPasswordStrength(0);
        }
    }, [formData.password]);

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return 'error';
        if (passwordStrength === 3) return 'warning';
        return 'success';
    };

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

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleChangeCode = (e) => {
        const { value } = e.target;
        setConfirmationCode(value);
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
                surname: formData.surname,
                patronymic: formData.patronymic,
                nickname: formData.nickname,
                email: formData.email,
                password: formData.password
            });
            await confirmEmail(formData.email);
            setSuccess('Регистрация прошла успешно! Пожалуйста проверьте ваш почтовый ящик для подтверждения.');
            setCodeMode(true);
        } catch (err) {
            console.error('Registration failed:', err);
            setErrorLocal('Не удалось зарегистрироваться');
        }
    };

    const handleConfirm = async (e) => {
        try {
            await confirmCode(formData.email, confirmationCode);
            setSuccess('Почта успешно подтверждена.');
            await sleep(2000);
            setUserData(formData.email, formData.nickname, formData.firstName, formData.surname, formData.patronymic);
            setLoginStatus(false);
            navigate('/auth?page=login');
        } catch (err) {
            console.error('Confirmation failed:', err);
            setErrorLocal('Не удалось подтвердить почтовый ящик. Попробуйте снова');
        } finally {
            setCodeMode(true);
            setConfirmationCode(null);
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
            { codeMode ? (
                <>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Код подтверждения"
                        type="text"
                        name="confirmationCode"
                        value={confirmationCode}
                        onChange={handleChangeCode}
                        required
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                borderWidth: '2px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.primary.main,
                                },
                            },
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                                letterSpacing: '8px',
                                fontSize: '24px',
                                fontWeight: 'bold'
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{width: '100%'}}
                        disabled={loading || !confirmationCode}
                        onClick={handleConfirm}
                    >
                        {loading ? 'Загрузка...' : 'Подтвердить'}
                    </Button>
                </>
            ) : (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    autoComplete='off'
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Никнейм"
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                        placeholder="Ivan2004"
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
                        name="surname"
                        value={formData.surname}
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
                        label="Отчество"
                        type="text"
                        name="patronymic"
                        value={formData.patronymic}
                        onChange={handleChange}
                        required
                        placeholder="Иванович"
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
                    {formData.password && <Box sx={{ width: '100%' }}>
                        <LinearProgress
                            variant="determinate"
                            value={passwordStrength * 25}
                            color={getPasswordStrengthColor()}
                            sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption" color={theme.text.secondary}>
                            Сложность пароля: {passwordStrength <= 2 ? 'Слабый' : passwordStrength === 3 ? 'Средний' : 'Сильный'}
                        </Typography>
                    </Box>}
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
                            disabled={loading || !formData.name || !formData.patronymic || !formData.nickname || !formData.surname || !formData.email || !formData.password || !formData.password_confirmation}
                        >
                            {loading ? 'Загрузка...' : 'Регистрация'}
                        </Button>
                    </Box>
                </Box>
            )}


        </>
    );
};