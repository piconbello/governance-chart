import React from 'react';

import './App.css';
import Chart from 'react-apexcharts'
import Loader from 'react-loader-spinner'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    this.getGovernenceData();
  }

  getGovernenceData = () => {
    let names = [];
    let data = [];
    let piconbelloValue = 0;
    let twentytwothValue = 0;
    let totalValue = 0;
    let counter = 0;
    fetch('https://tracker.icon.foundation/v3/iiss/prep/list?count=500')
      .then(function (response) {
        return response.json();
      })
      .then((myJson) => {
        myJson.data.forEach(prep => {
          counter++;
          names.push(counter + ' - ' + prep.name);
          data.push(prep.delegated)

          if (prep.name.toLowerCase().includes("piconbello")) {
            piconbelloValue = prep.delegated;
          }
          if (myJson.data.indexOf(prep) === 21) {
            twentytwothValue = prep.delegated;
            totalValue = prep.totalDelegated;
          }
        });

        this.setState({
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              }
            },
            xaxis: {
              categories: names,

            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: undefined,
              formatter: function (val, opts) {
                return "%" + (val / totalValue * 100).toFixed(2)
              },
              offsetX: 150,
              offsetY: 0,
              style: {
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                colors: ['white'],
                fontWeight: 'bold'
              },
              dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                opacity: 0.45
              }
            },
            colors: [function ({ value, seriesIndex, w }) {
              if (piconbelloValue === value) {
                return '#01b8cc'
              }
              else if (value > twentytwothValue && value > 1600000) {
                return '#0abf53'
              }
              else {
                return '#D9534F'
              }
            }],
            theme: {
              mode: 'dark',
              palette: 'palette4',
            },
            grid: {
              show: true,
              borderColor: '#90A4AE',
              strokeDashArray: 0,
              position: 'back',
              xaxis: {
                lines: {
                  show: false
                }
              },
              yaxis: {
                lines: {
                  show: false
                }
              },
              row: {
                colors: undefined,
                opacity: 0.5
              },
              column: {
                colors: undefined,
                opacity: 0.5
              },
              padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              },
            }

          },
          series: [{
            name: 'Delegated ICX',
            data
          }]
        })
      });


  }

  render() {
    return (


      <div id="chart" style={{ marginTop: 100, textAlign: 'center', justifyContent: 'middle' }}>
        {this.state.options
          ?
          <Chart options={this.state.options} series={this.state.series} type="bar" height="700" />
          :
          <Loader
            type="Puff"
            color="#00BFFF"
            height="100"
            width="100"
          />}
      </div>


    );
  }
}


export default App;
