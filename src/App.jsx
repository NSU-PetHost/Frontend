import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProviderWrapper } from './contexts/ThemeContext.jsx';
import Auth from './components/Auth';
import AnimalForm from './components/AnimalForm';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import AnimalsList from "./components/AnimalsList";
import ChangePassword from "./components/ChangePassword";
import ArticlePage from "./components/ArticlePage";
import { Box } from '@mui/material';
import PetProfile from "./components/PetProfile";
import 'simplebar-react/dist/simplebar.min.css';
import ScrollToTopSimpleBar from "./utils/ScrollToTopSimpleBar";
import ArticleList from "./components/ArticleList";
import Articles from "./components/Articles";
import ArticleEditor from "./components/ArticleEditor";

const App = () => {
    return (
        <ThemeProviderWrapper>
            <AuthProvider>
                <Router>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                    }}>
                        <Box position="fixed" width="100%" zIndex={1000}>
                            <Navbar />
                        </Box>

                        <ScrollToTopSimpleBar>
                            <Box
                                component="main"
                                sx={{
                                    flex: 1,
                                    px: 2
                                }}
                            >
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/auth" element={<Auth />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/change-password" element={<ChangePassword />} />
                                    <Route path="/articles/:id" element={<ArticlePage />} />
                                    <Route path="/pet/:id" element={<PetProfile />} />
                                    <Route path="/protect" element={<Articles />} />
                                    <Route path="/pets" element={<AnimalsList/>} />
                                    <Route path="/add-animal" element={<AnimalForm />} />
                                    <Route path="/articles" element={<Articles />} />
                                    <Route path="/articles/all" element={<ArticleList />} />
                                    <Route path="/submit-post" element={<ArticleEditor />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Routes>
                            </Box>
                        </ScrollToTopSimpleBar>
                    </Box>
                </Router>
            </AuthProvider>
        </ThemeProviderWrapper>
    );
};

export default App;