import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    styled,
    keyframes
} from '@mui/material';
import {
    Article as ArticleIcon,
    Favorite,
    Share,
    Bookmark,
    ArrowForward
} from '@mui/icons-material';
import {useThemeContext} from "../contexts/ThemeContext.jsx";

const floatAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
`;

const AnimatedCard = styled(Card)({
    transition: 'all 0.3s ease',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        '& .media': {
            animation: `${floatAnimation} 3s ease infinite`
        }
    }
});

const GradientButton = styled(Button)({
    background: `linear-gradient(45deg, ${({ theme }) => theme.primary.main} 0%, ${({ theme }) => theme.secondary.main} 100%)`,
    color: `${({ theme }) => theme.primary.contrastText}`,
    borderRadius: '50px',
    padding: '12px 32px',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        background: `linear-gradient(45deg, ${({ theme }) => (theme.primary.dark)} 0%, ${({ theme }) => (theme.secondary.dark)} 100%)`
    }
});

const articles = [
    {
        id: 1,
        title: '10 советов по питанию питомцев',
        excerpt: 'Узнайте, как обеспечить лучший рацион для ваших пушистых друзей',
        image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Питание',
        readTime: '5 мин'
    },
    {
        id: 2,
        title: 'Эффективное обучение питомца',
        excerpt: 'Современные техники дрессировки без стресса',
        image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Дрессировка',
        readTime: '8 мин'
    },
    {
        id: 3,
        title: 'Путешествия с питомцами',
        excerpt: 'Все, что нужно знать для комфортных поездок',
        image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Путешествия',
        readTime: '7 мин'
    },
    {
        id: 4,
        title: 'Основы ухода за питомцем',
        excerpt: 'Полное руководство по поддержанию чистоты и здоровья',
        image: 'https://images.unsplash.com/photo-1594149929911-78975a43d4f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Уход',
        readTime: '6 мин'
    },
    {
        id: 5,
        title: 'Чек-лист здоровья питомца',
        excerpt: 'Регулярные проверки здоровья, которые должен знать каждый владелец',
        image: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Здоровье',
        readTime: '10 мин'
    },
    {
        id: 6,
        title: 'Выбор подходящего питомца',
        excerpt: 'Как выбрать идеального компаньона для вашего образа жизни',
        image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'Руководство',
        readTime: '9 мин'
    }
];


const Articles = () => {
    const { theme } = useThemeContext();

    return (
        <Box sx={{
            minHeight: '100vh',
            py: 8
        }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box mb={8} ml={8} sx={{ px: { xs: 2, sm: 4 } }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            background: `linear-gradient(45deg, ${theme.primary.main} 0%, ${theme.secondary.main} 80%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        Интересные статьи
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color={theme.text.secondary}
                        mx="auto"
                        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                    >
                        Откройте для себя последние советы и рекомендации по уходу, дрессировке, питанию и многому другому от наших экспертов.
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    {articles.map((article) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            key={article.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <AnimatedCard sx={{
                                maxWidth: 400,
                                width: '100%'
                            }}>
                                <CardMedia
                                    component="img"
                                    height="220"
                                    image={article.image}
                                    alt={article.title}
                                    className="media"
                                    sx={{
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '16px',
                                        borderTopRightRadius: '16px'
                                    }}
                                />
                                <CardContent sx={{
                                    position: 'relative',
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -20,
                                        right: 20,
                                        backgroundColor: theme.secondary.main,
                                        color: 'white',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                    }}>
                                        {article.category}
                                    </Box>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            mt: 1,
                                            fontWeight: 600,
                                            fontSize: '1.3rem',
                                            lineHeight: 1.3,
                                            minHeight: '3.5rem',
                                            color: theme.primary.dark
                                        }}
                                    >
                                        {article.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={theme.text.secondary}
                                        sx={{
                                            mb: 2,
                                            flexGrow: 1,
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {article.excerpt}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mt: 'auto' }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.disabled"
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <ArticleIcon sx={{
                                                fontSize: '1rem',
                                                mr: 0.5,
                                            }} />
                                            Опубликована {article.readTime}
                                        </Typography>
                                        <Box>
                                            <Button
                                                size="small"
                                                sx={{
                                                    minWidth: 0,
                                                    color: theme.primary.main,
                                                    '&:hover': {
                                                        color: theme.primary.dark
                                                    }
                                                }}
                                            >
                                                <Favorite fontSize="small" />
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{
                                                    minWidth: 0,
                                                    color: theme.primary.main,
                                                    '&:hover': {
                                                        color: theme.primary.dark
                                                    }
                                                }}
                                            >
                                                <Bookmark fontSize="small" />
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{
                                                    minWidth: 0,
                                                    color: theme.primary.main,
                                                    '&:hover': {
                                                        color: theme.primary.dark
                                                    }
                                                }}
                                            >
                                                <Share fontSize="small" />
                                            </Button>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </AnimatedCard>
                        </Grid>
                    ))}
                </Grid>

                <Box textAlign="center" mt={8}>
                    <GradientButton
                        endIcon={<ArrowForward sx={{ ml: 0.5 }} />}
                        size="large"
                    >
                        Все статьи
                    </GradientButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Articles;