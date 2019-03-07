 // Step 1 - Including react
 import React from 'react';
 
 
 // Step 2 - Including the react-fusioncharts component
 import ReactFC from 'react-fusioncharts';
 
 // Step 3 - Including the fusioncharts library
 import FusionCharts from 'fusioncharts';
 
 // Step 4 - Including the chart type
 import Charts from 'fusioncharts/fusioncharts.powercharts';
 
 // Step 5 - Including the theme as fusion
 import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
 
 // Step 6 - Adding the chart as dependency to the core fusioncharts
 ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
 
 // Step 7 - Creating the JSON object to store the chart configurations
 
 
 // Step 8 - Creating the DOM element to pass the react-fusioncharts component
 class Chart extends React.Component {

    
   render() {

    const chartConfigs = {
        type: 'candlestick',// The chart type
        width: '700', // Width of the chart
        height: '400', // Height of the chart
        dataFormat: 'json', // Data type
        dataSource: {
          "chart": {
              "caption": "Daily Stock Price HRYS",
              "subCaption": "Last 2 months",
              "numberprefix": "$",
              "pyaxisname": "Price",
              "vyaxisname": "Volume",
              "volumeHeightPercent": "20",
              "showvolumechart": "1",
              "vNumberPrefix": "",
              "theme": "fusion"
          },
          "categories": [],
          "dataset": [ // import data here
              {
                  "data": this.props.historicalData
              }
          ]
      }
    };
      return (
        <>
        <button onClick={this.props.onClick}>Close Chart</button>
      <ReactFC
         {...chartConfigs}/>
      </>
      );
   }
 }
 
 
 
 export default Chart;