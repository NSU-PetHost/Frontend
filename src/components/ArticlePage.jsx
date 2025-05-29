import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
    Chip,
    Avatar,
    Stack,
    IconButton
} from '@mui/material';
import {
    ArrowBack,
    Favorite,
    Share,
    Bookmark,
    Article as ArticleIcon,
    CalendarToday,
    Person
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext.jsx';
import {articlesData} from "./articlesData";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const ArticlePage = () => {
    const { theme } = useThemeContext();
    const { id } = useParams();
    const article = articlesData.find(article => article.id === parseInt(id));

    if (!article) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4">Статья не найдена</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 8 }}>
            <Container maxWidth="md">
                <Button
                    startIcon={<ArrowBack />}
                    component={Link}
                    to="/articles/all"
                    sx={{ mb: 4 }}
                >
                    Назад к статьям
                </Button>

                <Box sx={{ mb: 4 }}>
                    <Chip
                        label={article.category}
                        color="secondary"
                        size="medium"
                        sx={{ mb: 2, fontWeight: 'bold' }}
                    />
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            color: theme.primary.dark,
                            fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                    >
                        {article.title}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                                <Person fontSize="small" />
                            </Avatar>
                            <Typography variant="body2">{article.author}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">{article.date}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ArticleIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">{article.readTime} чтения</Typography>
                        </Box>
                    </Stack>
                </Box>

                <Box
                    component="img"
                    src={article.image}
                    alt={article.title}
                    sx={{
                        width: '100%',
                        borderRadius: '16px',
                        height: { xs: '300px', sm: '400px', md: '500px' },
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
                    <Box sx={{
                        p: 4,
                        zIndex: 1
                    }}>
                </Box>

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
                    ...
                </ReactMarkdown>

                <Divider sx={{ my: 4 }} />

                <Box mb={7} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        startIcon={<ArrowBack />}
                        component={Link}
                        to="/articles/all"
                        size="large"
                    >
                        Все статьи
                    </Button>
                    <Box >
                        <IconButton sx={{ color: theme.primary.main }}>
                            <Favorite />
                        </IconButton>
                        <IconButton sx={{ color: theme.primary.main }}>
                            <Bookmark />
                        </IconButton>
                        <IconButton sx={{ color: theme.primary.main }}>
                            <Share />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ArticlePage;