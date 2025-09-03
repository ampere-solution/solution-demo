"use client";

import React, {useState} from 'react'
import createPlotlyComponent from "react-plotly.js/factory";
import PlotlyBasic from "plotly.js-basic-dist";

const Plot = createPlotlyComponent(PlotlyBasic);

interface IPoints {
  traceID: string;
  startTime: number;
  duration: number;
  spanCount: number;
}

type Service = "database" | "cache" | "web-server" | "load-balancer";

type ArchType = "X86" | "ARM";

const DsbGraph = ({}: {
  service: Service,
  archType?: ArchType,
  refreshKey: number
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, _] = useState<IPoints[] | []>([]);

  return (
    <Plot
      data={[
        {
          x: data.map(d => new Date(d.startTime / 1000)),
          y: data.map(d => d.duration / 1000),
          mode: "markers",
          line: {color: "red", width: 2},
          marker: {size: 4}
        }
      ]}
      layout={{
        margin: {t: 10, l: 35, r: 10, b: 25}, // small margins
        autosize: true,
        height: 90,             // lock slim height
        xaxis: {
          showgrid: false,
          zeroline: false,
          showline: true,
          tickfont: {size: 10},
        },
        yaxis: {
          showgrid: true,
          zeroline: false,
          showline: true,
          tickfont: {size: 10},
          // title: "Duration"
        },
        showlegend: false
      }}
      style={{width: "100%", height: "100%"}}
      useResizeHandler={true}
      config={{displayModeBar: false}}
    />
  )
}
export default DsbGraph
