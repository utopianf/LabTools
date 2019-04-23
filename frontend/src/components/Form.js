import React, { Component } from "react";
import PropTypes from "prop-types";

class NewFurnaceForm extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired
    };

    state = {
        name: "",
        location: "",
        comment: ""
    };

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
        fetch(this.props.endpoint, conf).then(response => console.log(response))
    };

    render() {
        const { name, location, comment } = this.state;
        return (
            <div className="column">
                <form onSubmit={this.this.handleSubmit}>
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
        );
    }
}

class NewSampleForm extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired
    };

    state = {
        fab_date: "",
        pld_id: "",
        target_id: "",
        laser_energy: "",
        bg_pressure: "",
        ap_gas: "",
        ap_pressure: "",
        substrate: "",
        ss_size: "",
        is_mask: "",
        comment: ""
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
        fetch(this.props.endpoint, conf).then(response => console.log(response))
    };

    render() {
        const { fab_date, pld_id, target_id, laser_energy, bg_pressure, ap_gas,
            ap_pressure, substrate, ss_size, is_mask, comment } = this.state;
        return (
            <div className="column">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Fabrication Date</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="fab_date"
                                   onChange={this.handleChange}
                                   value={fab_date}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">PLD #</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="pld_id"
                                   onChange={this.handleChange}
                                   value={pld_id}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Target #</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="target_id"
                                   onChange={this.handleChange}
                                   value={target_id}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Laser energy</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="laser_energy"
                                   onChange={this.handleChange}
                                   value={laser_energy}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">BG Pressure</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="bg_pressure"
                                   onChange={this.handleChange}
                                   value={bg_pressure}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">AP Gas</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="ap_gas"
                                   onChange={this.handleChange}
                                   value={ap_gas}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">AP Pressure</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="ap_pressure"
                                   onChange={this.handleChange}
                                   value={ap_pressure}
                                   required
                            />
                        </div>
                    </div>
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
                        <label className="label">Substrate</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="substrate"
                                   onChange={this.handleChange}
                                   value={substrate}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Substrate Size</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="ss_size, is_mask"
                                   onChange={this.handleChange}
                                   value={ss_size}
                                   required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Mask?</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   name="is_mask"
                                   onChange={this.handleChange}
                                   value={is_mask}
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
                    <div className="control">
                        <button className="button is-link" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewSampleForm;