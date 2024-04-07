import React, { useState } from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  modalIsOpen: boolean;
  initial: boolean;
  symbolName: string; // Add symbolName prop
  closeModal: () => void;
  handleSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add input change handler prop
}

const CustomModal = ({
  modalIsOpen,
  closeModal,
  symbolName,
  onInputChange,
  initial,
  handleSubmit
}: ModalProps) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "40%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [isSymbolNameFilled, setIsSymbolNameFilled] = useState(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event);
    setIsSymbolNameFilled(event.target.value.trim() !== "");
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={isSymbolNameFilled ? closeModal : undefined} // Prevent close if symbolName is not filled
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        {!initial && (
          <div className="w-full flex justify-end">
            <RxCross2
              className={`cursor-pointer ${
                isSymbolNameFilled ? "" : "opacity-50 pointer-events-none" // Disable close button if symbolName is not filled
              }`}
              onClick={isSymbolNameFilled ? closeModal : undefined}
            />
          </div>
        )}
        <div>
          <label
            htmlFor="symbol"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Symbol Name
          </label>
          <input
            type="text"
            id="symbol"
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Symbol Name"
            value={symbolName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="text-white w-[20%] bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm py-2.5 text-center"
          onClick={handleSubmit}
          disabled={!isSymbolNameFilled} // Disable submit button if symbolName is not filled
        >
          Submit
        </button>
      </Modal>
    </>
  );
};

export default CustomModal;
