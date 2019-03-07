import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext'


class Home extends Component {

  static contextType = AuthContext;
  state = {
    symbols: [],
    schField: ""
  }

  componentDidMount() {
    API.Symbols.get(this.context.authToken)
      .then(response => response.data)
      .then(symbols => this.setState({ symbols }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    let search = event.target.value.toUpperCase();
    this.setState({ schField: search });
  }

  handleSubmit = event => {
    event.preventDefault();
    API.Symbols.add(this.context.authToken, this.state.schField)
    .then(response => API.Symbols.get(this.context.authToken))
    .then(data => this.setState({
      symbols: data.data.symbols}))
      this.setState({ schField: "" });
  }

  handleClickRemove = symbol => {
    API.Symbols.remove(this.context.authToken, symbol)
    .then(response => API.Symbols.get(this.context.authToken))
    .then(data => this.setState({
      symbols: data.data.symbols}))
  }

  handleClickChart = symbolId => {
    API.History.get(this.context.authToken, symbolId)
    .then(response => console.log(response))

  }

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <header>
              <h1>Dashboard</h1>
            </header>
          </div>
          <div className="col-lg-1"></div>
        </div>

        <div className="row pos">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 tbl">
            <div className="tblhldr">
              <table className="tg">
                <tr>
                  <th className="tg-baqh" colspan="6">My Watched Symbols</th>
                </tr>
                <tr>
                  <td className="tg-hmp3">Symbol</td>
                  <td className="tg-hmp3">Name</td>
                  <td className="tg-hmp3">Last Price</td>
                  <td className="tg-hmp3">Go To Chart</td>
                  <td className="tg-hmp3">Remove</td>
                </tr>
                 {this.state.symbols.length && 
                  this.state.symbols.map(symbol => <tr><td className="tg-hmp3">{symbol.symbol}</td><td className="tg-hmp3">{symbol.name}</td><td className="tg-hmp3">${symbol.lastPrice}</td>
                  <td className="tg-hmp3"><Link to={`/symbol/${symbol.symbol}`} className="btn btn-primary">Chart</Link></td>
                  <td className="tg-hmp3"><div onClick={() => this.handleClickRemove(symbol.id)} className="btn btn-danger"> X </div></td>
                </tr>)}
              </table>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>

        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 fm">
            <form onSubmit={this.handleSubmit}>
              Lookup Symbol<br />
              <input className="symINPUT" type="text" name="symbol" value={this.state.schField} onChange={this.handleInputChange} /><br />
              <button className="subBTN" type="submit">Add Symbol</button>
            </form>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    );
  }
}

export default Home;
