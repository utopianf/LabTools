import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";

const Modal = ({children, closeModal, saveModal, modalState, title}) => {
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
                    <div class="buttons is-right">
                        <a className="button is-success" onClick={saveModal}>Save</a>
                        <a className="button" onClick={closeModal}>Cancel</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

Modal.propTypes = {
    saveModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    title: PropTypes.string
};

export class SampleModal extends React.Component {
    state = {
        modalState: false,
        fab_date: "",
        pld_id: "",
        target_id: "",
        laser_energy: "",
        bg_pressure: "",
        ap_gas: "",
        ap_pressure: "",
        substrate: "",
        ss_size: "",
        is_mask: "false",
        comment: ""
    };

    toggleModal = () => {
        this.setState((prev) => {
            const newState = !prev.modalState;

            return {modalState: newState};
        });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { fab_date, pld_id, target_id, laser_energy, bg_pressure, ap_gas,
            ap_pressure, substrate, ss_size, is_mask, comment } = this.state;
        const sample = { fab_date, pld_id, target_id, laser_energy, bg_pressure, ap_gas,
            ap_pressure, substrate, ss_size, is_mask, comment };
        const conf = {
            method: "post",
            body: JSON.stringify(sample),
            headers: new Headers({ "Content-Type": "application/json" })
        };
        fetch("api/sample/", conf).then(response => console.log(response));
        this.toggleModal();
    };

    render() {
        const { fab_date, pld_id, target_id, laser_energy, bg_pressure, ap_gas,
            ap_pressure, substrate, ss_size, comment } = this.state;
        return (
            <div id="new_sample_form">
                <div className="has-text-centered content">
                    <hr/>
                    <a className="button is-primary" onClick={(e) => this.toggleModal(e)}>
                        Create
                    </a>
                </div>

                <Modal
                    saveModal={this.handleSubmit}
                    closeModal={this.toggleModal}
                    modalState={this.state.modalState}
                    title="New Sample"
                >
                    <div className="column">
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <div className="control">
                                    <input className="input"
                                           type="date"
                                           placeholder="Fabrication Date"
                                           name="fab_date"
                                           onChange={this.handleChange}
                                           value={fab_date}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="PLD #"
                                           name="pld_id"
                                           onChange={this.handleChange}
                                           value={pld_id}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="Target #"
                                           name="target_id"
                                           onChange={this.handleChange}
                                           value={target_id}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="Laser Energy"
                                           name="laser_energy"
                                           onChange={this.handleChange}
                                           value={laser_energy}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="atmosphere Gas"
                                           name="ap_gas"
                                           onChange={this.handleChange}
                                           value={ap_gas}
                                           required
                                    />
                                </div>
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="Atmosphere Pressure"
                                           name="ap_pressure"
                                           onChange={this.handleChange}
                                           value={ap_pressure}
                                           required
                                    />
                                </div>
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="Background Pressure"
                                           name="bg_pressure"
                                           onChange={this.handleChange}
                                           value={bg_pressure}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="Substrate"
                                           name="substrate"
                                           onChange={this.handleChange}
                                           value={substrate}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="Substrate Size"
                                           name="ss_size"
                                           onChange={this.handleChange}
                                           value={ss_size}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <div className="select">
                                        <select>
                                            <option>False</option>
                                            <option>True</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           placeholder="Comment"
                                           name="comment"
                                           onChange={this.handleChange}
                                           value={comment}
                                           required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export class FurnaceModal extends React.Component {
    state = {
        modalState: false,
        name: "",
        location: "",
        comment: ""
    };

    toggleModal = () => {
        this.setState((prev) => {
            const newState = !prev.modalState;

            return {modalState: newState};
        });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name, location, comment } = this.state;
        const furnace = { name, location, comment };
        const conf = {
            method: "post",
            body: JSON.stringify(furnace),
            headers: new Headers({ "Content-Type": "application/json" })
        };
        fetch("../api/furnace/", conf).then(response => console.log(response));
        this.toggleModal();
    };

    render() {
        const { name, location, comment } = this.state;
        return (
            <div id="new_sample_form">
                <div className="has-text-centered content">
                    <hr/>
                    <a className="button is-primary" onClick={(e) => this.toggleModal(e)}>
                        Create
                    </a>
                </div>

                <Modal
                    closeModal={this.toggleModal}
                    saveModal={this.handleSubmit}
                    modalState={this.state.modalState}
                    title="New Furnace"
                >
                    <div className="column">
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           name="name"
                                           onChange={this.handleChange}
                                           value={name}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Location</label>
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           name="location"
                                           onChange={this.handleChange}
                                           value={location}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Comment</label>
                                <div className="control">
                                    <input className="input"
                                           type="text"
                                           name="comment"
                                           onChange={this.handleChange}
                                           value={comment}
                                           required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export class SubstrateModal extends React.Component {
    state = {
        modalState: false,
        chemical_formula: "",
        abbreviation: "",
        orientation: "",
        comment: ""
    };

    toggleModal = () => {
        this.setState((prev) => {
            const newState = !prev.modalState;

            return {modalState: newState};
        });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { chemical_formula, abbreviation, orientation, comment } = this.state;
        const substrate = {
            chemical_formula: chemical_formula,
            abbreviation: abbreviation,
            orientation: orientation,
            comment: comment
        };
        const conf = {
            method: "post",
            body: JSON.stringify(substrate),
            headers: new Headers({ "Content-Type": "application/json" })
        };
        fetch("../api/substrate/", conf).then(response => console.log(response));
        this.toggleModal();
    };

    render() {
        const { chem_formula: chemical_formula, abbreviation, orientation, comment } = this.state;
        return (
            <div id="new_sample_form">
                <div className="has-text-centered content">
                    <hr/>
                    <a className="button is-primary" onClick={(e) => this.toggleModal(e)}>
                        Create
                    </a>
                </div>

                <Modal
                    closeModal={this.toggleModal}
                    saveModal={this.handleSubmit}
                    modalState={this.state.modalState}
                    title="New Substrate"
                >
                    <div className="column">
                        <form onSubmit={this.handleSubmit}>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Chemical Formula</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="text"
                                                   name="chem_formula"
                                                   placeholder="e.g. SrTiO<sub>3</sub>"
                                                   onChange={this.handleChange}
                                                   value={chemical_formula}
                                                   required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Abbreviation</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="text"
                                                   name="abbreviation"
                                                   placeholder="e.g. STO"
                                                   onChange={this.handleChange}
                                                   value={abbreviation}
                                                   required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Orientation</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="text"
                                                   name="orientation"
                                                   placeholder="e.g. (1 0 0)"
                                                   onChange={this.handleChange}
                                                   value={orientation}
                                                   required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Comment</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="text"
                                                   name="comment"
                                                   placeholder="Any Comment"
                                                   onChange={this.handleChange}
                                                   value={comment}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export class TargetModal extends React.Component {
    state = {
        modalState: false,
        syn_date: "",
        target: {
            chemical_formula: "",
            abbreviation: ""
        },
        furnaces: [],
        furnace: "",
        furnace_steps: [{
            order: 1,
            start_temperature: "",
            end_temperature: "",
            duration: "",
            comment: ""
        }],
        comment: ""
    };

    toggleModal = () => {
        this.setState((prev) => {
            const newState = !prev.modalState;

            return {modalState: newState};
        });
    };

    handleAppendFurnaceStep = () => {
        const last_order = this.state.furnace_steps.length;
        this.setState((prevState) => ({
            furnace_steps: [...prevState.furnace_steps, {
                order: last_order + 1,
                start_temperature: "",
                end_temperature: "",
                duration: "",
                comment: ""
            }],
        }));
    };

    handleFurnaceStepChange = idx => e => {
        console.log(idx);
        let steps = [...this.state.furnace_steps];
        console.log(idx);
        steps[e.target.dataset.id][e.target.name] = e.target.value;
        this.setState({steps}, () => console.log(this.state.furnace_steps));
    };

    handleAddTarget = () => {
        this.setState({
            targets: this.state.targets.concat([{
                chemical_formula: "",
                abbreviation: ""
            }])
        });
    };

    handleTargetChange = idx => e => {
        const newTargets = this.state.targets.map((target, tidx) => {
            if (idx !== tidx) return target;
            target[e.target.name] = e.target.value;
        });

        this.setState({ targets: newTargets })
    };

    handleChange = e => {
        if (["order", "start_temperature", "end_temperature", "duration"].includes(e.target.name)) {
            let furnace_steps = [...this.state.furnace_steps];
            furnace_steps[e.target.dataset.id][e.target.name] = e.target.value;
            this.setState({furnace_steps});
        } else if (["chemical_formula", "abbreviation"].includes(e.target.name)) {
            let target = this.state.target;
            target[e.target.name] = e.target.value;
            this.setState(target);
        } else {
            this.setState({[e.target.name]: e.target.value}, () => console.log(this.state.furnace));
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const { syn_date, target, furnace, furnace_steps, comment } = this.state;
        const targets = [target];
        const furnace_sequence = { syn_date, targets, furnace, furnace_steps, comment };
        console.log(furnace_sequence);
        const conf = {
            method: "post",
            body: JSON.stringify(furnace_sequence),
            headers: new Headers({ "Content-Type": "application/json" })
        };
        fetch("../api/furnace_sequence/", conf).then(response => console.log(response));
        this.toggleModal();
    };

    componentDidMount() {
        fetch('../api/furnace/')
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({furnaces: data}));
    }

    render() {
        const { syn_date, furnaces, furnace, target, furnace_steps, comment } = this.state;
        return (
            <div id="new_sample_form">
                <div className="has-text-centered content">
                    <hr/>
                    <a className="button is-primary" onClick={(e) => this.toggleModal(e)}>
                        Create
                    </a>
                </div>

                <Modal
                    closeModal={this.toggleModal}
                    saveModal={this.handleSubmit}
                    modalState={this.state.modalState}
                    title="New Synthesis"
                >
                    <div className="column">
                        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Chemical Formula</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="Date"
                                                   name="syn_date"
                                                   placeholder=""
                                                   value={syn_date}
                                                   required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Target</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="text"
                                                   name="chemical_formula"
                                                   placeholder="Chemical formula"
                                                   value={target.chemical_formula}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="text"
                                                   name="abbreviation"
                                                   placeholder="Abbreviation"
                                                   value={target.abbreviation}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Furnace</label>
                                </div>
                                <div className="field-body">
                                    <div className="control">
                                        <div className="select">
                                            <select name="furnace" value={furnace}>
                                                {furnaces.map((furnace) => (
                                                    <option value={furnace.id}>{furnace.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Furnace Sequence</label>
                                    <div className="buttons is-right">
                                        <a className="button" onClick={this.handleAppendFurnaceStep}>Add Step</a>
                                    </div>
                                </div>
                                <div className="field-body">
                                    <div className="columns">
                                        {furnace_steps.map((step, idx) => (
                                            <div className="column" key={idx}>
                                                <div className="control">
                                                    <input className="input"
                                                           type="text"
                                                           name="order"
                                                           placeholder="Order"
                                                           value={step.order}
                                                           data-id={idx}
                                                    />
                                                    <input className="input"
                                                           type="text"
                                                           name="start_temperature"
                                                           placeholder="Start Temperature"
                                                           value={step.start_temperature}
                                                           data-id={idx}
                                                    />
                                                    <input className="input"
                                                           type="text"
                                                           name="end_temperature"
                                                           placeholder="End Temperature"
                                                           value={step.end_temperature}
                                                           data-id={idx}
                                                    />
                                                    <input className="input"
                                                           type="text"
                                                           name="duration"
                                                           placeholder="Duration"
                                                           value={step.duration}
                                                           data-id={idx}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Comment</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input"
                                                   type="text"
                                                   name="comment"
                                                   placeholder="Any Comment"
                                                   value={comment}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}