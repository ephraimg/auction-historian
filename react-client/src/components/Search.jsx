import $ from 'jquery';
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  handleClick() {
    console.log('Searched ', this.state.searchText);
    var query = JSON.stringify(this.state.searchText);
    // send search req to server, wait for response
    $.ajax({
      type: 'POST',
      url: '/search',
      contentType: 'application/json',
      data: query,
      processData: false,
      success: (data) => {
        // var refined = this.refineData(data);
        // console.log(refined);
        console.log('search.jsx 36: got data');
        this.props.updateDisplayedAuctions(data);
      },
      error: (err) => {
        console.log('search.jsx 38: err', err);
      }
    });
  }


  render() {
    return (<div>
      <div>
        <input className="search-field"
          onChange={this.handleChange}>
        </input>
      </div>
      <div>
        <button style={{float: "right"}} 
          onMouseUp={(e)=>e.target.blur()}
          className="search-button"
          onClick={this.handleClick}
        > 
          Search ebay auctions</button>
      </div>
    </div>)
  }

}

export default Search;