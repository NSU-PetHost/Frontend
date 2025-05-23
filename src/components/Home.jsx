import {Button, Typography, Box, Container, Stack, CardMedia, Card, CardContent} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import PetsIcon from '@mui/icons-material/Pets';
import {articlesData} from "./articlesData";
import {useThemeContext} from "../contexts/ThemeContext";
import React from "react";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Home = () => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    return (
        <Box sx={{
            minHeight: '100vh',
            background: `linear-gradient(-45deg, ${theme.secondary.main}, ${theme.primary.main}, ${theme.secondary.main}, ${theme.primary.main})`,
            backgroundSize: '400% 400%',
            animation: `${gradientBackground} 15s ease infinite`,
            color: 'white',
            pt: 10,
            pb: 12,
            borderRadius: 2
        }}>
            <Container maxWidth="lg">
                <Stack spacing={6} alignItems="center">
                    <Box sx={{
                        animation: `${floatAnimation} 6s ease-in-out infinite`,
                        textAlign: 'center'
                    }}>
                        <PetsIcon sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h2" component="h1" sx={{
                            fontWeight: 900,
                            letterSpacing: '2px',
                            mb: 2,
                            textShadow: '2px 2px 8px rgba(0,0,0,0.2)'
                        }}>
                            Добро пожаловать в PetHost
                        </Typography>
                        <Typography variant="h5" sx={{ maxWidth: 700, mx: 'auto' }}>
                            Ваш надёжный помощник в уходе за домашними любимцами
                        </Typography>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/articles/all')}
                            sx={{
                                px: 7,
                                py: 2,
                                borderRadius: '50px',
                                border: '2px solid white',
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    border: '2px solid white',
                                    transform: 'scale(1.05)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Читать статьи
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/add-animal')}
                            sx={{
                                px: 4,
                                py: 2,
                                borderRadius: '50px',
                                border: '2px solid white',
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    border: '2px solid white',
                                    transform: 'scale(1.05)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Добавить питомца
                        </Button>
                    </Stack>

                    <Box sx={{ width: '100%', mt: 8 }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                            Популярные статьи
                        </Typography>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                            {articlesData.slice(0, 3).map(article => (
                                <Card
                                    key={article.id}
                                    onClick={() => navigate(`/articles/${article.id}`)}
                                    sx={{
                                        flex: 1,
                                        width: '100%',
                                        bgcolor: theme.background.default,
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(10px)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            bgcolor: theme.background.hover
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        width="100%"
                                        image={article.image}
                                        alt={article.title}
                                        className="media"
                                        sx={{
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '16px',
                                            borderTopRightRadius: '16px'
                                        }}
                                    />
                                    <CardContent p={3}>
                                        <Typography color={theme.secondary.dark} variant="h6" sx={{ fontWeight: 600 }}>
                                            {article.title}
                                        </Typography>
                                        <Typography color={theme.text.primary} variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                                            {article.excerpt}
                                        </Typography>
                                        <Typography variant="caption" sx={{
                                            display: 'block',
                                            mt: 2,
                                            color: theme.text.secondary
                                        }}>
                                            {article.readTime} · {article.category}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Home;