import React, {useContext, useEffect, useState} from 'react';
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
    keyframes,
    Snackbar,
    Alert,
    IconButton, CircularProgress
} from '@mui/material';
import {
    Article as ArticleIcon,
    Favorite,
    Share,
    Bookmark,
    ArrowForward
} from '@mui/icons-material';
import { useThemeContext } from "../contexts/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import {ArticleContext} from "../contexts/ArticleProvider";

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

const Articles = () => {
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    const {
        articles,
        loading,
        error,
        getAllArticles,
        getImage,
        clearError
    } = useContext(ArticleContext);

    const [favorites, setFavorites] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [shareUrl, setShareUrl] = useState('');
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        const savedFavorites = localStorage.getItem('articleFavorites');
        const savedBookmarks = localStorage.getItem('articleBookmarks');

        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

        loadArticles();
    }, []);

    const MAX_CONCURRENT_IMAGE_LOADS = 3;

    useEffect(() => {
        const loadImages = async () => {
            const queue = [...articles.slice(0, 6)];
            const newLoadedImages = {};

            while (queue.length > 0) {
                const batch = queue.splice(0, MAX_CONCURRENT_IMAGE_LOADS);
                await Promise.all(batch.map(async (article) => {
                    try {
                        const imageUrl = await getImage(article.imageID);
                        newLoadedImages[article.imageID] = imageUrl;
                    } catch (error) {
                        newLoadedImages[article.imageID] = '/default-article.jpg';
                    }
                }));
                setLoadedImages(prev => ({ ...prev, ...newLoadedImages }));
            }
        };

        loadImages();
    }, [articles, getImage]);

    useEffect(() => {
        if (error) {
            showSnackbar(error, 'error');
            clearError();
        }
    }, [error]);

    const loadArticles = async () => {
        try {
            await getAllArticles();
        } catch (err) {
            console.error('Error loading articles:', err);
        }
    };

    useEffect(() => {
        localStorage.setItem('articleFavorites', JSON.stringify(favorites));
        localStorage.setItem('articleBookmarks', JSON.stringify(bookmarks));
    }, [favorites, bookmarks]);

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

    const handleShareClick = (articleId) => {
        const url = `${window.location.origin}/articles/${articleId}`;
        setShareUrl(url);

        if (navigator.share) {
            navigator.share({
                title: articles.find(a => a.id === articleId)?.title,
                text: articles.find(a => a.id === articleId)?.excerpt,
                imageUrl: shareUrl
            }).catch(() => {
                copyToClipboard(shareUrl);
            });
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showSnackbar('Ссылка скопирована в буфер обмена', 'success');
        });
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleViewAllArticles = () => {
        navigate('/articles/all');
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
                {loading && articles.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <CircularProgress />
                    </Box>
                )}


                <Grid container spacing={4} justifyContent="center">
                    {articles.slice(0, 6).map((article) => (
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
                                        image={loadedImages[article.imageID] || '/default-article.jpg'}
                                        alt={article.title}
                                        className="media"
                                        sx={{
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '16px',
                                            borderTopRightRadius: '16px'
                                        }}
                                    />
                                    <CardContent sx={{ position: 'relative' }}>
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
                                            {article.text?.substring(0, 100) + '...'}
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
                                        Опубликована {article.createdAt}
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFavoriteClick(article.id);
                                            }}
                                            color={favorites.includes(article.id) ? "error" : "default"}
                                        >
                                            <Favorite fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBookmarkClick(article.id);
                                            }}
                                            color={bookmarks.includes(article.id) ? "primary" : "default"}
                                        >
                                            <Bookmark fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShareClick(article.id);
                                            }}
                                        >
                                            <Share fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </AnimatedCard>
                        </Grid>
                    ))}
                </Grid>

                <Box textAlign="center" mt={8} mb={4}>
                    <GradientButton
                        endIcon={<ArrowForward sx={{ ml: 0.5}} />}
                        size="large"
                        onClick={handleViewAllArticles}
                    >
                        Все статьи
                    </GradientButton>
                </Box>
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

export default Articles;