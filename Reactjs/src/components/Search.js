import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  handleInputValue = e => {
    this.setState({ search: e.target.value });
    this.props.search(e.target.value);
  };
  render() {
    return (
      <div>
        <div className="search-container">
          <form action="/action_page.php">
            <input
              type="text"
              placeholder="Search.."
              name="search"
              onChange={this.handleInputValue}
            />
            <button type="submit">
              <i className="fa fa-search" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Search;
