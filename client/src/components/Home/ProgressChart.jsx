import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';

const ProgressChart = ({
  data,
}) => (
  <Chart
    height={400}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={data}
    options={{
      hAxis: {
        title: 'Time',
      },
    }}
  />
);

ProgressChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
