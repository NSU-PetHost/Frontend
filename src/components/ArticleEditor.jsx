import React, { useState, useRef } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    IconButton,
    Chip,
    Avatar,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
    Paper,
    List
} from '@mui/material';
import { Save, Close, Delete, Image, InsertDriveFile } from '@mui/icons-material';
import { useThemeContext } from "../contexts/ThemeContext";

const ArticleEditor = () => {
    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
        category: '',
        images: [],
        documents: []
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [previewDocuments, setPreviewDocuments] = useState([]);
    const fileInputRef = useRef(null);
    const docInputRef = useRef(null);
    const { theme } = useThemeContext();

    const categories = [
        'Новости',
        'Обучающие материалы',
        'Обзоры',
        'Исследования'
    ];

    const handleInputChange = (field, value) => {
        setArticleData({ ...articleData, [field]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            type: 'image'
        }));

        setPreviewImages([...previewImages, ...newImages]);
        setArticleData({
            ...articleData,
            images: [...articleData.images, ...files]
        });
    };

    const handleDocumentUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newDocs = files.map(file => ({
            file,
            name: file.name,
            type: file.type.includes('image') ? 'image' : 'document',
            size: (file.size / 1024).toFixed(1) + ' KB'
        }));

        setPreviewDocuments([...previewDocuments, ...newDocs]);
        setArticleData({
            ...articleData,
            documents: [...articleData.documents, ...files]
        });
    };

    const removeImage = (index) => {
        const newImages = [...previewImages];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);

        setPreviewImages(newImages);
        setArticleData({
            ...articleData,
            images: articleData.images.filter((_, i) => i !== index)
        });
    };

    const removeDocument = (index) => {
        const newDocs = [...previewDocuments];
        newDocs.splice(index, 1);

        setPreviewDocuments(newDocs);
        setArticleData({
            ...articleData,
            documents: articleData.documents.filter((_, i) => i !== index)
        });
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const triggerDocInput = () => {
        docInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь будет логика отправки данных на сервер
        console.log('Статья отправлена:', articleData);

        // Очистка превью после отправки
        previewImages.forEach(img => URL.revokeObjectURL(img.preview));
        setPreviewImages([]);
        setPreviewDocuments([]);
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
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3, width: '48vw' }}>
                                <CardContent>
                                    <TextField
                                        label="Заголовок статьи"
                                        value={articleData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        fullWidth
                                        required
                                        sx={{ mb: 3 }}
                                    />

                                    <TextField
                                        label="Текст статьи"
                                        value={articleData.content}
                                        onChange={(e) => handleInputChange('content', e.target.value)}
                                        multiline
                                        rows={12}
                                        fullWidth
                                        required
                                    />
                                </CardContent>
                            </Card>

                            {previewImages.length > 0 && (
                                <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Загруженные изображения
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {previewImages.map((img, index) => (
                                                <Grid item xs={6} sm={4} key={index}>
                                                    <Paper elevation={2} sx={{ p: 1, position: 'relative' }}>
                                                        <img
                                                            src={img.preview}
                                                            alt={img.name}
                                                            style={{
                                                                width: '100%',
                                                                height: '120px',
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
                                                            onClick={() => removeImage(index)}
                                                        >
                                                            <Close fontSize="small" />
                                                        </IconButton>
                                                        <Typography variant="caption" noWrap sx={{ display: 'block', mt: 1 }}>
                                                            {img.name}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}

                            {previewDocuments.length > 0 && (
                                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Загруженные документы
                                        </Typography>
                                        <List dense>
                                            {previewDocuments.map((doc, index) => (
                                                <Paper key={index} elevation={2} sx={{ p: 1, mb: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Avatar sx={{ bgcolor: theme.secondary.light, mr: 2 }}>
                                                            {doc.type === 'image' ? (
                                                                <Image color="primary" />
                                                            ) : (
                                                                <InsertDriveFile color="primary" />
                                                            )}
                                                        </Avatar>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="body2">{doc.name}</Typography>
                                                            <Typography variant="caption">{doc.size}</Typography>
                                                        </Box>
                                                        <IconButton onClick={() => removeDocument(index)}>
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Paper>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3, width: '48vw'  }}>
                                <CardContent>
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <InputLabel>Категория</InputLabel>
                                        <Select
                                            value={articleData.category}
                                            label="Категория"
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            required
                                        >
                                            {categories.map((cat) => (
                                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        multiple
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<Image />}
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        onClick={triggerFileInput}
                                    >
                                        Добавить изображения
                                    </Button>

                                    <input
                                        type="file"
                                        ref={docInputRef}
                                        onChange={handleDocumentUpload}
                                        accept=".pdf,.doc,.docx,.txt,.rtf"
                                        multiple
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<InsertDriveFile />}
                                        fullWidth
                                        sx={{ mb: 3 }}
                                        onClick={triggerDocInput}
                                    >
                                        Добавить документы
                                    </Button>

                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            onClick={() => {
                                                setArticleData({
                                                    title: '',
                                                    content: '',
                                                    category: '',
                                                    images: [],
                                                    documents: []
                                                });
                                                setPreviewImages([]);
                                                setPreviewDocuments([]);
                                            }}
                                        >
                                            Очистить
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            startIcon={<Save />}
                                            disabled={!articleData.title || !articleData.content || !articleData.category}
                                        >
                                            Опубликовать
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Информация о загрузках */}
                            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Информация
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Изображений:</Typography>
                                        <Chip label={previewImages.length} size="small" />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Документов:</Typography>
                                        <Chip label={previewDocuments.length} size="small" />
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
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default ArticleEditor;