import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Intersection.css";
import { getLanguageTags } from "../../actions/languageActions";
import AutoComplete from "../AutoComplete";

class Intersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
    this.selected = this.selected.bind(this);
  }
  selected(value) {
    this.setState(prevState => ({
      array: [...prevState.array, value]
    }));
    if (this.state.array.length === 1) {
      //	console.log("req")
      this.state.array.forEach(element => {
        this.props.getLanguageTags(element);
      });
      this.props.getLanguageTags(value);
    }
    // console.log(this.state.array);
  }
  remove(element) {
    //console.log(e)

    console.log(element);
    this.setState(prevState => ({
      array: prevState.array.filter(lang => lang !== element)
    }));
    //console.log(index);
  }
  render() {
    //const { text } = this.state;
   // var data = [].concat(this.props.language["year"])[0];
   // let content = {};
    // var array = data;
    /*message for mahmoud*/

    //#you can see what happening here !!! the thing is weird
    //# you can add tags.sort((a, b) => b.hits - a.hits).slice(0,21) after the search query in service,
	//much better than to handle this in the client, try to print (data) and you can see that u can't track it
	

    const { language } = this.props.language;
    let LanguageContent;
    if (language === {} ) {
      LanguageContent = null;
    } else {
     /* LanguageContent = (
        <div>
          <div> {language.source}</div>
          <div> {language.count}</div>
        </div>
	  );
	  */
      console.log(this.props.language);
    }

    return (
      <section className="graph-main my-5 ">
        <div className="container shadow bg-white mb-5">
          <div className="row ">
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
                    <div className="dialog shadow bg-black">
                      {element}
                      <button
                        href="#"
                        className="close-thik"
                        onClick={this.remove.bind(this, element)}
                      />
                    </div>
                  );
                })}
          </div>
          <div className="flex_conatiner">{LanguageContent}</div>
        </div>
      </section>
    );
  }
}
Intersection.propTypes = {
  getLanguageTags: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired,
  language: PropTypes.object
};
const mapStatetoProps = state => ({
  languages: state.languages.languages,
  language: state.languages.language
});
export default connect(
  mapStatetoProps,
  {
    getLanguageTags
  }
)(Intersection);
