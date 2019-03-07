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
               "data": [
                   {
                       "open": "18.74",
                       "high": "19.16",
                       "low": "18.67 ",
                       "close": "18.99",
                       "x": "4",
                       "volume": "4991285"
                   },
                   {
                       "open": "18.74",
                       "high": "19.06",
                       "low": "18.54",
                       "close": "18.82",
                       "x": "3",
                       "volume": "3615889"
                   },
                   {
                       "open": "19.21",
                       "high": "19.3",
                       "low": "18.59 ",
                       "close": "18.65",
                       "x": "2",
                       "volume": "4749586"
                   },
                   {
                       "open": "19.85",
                       "high": "19.86",
                       "low": "19.12",
                       "close": "19.4",
                       "x": "1",
                       "volume": "4366740"
                   }
                   
               ]
           }
       ],
       "trendlines": [
         {
           "line": [
             {
               "startvalue": "15",
               "endvalue": "20",
               "thickness": "1",
               "color": "#5D62B5",
               "displayvalue": "Average1"
             },
             {
               "startvalue": "14",
               "endvalue": "21",
               "thickness": "1",
               "color": "#5D62B5",
               "displayvalue": "Average2"
             }
           ]
         }
       ]
   }
 };
 
 // Step 8 - Creating the DOM element to pass the react-fusioncharts component
 class Chart extends React.Component {
   render() {
      return (
      <ReactFC
         {...chartConfigs}/>
      );
   }
 }
 
 
 
 export default Chart;