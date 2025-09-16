import { IoCloseOutline } from "react-icons/io5";

interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between px-2 py-2">
      <h2 className="text-2xl  w-full text-center font-semibold">{title}</h2>
      {onClose && (
        <IoCloseOutline
          className="cursor-pointer"
          color="red"
          onClick={() => onClose()}
        />
      )}
    </div>
  );
};
