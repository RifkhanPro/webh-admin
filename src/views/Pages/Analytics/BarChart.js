import React from 'react'
import { Bar } from 'react-chartjs-2'
import "chartjs-plugin-datalabels"

function BarChart(props) {

  return (
    <Bar data={props.data} options={props.options} />
  )
}

export default BarChart
