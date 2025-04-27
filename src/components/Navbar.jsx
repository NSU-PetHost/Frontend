import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styled from 'styled-components';
import {IconButton, Box, Divider} from '@mui/material';

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.background.paper};
    color: ${({ theme }) => theme.color};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
`;

const Logo = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary.dark};
`;

const NavItems = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

const NavbarLink = styled(Link)`
    color: ${({ theme }) => theme.text.secondary};
    text-decoration: none;
    font-weight: 500;
    font-family: ${({font}) => font};
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${({ theme }) => (theme.background.hover)};
        color: ${({ theme }) => (theme.background.contrastText)};
    }
`;

const Navbar = () => {
    const { toggleTheme, isDarkTheme, theme } = useThemeContext();

    return (
        <NavbarContainer>
            <Logo>PetHost</Logo>
            <NavItems>
                <NavbarLink to="/">ГЛАВНАЯ</NavbarLink>
                <NavbarLink to="/animals">ВАШИ ПИТОМЦЫ</NavbarLink>
                <NavbarLink to="/articles">ИНТЕРЕСНЫЕ СТАТЬИ</NavbarLink>
                <NavbarLink to="/submit-post">ДОБАВИТЬ ПИТОМЦА</NavbarLink>
                <NavbarLink to="/settings">НАСТРОЙКИ</NavbarLink>
            </NavItems>
            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                <Box sx={{ mt: 2, mb: 2 }} alignContent="center" display="flex" gap={1} >
                    <IconButton
                        aria-label="theme"
                        sx={{
                            color: theme.primary.dark,
                            bgcolor: theme.background.paper,
                            '&:hover': {
                                bgcolor: theme.text.secondary,
                                color: theme.themeToggle
                            }
                        }}
                        onClick={toggleTheme}
                    >
                        { isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton
                        sx={{
                            color: theme.primary.dark,
                            bgcolor: theme.background.paper,
                            '&:hover': {
                                bgcolor: theme.background.hover,
                                color: theme.background.contrastText
                            }
                        }}
                    >
                        <NotificationsIcon/>
                    </IconButton>
                </Box>
                <IconButton
                    aria-label="profile"
                    sx={{
                        color: theme.primary.dark,
                        bgcolor: theme.background.paper,
                        '&:hover': {
                            bgcolor: theme.background.hover,
                            color: theme.background.contrastText
                        },
                        fontSize: '2.1rem'
                    }}
                >
                    <AccountCircleIcon fontSize="inherit" />
                </IconButton>
            </Box>
        </NavbarContainer>
    );
};

export default Navbar;