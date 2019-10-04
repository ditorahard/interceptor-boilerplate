import React from 'react';
import logo from './logo.svg';
import './Index.css';
import {getPokemon} from './Index.lib';
import {connect} from 'react-redux';
import { bindActionCreators, compose } from 'redux';

function App(){
  
  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    //Update the document title using the browser API
      getPokemon();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPokemon
}, dispatch);

const composed = compose(
  connect(mapStateToProps, mapDispatchToProps)
)
export default composed(App);
