import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import Loading from '../Loading/Loading';

const LineChart = ({
  data,
  title,
}) => {
  if (data.length < 3) return <p>Not enough workout data to display</p>;
  return (
    <Chart
      height={400}
      width="100%"
      chartType="LineChart"
      loader={<Loading />}
      data={data}
      options={{
        title,
        chartArea: { width: '75%', height: '75%' },
        colors: ['#00bcd4'],
        backgroundColor: '#303030',
        hAxis: {
          format: 'dd/MM/yy',
          textStyle: {
            color: '#fff',
          },
          titleTextStyle: {
            color: '#fff',
          },
        },
        titleTextStyle: {
          color: '#fff',
        },
        vAxis: {
          textStyle: {
            color: '#fff',
          },
          titleTextStyle: {
            color: '#fff',
          },
        },
        legend: 'none',
      }}
    />
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  title: PropTypes.string.isRequired,
};

export default LineChart;
