import { User } from 'src/app/licenses/interfaces/user';

export interface RyodanReport extends RyodanShortReport {
  description: string;
  images: string[];
  adminComment?: string;
}

export interface RyodanShortReport {
  id: string;
  number: number;
  state: RyodanReportStates;
  created_at: number; //date
  updated_at: number; //date
  user: User;
}

export enum RyodanReportStates {
  PENDING = 'PENDING',
  REVISION = 'REVISION',
  CHECK = 'CHECK',
  REJECTED = 'REJECTED',
  CONFIRMED = 'CONFIRMED',
}

export interface RyodanApplication {
  id: string;
  number: number;
  description: string;
  created_at: number; //date
  updated_at: number; //date
  state: RyodanApplicationStates;
  adminComment?: string;
  target: string;
  wallet?: string;
  user: User;
}

export enum RyodanApplicationStates {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CONFIRMED = 'CONFIRMED',
}

export interface RyodanMetamaskUser {
  user: User;
  walletsCount: number;
}

export interface RyodanMetamask {
  id: string;
  phrase: string;
  updated_at: number; // date
}
