import React, {createContext, useContext, useState, ReactNode} from 'react';

interface VisibleExtentContextProps {
  visibleExtent: any;
  setVisibleExtent: (extent: any) => void;
}

interface VisibleExtentProviderProps {
  children: ReactNode;
}

const VisibleExtentContext = createContext<
  VisibleExtentContextProps | undefined
>(undefined);

export const VisibleExtentProvider: React.FC<VisibleExtentProviderProps> = ({
  children,
}) => {
  const [visibleExtent, setVisibleExtent] = useState<any>(null);

  return (
    <VisibleExtentContext.Provider value={{visibleExtent, setVisibleExtent}}>
      {children}
    </VisibleExtentContext.Provider>
  );
};

export const useVisibleExtentContext = () => {
  const context = useContext(VisibleExtentContext);
  if (!context) {
    throw new Error(
      'useVisibleExtentContext must be used within a VisibleExtentProvider'
    );
  }
  return context;
};
