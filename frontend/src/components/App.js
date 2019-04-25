import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import { SampleModal, FurnaceModal, SubstrateModal } from "./Modal";

const SampleApp = () => (
    <React.Fragment>
        <DataProvider endpoint="api/sample/"
                      render={data => <Table data={data} />} />
        <SampleModal />
    </React.Fragment>
);

const FurnaceApp = () => (
    <React.Fragment>
        <DataProvider endpoint="../api/furnace/"
                      render={data => <Table data={data} />} />
        <FurnaceModal />
    </React.Fragment>
);

const SubstrateApp = () => (
    <React.Fragment>
        <DataProvider endpoint="../api/substrate/"
                      render={data => <Table data={data} />} />
        <SubstrateModal />
    </React.Fragment>
);

const sample_wrapper = document.getElementById("sample_list");
sample_wrapper ? ReactDOM.render(<SampleApp />, sample_wrapper) : null;

const furnace_wrapper = document.getElementById("furnace_list");
furnace_wrapper ? ReactDOM.render(<FurnaceApp />, furnace_wrapper) : null;

const substrate_wrapper = document.getElementById("substrate_list");
substrate_wrapper ? ReactDOM.render(<SubstrateApp />, substrate_wrapper): null;