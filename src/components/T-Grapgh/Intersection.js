import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Intersection.css";
import {
  getLanguageTags,
  removeFromComp,
  compareLanguagesByTags
} from "../../actions/languageActions";
import AutoComplete from "../AutoComplete";
import Spinner from "../common/Spinner";
import IntersectionSpinner from "../common/IntersectionSpinner";
import Chart from "react-google-charts";
import { Z_BLOCK } from "zlib";
class Intersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      border: false,
      array: [],
      first: "",
      second: "",
      border1: {
        source: "",
        tag: "",
        year: ""
      },
      border2: {
        source: "",
        tag: "",
        year: ""
      },
      modalIsOpen: false
    };
    this.selected = this.selected.bind(this);
    this.openModal = this.openModal.bind(this);
    this.mainSet = this.mainSet.bind(this);
  }

  closeModal() {
    this.setState({
      border2: { source: "", tag: "", year: "" },
      border1: { source: "", tag: "", year: "" }
    });
    this.setState({ modalIsOpen: false });
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  selected(value) {
    this.setState(prevState => ({
      array: [...prevState.array, value]
    }));
    if (this.state.array.length === 1) {
      this.state.array.forEach(element => {
        this.props.getLanguageTags(element);
      });
      this.props.getLanguageTags(value);
    }
    if (this.state.array.length === 0) this.setState({ first: value });
    else this.setState({ second: value });

    this.forceUpdate();
  }
  remove(element) {
    this.props.removeFromComp(element);
    this.setState({ first: element });
    this.setState({ second: "" });

    this.setState(prevState => ({
      array: prevState.array.filter(lang => lang !== element)
    }));
  }

  addBorder1(source, tag, year) {
    //this.setState({ border1: { source: source, tag: tag, year: year } });
    this.state.border1.source = source;
    this.state.border1.tag = tag;
    this.state.border1.year = year;
    if (
      this.state.border2.tag !== "" &&
      this.state.border2.year !== "" &&
      this.state.border2.source !== ""
    ) {
      console.log(this.state.border2);
      const newComp = {
        first: this.state.border1,
        second: this.state.border2
      };
      //this.setState({ modalIsOpen: true });

      this.props.compareLanguagesByTags(newComp);
      this.setState({ modalIsOpen: true });
    }
  }
  addBorder2(source, tag, year) {
    // this.setState({ border2: { source: source, tag: tag, year: year } });
    this.state.border2.source = source;
    this.state.border2.tag = tag;
    this.state.border2.year = year;
    if (this.state.border1.tag !== "") {
      console.log(this.state.border2);
      const newComp = {
        first: this.state.border1,
        second: this.state.border2
      };
      // this.setState({ modalIsOpen: true });

      this.props.compareLanguagesByTags(newComp);

      this.setState({ modalIsOpen: true });
    }
  }

  mainSet(source, tag, year) {
    if (source === this.state.first) {
      this.setState({ border1: { source: source, tag: tag, year: year } });
    } else {
      this.setState({ border2: { source: source, tag: tag, year: year } });
    }
  }

  render() {
    var data = this.props.compLanguages;
    const compLoading = this.props.language.compLoading;

    let index;
    let index2;

    const resultsLoading = this.props.language.resultsLoading;
    const compResults = this.props.language.compResults;

    console.log("loading:" + resultsLoading + "compResults" + compResults);

    var resultsContent;
    if (
      compResults === null ||
      resultsLoading ||
      Object.keys(compResults).length === 0
    ) {
      resultsContent = <IntersectionSpinner />;
    } else {
      resultsContent = (
        <div>
          <div className="flex_conatiner2">
            <div>
              <div className="explore" style={{ marginRight: 50 }}>
                <div className="exploreContainer">
                  <div>
                    <div className="card_4d card-21 ">
                      <section className="center_hero2 h1_lanaguage2">
                        <h1>{compResults.firstTag.source}</h1>
                        <h2>{compResults.firstTag.tag}</h2>
                        <h2 style={{ borderColor: "transparent" }}>
                          {compResults.firstTag.hits}
                        </h2>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="explore">
                <div className="exploreContainer">
                  <div>
                    <div className="card_5d  ">
                      <section className=" ">
                        <div id="container fly">
                          <div
                            id="left"
                            className="circle"
                            style={{ borderWidth: 3 }}
                          />
                          <div
                            id="right"
                            className="circle"
                            style={{ borderWidth: 3 }}
                          />
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="explore" style={{ marginLeft: 50 }}>
                <div className="exploreContainer">
                  <div>
                    <div className="card_4d card-21 ">
                      <section className="center_hero2 h1_lanaguage2">
                        <h1>{compResults.secondTag.source}</h1>
                        <h2>{compResults.secondTag.tag}</h2>
                        <h2 style={{ borderColor: "transparent" }}>
                          {compResults.secondTag.hits}
                        </h2>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-secondry text-uppercase font-weight-bold text-center m-4 margin15">
              the number of common qustions between the two tags{" "}
            </h2>
            <div className="flex_center">
              <h2 className="text-secondry text-uppercase font-weight-bold text-center m-4 h1  under_line">
                {compResults.intersectionArray.length}
              </h2>
            </div>
            <h4 className="text-secondry text-uppercase font-weight-bold text-center m-4 h3">
              Intersection Percentage
            </h4>
            <h4 className="text-secondry text-uppercase font-weight-bold text-center m-4 h5">
              {compResults.intersectionArray.length > 0
                ? Math.round(
                    compResults.intersectionArray.length /
                      Math.abs(
                        compResults.secondTag.hits -
                          compResults.intersectionArray.length -
                          (compResults.firstTag.hits -
                            compResults.intersectionArray.length)
                      )
                  ) + "%"
                : "0%"}
            </h4>
            <div className="flex_center">
              <Chart
                width={"1200px"}
                height={"800px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Task", "Hours per Day"],
                  ["common qustions", compResults.intersectionArray.length],
                  [
                    "all other qustion",
                    Math.abs(
                      compResults.secondTag.hits -
                        compResults.intersectionArray.length -
                        (compResults.firstTag.hits -
                          compResults.intersectionArray.length)
                    )
                  ]
                ]}
                options={{
                  fontSize: 20
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <section className="graph-main my-5 ">
        <div className="container shadow bg-white mb-5">
          <div className="row " style={{ paddingBottom: 100 }}>
            <div className="col-12 ">
              <h2 className="text-secondry text-uppercase font-weight-bold text-center m-4">
                SO HOW DO TAGS RELATE TO DIFFERENT PROGRAMMING LANGUAGES?{" "}
                <span className=" textSize">🤔</span>
              </h2>
              <h4 className="text-secondry text-center m-4">
                choose two languages...
              </h4>
            </div>
            <div
              className={
                this.state.array.length === 2
                  ? "col-4 mx-auto not_editable"
                  : "col-4 mx-auto"
              }
            >
              <AutoComplete
                items={this.props.languages.map(lang => lang.source)}
                selected={this.selected}
              />
            </div>
          </div>
          <div className="flex_conatiner">
            {this.state.array === null
              ? null
              : this.state.array.map((element, index) => {
                  return (
                    <div className="flex_center">
                      <div className="dialog shadow bg-black ">
                        {element}
                        <button
                          href="#"
                          className="close-thik"
                          onClick={this.remove.bind(this, element)}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
          {compLoading ? (
            <Spinner />
          ) : (
            <div className="flex_conatiner" style={{ minHeight: 700 }}>
              <div className="flex_center">
                {Object.entries(data).length !== 0 && data.length > 1 ? (
                  <div>
                    <span className="none">
                      {" "}
                      {this.state.first === data[0].source
                        ? (index = 0)
                        : (index = 1)}{" "}
                    </span>
                    {data[index].year.map(yr => {
                      return (
                        <div>
                          <div
                            className=" h4 text-center shadow-sm year_bg"
                            style={{ padding: 10 }}
                          >
                            {yr.year}
                          </div>

                          <div className="explore">
                            <div className="exploreContainer">
                              {yr.tags
                                .sort((a, b) => b.hits - a.hits)
                                .slice(0, 21)
                                .map(tag => {
                                  return (
                                    <div>
                                      <div
                                        className="card_3d card-1 "
                                        onClick={this.addBorder1.bind(
                                          this,
                                          data[index].source,
                                          tag.tag,
                                          yr.year
                                        )}
                                      >
                                        <section className="center_hero h1_lanaguage">
                                          <h1
                                            style={{
                                              fontSize: 20,
                                              fontWeight: 700
                                            }}
                                          >
                                            {tag.tag}
                                          </h1>
                                          <h2 style={{ fontSize: 20 }}>
                                            {tag.hits}
                                          </h2>
                                        </section>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>{" "}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="flex_center">
                {Object.entries(data).length !== 0 && data.length > 1 ? (
                  <div>
                    <span className="none">
                      {this.state.second === data[1].source
                        ? (index2 = 1)
                        : (index2 = 0)}
                    </span>
                    {data[index2].year.map(yr => {
                      return (
                        <div>
                          <div
                            className=" h4 text-center shadow-sm year_bg"
                            style={{ padding: 10 }}
                          >
                            {yr.year}
                          </div>

                          <div className="explore">
                            <div className="exploreContainer">
                              {yr.tags
                                .sort((a, b) => b.hits - a.hits)
                                .slice(0, 21)
                                .map(tag => {
                                  return (
                                    <div>
                                      <div
                                        className="card_3d card-1 "
                                        onClick={this.addBorder2.bind(
                                          this,
                                          data[index2].source,
                                          tag.tag,
                                          yr.year
                                        )}
                                      >
                                        <section className="center_hero h1_lanaguage">
                                          <h1
                                            style={{
                                              fontSize: 20,
                                              fontWeight: 700
                                            }}
                                          >
                                            {tag.tag}
                                          </h1>
                                          <h2 style={{ fontSize: 20 }}>
                                            {tag.hits}
                                          </h2>
                                        </section>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>{" "}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div
            className={
              this.state.modalIsOpen ||
              (this.state.border1.tag !== "" && this.state.border2.tag !== "")
                ? "modal showModal"
                : "modal"
            }
          >
            <div className="modal-content">
              <button className="close" onClick={this.closeModal.bind(this)}>
                close
              </button>
              {resultsContent}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
Intersection.propTypes = {
  getLanguageTags: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired,
  compLanguages: PropTypes.array,
  removeFromComp: PropTypes.func.isRequired,
  compareLanguagesByTags: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  languages: state.languages.languages,
  language: state.languages,
  compLanguages: state.languages.compLanguages
});
export default connect(
  mapStatetoProps,
  {
    getLanguageTags,
    removeFromComp,
    compareLanguagesByTags
  }
)(Intersection);

//<div className=" h5  text-center">Tags Count: {yr.count}</div>
// <span >&times;</span>
