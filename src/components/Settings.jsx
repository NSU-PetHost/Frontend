import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    ToggleButtonGroup,
    ToggleButton,
    Divider,
} from '@mui/material';
import { useThemeContext } from "../contexts/ThemeContext.jsx";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Settings = () => {
    const {
        toggleTheme,
        isDarkTheme,
        font,
        theme,
        setFont,
        fonts
    } = useThemeContext();

    const handleFontChange = (event, newFont) => {
        if (newFont !== null) {
            setFont(newFont);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4}}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, bgcolor: theme.background.paper }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        background: `linear-gradient(45deg, ${theme.primary.main} 30%, ${theme.secondary.main} 90%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3,
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                >
                    Настройки интерфейса
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, color: theme.text.primary }}>
                        Цветовая тема
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={toggleTheme}
                        startIcon={isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
                        sx={{
                            bgcolor: theme.secondary.main,
                            '&:hover': {
                                bgcolor: theme.secondary.dark,
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isDarkTheme ? 'Светлая тема' : 'Тёмная тема'}
                    </Button>
                </Box>

                <Divider sx={{ my: 3, bgcolor: theme.divider }} />

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, color: theme.text.primary }}>
                        Выбор шрифта
                    </Typography>
                    <ToggleButtonGroup
                        value={font}
                        exclusive
                        onChange={handleFontChange}
                        aria-label="Выбор шрифта"
                        sx={{ flexWrap: 'wrap' }}
                    >
                        {fonts.map((font) => (
                            <ToggleButton
                                key={font.name}
                                value={font.value}
                                aria-label={font.name}
                                sx={{
                                    border: '2px solid',
                                    borderColor: theme.divider,
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1.5,
                                    color: theme.text.secondary,
                                    fontFamily: font.value,
                                    '&.Mui-selected': {
                                        bgcolor: theme.secondary.main,
                                        color: theme.secondary.contrastText,
                                        '&:hover': {
                                            bgcolor: theme.secondary.dark,
                                        },
                                    },
                                    '&:hover': {
                                        bgcolor: theme.background.default,
                                    },
                                }}
                            >
                                {font.name}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>

                <Divider sx={{ my: 3, bgcolor: theme.divider }} />

                <Box>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, color: theme.text.primary }}>
                        Пример текста
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Этот текст демонстрирует выбранный вами шрифт. Обратите внимание на читаемость и стиль символов.
                        Современный интерфейс требует гармоничного сочетания типографики и цветовой палитры.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Settings;