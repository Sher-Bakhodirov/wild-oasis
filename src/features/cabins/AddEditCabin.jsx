import { createContext } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

export default function AddEditCabin({ cabinToEdit, children }) {
  return (
    <Modal>
      <Modal.Open modalName={cabinToEdit ? "edit-cabin" : "new-cabin"}>
        {children}
      </Modal.Open>
      <Modal.Window modalName={cabinToEdit ? "edit-cabin" : "new-cabin"}>
        <CreateCabinForm cabinToEdit={cabinToEdit} />
      </Modal.Window>
    </Modal>
  );
}
