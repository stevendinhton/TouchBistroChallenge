import React, { Component } from 'react';
import './App.css';
import { InputGroup, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';

class App extends Component {
  state = {
    results: [],
    validForm: true,
    upperLimit: 3
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

  handleUserInput(e) {
    this.setState({
      validForm:  e.target.value > 0,
      upperLimit: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.validForm) this.fetchData();
  }

  fetchData() {
    var upperLimit = this.state.upperLimit;

    fetch('/prime?n=' + upperLimit)
      .then(res => res.json())
      .then(medians => this.setState(prevState => ({
        results: [{ upperLimit: upperLimit, medians: medians }, ...prevState.results]
      })));
  }

  clearResults() {
    this.setState({results: []});
  }

  getOutputString(result) {
    if (result.medians.length === 0) {
      return `There are no prime numbers less than ${result.upperLimit}`;
    }
    if (result.medians.length === 1) {
      return `${result.medians[0]} is the median for a set of prime numbers < ${result.upperLimit}`;
    }
    return `${result.medians[0]} and ${result.medians[1]} are the medians for a set of prime numbers < ${result.upperLimit}`;
  }

  renderResultsList(props) {
    const results = this.state.results;
    const listGroupItems = results.map((result, index) =>
      <ListGroupItem key={index}>
        {this.getOutputString(result)}
      </ListGroupItem>
    );
    return (
      <ListGroup>{listGroupItems}</ListGroup>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Median Finder</h1>
        <p>Gets the median prime number(s) of the set of prime numbers less than n</p>
        <InputGroup>
          <Input invalid={!this.state.validForm} type="number" placeholder="Enter a positive integer"
                 value={this.state.upperLimit} onChange={(event) => this.handleUserInput(event)}
                 onKeyPress={this.handleKeyPress.bind(this)} />
          <Button color="primary" disabled={!this.state.validForm} onClick={this.fetchData.bind(this)}>Find Medians</Button>
          <Button color="secondary" onClick={this.clearResults.bind(this)}>Clear</Button>
        </InputGroup>
        { this.renderResultsList() }
      </div>
    );
  }
}

export default App;
