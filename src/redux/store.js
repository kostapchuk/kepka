import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import {rootReducer} from './reducers/rootReducer';
import * as Sentry from "@sentry/react";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

export const store   = configureStore({
  reducer: persistedReducer,
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer);
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);