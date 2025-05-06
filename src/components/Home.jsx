import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h3" gutterBottom>
                Добро пожаловать в PetHost!
            </Typography>
            <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/auth')}
                sx={{ mt: 2 }}
            >
                Создать аккаунт
            </Button>
        </Box>
    );
};

export default Home;