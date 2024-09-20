import React, {useEffect, useState} from 'react';
import {LuTrees} from 'react-icons/lu';
import {FaPeopleGroup} from 'react-icons/fa6';
import {motion} from 'framer-motion';
import { useTreeContext } from '../utils/TreeProvider';

interface RowProps {
  title: string;
  icon: JSX.Element;
  count: string;
  totalTrees: [], 
  multipleCount?: number
}


function Row({title, icon, count, totalTrees, multipleCount}: RowProps) {
  return (
    <motion.div
      className="flex-1 pt-0 mb-5 text-center rounded-md flex flex-col items-center"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.4, ease: 'easeInOut'}}
    >
      <h1 className="text-green-700 text-xl font-semibold">{title}</h1>
      <div className="flex items-center justify-center mt-0 text-green-700 max-h-[45px]">
        {icon}
      </div>
      <div className='flex items-center justify-center gap-[5px] mt-[5px]'>
      <span className="text-green-700">{count}</span>
      {multipleCount ? (
        <div className="flex items-center gap-[5px]">
          <span className="text-green-900 font-semibold">de</span>
          <span className="text-green-700">{totalTrees?.length * multipleCount}</span>
        </div>
      ) : null}
      </div>
    </motion.div>
  );
}

function Bottom() {
  //@ts-ignore
  const [activeButton, setActiveButton] = useState(1);
  const [treeCount, setTreeCount] = useState<number | null>(null);

  const { visibleTrees, treesCached} = useTreeContext();

  useEffect(() => {
    setTreeCount(visibleTrees?.length); 

    // console.log('Trees', trees)
    // console.log('Visible extent',visibleExtent )
  }, [visibleTrees]);
  //@ts-ignore
  const handleButtonClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
  };

  return (
    <div className="flex flex-col justify-center relative flex-grow z-0 mb-20">
      <div className="flex mb-2 space-x-4 items-center justify-center overflow-x-auto flex-wrap">
        <Row
          title="CO₂ Absorvido"
          icon={<LuTrees size={28} />}
          count={`${new Intl.NumberFormat('en-US').format(Number(treeCount) * 21).toString()}(ton/CO₂)`}
          totalTrees={treesCached}
          multipleCount={21}
        />
        <Row
          title="O₂ Produzido"
          icon={<LuTrees size={28} />}
          count={`${new Intl.NumberFormat('en-US').format(Number(treeCount) * 117).toString()}(ton/O₂)`}
          totalTrees={treesCached}
          multipleCount={117}
        />
        <Row
          title="Árvores"
          icon={<LuTrees size={64} />}
          count={Number(treeCount).toString()}
          totalTrees={treesCached}
          multipleCount={1}
        />
        <Row
          title="Habitantes"
          icon={<FaPeopleGroup size={64} />}
          count="34582"
          totalTrees={treesCached}
     
        />
      </div>      
      <>
        {/* <BottomNavigation
            activeButton={activeButton}
            onButtonClick={handleButtonClick}
          /> */}
      </>
    </div>
  );
}

export default Bottom;
