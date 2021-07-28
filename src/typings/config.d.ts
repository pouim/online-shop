import 'react-redux';
import { ApplicationState } from '@store/index';
import { AppState } from '@store/store';

declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
} 