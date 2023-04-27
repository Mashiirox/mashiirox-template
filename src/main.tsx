import { StrictMode, useState, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Router, type RouterProps } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import type { HashHistory } from 'history';
import 'virtual:svg-icons-register';

import App from './App';
import MobxWrapper from './stores';

import history from './utils/history';

import './main.scss';

interface AppRouterProps extends Omit<RouterProps, 'location' | 'navigationType' | 'navigator'> {
  history: HashHistory;
}

function AppRouter({ history, ...props }: AppRouterProps): JSX.Element {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <MobxWrapper>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={zhCN}>
          <AppRouter history={history}>
            <App />
          </AppRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </MobxWrapper>
  </StrictMode>
);
