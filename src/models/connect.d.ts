// model state 类型
import { UserModelState } from './user';
import { Dispatch, Location } from 'umi';

export interface ConnectProps {
  // &表示累加
  location: Location & { state: { from: string } };
  dispatch: Dispatch;
}

export interface ConnectState {
  user: UserModelState;
}

export { UserModelState };
