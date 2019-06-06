import React from "react";
import PropTypes from "prop-types";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export class SampleTabs extends React.Component {
    static propTypes = {
        sample: PropTypes.object.isRequired
    };

    render() {
        return (
            <Tabs selectedTabClassName="is-active">
                <div className="tabs is-centered is-boxed is-medium">
                    <TabList>
                        <Tab><a>Overview</a></Tab>
                        <Tab><a>XRD</a></Tab>
                        <Tab><a>EDX</a></Tab>
                        <Tab><a>MPMS</a></Tab>
                        <Tab><a>PPMS</a></Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className="columns">
                        <div className="column is-half">
                            <figure className="image is-128x128">
                                <img src="https://versions.bulma.io/0.7.0/images/placeholders/128x128.png" alt="Image"/>
                            </figure>
                        </div>
                        <div className="column">
                            <table>
                                <thead>
                                <tr>
                                    <th><h3 className="title is-3">Sample Overview</h3></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr><td>
                                    <span className="tag is-large">
                                        Batch #
                                        <FontAwesomeIcon icon={faEdit} />
                                        {this.props.sample.batch_id}
                                    </span>
                                </td></tr>
                                <tr><td>
                                    <button className="button">
                                        <span>Date</span>
                                        <span class="icon">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </span>
                                    </button>
                                </td></tr>
                                <tr>
                                    <span className="tag is-large">
                                        Target
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                <tr>
                                    <span className="tag is-large">
                                        Substrate
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                <tr>
                                    <span className="tag is-large">
                                        Size
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                <tr>
                                    <span className="tag is-large">
                                        Mask?
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                <tr>
                                    <span className="tag is-large">
                                        Atmosphere
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                <tr>
                                    <span className="tag is-large">
                                        Atmosphere Pressure
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                <tr>
                                    <span className="tag is-large">
                                        Background Pressure
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                <tr>
                                    <span className="tag is-large">
                                        Comment
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="column"></div>
                    </div>
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
            </Tabs>
        );
    }
}