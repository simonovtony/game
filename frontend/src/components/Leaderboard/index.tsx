import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionStatus, RootState } from '../../types';

const Leaderboard: FC = () => {
  const dispatch = useDispatch();
  const getUsers = useSelector((rootState: RootState) => rootState.game.getUsers);

  useEffect(() => {
    dispatch({
      type: 'getUsers'
    });
  }, [dispatch]);
  
  return (
    <div>
      <h1>Leaderboard</h1>
      
      {getUsers.status === ActionStatus.Pending && (
        <div>Loading...</div>
      )}

      {getUsers.status === ActionStatus.Rejected && (
        <div>Something went wrong</div>
      )}
      
      {isSuccess && (
        <ul>
          {data.map(item => (
             <li key={item.id}>{item.username} - {item.score}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;