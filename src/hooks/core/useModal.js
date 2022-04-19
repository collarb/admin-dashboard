import { useContext } from "react";
import { modalContext } from "../../context/ModalContext";
import { Button, Modal } from "@themesberg/react-bootstrap";

function useModal() {
  const { setOpen, setBody, setTitle, setSize } = useContext(modalContext);

  const openModal = (body, title, options={}) => {
    setOpen(true);
    setBody(body);
    setTitle(title);
    setSize(options.size || "sm");
  };

  const openConfirm = (title, confirm) => {
    setOpen(true);
    setBody(<ModalFooter ok={confirm} okText="Yes" cancelText="No" />);
    setSize("lg");
    setTitle(title);
  };

  const ModalFooter = ({ ok = (f) => f, okText, cancelText }) => {
    return (
      <Modal.Footer>
        <Button
          variant="link"
          className="text-gray ms-auto"
          onClick={() => setOpen(false)}
        >
          {cancelText || "Cancel"}
        </Button>

        <Button variant="secondary" type="submit" onClick={() => ok()}>
          {okText || "Submit"}
        </Button>
      </Modal.Footer>
    );
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { openModal, openConfirm, ModalFooter, closeModal };
}

export default useModal;
