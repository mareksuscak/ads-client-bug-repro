import { PlcVariable } from './types';

export interface PlcServiceInterface {
  start(): Promise<void>;
  stop(): Promise<void>;
  read<T = any>(variableName: PlcVariable): Promise<T | null>;
  write<T = any>(variableName: PlcVariable, value: T): Promise<T | null>;
  isConnected(): boolean;
}
