import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';

const ProgressChart = ({
  data,
}) => {
  if (data.length < 3) return <p>No data to display</p>;
  return (
    <Chart
      height={400}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: '1RM Progress (Calculated One Rep Max Kg)',
        colors: ['#00bcd4'],
        chartArea: { width: '75%', height: '75%' },
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

ProgressChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default ProgressChart;
