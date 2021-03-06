import React, { createContext, useState } from "react";
import { Button, Modal } from "@themesberg/react-bootstrap";

export const modalContext = createContext();

function ModalContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);
  const [size, setSize] = useState("sm");

  return (
    <modalContext.Provider value={{ open, setOpen, setBody, setTitle, setSize }}>
      {children}

      <Modal
        as={Modal.Dialog}
        centered
        show={open}
        onHide={() => setOpen(false)}
        size={size}
      >
        <Modal.Header style={{borderBottom: "none"}}>
          <Modal.Title className="h6">{title}</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
        </Modal.Header>
        <div style={{ padding: 15 }}>{body}</div>
      </Modal>
    </modalContext.Provider>
  );
}

export default ModalContextProvider;
