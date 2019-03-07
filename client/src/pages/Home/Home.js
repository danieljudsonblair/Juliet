import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext'
import Chart from '../../components/ChartContainer/ChartContainer'


class Home extends Component {

  static contextType = AuthContext;
  state = {
    symbols: [],
    schField: "",
    historicalData: [],
    showChart: false,
    chartOptions: {
      "caption": "Daily Stock Price HRYS",
      "subCaption": "1000 Day History",
      "numberprefix": "$",
      "pyaxisname": "Price",
      "vyaxisname": "Volume",
      "volumeHeightPercent": "20",
      "showvolumechart": "1",
      "vNumberPrefix": "",
      "theme": "fusion"
    }
  }

  componentDidMount() {
    API.Symbols.get(this.context.authToken)
    .then(data => this.setState({
      symbols: data.data.symbols}))
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

  handleClickChart = (symbolId, symbol) => {
    API.History.getIndividual(this.context.authToken, symbolId, symbol)
    .then(response => response.data)
    .then(data => data.map((history, i) => {
      history.x = data.length - i;
      return history
    }))
    .then(data => this.setState({historicalData: data, showChart: true, chartOptions:{
      "caption": symbol,
      "subCaption": "1000 Day History",
      "numberprefix": "$",
      "pyaxisname": "Price",
      "vyaxisname": "Volume",
      "volumeHeightPercent": "20",
      "showvolumechart": "1",
      "vNumberPrefix": "",
      "theme": "fusion"
    }}));
  }

  handleChartClosure = () => {
    this.setState({ showChart: false })
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
                {this.state.showChart && <Chart onClick={this.handleChartClosure} chartOptions={this.state.chartOptions} historicalData={this.state.historicalData}/>}
                <br/><br/>
            <div className="tblhldr">
              <table className="tg">
                <tbody>
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
                  <td className="tg-hmp3"><div className="btn btn-primary" onClick={() => this.handleClickChart(symbol.id, symbol.name)}>Chart</div></td>
                  <td className="tg-hmp3"><div onClick={() => this.handleClickRemove(symbol.id)} className="btn btn-danger"> X </div></td>
                </tr>)}
                </tbody>
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
