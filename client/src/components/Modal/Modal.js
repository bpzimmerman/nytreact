import React from "react";
import { ModalHead } from "./ModalHead";
import { ModalBody } from "./ModalBody";
import { ModalFoot } from "./ModalFoot";
import { TextArea } from "../Form/TextArea";
import { List } from "../List/List";

const Modal = ({ saveCommentFunc }) => (
  <div className="modal fade" id="notes-modal">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <ModalHead title="comment-title">
          Title
        </ModalHead>
        <ModalBody>
          <List />
          <TextArea placeholder="New Comment" rows="5" cols="60" />
        </ModalBody>
        <ModalFoot func={saveCommentFunc} />
      </div>
    </div>
  </div>
);

export default Modal;