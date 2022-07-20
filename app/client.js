// import '@babel/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import '@config';
import Routes from '@configs/router.config';
import configure from '@middleware/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


const HotRoutes = hot(Routes);
const store = configure({});
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <HotRoutes />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root'),
);
