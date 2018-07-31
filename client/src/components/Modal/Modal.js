import React from "react";
import "./Modal.css";
import { ModalHead } from "./ModalHead";
import { ModalBody } from "./ModalBody";
import { ModalFoot } from "./ModalFoot";
import { TextArea } from "../Form/TextArea";
import { List } from "../List/List";

const Modal = ({ saveCommentFunc, comments }) => (
  <div className="modal fade" id="notes-modal">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <ModalHead title="comment-title">
          Title
        </ModalHead>
        <ModalBody>
          <List items={comments}/>
          <TextArea placeholder="New Comment" rows="5" cols="60" id="comment" />
        </ModalBody>
        <ModalFoot func={saveCommentFunc} />
      </div>
    </div>
  </div>
);

export default Modal;