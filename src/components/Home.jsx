import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h3" gutterBottom>
                Добро пожаловать в PetHost!
            </Typography>
        </Box>
    );
};

export default Home;