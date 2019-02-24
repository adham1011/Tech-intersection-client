import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLanguages } from "../../actions/languageActions";
import { Chart } from "react-google-charts";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [["Language", "X", "Y", "Questions"]],
      flag: 0
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange = values => {
    this.setState({ values });
  };

  componentDidMount() {}
  render() {
    // const array = [ [ 'Year' ], [ '2013' ], [ '2014' ], [ '2015' ], [ '2016' ], [ '2017' ], [ '2018' ] ];

    //  var contnt = this.props.languages.map((language) => {
    //  	if (language.count > 30000) {
    //  		array[0].push(language.source);
    //  		array[1].push(language.years['2013']);
    //  		array[2].push(language.years['2014']);
    //  		array[3].push(language.years['2015']);
    //  		array[4].push(language.years['2016']);
    //  		array[5].push(language.years['2017']);
    //  		array[6].push(language.years['2018']);
    //  	}
    //  });

    /*   const array = [["Language", "X", "Y", "Questions"], ["Nidal", 5, 3, 30]];
    var contnt = this.props.languages.map(language => {
      if (language.count > 30000) {
        array.push([
          language.source,
          language.years[2018] - language.years[2013],
          language.count,
          language.count
        ]);
      }
    });
*/

    //IMPORTNAT LINE since every time we call the render we dont
    //want to push on top of old data we clear and then push
    this.state.graphData = [["Language", "X", "Y", "Questions"]];
    this.props.languages.map(language => {
      if (language.count > 30000) {
        this.state.graphData.push([
          language.source,
          language.years[this.props.values[0]] -
            language.years[this.props.values[1]],
          language.count,
          language.count
        ]);
        console.log(this.state.graphData);
      }
    });

    return (
      <div className="col-12 ">
        <Chart
          className="shadow"
          width={"100%"}
          height={"700px"}
          chartType="BubbleChart"
          loader={<div>Loading Chart</div>}
          data={this.state.graphData}
          options={{
            title:
              "Correlation between life expectancy, fertility rate " +
              "and population of some world countries (2010)",
            hAxis: { title: "Life Expectancy" },
            vAxis: { title: "Fertility Rate" },
            bubble: { textStyle: { fontSize: 11 } }
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
  }
}

BubbleChart.propTypes = {
  languages: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired
};
const mapStatetoProps = state => ({
  languages: state.languages.languages
});
export default connect(
  mapStatetoProps,
  {}
)(BubbleChart);
