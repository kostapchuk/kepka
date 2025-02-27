import AppRouter from "./routes/AppRouter";
import './App.css';
import {persistor, store} from './redux/store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import {createTheme, ThemeProvider} from "@mui/material";

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif'
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppRouter/>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
