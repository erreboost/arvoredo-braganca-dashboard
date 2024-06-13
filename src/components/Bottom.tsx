import React, { useState } from "react";
import { LuTrees } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { motion } from "framer-motion";
import BottomNavigation from "./BottomNavigation";

interface RowProps {
  title: string;
  icon: JSX.Element;
  count: string;
}

interface BottomProps {
  treeCount: number | null;
}

function Row({ title, icon, count }: RowProps) {
  return (
    <motion.div
      className="flex-1 pl-24 pt-0 mb-20 text-center rounded-md flex flex-col items-center h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
    >
      <h1 className="text-green-700 text-2xl font-semibold">{title}</h1>
      <div className="flex items-center justify-center mt-0 text-green-700">
        {icon}
      </div>
      <h1 className="mt-2 text-green-700">{count}</h1>
    </motion.div>
  );
}

function Bottom({ treeCount }: BottomProps) {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center relative flex-grow h-[48%]">
      <div className="flex mb-2 space-x-4 items-center justify-center">
        <Row
          title="CO₂ Absorvido"
          icon={<LuTrees size={28} />}
          count="250,000,000"
        />
        <Row
          title="O₂ Produzido"
          icon={<LuTrees size={28} />}
          count="250,000,000"
        />
        <Row
          title="Árvores"
          icon={<LuTrees size={64} />}
          count={treeCount ? treeCount.toString() : "0"}
        />
        <Row
          title="Habitante"
          icon={<FaPeopleGroup size={64} />}
          count="10,074"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-300 p-4 flex space-x-4 items-center">
        <BottomNavigation
          activeButton={activeButton}
          onButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

export default Bottom;
