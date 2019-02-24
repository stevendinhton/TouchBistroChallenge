import React, { Component } from 'react';
import './App.css';
import { InputGroup, Input, Button, Alert } from 'reactstrap';

class App extends Component {
  state = {
    medianResult: [],
    validForm: true,
    upperLimit: 3
  }

  componentDidMount() {
    this.fetchData();
  }

  handleUserInput(e) {
    this.setState({
      validForm:  e.target.value > 0,
      upperLimit: e.target.value
    });
  }

  fetchData() {
    fetch('/prime?n=' + this.state.upperLimit)
      .then(res => res.json())
      .then(medianResult => this.setState({ medianResult }));
  }

  getOutputString() {
    var results = this.state.medianResult;
    if (results.length === 0) {
      return 'There are no prime numbers less than ' + this.state.upperLimit;
    }
    if (results.length === 1) {
      return results[0] + ' is the median prime number'
    }
    return results[0] + ' and ' + results[1] + ' are the median prime numbers'
  }

  render() {
    return (
      <div className="App">
        <InputGroup>
          <Input invalid={!this.state.validForm} type="number" placeholder="Enter a number"
                 value={this.state.upperLimit} onChange={(event) => this.handleUserInput(event)} />
          <Button color="primary" disabled={!this.state.validForm} onClick={this.fetchData.bind(this)}>Get Median Prime Number(s)</Button>
        </InputGroup>
        <Alert>
          { this.getOutputString() }
        </Alert>
      </div>
    );
  }
}

export default App;
