import { CSSProperties } from 'react';
import { Actions } from './actions';

type TableController = {
  type?: string;
  index: string;
  name?: string;
  defaultValue?: any;
  ariaLabel?: string;
  placeholder?: string;
  hasAdd?: boolean;
  hasEdit?: boolean;
  hasDelete?: boolean;
  actions?: Actions;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  columnStyle?: CSSProperties;
  addStyle?: CSSProperties;
  deleteStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  textStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  textLimitationType?: string;
  textType?: string;
  titleLimitationType?: string;
  titleType?: string;
  inputProps?: any;
  addProps?: any;
  deleteProps?: any;
};

export type { TableController };
