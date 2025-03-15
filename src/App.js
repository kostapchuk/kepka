import AppRouter from "./routes/AppRouter";
import './App.css';
import React from 'react';
import {persistor, store} from './redux/store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import {createTheme, ThemeProvider} from "@mui/material";
import {Analytics} from "@vercel/analytics/react";

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
            fontWeightRegular: 500,
            fontWeightMedium: 500,
            fontWeightBold: 600
        },
        colors: {
            control: {
                primary: '#7A51EC',
                pressed: '#6342BF'
            },
            base: {
                white: '#FFFFFF',
                black: '#000000',
                blackPressed: '#202020'
            },
            gray: {
                light: '',
                dark: '',
                lightPressed: ''
            },
            stroke: {
                default: '#D1D1D1'
            }
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Analytics/>
                    <AppRouter/>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
