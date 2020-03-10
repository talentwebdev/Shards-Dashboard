import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  Button
} from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";

class SalesReport extends React.Component {
  constructor(props) {
    super(props);

    this.legendRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps){
    
    const chartOptions = {
      ...{
        legend: false,
        // Uncomment the next line in order to disable the animations.
        // animation: false,
        tooltips: {
          enabled: false,
          mode: "index",
          position: "nearest"
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: false
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                userCallback(label) {
                  return label > 999 ? `${(label / 1000).toFixed(0)}k` : label;
                }
              }
            }
          ]
        }
      },
      ...this.props.chartOptions
    };

    if(prevProps.chartData !== this.props.chartData){
      const SalesReportChart = new Chart(this.canvasRef.current, {
        type: "bar",
        data: this.props.chartData,
        options: chartOptions
      });
  
      // Generate the chart labels.
      this.legendRef.current.innerHTML = SalesReportChart.generateLegend();
  
      // Hide initially the first and last chart points.
      // They can still be triggered on hover.
      const meta = SalesReportChart.getDatasetMeta(0);
      meta.data[0]._model.radius = 0;
      meta.data[
        this.props.chartData.datasets[0].data.length - 1
      ]._model.radius = 0;
  
      // Render the chart.
      SalesReportChart.render();
    }
    
  }

  render() {
    const { title } = this.props;

    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
          <div className="block-handle" />
        </CardHeader>

        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            {/* Time Interval */}
            <Col sm="6" className="col d-flex mb-2 mb-sm-0">
              <ButtonGroup>
                <Button theme="white">Hour</Button>
                <Button theme="white">Day</Button>
                <Button theme="white">Week</Button>
                <Button theme="white" active>
                  Month
                </Button>
              </ButtonGroup>
            </Col>

            {/* DatePicker */}
            <Col sm="6" className="col">
              <RangeDatePicker className="justify-content-end" />
            </Col>
          </Row>
          <div ref={this.legendRef} />
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
            className="sales-overview-sales-report"
          />
        </CardBody>
      </Card>
    );
  }
}

SalesReport.propTypes = {
  /**
   * The title of the component.
   */
  title: PropTypes.string,
  /**
   * The chart data.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

SalesReport.defaultProps = {
  title: "Sales Report",
  chartData: {}
};

export default SalesReport;
