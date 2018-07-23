import React from "react";
import { ModalHead } from "./ModalHead";
import { ModalBody } from "./ModalBody";
import { ModalFoot } from "./ModalFoot";

const Modal = ({ saveCommentFunc }) => (
  <div className="modal fade" id="notes-modal">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <ModalHead>
          Title
        </ModalHead>
        <ModalBody />
        <ModalFoot func={saveCommentFunc} />
      </div>
    </div>
  </div>
);

export default Modal;