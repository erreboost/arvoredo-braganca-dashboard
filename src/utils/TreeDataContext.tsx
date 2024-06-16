import React, { createContext, useContext, useState, ReactNode } from "react";

interface Tree {
  _id: string;
  Data: string;
  Dicofre: string;
  Localizacao: string;
  Especie: string;
  Nomecomum: string;
  Estado_fit: string;
  Esdado_cal: string;
  Ava_Risco: string;
  Propo_Inte: string;
  Obser: string;
  GlobalID: string;
  raz_calssifica: string;
  agen_bioticos: string;
  Orgaos_afetados: string;
  Grau_de_desfolha: string;
  Sintomas_sinais_desfolhadores: string;
  Grau_de_descoloracao_da_copa: string;
  Deformacao_dos_tecidos: string;
  Alteracao_da_estrutura: string;
  Supressao_parcial_dos_orgaos: string;
  Orificios_perfuracoes: string;
  galerias: string;
  necroses: string;
  serrim: string;
  exsudacao: string;
  novelos_fibra: string;
  Forma_caldeira: string;
  Altura_v2: number;
  capv2: string;
  DAP_v2: number;
  idade_apro_v2: string;
  Especie_Val: number;
  Outro_Nome_Comum: string;
  Outra_Especie: string;
  Codigo: string;
  Outra_Tip_Int: string;
  grupos: string;
  POINT_X: string;
  POINT_Y: string;
  POINT_Z: string;
  Fotos: string[];
  photo: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TreeDataContextProps {
  treeData: Tree[];
  setTreeData: (data: Tree[]) => void;
}

// Create the context with a default value
const TreeDataContext = createContext<TreeDataContextProps | undefined>(
  undefined
);

interface TreeDataProviderProps {
  children: ReactNode;
}

export const TreeDataProvider = ({ children }: TreeDataProviderProps) => {
  const [treeData, setTreeData] = useState<any[]>([]);

  return (
    <TreeDataContext.Provider value={{ treeData, setTreeData }}>
      {children}
    </TreeDataContext.Provider>
  );
};

export const useTreeData = () => {
  const context = useContext(TreeDataContext);

  if (!context) {
    throw new Error("useTreeData must be used within a TreeDataProvider");
  }

  return context;
};
