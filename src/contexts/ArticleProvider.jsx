import {createContext, useContext, useState} from 'react';
import makeRequest from "../api/makeRequest";
import {AuthContext} from "./AuthContext";

export const ArticleContext = createContext(undefined);

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const { refreshToken } = useContext(AuthContext);
    const clearError = () => setError(null);

    const createArticle = async (url, formData) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'POST',
                url,
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
                        '/api/v1/articles/create',
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

    const updateArticle = async (id, formData) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'POST',
                `/api/v1/articles/update?id=${id}`,
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
                        `/api/v1/articles/update?id=${id}`,
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

    const deleteArticle = async (id) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'DELETE',
                `/api/v1/articles/delete?id=${id}`,
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
                        `/api/v1/articles/delete?id=${id}`,
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

    const searchArticles = async (title, page = 0) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await makeRequest(
                'GET',
                `/api/v1/articles/search?title=${title}&page=${page}`,
                null,
                { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                'content'
            );
            setArticles(response.content || []);
            setTotalPages(response.totalPages || 0);
            return response;
        } catch (err) {
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    const newResponse = await makeRequest(
                        'GET',
                        `/api/v1/articles/search?title=${title}&page=${page}`,
                        null,
                        { 'Authorization': `Bearer ${newAccessToken}`, 'Content-Type': 'application/json' },
                        'content'
                    );
                    setArticles(newResponse.content || []);
                    setTotalPages(newResponse.totalPages || 0);
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

    const getImage = async (id) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'GET',
                `/api/images/${id}`,
                null,
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'accept': 'image/jpeg'
                },
                'blob'
            );
        } catch (err) {
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource") {
                try {
                    const newAccessToken = await refreshToken();
                    return await makeRequest(
                        'GET',
                        `/api/images/${id}`,
                        null,
                        {
                            'Authorization': `Bearer ${newAccessToken}`,
                            'accept': 'image/jpeg'
                        },
                        'blob'
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

    const getArticlesForApproval = async (page = 0) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await makeRequest(
                'GET',
                `/api/v1/articles/getArticlesNeededApproved?page=${page}`,
                null,
                {
                    'Authorization': `Bearer ${accessToken}`
                },
                'content'
            );
            setArticles(response.content || []);
            setTotalPages(response.totalPages || 0);
            return response;
        } catch (err) {
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    const newResponse = await makeRequest(
                        'GET',
                        `/api/v1/articles/getArticlesNeededApproved?page=${page}`,
                        null,
                        {
                            'Authorization': `Bearer ${newAccessToken}`
                        },
                        'content'
                    );
                    setArticles(newResponse.content || []);
                    setTotalPages(newResponse.totalPages || 0);
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

    const getArticlesByAuthor = async (authorId, page = 0) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await makeRequest(
                'GET',
                `/api/v1/articles/by-author?authorId=${authorId}&page=${page}`,
                null,
                { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                'content'
            );
            setArticles(response.content || []);
            setTotalPages(response.totalPages || 0);
            return response;
        } catch (err) {
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    const response = await makeRequest(
                        'GET',
                        `/api/v1/articles/by-author?authorId=${authorId}&page=${page}`,
                        null,
                        { 'Authorization': `Bearer ${newAccessToken}`, 'Content-Type': 'application/json' },
                        'content'
                    );
                    setArticles(response.content || []);
                    setTotalPages(response.totalPages || 0);
                    return response;
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

    const getAllArticles = async (date = null, page = 0) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
                'Content-Type': 'application/json'
            };

            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const url = date
                ? `/api/v1/articles/all?date=${date}&page=${page}`
                : `/api/v1/articles/all?page=${page}`;

            const response = await makeRequest('GET', url, null, headers, 'content');

            setArticles(response.content || []);
            setTotalPages(response.totalPages || 0);
            return response;
        } catch (err) {
            if (err.message.toString() === "Unauthorized: Full authentication is required to access this resource ") {
                try {
                    const newAccessToken = await refreshToken();
                    const headers = {
                        'Content-Type': 'application/json'
                    };

                    if (newAccessToken) {
                        headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }

                    const url = date
                        ? `/api/v1/articles/all?date=${date}&page=${page}`
                        : `/api/v1/articles/all?page=${page}`;

                    const response = await makeRequest('GET', url, null, headers, 'content');

                    setArticles(response.content || []);
                    setTotalPages(response.totalPages || 0);
                    return response;
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

    const changeArticleCheckedStatus = async (articleID, approved, refusalReasonID = null) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            const url = refusalReasonID
                ? `/api/v1/articles/changeArticlesChecked?articleID=${articleID}&approved=${approved}&refusalReasonID=${refusalReasonID}`
                : `/api/v1/articles/changeArticlesChecked?articleID=${articleID}&approved=${approved}`;

            return await makeRequest(
                'PUT',
                url,
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
                    console.log(newAccessToken);
                    const newResponse = await makeRequest('GET', '/api/v1/animals/getPets', null, {
                        'Authorization': `Bearer ${newAccessToken}`
                    }, 'content');
                    setArticles(newResponse || []);
                    console.log(articles)
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
        <ArticleContext.Provider value={{
            articles,
            loading,
            error,
            totalPages,
            clearError,
            createArticle,
            updateArticle,
            deleteArticle,
            searchArticles,
            getArticlesForApproval,
            getArticlesByAuthor,
            getAllArticles,
            changeArticleCheckedStatus,
            getImage
        }}>
            {children}
        </ArticleContext.Provider>
    );
};