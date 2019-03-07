import React, { Component } from 'react';
import SymbolsTable from '../SymbolsTable';
import axios from 'axios';
import API from '../../lib/API';


class WatchedSymbolsContainer extends Component {
    state = {
      symbols: []
    }
    
    componentDidMount() {
    API.Symbols.get()
    .then(symbols => console.log(symbols))
    .catch(err => console.log(err)); 
    }
      
    render() {
      return <SymbolsTable symbols={this.state.symbols} />;
    }
  }