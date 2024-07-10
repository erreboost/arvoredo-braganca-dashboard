import React from 'react';

interface BottomNavigationProps {
  activeButton: number | undefined;
  onButtonClick: (buttonNumber: number) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeButton,
  onButtonClick,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-300 p-0 flex space-x-4 items-center">
      <button
        onClick={() => onButtonClick(1)}
        className={`flex-1 py-2 rounded ${
          activeButton === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}
      >
        Valor Ecológico
      </button>
      <button
        onClick={() => onButtonClick(2)}
        className={`flex-1 py-2 rounded ${
          activeButton === 2 ? 'bg-red-500 text-white' : 'bg-gray-300'
        }`}
      >
        Outros
      </button>
    </div>
  );
};

export default BottomNavigation;
