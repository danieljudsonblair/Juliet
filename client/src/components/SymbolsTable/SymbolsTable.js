import React from 'react';

const SymbolsTable = props => (
    <table>
      <thead>
        <th>Symbol</th>
      </thead>
      <tbody>
        {props.symbols.map(symbol => (
           <tr><td>{symbol.symbol}</td></tr>
         ))}
      </tbody>
    </table>
  );

  export default SymbolsTable;