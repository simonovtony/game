import { FC, } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/game',
    element: <Game />,
  }
]);

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  );
};

export default App;
