import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import "./Intersection.css";
import { getLanguageTags,removeFromComp,compareLanguagesByTags } from "../../actions/languageActions";
import AutoComplete from "../AutoComplete";

class Intersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
		border: false,
      array: [],
      first:"",
      second:"",
      border1:{
        source:"",
        tag:""
      },
      border2:{
        source:"",
        tag:""
      }
    };
    this.selected = this.selected.bind(this);
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
    if(this.state.array.length===0)
      this.setState({first:value})
    else this.setState({second:value})
  
    this.forceUpdate();
   
  }
  remove(element) {

	this.props.removeFromComp(element);
  this.setState({first:element})
  this.setState({second:""})
    console.log(element);
    this.setState(prevState => ({
      array: prevState.array.filter(lang => lang !== element)
	}));
	
    
  }
  addBorder1(source,tag){
    console.log(tag)
  this.setState({border1: {source:source, tag:tag }})
   if(this.state.border2.tag !== "")
   {
    const newComp = {
      first: this.state.border1,
      second: this.state.border2
    };
      this.props.compareLanguagesByTags(newComp)
      console.log(this.state.border2)
   }
  }
  addBorder2(source,tag){
    console.log(tag)
    this.setState({border2: {source:source, tag:tag }})
    if(this.state.border1.tag !== "")
    {
      const newComp = {
        first: this.state.border1,
        second: this.state.border2
      };
       this.props.compareLanguagesByTags(newComp)
       console.log(this.state.border1)
    }
  }
  
  render() {
   

    var data = this.props.compLanguages;
    console.log(data);
   
     let index;
     let index2;
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
          <div className="flex_conatiner">
            <div className="flex_center">
              {Object.entries(data).length !== 0 &&
              	data.length >1? (

                <div>
                  {console.log(this.props.compLanguages)}
                  
                   
                    {(this.state.first===data[0].source?  index=0: index=1)}
                  {data[index].year.map(yr => {
                    return (
                      <div>
                        <div className=" h4 text-center">{yr.year}</div>
                        <div className=" h5  text-center">Tags Count: {yr.count}</div>
						<div className="explore">
                              <div className="exploreContainer">
                        {yr.tags
                          .sort((a, b) => b.hits - a.hits)
                          .slice(0, 21)
                          .map(tag => {
                            return (
								<div >
								<div className="card card-1 " onClick={this.addBorder1.bind(this,data[index].source,tag.tag)}>
								<section className="center_hero h1_lanaguage">
											<h1 style={{fontSize: 20,fontWeight:700}}>{tag.tag}</h1>
											<h2 style={{fontSize: 20}}>{tag.hits}</h2>
										  </section>
								</div>
								</div>
							
                             
                              
                            );
						  })}
						  </div>	</div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
			<div className="flex_center">
			{Object.entries(data).length !== 0 &&
			data.length >1
			? (
                <div>
                  {console.log(this.props.compLanguages)}
                  {(this.state.second===data[1].source?  index2=1: index2=0)}
                  {data[index2].year.map(yr => {
                    return (
                      <div>
                        <div className=" h4 text-center">{yr.year}</div>
                        <div className=" h5  text-center">Tags Count: {yr.count}</div>
						<div className="explore">
                              <div className="exploreContainer">
                        {yr.tags
                          .sort((a, b) => b.hits - a.hits)
                          .slice(0, 21)
                          .map(tag => {
                            return (
								<div >
								<div className="card card-1 " onClick={this.addBorder2.bind(this,data[index2].source,tag.tag)}>
								<section className="center_hero h1_lanaguage">
											<h1 style={{fontSize: 20,fontWeight:700}}>{tag.tag}</h1>
											<h2 style={{fontSize: 20}}>{tag.hits}</h2>
										  </section>
								</div>
								</div>
							
                             
                        );
						  })}
						  </div>	</div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
				
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
  removeFromComp:PropTypes.func.isRequired,
  compareLanguagesByTags:PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  languages: state.languages.languages,
  compLanguages: state.languages.compLanguages
});
export default connect(
  mapStatetoProps,
  {
    getLanguageTags,removeFromComp,compareLanguagesByTags
  }
)(Intersection);
