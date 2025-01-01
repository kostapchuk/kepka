import AppRouter from "./routes/AppRouter";
import './App.css';
import {persistor, store} from './redux/store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';

function App() {

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
  );
}

export default App;
