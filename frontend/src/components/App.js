import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import { Table, SampleTable, TargetTable } from "./Table";
import { SampleTabs } from "./Tab";
import { BatchModal, FurnaceModal, SubstrateModal, FurnaceSequenceModal, CommercialTargetModal } from "./Modal";

const SampleListApp = () => (
    <React.Fragment>
        <DataProvider endpoint="/api/sample/"
                      render={data => <SampleTable samples={data} />} />
        <BatchModal />
    </React.Fragment>
);

const SampleDetailApp = ( sample_id ) => (
    <React.Fragment>
        <DataProvider endpoint={"/api/sample/" + sample_id.sample_id}
                      render={data => <SampleTabs sample={data} />} />
    </React.Fragment>
);

const FurnaceApp = () => (
    <React.Fragment>
        <DataProvider endpoint="/api/furnace/"
                      render={data => <Table data={data} />} />
        <FurnaceModal />
    </React.Fragment>
);

const SubstrateApp = () => (
    <React.Fragment>
        <DataProvider endpoint="/api/substrate/"
                      render={data => <Table data={data} />} />
        <SubstrateModal />
    </React.Fragment>
);

const TargetApp = () => (
    <React.Fragment>
        <DataProvider endpoint="/api/target/"
                      render={data => <TargetTable targets={data} />} />
        <FurnaceSequenceModal /><CommercialTargetModal />
    </React.Fragment>
);

const samplelist_wrapper = document.getElementById("sample_list");
samplelist_wrapper ? ReactDOM.render(<SampleListApp />, samplelist_wrapper) : null;

const furnace_wrapper = document.getElementById("furnace_list");
furnace_wrapper ? ReactDOM.render(<FurnaceApp />, furnace_wrapper) : null;

const substrate_wrapper = document.getElementById("substrate_list");
substrate_wrapper ? ReactDOM.render(<SubstrateApp />, substrate_wrapper) : null;

const target_wrapper = document.getElementById("target_list");
target_wrapper ? ReactDOM.render(<TargetApp/>, target_wrapper) : null;

const sample_detail_wrapper = document.getElementById("sample_detail");
if (sample_detail_wrapper) {
    const sample_id = sample_detail_wrapper.getAttribute("data-id");
    ReactDOM.render(<SampleDetailApp sample_id={sample_id}/>, sample_detail_wrapper);
} else {
    null;
}