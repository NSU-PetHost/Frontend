import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    Divider,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Chip,
    Avatar,
    Badge,
    Slider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress
} from '@mui/material';
import { Edit, Add, Pets, Save, Close, CameraAlt, Delete } from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { useThemeContext } from "../contexts/ThemeContext";
import { AnimalContext } from '../contexts/AnimalProvider';

const PetProfile = ({ petId }) => {
    const { theme } = useThemeContext();
    const {
        animals,
        loading,
        animalTypes,
        getTypes,
        updateAnimal,
        getPets,
        getStatistics,
        createStatistics,
        findImage
    } = useContext(AnimalContext);

    const [petData, setPetData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [healthNotes, setHealthNotes] = useState([]);
    const [sliderValues, setSliderValues] = useState({
        thirst: 50,
        activity: 30,
        digestion: 80
    });
    const [noteText, setNoteText] = useState('');
    const [events, setEvents] = useState([]);
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: new Date() });
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        getTypes();
    }, []);

    useEffect(() => {
        const loadPetData = async () => {
            try {
                await getPets();
                if (petId) {
                    const pet = animals.find(a => a.id === petId);
                    if (pet) {
                        setPetData(pet);
                        setTempData({
                            name: pet.name,
                            animalType: pet.animalType,
                            dateOfBirth: pet.dateOfBirth,
                            weight: pet.weight
                        });
                        const imgRequest = await findImage(pet.imageID);
                        setImage(imgRequest);
                        const stats = await getStatistics(petId, format(new Date(), 'yyyy-MM-dd'));
                        setHealthNotes(stats);
                    }
                }
            } catch (err) {
                console.error('Error loading pet data:', err);
            }
        };

        loadPetData();
    }, [petId, animals]);

    const handleInputChange = (field, value) => {
        setTempData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);

            try {
                const updatedPet = await updateAnimal(petId, formData);
                setPetData(updatedPet);
            } catch (err) {
                console.error('Error updating photo:', err);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSaveProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('name', tempData.name);
            formData.append('age', tempData.age);
            formData.append('type', tempData.type);
            formData.append('weight', tempData.weight);

            const updatedPet = await updateAnimal(petId, formData);
            setPetData(updatedPet);
            setEditMode(false);
        } catch (err) {
            console.error('Error updating pet:', err);
        }
    };

    const handleAddNote = async () => {
        if (!noteText.trim()) return;

        try {
            const newNote = {
                type: 'note',
                value: noteText,
                date: new Date().toISOString()
            };

            await createStatistics({
                animalID: petId,
                type: 'note',
                value: noteText
            });

            setHealthNotes(prev => [...prev, { ...newNote, id: Date.now() }]);
            setNoteText('');
        } catch (err) {
            console.error('Error adding note:', err);
        }
    };

    const handleSaveSliders = async () => {
        try {
            const noteValue = `Жажда: ${sliderValues.thirst}, Активность: ${sliderValues.activity}, ЖКТ: ${sliderValues.digestion}`;

            await createStatistics({
                animalID: petId,
                type: 'health',
                value: noteValue
            });

            setHealthNotes(prev => [...prev, {
                id: Date.now(),
                type: 'health',
                value: noteValue,
                date: new Date().toISOString()
            }]);
        } catch (err) {
            console.error('Error saving health stats:', err);
        }
    };

    if (loading && petData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (petData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Питомец не найден</Typography>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Box sx={{ display: 'flex', mb: 9, mt: 7, gap: 2 }}>
                {/* Left column - Profile and health indicators */}
                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3, width: "100%", position: 'relative', overflow: 'visible', mt: 8 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={petData.photo}
                                sx={{
                                    bgcolor: 'primary.main',
                                    width: 150,
                                    height: 150,
                                    position: 'absolute',
                                    top: -60,
                                    left: '16%',
                                    transform: 'translateX(-50%)',
                                    border: '4px solid white',
                                    boxShadow: 3,
                                    cursor: 'pointer'
                                }}
                                onClick={editMode && triggerFileInput}
                            >
                                { !editMode ? (
                                    petData.photo ? null :
                                        petData.icon ? (
                                            React.createElement(petData.icon, { sx: { fontSize: 60 } })
                                        ) : (
                                            <Pets sx={{ fontSize: 60 }} />
                                        )
                                ) : ( <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handlePhotoUpload}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                        <CameraAlt sx={{ fontSize: 60 }} />
                                    </>
                                )}
                            </Avatar>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            top: 16,
                            right: 16
                        }}>
                            <IconButton
                                aria-label="edit"
                                onClick={() => setEditMode(!editMode)}
                                color={editMode ? "primary" : "default"}
                            >
                                <Edit />
                            </IconButton>
                        </Box>

                        <CardContent sx={{ pt: 14, ml: 2 }}>
                            {editMode ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <TextField
                                            label="Имя питомца"
                                            value={tempData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            fullWidth
                                            autoFocus
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <TextField
                                            label="Возраст"
                                            type="number"
                                            value={tempData.age}
                                            onChange={(e) => handleInputChange('age', e.target.value)}
                                            sx={{ width: 120 }}
                                        />
                                        <Typography>года</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel>Вид животного</InputLabel>
                                            <Select
                                                value={tempData.type}
                                                label="Тип животного"
                                                onChange={(e) => handleInputChange('type', e.target.value)}
                                                variant={"outlined"}>
                                                {animalTypes.map((type) => (
                                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <TextField
                                            label="Вес"
                                            type="number"
                                            value={tempData.weight}
                                            onChange={(e) => handleInputChange('weight', e.target.value)}
                                            sx={{ width: 120 }}
                                        />
                                        <Typography>кг</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setEditMode(false);
                                                setTempData({
                                                    ...petData,
                                                    icon: petData.icon
                                                });
                                            }}
                                        >
                                            Отмена
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setPetData({
                                                    ...tempData,
                                                    photo: petData.photo
                                                });
                                                setEditMode(false);
                                            }}
                                        >
                                            Сохранить
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                            {petData.name}
                                        </Typography>

                                        <Chip
                                            pt={2}
                                            label={`${petData.age} года`}
                                            color="secondary"
                                            size="medium"
                                            sx={{ fontSize: '1rem' }}
                                        />
                                    </Box>

                                    <Typography variant="h6">
                                        <strong>Тип:</strong> {petData.type}
                                    </Typography>

                                    <Typography variant="h6">
                                        <strong>Вид:</strong> {petData.species}
                                    </Typography>

                                    <Typography variant="h6">
                                        <strong>Вес:</strong> {petData.weight} кг
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 3, boxShadow: 3, width: "100%", overflow: 'visible' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pl: 4, pr: 4, pt: 2, pb: 2 }}>
                                <Typography gutterBottom variant="h6"><strong>Жажда</strong></Typography>
                                <Slider
                                    value={sliderValues.thirst}
                                    onChange={handleSaveSliders('thirst')}
                                    valueLabelDisplay="auto"
                                    marks={[
                                        { value: 0, label: 'Низкая' },
                                        { value: 50, label: 'Норма' },
                                        { value: 100, label: 'Высокая' }
                                    ]}
                                    sx={{ color: 'primary.main' }}
                                />

                                <Typography gutterBottom variant="h6"><strong>Активность</strong></Typography>
                                <Slider
                                    value={sliderValues.activity}
                                    onChange={handleSaveSliders('activity')}
                                    valueLabelDisplay="auto"
                                    marks={[
                                        { value: 0, label: 'Низкая' },
                                        { value: 50, label: 'Средняя' },
                                        { value: 100, label: 'Высокая' }
                                    ]}
                                    sx={{ color: 'primary.main' }}
                                />

                                <Typography gutterBottom variant="h6"><strong>Работа ЖКТ</strong></Typography>
                                <Slider
                                    value={sliderValues.digestion}
                                    onChange={handleSliderChange('digestion')}
                                    valueLabelDisplay="auto"
                                    marks={[
                                        { value: 0, label: 'Плохо' },
                                        { value: 50, label: 'Нормально' },
                                        { value: 100, label: 'Отлично' }
                                    ]}
                                    sx={{ color: 'primary.main' }}
                                />

                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    onClick={handleSaveSliders}
                                    sx={{ mt: 2 }}
                                >
                                    Сохранить показатели
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Центральная колонка - Календарь и заметки */}
                <Box sx={{ flex: 2 }}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
                        <CardContent sx={{ p: 0, m: 2 }}>
                            <DateCalendar
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                                sx={{
                                    width: '100%',
                                    height: "100%",
                                    '& .MuiPickersDay-root': {
                                        borderRadius: 3,
                                        margin: 0.5
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: theme.primary.main,
                                        color: 'white'
                                    }
                                }}
                            />
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                    {format(date, 'd MMMM yyyy', { locale: ru })}
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<Add fontSize="small" />}
                                    fullWidth
                                    onClick={() => setOpenEventDialog(true)}
                                >
                                    Добавить событие
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
                        <CardContent sx={{ p: 0, m: 2 }}>
                            <TextField
                                label="Введите заметку..."
                                multiline
                                rows={4}
                                fullWidth
                                variant="standard"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                sx={{ p: 1 }}
                            />
                            <Box sx={{ pt: 2 }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<Add fontSize="small" />}
                                    fullWidth
                                    onClick={handleAddNote}
                                    disabled={!noteText.trim()}
                                >
                                    Добавить заметку
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right column - Events and health notes */}
                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Ближайшие события</Typography>
                                <IconButton size="small" onClick={() => setOpenEventDialog(true)}>
                                    <Add fontSize="small" />
                                </IconButton>
                            </Box>
                            <Box sx={{ borderRadius: 3, pr: 2, pl: 2, pt: 1, pb: 1, bgcolor: theme.secondary.light }}>
                                <List dense sx={{ py: 0 }}>
                                    {events.map((event) => (
                                        <ListItem
                                            key={event.id}
                                            sx={{ px: 0, py: 1, borderRadius: 2, mb: 1 }}
                                            secondaryAction={
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <IconButton edge="end" onClick={() => handleToggleEvent(event.id)}>
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                    <IconButton edge="end" onClick={() => handleDeleteEvent(event.id)}>
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            }
                                        >
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Badge
                                                            color={event.completed ? "success" : "warning"}
                                                            variant="dot"
                                                            sx={{ mr: 1.5 }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 500,
                                                                textDecoration: event.completed ? 'line-through' : 'none'
                                                            }}
                                                        >
                                                            {event.title}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondary={format(new Date(event.date), 'd MMMM в HH:mm', { locale: ru })}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Последние записи</Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Add fontSize="small" />}
                                    onClick={handleAddNote}
                                >
                                    Добавить
                                </Button>
                            </Box>
                            <Box sx={{ borderRadius: 3, pr: 2, pl: 2, pt: 1, pb: 1, bgcolor: theme.secondary.light, maxHeight: 300, overflow: 'auto' }}>
                                <List dense sx={{ py: 0 }}>
                                    {healthNotes.map((note) => (
                                        <EditableNoteItem
                                            key={note.id}
                                            note={note}
                                            onEdit={handleEditNote}
                                            onDelete={handleDeleteNote}
                                        />
                                    ))}
                                </List>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Event dialog */}
            <Dialog open={openEventDialog} onClose={() => setOpenEventDialog(false)}>
                <DialogTitle>Добавить новое событие</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Название события"
                        fullWidth
                        variant="standard"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                    <Box sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                            <DateCalendar
                                value={newEvent.date}
                                onChange={(newDate) => setNewEvent({...newEvent, date: newDate})}
                            />
                        </LocalizationProvider>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEventDialog(false)}>Отмена</Button>
                    <Button
                        onClick={handleAddEvent}
                        disabled={!newEvent.title.trim()}
                        variant="contained"
                    >
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
};

// EditableNoteItem component remains the same
const EditableNoteItem = ({ note, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(note.value);

    const handleSave = () => {
        onEdit(note.id, editValue);
        setIsEditing(false);
    };

    return (
        <ListItem sx={{ px: 0, py: 1, '&:not(:last-child)': { borderBottom: '1px solid rgba(0,0,0,0.12)' } }}>
            {isEditing ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
                    <TextField
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        fullWidth
                        autoFocus
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button size="small" onClick={() => setIsEditing(false)}>Отмена</Button>
                        <Button size="small" variant="contained" onClick={handleSave}>Сохранить</Button>
                    </Box>
                </Box>
            ) : (
                <>
                    <ListItemText
                        primary={note.value}
                        secondary={format(new Date(note.date), 'd MMMM в HH:mm', { locale: ru })}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <Box>
                        <IconButton edge="end" size="small" onClick={() => setIsEditing(true)}>
                            <Edit fontSize="small" />
                        </IconButton>
                        <IconButton edge="end" size="small" onClick={() => onDelete(note.id)}>
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>
                </>
            )}
        </ListItem>
    );
};

export default PetProfile;