import { createContext, useState } from 'react';
import makeRequest from "../api/makeRequest";

export const ArticleContext = createContext(undefined);

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    const clearError = () => setError(null);

    const createArticle = async (formData) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest(
                'POST',
                '/api/v1/articles/create',
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
            setError(err.message);
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
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const searchArticles = async (title, page = 0) => {
        setLoading(true);
        try {
            const response = await makeRequest(
                'GET',
                `/api/v1/articles/search?title=${title}&page=${page}`,
                null,
                { 'Content-Type': 'application/json' },
                'content'
            );
            setArticles(response.content || []);
            setTotalPages(response.totalPages || 0);
            return response;
        } catch (err) {
            setError(err.message);
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
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getArticlesByAuthor = async (authorId, page = 0) => {
        setLoading(true);
        try {
            const response = await makeRequest(
                'GET',
                `/api/v1/articles/by-author?authorId=${authorId}&page=${page}`,
                null,
                { 'Content-Type': 'application/json' },
                'content'
            );
            setArticles(response.content || []);
            setTotalPages(response.totalPages || 0);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getAllArticles = async (date = null, page = 0) => {
        setLoading(true);
        try {
            const url = date
                ? `/api/v1/articles/all?date=${date}&page=${page}`
                : `/api/v1/articles/all?page=${page}`;

            const response = await makeRequest('GET', url, null, { 'Content-Type': 'application/json' }, 'content');
            setArticles(response.content || []);
            setTotalPages(response.totalPages || 0);
            return response;
        } catch (err) {
            setError(err.message);
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
            setError(err.message);
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
            changeArticleCheckedStatus
        }}>
            {children}
        </ArticleContext.Provider>
    );
};