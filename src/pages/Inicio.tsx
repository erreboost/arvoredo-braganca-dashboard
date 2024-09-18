import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import LeftComponent from '../components/LeftComponent';
import RightComponent from '../components/RightComponent';
import Bottom from '../components/Bottom';
import {TreeDataProvider} from '../utils/TreeDataContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Inicio() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    // console.log('TREE DATA')
    setTimeout(() => {    
      setLoading(false);
    }, 1000);
  }, []);

  const handleButtonClick = (componentName: string) => {
    // console.log(`Button clicked: ${componentName}`);
  };

  return (
    <TreeDataProvider>
      <div className="flex flex-col h-screen">
        <AnimatePresence exitBeforeEnter={false}>
          {loading && (
            <motion.div
              key="loading"
              className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 1.5, ease: 'easeInOut'}}
            >
              <motion.h2
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
                transition={{duration: 0.5, delay: 0.2, ease: 'easeInOut'}}
                className="text-xl font-semibold text-gray-800"
              >
                🌳 A carregar informação 🌳
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && (
          <motion.div
            className="flex flex-col lg:flex-row bg-gray-100"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5, delay: 0.2, ease: 'easeInOut'}}
          >
            <div className="max-h-[635px] w-full lg:w-1/3 p-2 bg-gray-500 overflow-hidden rounded-md lg:flex-shrink-0 min-h-[55vh] z-50">
              <LeftComponent onButtonClick={handleButtonClick} />
            </div>

            <motion.div
              className="w-screen lg:w-2/3 lg:flex lg:flex-col  max-h-[680px]"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 1.0, delay: 0.3, ease: 'easeInOut'}}
            >
              <RightComponent />
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="w-full h-auto items-center justify-center flex"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 2.0, delay: 0.3, ease: 'easeInOut'}}
        >
          {<Bottom/>}
        </motion.div>
        <ToastContainer />
      </div>
    </TreeDataProvider>
  );
}

export default Inicio;
