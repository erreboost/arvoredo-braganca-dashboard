import React, { createContext, useState, ReactNode, FC, useContext } from 'react';

interface FiltersContextType {
  uniqueNomeComum: string[];
  setUniqueNomeComum: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueEspecie: string[];
  setUniqueEspecie: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueEstado: string[];
  setUniqueEstado: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueLocalizacao: string[];
  setUniqueLocalizacao: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueDap: string[];
  setUniqueDap: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueIdade: string[];
  setUniqueIdade: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueAltura: string[]; 
  setUniqueAltura: React.Dispatch<React.SetStateAction<string[]>>;
}

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [uniqueNomeComum, setUniqueNomeComum] = useState<string[]>([]);
  const [uniqueEspecie, setUniqueEspecie] = useState<string[]>([]);
  const [uniqueEstado, setUniqueEstado] = useState<string[]>([]);
  const [uniqueLocalizacao, setUniqueLocalizacao] = useState<string[]>([]);
  const [uniqueDap, setUniqueDap] = useState<string[]>([]);
  const [uniqueIdade, setUniqueIdade] = useState<string[]>([]);
  const [uniqueAltura, setUniqueAltura] = useState<string[]>([]);

  return (
    <FiltersContext.Provider value={{
        uniqueNomeComum,
        setUniqueNomeComum,
        uniqueEspecie,
        setUniqueEspecie,
        uniqueEstado,
        setUniqueEstado,
        uniqueLocalizacao,
        setUniqueLocalizacao,
        uniqueDap, 
        setUniqueDap,
        uniqueIdade,
        setUniqueIdade,
        uniqueAltura, 
        setUniqueAltura

      }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
