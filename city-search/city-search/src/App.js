import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          City Search
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
    City: "",
    data: [],
  }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange (event) {
    this.setState({[event.target.name]: event.target.value.toUpperCase()})
  }

  search = async () => {
    this.setState({name: this.state.value})
    const city = this.state.City
    try{ const { data } = await axios.get(`http://ctp-zip-api.herokuapp.com/city/${city}`)
    console.log(data);
    this.setState({data: data})}
    catch(err) {
      alert("no city exists")
    }
    };

  render() {
    const dataObj = this.state.data;
    const list = dataObj.map((dataObj) =>
    <div id="x"> {dataObj}</div>
			);
    return (
      <div>
        <h3>City Name: <input type="text" name="City" 
      onChange={this.handleChange}/></h3>
        <button onClick={this.search}>Search</button>
        <br></br><br></br>
          <div >{list}</div>
      </div>
    );
  }



} // closing City

export default App;
