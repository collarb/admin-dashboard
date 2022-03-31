import { useContext } from "react";
import { modalContext } from "../../context/ModalContext";
import { Button, Modal } from "@themesberg/react-bootstrap";

function useModal() {
  const { setOpen, setBody, setTitle } = useContext(modalContext);

  const openModal = (body, title) => {
    setOpen(true);
    setBody(body);
    setTitle(title);
  };

  const ModalFooter = ({ok, cancel}) => {
    return (
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>

          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
    );
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { openModal, ModalFooter, closeModal };
}

export default useModal;
