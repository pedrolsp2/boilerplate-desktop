import { Slice } from '../type';

export type AppConfigState = {
  stdCostTablesVisibleState: Record<string, boolean>;
  isSidenavOpen: boolean;
  isMobile: boolean;
  isChangePasswordDialogOpen: boolean;
};

export type AppConfigActions = {
  setSidenavOpen: (isOpen: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setVisibleTable: (tableId: string, visible: boolean) => void;
  onChangePasswordDialogClose: () => void;
  onChangePasswordDialogOpen: () => void;
};

export type AppConfigSlice = Slice<AppConfigState, AppConfigActions>;
