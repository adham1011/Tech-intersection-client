import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header/Header";
//import Fgraph from "./components/F-Graph/Fgrpaph";
import Filter from "./components/F-Graph/mainBubble";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Header />
          <Filter />
        </div>
      </Provider>
    );
  }
}

export default App;
