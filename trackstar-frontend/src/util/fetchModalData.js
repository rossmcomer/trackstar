import axios from 'axios'
import ApexCharts from 'apexcharts'

export const fetchModalData = async (selectedCrypto) => {
    try {
      const result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCrypto.id}/market_chart?vs_currency=usd&days=90`,
      )

      const prices = result.data.prices

      let options = {
        series: [
          {
            name: `${selectedCrypto.symbol.toUpperCase()}/USD`,
            data: prices.map((price) => [
              new Date(price[0]).getTime(),
              price[1],
            ]),
          },
        ],
        grid: {
          borderColor: '#000000',
          xaxis: {
            lines: {
              show: true,
              color: '#1c19ec',
            }
          }
        },
        stroke: {
          colors: ['#1c19ec']
        },
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
          },
        },
        title: {
          text: `${selectedCrypto.name}`,
          align: 'left',
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
            gradientToColors: ['#1c19ec']
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(2)
            },
          },
          title: {
            text: 'Price/USD',
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: true,
          y: {
            formatter: function (val) {
              return val.toFixed(4)
            },
          },
        },
      }
      const chart = new ApexCharts(
        document.querySelector('#cryptoChart'),
        options,
      )
      chart.render()
    } catch (error) {
      console.error('Error fetching historical data:', error)
    }
  }