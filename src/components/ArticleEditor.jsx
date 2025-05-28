import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    IconButton,
    Chip,
    Grid,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
    Tabs,
    Tab
} from '@mui/material';
import MarkdownEditor from "./MarkdownEditor";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { Save, Close, Image as ImageIcon, Visibility, Edit } from '@mui/icons-material';
import { useThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleProvider";

const ArticleEditor = () => {
    const {
        loading,
        clearError,
        createArticle,
    } = useContext(ArticleContext);

    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [tabValue, setTabValue] = useState('edit');
    const fileInputRef = useRef(null);
    const { theme } = useThemeContext();
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleInputChange = (field, value) => {
        setArticleData({ ...articleData, [field]: value });
    };

    const handleSaveContent = (markdownContent) => {
        setArticleData({ ...articleData, content: markdownContent });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Создаем превью изображения
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);

        setArticleData({
            ...articleData,
            image: file
        });
    };

    const removeImage = () => {
        setPreviewImage(null);
        setArticleData({
            ...articleData,
            image: null
        });
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
        clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!articleData.image) {
            showSnackbar('Пожалуйста, загрузите изображение', 'error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', articleData.title);
            formData.append('text', articleData.content);
            formData.append('image', articleData.image);

            const result = await createArticle(formData);
            showSnackbar('Статья успешно создана', 'success');
            navigate(`/articles/${result.id}`);
        } catch (error) {
            showSnackbar(error.message, 'error');
        }
    };

    return (
        <Box sx={{ py: 8 }}>
            <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        background: `linear-gradient(45deg, ${theme.primary.main} 0%, ${theme.secondary.main} 60%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3,
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                >
                    Создать статью
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Box flex={2}>
                            <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
                                <CardContent>
                                    <TextField
                                        label="Заголовок статьи"
                                        value={articleData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        fullWidth
                                        required
                                        sx={{ mb: 3 }}
                                    />

                                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                                        <Tab label="Редактировать" value="edit" icon={<Edit />} />
                                        <Tab label="Предпросмотр" value="preview" icon={<Visibility />} />
                                    </Tabs>

                                    {tabValue === 'edit' ? (
                                        <MarkdownEditor
                                            initialContent={articleData.content}
                                            onSave={handleSaveContent}
                                            isLoading={loading}
                                        />
                                    ) : (
                                        <Card sx={{ p: 2, border: `1px solid ${theme.divider}`, borderRadius: 1 }}>
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeHighlight]}
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    img: ({ node, ...props }) => (
                                                        <img style={{ maxWidth: '100%' }} {...props} />
                                                    ),
                                                    code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                            <div className="code-block">
                                                                <div className="language-tag">{match[1]}</div>
                                                                <code className={className} {...props}>
                                                                    {children}
                                                                </code>
                                                            </div>
                                                        ) : (
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                }}
                                            >
                                                {articleData.content}
                                            </ReactMarkdown>
                                        </Card>
                                    )}
                                </CardContent>
                            </Card>
                        </Box>

                        <Box flex={1}>
                            <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
                                <CardContent>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<ImageIcon />}
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        onClick={triggerFileInput}
                                        disabled={loading}
                                    >
                                        Добавить изображение
                                    </Button>

                                    {previewImage && (
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                                Загруженное изображение:
                                            </Typography>
                                            <Paper elevation={2} sx={{ p: 1, position: 'relative' }}>
                                                <img
                                                    src={previewImage}
                                                    alt="Превью"
                                                    style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        right: 4,
                                                        bgcolor: 'background.paper'
                                                    }}
                                                    onClick={removeImage}
                                                >
                                                    <Close fontSize="small" />
                                                </IconButton>
                                            </Paper>
                                        </Box>
                                    )}

                                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            onClick={() => {
                                                setArticleData({
                                                    title: '',
                                                    content: '',
                                                    image: null
                                                });
                                                setPreviewImage(null);
                                            }}
                                            disabled={loading}
                                        >
                                            Очистить
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                                            disabled={!articleData.title || !articleData.content || !articleData.image || loading}
                                        >
                                            Опубликовать
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Информация
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Изображение:</Typography>
                                        <Chip
                                            label={previewImage ? "Загружено" : "Отсутствует"}
                                            size="small"
                                            color={previewImage ? "success" : "default"}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Статус:</Typography>
                                        <Chip
                                            label={articleData.title ? 'Черновик' : 'Не начато'}
                                            color={articleData.title ? 'primary' : 'default'}
                                            size="small"
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </form>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ArticleEditor;