import { createContext, useState } from 'react';
import makeRequest from "../api/makeRequest";

export const AnimalContext = createContext(undefined);

export const AnimalProvider = ({ children }) => {
    const [animals, setAnimals] = useState([]);
    const [animalTypes, setAnimalTypes] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = () => setError(null);

    const createAnimal = async (formData) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'POST',
                '/api/v1/animals/create',
                formData,
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
                'content'
            );
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateAnimal = async (animalId, formData) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'PUT',
                `/api/v1/animals/updateAnimal?animalId=${animalId}`,
                formData,
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
                'content'
            );
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteAnimal = async (animalId) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'DELETE',
                `/api/v1/animals/deleteAnimal?animalId=${animalId}`,
                null,
                {
                    'Authorization': `Bearer ${accessToken}`
                },
                'content'
            );
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPets = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await makeRequest('GET', '/api/v1/animals/getPets', null, {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }, 'content');
            setAnimals(response || []);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getTypes = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await makeRequest('GET', '/api/v1/animals/getTypes', null, {
                'Authorization': `Bearer ${accessToken}`}, 'content');
            setAnimalTypes(response.types || []);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createStatistics = async (params) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const searchParams = new URLSearchParams(params).toString();
            return await makeRequest(
                'POST',
                `/api/v1/animals/createStatistics?${searchParams}`,
                null,
                {
                    'Authorization': `Bearer ${accessToken}`
                },
                'content'
            );
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getStatistics = async (animalID, date) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await makeRequest(
                'GET',
                `/api/v1/animals/getStatistics?animalID=${animalID}&date=${date}`,
                null,
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                'content'
            );
            setStatistics(response || []);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimalContext.Provider value={{
            animals,
            animalTypes,
            statistics,
            loading,
            error,
            clearError,
            createAnimal,
            updateAnimal,
            deleteAnimal,
            getPets,
            getTypes,
            createStatistics,
            getStatistics
        }}>
            {children}
        </AnimalContext.Provider>
    );
};
