import React from "react";

export const ModalFoot = ({ func }) => (
  <div className="modal-footer">
    <button type="button" className="btn btn-primary" onClick={func} data-dismiss="modal">Save Comments</button>
    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
  </div>
);