import { SerializedError } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export interface DefaultProps {
  children?: ReactNode;
}

export interface User {
  id: string;
  name: string;
  score: number;
}

export enum ActionStatus {
  Idle,
  Pending,
  Fulfilled,
  Rejected,
}

export interface ActionResult {
  status: ActionStatus;
  error: SerializedError | Error | null;
}

export interface GameState {
  user: User | null;
  users: User[];
  getUsers: ActionResult;
}

export interface RootState {
  game: GameState;
}