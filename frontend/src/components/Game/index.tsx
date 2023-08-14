import { FC, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './index.module.scss';

const clear = (
  ctx: CanvasRenderingContext2D, 
): void => {
  ctx.beginPath();

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.closePath();
}

const drawRect = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number,
  color: string = 'black',
): void => {
  ctx.beginPath();
  
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

  ctx.closePath();
};

interface Box {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  speed: number;
  show: boolean;
}

interface GameLogic {
  boxes: Box[];
  catcher: Box;
  score: number;
}

const randomIntFromIntrval = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1) + min);

const createCatcher = (): Box => {
  return {
    x: 310,
    y: 460,
    show: true,
    speed: 10,
    height: 20,
    width: 20,
    color: 'red',
  }
}

const createBox = (x?: number, y?: number, speed?: number, color?: string, show?: boolean): Box => {
  return {
    x: x ?? 0,
    y: y ?? -20,
    width: 20,
    height: 20,
    color: color ?? 'blue',
    speed: speed ?? 5,
    show: show ?? true,
  }
}

const drawBox = (ctx: CanvasRenderingContext2D, box: Box) => {
  drawRect(ctx, box.x, box.y, box.width, box.height, box.color);
}

const drawText = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string) => {
  ctx.beginPath();

  ctx.font = "14px Comic Sans MS";
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.fillText(text, x, y);

  ctx.closePath();
}

const Game: FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context2DRef = useRef<CanvasRenderingContext2D | null>(null);
  const gameRef = useRef<GameLogic>({
    boxes: [],
    catcher: createCatcher(),
    score: 0,
  });

  const keydown = useCallback((event: KeyboardEvent) => {
    const game = gameRef.current;
    if (event.key === 'Escape') {
      navigate('/');
    }
    if (event.key === 'ArrowLeft') {
      game.catcher.x = game.catcher.x - 5;
    }
    if (event.key === 'ArrowRight') {
      game.catcher.x = game.catcher.x + 5;
    }
  }, [navigate]);

  const draw = useCallback(() => {
    const game = gameRef.current!;
    const ctx = context2DRef.current!;
    clear(ctx);
  
    drawBox(ctx, game.catcher);
    drawText(ctx, 10, 25, game.score.toFixed(0))
    if (game.boxes.length) {
      game.boxes.forEach(box => {
        drawBox(ctx, box);
      })
    }
  }, []);

  const update = useCallback(() => {
    const game = gameRef.current!;
    const ctx = context2DRef.current!;
    if (game.boxes.length === 0) {
      for (let i = 0; i < 10; i++) {
        const x = randomIntFromIntrval(0, ctx.canvas.width - 20);
        const color = randomIntFromIntrval(0, 1) === 0
          ? 'blue' : 'green';
        const speed = randomIntFromIntrval(3, 5) / 10;
        const newBox = createBox(x, -20, speed, color);
        game.boxes.push(newBox);
      }
    }
    if (game.boxes.length) {
      const catcher = game.catcher;

      for (let i = 0; i < game.boxes.length; i++) {
        const box = game.boxes[i];

        box.y += box.speed;

        if (box.x + box.width / 2 >= catcher.x && box.x + box.width / 2 <= catcher.x + catcher.width) {
          if (box.y >= catcher.y - catcher.height) {
            if (box.color === 'blue') {
              game.score++;
            }
            if (box.color === 'green') {
              game.score += 2;
            }
            game.boxes.splice(i, 1);
            i = -1;
            continue;
          }
        }

        if (box.y > catcher.y + catcher.height) {
          game.boxes.splice(i, 1);
          i = -1;
          continue;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }
    context2DRef.current = canvasRef.current.getContext('2d');
    if (!context2DRef.current) {
      return () => {};
    }
    const interval = setInterval(() => {
      update();
      draw();
    }, 1);
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
      clearInterval(interval);
    };
  }, [keydown, update, draw]);

  return (
    <div className={classes.game}>
      <h1>Game</h1>
      <canvas ref={canvasRef} className={classes.canvas} width="640" height="480" />
    </div>
  );
};

export default Game;