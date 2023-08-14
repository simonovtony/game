import { FC, MouseEvent, useCallback } from "react";
import classes from './index.module.scss';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Link from "../common/Link";

const Home: FC = () => {
  const navigate = useNavigate();

  const handleLinkClick = useCallback((to: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(to);
  }, [navigate]);

  return (
    <div className={classes.home}>
      <div className={classes.home__container}>

        <ul className={classes.menu}>
          <li className={classes.menu__item}>
            <Link 
              href="/game"
              title="game"
              onClick={handleLinkClick('/game')}
            >
              Start Game
            </Link>
          </li>
          <li className={classes.menu__item}>
            <Link 
              href="/leaderboard"
              title="leaderboard"
              onClick={handleLinkClick('/leaderboard')}
            >
              Leader Board
            </Link>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Home;