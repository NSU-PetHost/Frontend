import {
    Box,
    Button,
    Typography,
    Container,
    TextField,
    Alert,
    Paper, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from "../contexts/ThemeContext.jsx";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {animalTypes, animalSpecies} from "./animals";

const AnimalForm = () => {
    const { theme } = useThemeContext();
    const [animal, setAnimal] = useState({
        name: '',
        age: '',
        type: '',
        species: '',
        birthDate: null
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (name, value) => {
        setAnimal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setAnimal(prev => ({
            ...prev,
            birthDate: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Здесь будет логика отправки данных
            const formattedData = {
                ...animal,
                birthDate: animal.birthDate ? format(animal.birthDate, 'yyyy-MM-dd') : null
            };
            console.log('Данные для отправки:', formattedData);

            setSuccess('Питомец успешно добавлен!');
            setAnimal({ name: '', age: '', type: '', species: '', birthDate: null });

            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Ошибка при добавлении:', err);
            setError(err.message || 'Ошибка при добавлении питомца');
        }
    };

    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper elevation={3} sx={{ p: 4, overflow: 'hidden', borderRadius: 4, bgcolor: theme.background.paper }}>
                    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                        <Typography
                            variant="h2"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 800,
                                background: `linear-gradient(45deg, ${theme.primary.main} 0%, ${theme.secondary.main} 90%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 3,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                            }}
                        >
                            Добавить питомца
                        </Typography>

                        {error && (
                            <Alert severity="error" onClose={clearMessages} sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" onClose={clearMessages} sx={{ mb: 2 }}>
                                {success}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            autoComplete="off"
                            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Имя питомца"
                                name="name"
                                value={animal.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                                placeholder="Введите имя"
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Возраст (лет)"
                                name="age"
                                type="number"
                                value={animal.age}
                                onChange={(e) => handleChange('age', e.target.value)}
                                required
                                placeholder="Введите возраст"
                                inputProps={{ min: 0, max: 50 }}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Тип животного</InputLabel>
                                <Select
                                    value={animal.type}
                                    label="Тип животного"
                                    onChange={(e) => handleChange('type', e.target.value)}
                                    variant={"outlined"}>
                                    {animalTypes.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {animal.type &&
                                <FormControl fullWidth>
                                    <InputLabel>Вид животного</InputLabel>
                                    <Select
                                        value={animal.species}
                                        label="Вид животного"
                                        onChange={(e) => handleChange('species', e.target.value)}
                                        variant={"outlined"}>
                                        {animalSpecies[animal.type].map((s) => (
                                            <MenuItem key={s} value={s}>{s}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }

                            <DatePicker
                                label="Дата рождения"
                                value={animal.birthDate}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        required
                                        sx={{ mt: 1 }}
                                    />
                                )}
                                inputFormat="dd.MM.yyyy"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={!animal.name || !animal.age || !animal.species || !animal.birthDate}
                                sx={{
                                    mt: 2,
                                    bgcolor: theme.primary.main,
                                    '&:hover': {
                                        bgcolor: theme.primary.dark
                                    },
                                    py: 1.5,
                                    fontSize: '1.1rem'
                                }}
                            >
                                Добавить питомца
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </LocalizationProvider>
    );
};

export default AnimalForm;