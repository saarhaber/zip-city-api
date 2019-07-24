import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
         Zip Search
        </p>
      </header>
      <City/>
    </div>
  );
}

class City extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    Zip: "",
    data: [],
  }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  search = async () => {
    this.setState({name: this.state.value})
    const zip = this.state.Zip
    try{ const { data } = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
    this.setState({data: data})}
    catch(err) {
      alert("no zip code exists")
    }
    };

  render() {
    const dataObj = this.state.data;
    const list = dataObj.map((dataObj) =>
    <ul>
       {dataObj.City + "\n"}
      <li> State: {dataObj.State + "\n"} </li>
      <li> Location: ({dataObj.Lat + ","  + dataObj.Long +")\n"} </li>
			<li> Population: {dataObj.EstimatedPopulation + "\n"} </li>
      <li> Total Wages: {dataObj.TotalWages}</li>
      </ul>
			);
    return (
      <div>
        <h3>Zip Code: <input type="text" name="Zip" 
      onChange={this.handleChange}/></h3>
        <button onClick={this.search}>Search</button>
        <br></br><br></br>
          {list}
      </div>
    );
  }



} // closing City

export default App;
