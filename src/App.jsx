import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProviderWrapper } from './contexts/ThemeContext.jsx';
import Auth from './components/Auth';
import AnimalForm from './components/AnimalForm';
import Articles from './components/Articles';
import SubmitPost from './components/SubmitPost';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import AnimalsList from "./components/AnimalsList";
import pet from './assets/pet.png';

const App = () => {
    return (
        <ThemeProviderWrapper>
            <AuthProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Auth />} />
                        <Route path="/animals" element={<AnimalsList
                            animals={[
                                {
                                    id: 1,
                                    name: "Телепузик",
                                    species: "Собака",
                                    breed: "Золотистый тушканчик",
                                    age: 3,
                                    image: pet
                                }
                            ]}
                            onEdit={(animal) => console.log('Edit:', animal)}
                        />} />
                        <Route path="/add-animal" element={<AnimalForm />} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/submit-post" element={<SubmitPost />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProviderWrapper>
    );
};

export default App;