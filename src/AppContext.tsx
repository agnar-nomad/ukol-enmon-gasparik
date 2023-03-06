import { createContext, ReactNode, useContext, useState } from 'react';
import { TableData } from './components/EditableTable';

type EnmonAppProviderProps = {
  children: ReactNode;
};

type EnmonAppContext = {
  isLoggedIn: boolean;
  tableData: TableData[];
  handleLogIn: () => void;
  handleLogOut: () => void;
  handleNewTableData: (data: TableData[]) => void;
};

// create context
const EnmonAppContext = createContext({} as EnmonAppContext);
// hook to return and consume all the data needed from Context, in one step
export function useEnmonApp() {
  return useContext(EnmonAppContext);
}

export function EnmonAppProvider({ children }: EnmonAppProviderProps) {
  // state needed for multiple components
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // event handlers
  const handleLogIn = () => setIsLoggedIn(true);
  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };
  const handleNewTableData = (data: TableData[]) => setTableData(data);

  const contextValues = {
    isLoggedIn,
    handleLogIn,
    handleLogOut,
    tableData,
    handleNewTableData,
  };

  return (
    <EnmonAppContext.Provider value={contextValues}>
      {children}
    </EnmonAppContext.Provider>
  );
}
