import React from "react";

export const List = props => {
  return (
    <ul className="list-group">
      {props.items.length ? (
        props.items.map(item => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={item._id}>
            {item.created}: {item.body}
            <button className="btn badge badge-primary badge-pill" onClick={() => item.delCommentFunc(item._id)}>
              ✗
            </button>
          </li>
        ))
      ):(
        <li className="list-group-item">
          No Comments for this Article yet.
        </li>
      )}
    </ul>
  );
};