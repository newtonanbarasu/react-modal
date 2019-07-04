import React, { Component } from "react";
import Modal from "../Modal/index";

class Main extends Component {
  render() {
    return (
      <div>
        <button onClick={Modal.open("modal-1")}>Open-Modal-Large</button>
        <Modal id="modal-1" modalSize="lg">
          <p>modal 1</p>
        </Modal>

        <button onClick={Modal.open("modal-2")}>Open-Modal-Medium</button>

        <Modal id="modal-2">
          <p>modal 2</p>
        </Modal>
      </div>
    );
  }
}

export default Main;
