import React, { createContext, useState } from "react";
import { Button, Modal } from "@themesberg/react-bootstrap";

export const modalContext = createContext();

function ModalContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);

  return (
    <modalContext.Provider value={{ open, setOpen, setBody, setTitle }}>
      {children}

      <Modal
        as={Modal.Dialog}
        centered
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Header>
          <Modal.Title className="h6">{title}</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
        </Modal.Header>
        {body}
      </Modal>
    </modalContext.Provider>
  );
}

export default ModalContextProvider;
