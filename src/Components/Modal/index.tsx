import React, { useState } from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Loader from "../Loader";

interface ModalProps {
  modalIsOpen: boolean;
  symbolName: string; // Add symbolName prop
  closeModal: () => void;
  handleSubmit: () => void;
  loading:boolean
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add input change handler prop
}

const CustomModal = ({
  modalIsOpen,
  closeModal,
  symbolName,
  onInputChange,
  loading,
  handleSubmit,
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
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-end">
            <RxCross2
              className={`cursor-pointer`}
              onClick={closeModal}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="symbol" >
              Symbol Name
            </Label>
            <Input
              type="text"
              id="symbol"
              placeholder="Symbol Name"
              value={symbolName}
              onChange={handleInputChange}
            />
          </div>
          <Button
            variant="outline"
            className="text-white bg-primary"
            onClick={handleSubmit}
            disabled={!isSymbolNameFilled} // Disable submit Button if symbolName is not filled
          >
            {loading?<Loader/>:"Submit"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
