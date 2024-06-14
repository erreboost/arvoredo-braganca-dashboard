import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imgSrc }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      <div className="absolute bg-white rounded-lg shadow-lg p-6 max-w-screen-sm">
        <button
          className="absolute top-0 right-0 m-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.707 10l3.147 3.146a.5.5 0 01-.708.708L10 10.707l-3.146 3.147a.5.5 0 11-.708-.708L9.293 10 6.147 6.854a.5.5 0 11.708-.708L10 9.293l3.146-3.146a.5.5 0 11.708.708L10.707 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <img src={imgSrc} alt="Modal Image" className="max-w-full rounded-lg" />
      </div>
    </div>
  );
};

export default Modal;
