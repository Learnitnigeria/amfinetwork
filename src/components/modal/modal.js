import './modal.css';

export const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <p className="closeButton" type="button" onClick={() => handleClose()}>X</p>
        {children}
      </section>
    </div>
  );
};