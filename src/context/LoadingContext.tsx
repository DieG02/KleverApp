import { createContext, useContext, useState, ReactNode } from 'react';
import LoadingTemplate from '../components/common/Loading';

interface Ctx {
  setLoading: (v: boolean) => void;
}

const LoadingCtx = createContext<Ctx>({ setLoading: () => {} });

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);

  return (
    <LoadingCtx.Provider value={{ setLoading: setVisible }}>
      {children}
      {visible && <LoadingTemplate />}
    </LoadingCtx.Provider>
  );
};

export const useLoading = () => useContext(LoadingCtx);
