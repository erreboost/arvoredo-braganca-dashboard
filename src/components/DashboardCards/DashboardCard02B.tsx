import React, { useEffect, useState } from "react";

interface Tree {
  Esdado_cal: string;
}

interface DashboardCardData {
  trees: Tree[];
}

interface Props {
  data: DashboardCardData;
}

const DashboardCard02B: React.FC<Props> = ({ data }) => {
  const [caldBomEstado, setCaldBomEstado] = useState(0);
  const [caldInsuf, setCaldInsuf] = useState(0);
  const [caldInexistente, setCaldInexistente] = useState(0);

  useEffect(() => {
    if (data && data.trees) {
      let countBomEstado = 0;
      let countInsuf = 0;
      let countInexistente = 0;

      data.trees.forEach((tree) => {
        if (tree.Esdado_cal === "Caldeira suficiente e em bom estado.") {
          countBomEstado++;
        } else if (tree.Esdado_cal === "Caldeira insuficiente.") {
          countInsuf++;
        } else {
          countInexistente++;
        }
      });

      setCaldBomEstado(countBomEstado);
      setCaldInsuf(countInsuf);
      setCaldInexistente(countInexistente);
    }
  }, [data]);

  return (
    <div className="flex-grow overflow-y-auto py-2 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">
          Caldeira em Bom Estado
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-12 mt-2">
          {caldBomEstado}
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Caldeira Insuficiente
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-2 mt-2">
          {caldInsuf}
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-12 mb-2">
          Caldeira Inexistente
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-2 mt-4">
          {caldInexistente}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard02B;
