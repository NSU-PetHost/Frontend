import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Grid,
    Chip,
    Skeleton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {correctYearWord} from "../utils/utils";

const AnimalsList = ({ animals, onEdit, isLoading = false }) => {
    const { theme } = useThemeContext();
    return (
        <Box ml={8} sx={{
            minHeight: '100vh',
            py: 8
        }}>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${theme.primary.main} 0%, ${theme.secondary.main} 80%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 4,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
            >
                Ваши питомцы
            </Typography>

            {isLoading ? (
                <Grid container spacing={3}>
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item}>
                            <Skeleton variant="rectangular" height={200} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" width="60%" />
                        </Grid>
                    ))}
                </Grid>
            ) : animals.length === 0 ? (
                <Box sx={{
                    textAlign: 'center',
                    p: 4,
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 2
                }}>
                    <Typography variant="h6" color="text.secondary">
                        У вас пока нет питомцев
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {animals.map((animal) => (
                        <Grid item xs={12} sm={6} md={4} key={animal.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6
                                }
                            }}>
                                {animal.image ? (
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={animal.image}
                                        alt={animal.name}
                                    />
                                ) : (
                                    <Box sx={{
                                        height: 160,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: 'action.hover'
                                    }}>
                                        <PetsIcon sx={{ fontSize: 60, opacity: 0.3 }} />
                                    </Box>
                                )}

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 1
                                    }}>
                                        <Typography variant="h5" component="h3">
                                            {animal.name}
                                        </Typography>
                                        <Chip
                                            label={animal.species}
                                            size="small"
                                            color="secondary"
                                            sx={{ ml: 1 }}
                                        />
                                    </Box>

                                    {animal.breed && (
                                        <Typography variant="body2" color={theme.text.secondary} gutterBottom>
                                            Порода: {animal.breed}
                                        </Typography>
                                    )}

                                    {animal.age && (
                                        <Typography variant="body2" color={theme.text.secondary}>
                                            Возраст: {animal.age} {correctYearWord(animal.age)}
                                        </Typography>
                                    )}
                                </CardContent>

                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        startIcon={<EditIcon />}
                                        onClick={() => onEdit(animal)}
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: 50 }}
                                    >
                                        Редактировать
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default AnimalsList;