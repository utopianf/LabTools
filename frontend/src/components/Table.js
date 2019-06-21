import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const Table = ({ data }) =>
    !data.length ? (
        <p>Nothing to show</p>
    ) : (
        <div id="sample_list" className="columns">
            <div className="column">
                <h2 className="subtitle">
                    Showing <strong>{data.length} items</strong>
                </h2>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            {Object.entries(data[0]).map(
                                el => <th key={key(el)} dangerouslySetInnerHTML={{__html: el[0]}} />)}
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(el => (
                        <tr key={el.id}>
                            {Object.entries(el).map(el => <td key={key(el)} dangerouslySetInnerHTML={{__html: el[1]}}></td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

Table.propTypes = {
    data: PropTypes.array.isRequired
};

export const SampleTable = ({ samples }) =>
    !samples.length ? (
        <p>Nothing to show</p>
    ) : (
        <div id="sample_list" className="columns">
            <div className="column">
                <h2 className="subtitle">
                    Showing <strong>{samples.length} items</strong>
                </h2>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Batch #</th>
                            <th>Date</th>
                            <th>PLD</th>
                            <th>Target</th>
                            <th>Substrate</th>
                            <th>Size</th>
                            <th>Mask?</th>
                            <th>Atmosphere</th>
                            <th>P<sub>Atmosphere</sub> (Torr)</th>
                            <th>P<sub>Background</sub> (Torr)</th>
                            <th>E<sub>Laser</sub> (mJ)</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                    {samples.map(sample => (
                        <tr key={sample.id}>
                            <td><a href={"/sample/" + sample.id}>{sample.id}</a></td>
                            <td><a href={"/api/batch/" + sample.batch_id}>{sample.pld_batch_id}</a></td>
                            <td>{sample.fab_date}</td>
                            <td>{sample.pld}</td>
                            <td>{sample.targets_string}</td>
                            <td>{sample.substrate_abbreviation}</td>
                            <td>{sample.sub_size}</td>
                            <td>{sample.is_masked}</td>
                            <td>{sample.atmosphere_gas}</td>
                            <td>{sample.atmosphere_pressure}</td>
                            <td>{sample.background_pressure}</td>
                            <td>{sample.laser_energy}</td>
                            <td>{sample.comment}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

SampleTable.propTypes = {
    samples: PropTypes.array.isRequired
};

export class SampleTable_ extends React.Component {
    static propTypes = {
        samples: PropTypes.array
    };

    state = {
        columns: [
            {name: "Date", data: "fab_date"},
            {name: "PLD", data: "pld"},
            {name: "Target", data: "targets_string"},
            {name: "Substrate", data: "substrate_abbreviation"},
            {name: "Size", data: "sub_size"},
            {name: "Mask?", data: "is_masked"},
            {name: "Atmosphere", data: "atmosphere_gas"},
            {name: "P<sub>Atmosphere</sub> (Torr)", data: "atmosphere_pressure"},
            {name: "P<sub>Background</sub> (Torr)", data: "background_pressure"},
            {name: "E<sub>Laser</sub> (mJ)", data: "laser_energy"},
            {name: "Comment", data: "comment"},
        ],
        unused_columns: []
    };

    handleDeleteColumn = e => {
        this.setState({
            unused_columns: this.state.unused_columns.concat(
                this.state.columns.filter(c => c.date === e.target.value)
            ),
            columns: update(this.state.columns.filter(c => c.data !== e.target.value))
        })
    };

    handleAddColumn = e => {
        this.setState({
            columns: this.state.columns.concat(
                this.state.unused_columns.filter(c => c.date === e.target.value)
            ),
            unused_columns: update(this.state.unused_columns.filter(c => c.data !== e.target.value))
        })
    };

    render() {
        const samples = this.props.samples;
        const { columns, unused_columns } = this.state;
        return (
            !samples.length ? (
                <p>Nothing to show</p>
            ) : (
                <div id="sample_list" className="columns">
                    <div className="buttons are-small" id="unused_columns">
                        {unused_columns.map(c => (
                            <a className="button" onClick={this.handleAddColumn}>{c.name}</a>
                        ))}
                    </div>
                    <div className="column">
                        <h2 className="subtitle">
                            Showing <strong>{samples.length} items</strong>
                        </h2>
                        <table className="table is-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Batch #</th>
                                    {columns.map(c => (
                                        <th>{c.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                            {samples.map(sample => (
                                <tr key={sample.id}>
                                    <td><a href={"/sample/" + sample.id}>{sample.id}</a></td>
                                    <td><a href={"/api/batch/" + sample.batch_id}>{sample.pld_batch_id}</a></td>
                                    {columns.map(c => (
                                        <td>{sample[c.data]}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        )
    }
}

export const TargetTable = ({ targets }) =>
    !targets.length ? (
        <p>Nothing to show</p>
    ) : (
        <div id="sample_list" className="columns">
            <div className="column">
                <h2 className="subtitle">
                    Showing <strong>{targets.length} items</strong>
                </h2>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Chemical Formula</th>
                            <th>Abbreviation</th>
                            <th>Commercial?</th>
                            <th>Furnace Sequence</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                    {targets.map(target => (
                        <tr key={target.id}>
                            <td><a href={"/api/samples/" + target.id}>{target.id}</a></td>
                            <td>{target.chemical_formula}</td>
                            <td>{target.abbreviation}</td>
                            <td>{target.is_commercial}</td>
                            <td>{target.sequences_string}</td>
                            <td>{target.comment}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

TargetTable.propTypes = {
    targets: PropTypes.array.isRequired
};

export const SampleDetailTable = ({ sample }) => (
    <Tabs>
        <TabList>
            <Tab>
                <span className="is-small"><i className="far fa-file-alt" aria-hidden="true"></i></span>
                <span>Overview</span>
            </Tab>
            <Tab>
                <span className="is-small"><i className="far fa-chart-bar" aria-hidden="true"></i></span>
                <span>XRD</span>
            </Tab>
            <Tab>
                <span className="is-small"><i className="far fa-chart-bar" aria-hidden="true"></i></span>
                <span>EDX</span>
            </Tab>
            <Tab>
                <span className="is-small"><i className="far fa-chart-bar" aria-hidden="true"></i></span>
                <span>MPMS</span>
            </Tab>
            <Tab>
                <span className="is-small"><i className="far fa-chart-bar" aria-hidden="true"></i></span>
                <span>PPMS</span>
            </Tab>
        </TabList>

        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
    </Tabs>
);