import React from 'react';

class SampleListComponent extends React.Component {
    state = {
        samples: []
    };

    componentDidMount() {
        this.getSampleList();
    }

    getSampleList() {
        axios
            .get('http://localhost:8000/api/sample/')
            .then(res => {
                this.setState({ samples: res.data })
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                {this.state.samples.map(sample => (
                    <div key={sample.id}>
                    </div>
                ))}
            </div>
        );
    }
}

export default SampleListComponent;