import React, { Component } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

// styled
import StyledModal from "./Modal";

const modalRoot = document.getElementById("modal-root");
const propTypes = {
  id: PropTypes.string.isRequired
};
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, fadeType: null };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    setTimeout(() => this.setState({ fadeType: "in" }), 0);
    Modal.modals.push(this);
  }

  onEscKeyDown = e => {
    if (e.key !== "Escape") return;
    this.setState({ fadeType: "in" });
  };

  handleClick = e => {
    this.setState({ isOpen: false });
  };

  transitionEnd = e => {
    if (e.propertyName !== "opacity" || this.state.fadeType === "in") return;

    if (this.state.fadeType === "out") {
      this.props.onClose();
    }
  };

  render() {
    return ReactDom.createPortal(
      <StyledModal
        style={{ display: +this.state.isOpen ? "" : "none" }}
        id={this.props.id}
        className={`wrapper ${"size-" + this.props.modalSize} fade-${
          this.state.fadeType
        }`}
        role="dialog"
        modalSize={this.props.modalSize}
        onTransitionEnd={this.transitionEnd}
      >
        <div class="background" />
        <div className="box-dialog">
          <div className="box-header">
            <h4 className="box-title">Pure React Modal</h4>
            <button onClick={this.handleClick} className="close">
              ×
            </button>
          </div>
          <div className="box-content">{this.props.children}</div>
        </div>
      </StyledModal>,
      modalRoot
    );
  }
}

Modal.modals = [];

Modal.open = id => e => {
  e.preventDefault();
  let modal = Modal.modals.find(x => x.props.id === id);
  modal.setState({ isOpen: true });
};

Modal.close = id => e => {
  e.preventDefault();
  let modal = Modal.modals.find(x => x.props.id === id);
  modal.setState({ isOpen: false });
};

Modal.propTypes = propTypes;

export default Modal;
