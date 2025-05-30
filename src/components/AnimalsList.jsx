import React, {useContext, useEffect, useState} from 'react';
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
import {useNavigate} from "react-router-dom";
import {AnimalContext} from "../contexts/AnimalProvider";

const AnimalsList = () => {
    const { animals, loading, getPets, findImage } = useContext(AnimalContext);
    const { theme } = useThemeContext();
    const navigate = useNavigate();


    useEffect(() => {
        getPets();
    }, []);
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

            {loading ? (
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
                    {animals.map((pet) => (
                        <Grid item xs={12} sm={6} md={4} key={pet.id}>
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
                                {findImage(pet.imageID) ? (
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={findImage(pet.imageID)}
                                        alt={pet.name}
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
                                            {pet.name}
                                        </Typography>
                                        <Chip
                                            label={pet.animalType || 'Неизвестный'}
                                            size="small"
                                            color="secondary"
                                            sx={{ ml: 1, mt: 0.7 }}
                                        />
                                    </Box>

                                    {pet.weight && (
                                        <Typography variant="body2" color={theme.text.secondary}>
                                            Вес: {pet.weight}
                                        </Typography>
                                    )}
                                </CardContent>

                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        startIcon={<EditIcon />}
                                        onClick={() => navigate("/pet/1")}
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