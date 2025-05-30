import {createContext, useContext, useState} from 'react';
import makeRequest from "../api/makeRequest";
import {AuthContext} from "./AuthContext";

export const AnimalContext = createContext(undefined);

export const AnimalProvider = ({ children }) => {
    const [animals, setAnimals] = useState([]);
    const [animalTypes, setAnimalTypes] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { refreshToken } = useContext(AuthContext);

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
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    return await makeRequest(
                        'POST',
                        '/api/v1/animals/create',
                        formData,
                        {
                            'Authorization': `Bearer ${newAccessToken}`,
                            'Content-Type': 'multipart/form-data'
                        },
                        'content'
                    );
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const findImage = async (id) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'POST',
                `/api/images/{id}`,
                null,
                {
                    'Authorization': `Bearer ${accessToken}`
                },
                'content'
            );
        } catch (err) {
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    return await makeRequest(
                        'POST',
                        `/api/images/{id}`,
                        null,
                        {
                            'Authorization': `Bearer ${newAccessToken}`
                        },
                        'content'
                    );
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
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
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    return await makeRequest(
                        'PUT',
                        `/api/v1/animals/updateAnimal?animalId=${animalId}`,
                        formData,
                        {
                            'Authorization': `Bearer ${newAccessToken}`,
                            'Content-Type': 'multipart/form-data'
                        },
                        'content'
                    );
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
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
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    return await makeRequest(
                        'DELETE',
                        `/api/v1/animals/deleteAnimal?animalId=${animalId}`,
                        null,
                        {
                            'Authorization': `Bearer ${newAccessToken}`
                        },
                        'content'
                    );
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
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
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    console.log(newAccessToken);
                    const newResponse = await makeRequest('GET', '/api/v1/animals/getPets', null, {
                        'Authorization': `Bearer ${newAccessToken}`
                    }, 'content');
                    setAnimals(newResponse || []);
                    console.log(animals)
                    return newResponse;
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
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
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    console.log(newAccessToken);
                    const newResponse = await makeRequest('GET', '/api/v1/animals/getTypes', null, {
                        'Authorization': `Bearer ${newAccessToken}`}, 'content');
                    setAnimalTypes(newResponse.types || []);
                    return newResponse;
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
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
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    const newSearchParams = new URLSearchParams(params).toString();
                    return await makeRequest(
                        'POST',
                        `/api/v1/animals/createStatistics?${newSearchParams}`,
                        null,
                        {
                            'Authorization': `Bearer ${newAccessToken}`
                        },
                        'content'
                    );
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
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
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    const newResponse = await makeRequest(
                        'GET',
                        `/api/v1/animals/getStatistics?animalID=${animalID}&date=${date}`,
                        null,
                        {
                            'Authorization': `Bearer ${newAccessToken}`,
                            'Content-Type': 'application/json'
                        },
                        'content'
                    );
                    setStatistics(newResponse || []);
                    return newResponse;
                } catch (refreshError) {
                    setError(refreshError.response?.data?.message || refreshError.message);
                    throw refreshError;
                }
            }
            setError(err.response?.data?.message || err.message);
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
            getStatistics,
            findImage
        }}>
            {children}
        </AnimalContext.Provider>
    );
};
