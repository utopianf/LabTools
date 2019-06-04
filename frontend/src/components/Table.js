import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";

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
                        <tr>
                            <td><a href={"/api/samples/" + sample.id}>{sample.id}</a></td>
                            <td><a href={"/api/batch/" + sample.batch_id}>{sample.batch_id}</a></td>
                            <td>{sample.batch_fab_date}</td>
                            <td>{sample.batch_pld}</td>
                            <td>{sample.batch_targets_string}</td>
                            <td>{sample.substrate_abbreviation}</td>
                            <td>{sample.sub_size}</td>
                            <td>{sample.is_masked}</td>
                            <td>{sample.batch_atmosphere_gas}</td>
                            <td>{sample.batch_atmosphere_pressure}</td>
                            <td>{sample.batch_background_pressure}</td>
                            <td>{sample.batch_laser_energy}</td>
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
                        <tr>
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