import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import SampleTable from "./Table";
import SampleModal from "./Modal";

const SampleList = () => (
    <React.Fragment>
        <DataProvider endpoint="api/sample/"
                      render={data => <SampleTable data={data} />} />
        <SampleModal />
    </React.Fragment>
);

const wrapper = document.getElementById("sample_list");

wrapper ? ReactDOM.render(<SampleList />, wrapper) : null;
