import React, { createContext, useContext, useState, ReactNode } from "react";

interface VisibleExtentContextProps {
  visibleExtent: any;
  updateExtent: (extent: any) => void;
}

const VisibleExtentContext = createContext<
  VisibleExtentContextProps | undefined
>(undefined);

export const VisibleExtentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visibleExtent, setVisibleExtent] = useState<any>(undefined);

  const updateExtent = (extent: any) => {
    setVisibleExtent(extent);
  };

  return (
    <VisibleExtentContext.Provider value={{ visibleExtent, updateExtent }}>
      {children}
    </VisibleExtentContext.Provider>
  );
};

export const useVisibleExtent = (): VisibleExtentContextProps => {
  const context = useContext(VisibleExtentContext);
  if (!context) {
    throw new Error(
      "useVisibleExtent must be used within a VisibleExtentProvider"
    );
  }
  return context;
};
