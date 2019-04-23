import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import NewSampleForm from "./Form"

const Modal = ({children, closeModal, modalState, title}) => {
    if (!modalState) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" onClick={closeModal}/>
                </header>
                <section className="modal-card-body">
                    <div className="content">
                        {children}
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <a className="button" onClick={closeModal}>Cancel</a>
                </footer>
            </div>
        </div>
    );
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    title: PropTypes.string
};

class SampleModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalState: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return {modalState: newState};
        });
    }

    render() {
        return (
            <div id="new_sample_form">
                <div className="has-text-centered content">
                    <hr/>
                    <a className="button is-primary" onClick={this.toggleModal}>
                        New Sample
                    </a>
                </div>

                <Modal
                    closeModal={this.toggleModal}
                    modalState={this.state.modalState}
                    title="New Sample"
                >
                    <NewSampleForm endpoint="api/sample/" />
                </Modal>
            </div>
        );
    }
}

export default SampleModal;