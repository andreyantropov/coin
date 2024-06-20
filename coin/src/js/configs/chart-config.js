import { chartAreaBorder } from '../plugins/chart-plugins';

const chartConfig = {
  type: 'bar',
  options: {
    responsive: true,
    scales: {
      y: {
        position: 'right',
        beginAtZero: true,
        ticks: {
          count: 2,
          font: {
            size: 20,
            weight: 'bold',
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        reverse: true,
      },
    },
    plugins: {
      chartAreaBorder: {
        borderColor: 'black',
        borderWidth: 2,
      },
      title: {
        display: true,
        align: 'start',
        font: {
          size: 24,
          weight: 'bold',
        },
      },
    },
  },
  plugins: [chartAreaBorder],
};

export default chartConfig;
