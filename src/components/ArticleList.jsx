import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Snackbar,
    Alert,
    IconButton,
    Pagination,
    CircularProgress
} from '@mui/material';
import {
    Article as ArticleIcon,
    Favorite,
    Share,
    Bookmark,
    ArrowBack
} from '@mui/icons-material';
import { useThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleProvider";
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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

const ArticlesList = () => {
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    const {
        articles,
        loading,
        error,
        totalPages,
        getAllArticles,
        clearError
    } = useContext(ArticleContext);

    const [favorites, setFavorites] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('articleFavorites');
        const savedBookmarks = localStorage.getItem('articleBookmarks');

        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

        loadArticles(currentPage).then(r => console.log(r));
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('articleFavorites', JSON.stringify(favorites));
        localStorage.setItem('articleBookmarks', JSON.stringify(bookmarks));
    }, [favorites, bookmarks]);

    useEffect(() => {
        if (error) {
            showSnackbar(error, 'error');
            clearError();
        }
    }, [clearError, error]);

    const loadArticles = async (page) => {
        try {
            await getAllArticles(null, page - 1);
        } catch (err) {
            console.error('Ошибка загрузки статей:', err);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        loadArticles(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFavoriteClick = (articleId) => {
        if (favorites.includes(articleId)) {
            setFavorites(favorites.filter(id => id !== articleId));
            showSnackbar('Статья удалена из избранного', 'info');
        } else {
            setFavorites([...favorites, articleId]);
            showSnackbar('Статья добавлена в избранное', 'success');
        }
    };

    const handleBookmarkClick = (articleId) => {
        if (bookmarks.includes(articleId)) {
            setBookmarks(bookmarks.filter(id => id !== articleId));
            showSnackbar('Статья удалена из закладок', 'info');
        } else {
            setBookmarks([...bookmarks, articleId]);
            showSnackbar('Статья добавлена в закладки', 'success');
        }
    };

    const handleShareClick = async (articleId) => {
        const url = `${window.location.origin}/articles/${articleId}`;
        const article = articles.find(a => a.id === articleId);

        try {
            if (navigator.share) {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: url
                });
            } else {
                await navigator.clipboard.writeText(url);
                showSnackbar('Ссылка скопирована в буфер обмена', 'success');
            }
        } catch (err) {
            console.error('Ошибка при попытке поделиться:', err);
            showSnackbar('Не удалось поделиться статьей', 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading && !articles.length) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 8 }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box mb={8} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={handleBackClick}
                        sx={{ color: theme.primary.main }}
                    >
                        Назад
                    </Button>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            background: `linear-gradient(45deg, ${theme.primary.main} 0%, ${theme.secondary.main} 80%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        Все статьи
                    </Typography>
                    <Box sx={{ width: 100 }} />
                </Box>

                {loading && articles.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <CircularProgress />
                    </Box>
                )}

                <Grid container spacing={4} justifyContent="center">
                    {articles.map((article) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            key={article.id}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <AnimatedCard sx={{ maxWidth: 400, width: '100%' }}>
                                <Box onClick={() => navigate(`/articles/${article.id}`)} sx={{ cursor: 'pointer' }}>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={article.imageUrl || '/default-article-image.jpg'}
                                        alt={article.title}
                                        className="media"
                                        sx={{
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '16px',
                                            borderTopRightRadius: '16px'
                                        }}
                                    />
                                    <CardContent sx={{ position: 'relative' }}>
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
                                            {article.category || 'Без категории'}
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
                                            sx={{ mb: 2, fontSize: '0.95rem' }}
                                        >
                                            {article.excerpt || article.content.substring(0, 150) + '...'}
                                        </Typography>
                                    </CardContent>
                                </Box>

                                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ p: 2, pt: 0 }}>
                                    <Typography
                                        variant="caption"
                                        color="text.disabled"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <ArticleIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFavoriteClick(article.id);
                                            }}
                                            color={favorites.includes(article.id) ? "error" : "default"}
                                        >
                                            <Favorite />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBookmarkClick(article.id);
                                            }}
                                            color={bookmarks.includes(article.id) ? "primary" : "default"}
                                        >
                                            <Bookmark />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShareClick(article.id);
                                            }}
                                        >
                                            <Share />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </AnimatedCard>
                        </Grid>
                    ))}
                </Grid>

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: theme.text.primary,
                                    '&.Mui-selected': {
                                        backgroundColor: theme.primary.main,
                                        color: theme.primary.contrastText
                                    }
                                }
                            }}
                        />
                    </Box>
                )}
            </Container>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ArticlesList;