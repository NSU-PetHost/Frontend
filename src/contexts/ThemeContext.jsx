import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import {createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material";

const fonts = [
    { name: 'Golos Text', value: '"Golos Text", sans-serif' },
    { name: 'Roboto', value: '"Roboto", sans-serif' },
    { name: 'Open Sans', value: '"Open Sans", sans-serif' },
    { name: 'Montserrat', value: '"Montserrat", sans-serif' },
    { name: 'Nunito', value: '"Nunito", sans-serif' },
];

const themes = {
    light: {
        primary: {
            main: '#62af9d',
            light: '#94ecd7',
            dark: '#2d7766',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#0973b5',
            light: '#abceec',
            dark: '#246b97',
            contrastText: '#FFFFFF'
        },
        background: {
            default: '#eeeef0',
            paper: '#ffffff',
            hover: '#cbccce',
            contrastText: '#000000'
        },
        text: {
            primary: '#1b1a1a',
            secondary: '#333333',
            disabled: '#BDBDBD',
        },
        success: {
            main: '#689F38',
        },
        error: {
            main: '#E53935',
        },
        warning: {
            main: '#FB8C00',
        },
        divider: '#cbccce',
        custom: {
            accentBeige: '#F5EFE6',
            warmGray: '#D7CCC8'
        },
        themeToggle: '#c8d3fd'
    },
    dark: {
        primary: {
            main: '#62af9d',
            light: '#2d7766',
            dark: '#94ecd7',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#0973b5',
            light: '#156291',
            dark: '#97c2e6',
            contrastText: '#FFFFFF'
        },
        background: {
            default: '#1A1A1A',
            paper: '#252320',
            hover: '#4e4a46',
            contrastText: '#FFFFFF'
        },
        text: {
            primary: '#F5F5F5',
            secondary: '#E0E0E0',
            disabled: '#757575',
        },
        success: {
            main: '#7CB342',
        },
        error: {
            main: '#FF5252',
        },
        warning: {
            main: '#FFA000',
        },
        divider: '#504d4a',
        custom: {
            darkBeige: '#3E3B37',
            warmCharcoal: '#2B2926'
        },
        themeToggle: '#FFA000'
    },
};

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.background.default};
        color: ${props => props.theme.text.primary};
        font-family: ${props => props.theme.font};
        transition: all 0.3s ease;
    }
`;

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);
    const [font, setFont] = useState(fonts[0].value);

    useEffect(() => {
        const cacheTheme = localStorage.getItem('theme');
        setTheme(cacheTheme === 'light' ? themes.dark : themes.light);
        const cacheFont = localStorage.getItem('fontFamily');
        console.log('cacheTheme', cacheFont);
        setFont(cacheFont || '"Golos Text", sans-serif');
    }, []);

    const toggleTheme = () => {
        localStorage.setItem('theme', getThemeName());
        setTheme(prevTheme => (prevTheme === themes.light ? themes.dark : themes.light));
    };

    const isDarkTheme = theme === themes.dark;
    const getThemeName = () => isDarkTheme ? 'dark' : 'light';

    const muiTheme = useMemo(() => createTheme({
        typography: {
            fontFamily: font,
            allVariants: {
                fontFamily: font,
            },
        },
        palette: {
            mode: isDarkTheme ? 'dark' : 'light',
            primary: {
                main: theme.primary.main,
                light: theme.primary.light,
                dark: theme.primary.dark,
                contrastText: theme.primary.contrastText
            },
            secondary: {
                main: theme.secondary.main,
                light: theme.secondary.light,
                dark: theme.secondary.dark,
                contrastText: theme.secondary.contrastText
            },
            background: {
                default: theme.background.default,
                paper: theme.background.paper
            },
            text: {
                primary: theme.text.primary,
                secondary: theme.text.secondary,
                disabled: theme.text.disabled
            },
            divider: theme.divider
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontFamily: font,
                    }
                }
            }
        }
    }), [theme, font, isDarkTheme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
            isDarkTheme,
            getThemeName,
            font,
            setFont,
            fonts
        }}>
            <MuiThemeProvider theme={muiTheme}>
                <StyledThemeProvider theme={{ ...theme, font }}>
                    <GlobalStyle font={font} />
                    {children}
                </StyledThemeProvider>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
};