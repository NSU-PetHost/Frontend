import {createContext, useState} from 'react';
import makeRequest from "../api/makeRequest";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickname: '',
        firstName: '',
        surname: '',
        patronymic: '',
    });
    const [isLogin, setIsLogin] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = () => setError(null);

    const register = async (userData) => {
        setLoading(true);
        try {
            return await makeRequest('POST', '/api/v1/auth/registration', userData); // { success: true, message: 'Registration successful' }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const confirmEmail = async (email) => {
        setLoading(true);
        try {
            return await makeRequest('POST', '/api/v1/auth/confirmEmail', {email});
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const confirmCode = async (email, code) => {
        setLoading(true);
        try {
            return await makeRequest('POST', '/api/v1/auth/confirmCode', {email, verifyCode: code});
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const setLoginStatus = (isLogin) => {
        setIsLogin(isLogin);
        localStorage.setItem('isLogin', isLogin ? 'login' : '');
    };

    const getLoginStatus = () => {
        return isLogin || localStorage.getItem('isLogin');
    };

    const setUserData = (email, nickname, firstName, surname, patronymic) => {
        setUserInfo({email: email, nickname: nickname, firstName: firstName, surname: surname, patronymic: patronymic});
        localStorage.setItem('email', email);
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('surname', surname);
        localStorage.setItem('patronymic', patronymic);
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await makeRequest('POST', '/api/v1/auth/login', credentials);
            const { accessToken, refreshToken } = response;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) throw new Error('No refresh token available');

            const response = await makeRequest('POST', '/api/v1/auth/refresh', { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            return accessToken;
        } catch (err) {
            logout();
            throw err;
        }
    };

    const resetPassword = async (email) => {
        setLoading(true);
        try {
            return await makeRequest('POST', `/api/v1/auth/resetPassword?email=${email}`);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest('POST', '/api/v1/auth/changePassword',
                {currentPassword, newPassword},
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            );
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getUserInfo = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('accessToken');
            return await makeRequest('GET', '/api/v1/info/', null,
                {
                    'Authorization': `Bearer ${accessToken}`
                }
            );
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setLoginStatus(false);
        setUserData('', '', '', '', '');
        localStorage.removeItem('email');
        localStorage.removeItem('nickname');
        localStorage.removeItem('firstName');
        localStorage.removeItem('surname');
        localStorage.removeItem('patronymic');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            clearError,
            register,
            confirmEmail,
            confirmCode,
            login,
            logout,
            refreshToken,
            resetPassword,
            changePassword,
            getUserInfo,
            setUserData,
            userInfo,
            setLoginStatus,
            getLoginStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
};