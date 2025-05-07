import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext.jsx';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import styled from 'styled-components';
import {IconButton, Box, Divider, Menu, MenuItem, Typography, Avatar, Button} from '@mui/material';
import {AuthContext} from "../contexts/AuthContext";

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
    const navigate = useNavigate();
    const { toggleTheme, isDarkTheme, theme } = useThemeContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout, getLoginStatus, userInfo, getUserInfo } = useContext(AuthContext);

    const handleProfileMenuOpen = async (event) => {
        if (localStorage.getItem('nickname') && localStorage.getItem('email')) {
            const result = await getUserInfo();
            localStorage.setItem('nickname', result.firstName);
            localStorage.setItem('email', result.email);
        }
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuRegisterClose = () => {
        handleProfileMenuClose();
        navigate('/auth?page=register')
    }

    const handleProfileMenuLoginClose = () => {
        handleProfileMenuClose();
        navigate('/auth?page=login')
    }

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            handleProfileMenuClose();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

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
            <Box display="flex" sx={{ flexDirection: { xs: "column", md: "row" } }} gap={2} alignItems="center">
                <Box sx={{ flexDirection: { xs: "column", sm: "row" }, mt: 2, mb: 2 }} alignContent="center" display="flex" gap={1} >
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
                    onClick={handleProfileMenuOpen}
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                    PaperProps={{
                        elevation: 4,
                        sx: {
                            width: 280,
                            borderRadius: '12px',
                            padding: '8px 0',
                            mt: 1,
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            '& .MuiMenuItem-root': {
                                padding: '10px 16px',
                                borderRadius: '8px',
                                margin: '0 8px',
                                minHeight: '48px'
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {getLoginStatus() ? (
                        <div>
                            <MenuItem onClick={handleProfileMenuClose}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Avatar sx={{ bgcolor: theme.primary.main }}>
                                        {localStorage.getItem('nickname')?.charAt(0).toUpperCase() || userInfo?.nickname?.charAt(0).toUpperCase() || 'U'}
                                    </Avatar>
                                    <Box>
                                        <Typography fontWeight="bold">
                                            {localStorage.getItem('nickname') || userInfo?.nickname || 'Пользователь'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {localStorage.getItem('email') || userInfo?.email || ''}
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                            <Divider sx={{ my: 1 }} />
                            <MenuItem onClick={handleLogout}>
                                <ExitToAppIcon sx={{ mr: 2 }} /> Выйти
                            </MenuItem>
                        </div>
                    ) : (
                        <div>
                            <Box px={2} py={1}>
                                <Typography variant="subtitle1">Войдите в аккаунт</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Чтобы получить доступ ко всем функциям
                                </Typography>
                            </Box>
                            <Box px={2} py={1} display="flex" gap={1}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleProfileMenuLoginClose}
                                    sx={{
                                        bgcolor: theme.primary.main,
                                        '&:hover': { bgcolor: theme.primary.dark }
                                    }}
                                >
                                    Войти
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleProfileMenuRegisterClose}
                                >
                                    Регистрация
                                </Button>
                            </Box>
                        </div>
                    )}
                </Menu>
            </Box>
        </NavbarContainer>
    );
};

export default Navbar;