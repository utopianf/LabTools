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

export class SampleTable extends React.Component {
    static propTypes = {
        samples: PropTypes.array
    };

    state = {
        columns: [
            {name: "Date", data: "fab_date"},
            {name: "Target", data: "targets_string"},
            {name: "Substrate", data: "substrate_abbreviation"},
            {name: "Atmosphere", data: "atmosphere_gas"},
            {name: "Comment", data: "comment"},
        ],
        unused_columns: [
            {name: "PLD", data: "pld"},
            {name: "Size", data: "sub_size"},
            {name: "Mask?", data: "is_masked"},
            {name: "P" + "Atmosphere".sub() + " (Torr)", data: "atmosphere_pressure"},
            {name: "P" + "Background".sub() + " (Torr)", data: "background_pressure"},
            {name: "E" + "Laser".sub() + " (mJ)", data: "laser_energy"}
        ]
    };

    handleDeleteColumn = e => {
        this.setState({
            unused_columns: this.state.unused_columns.concat(
                this.state.columns.filter(c => c.data === e.target.value)
            ),
            columns: this.state.columns.filter(c => c.data !== e.target.value)
        })
    };

    handleAddColumn = e => {
        this.setState({
            columns: this.state.columns.concat(
                this.state.unused_columns.filter(c => c.data === e.target.value)
            ),
            unused_columns: this.state.unused_columns.filter(c => c.data !== e.target.value)
        })
    };

    render() {
        const samples = this.props.samples;
        const { columns, unused_columns } = this.state;
        return (
            !samples.length ? (
                <p>Nothing to show</p>
            ) : (
                <div id="sample_list">
                    <div>
                        <h2 className="subtitle">
                            Showing <strong>{samples.length} items</strong>
                        </h2>
                        <div className="buttons are-small" id="unused_columns">
                            {unused_columns.map(c => (
                                <button className="button"
                                        value={c.data}
                                        dangerouslySetInnerHTML={{ __html: c.name }}
                                        onClick={this.handleAddColumn} />
                            ))}
                        </div>
                        <table className="table is-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Batch #</th>
                                    {columns.map(c => (
                                        <th>
                                            <span dangerouslySetInnerHTML={{ __html: c.name }} />
                                            <button className="delete is-small"
                                                    value={c.data}
                                                    onClick={this.handleDeleteColumn} />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                            {samples.map(s => (
                                <tr key={s.id}>
                                    <td><a href={"/sample/" + s.id}>{s.id}</a></td>
                                    <td><a href={"/api/batch/" + s.batch_id}>{s.pld_batch_id}</a></td>
                                    {columns.map(c => (
                                        <td>{s[c.data]} </td>
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