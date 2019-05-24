import React from "react";
// import MovieList from "./json/testing.json";
import Table from "./components/Table.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      pages: [],
      key: false,
      isActive: 1,
      search: "",
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(`http://localhost:5000/details`)
      .then(response => response.json())
      .then(data => {
        let newArr = [...this.state.pages];
        for (let index = 0; index < data.data / 10; index++) {
          newArr[index] = index + 1;
        }
        this.setState({ pages: newArr, isLoading: false });
      }
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    return (
      <div className="list">
        <div className="topnav">
          <span>Employee List</span>
        </div>
        {this.state.isLoading ? <div>Loading...</div> :
          <div className="listHead">
            <Table
              pageNo={this.state.pageNo}
              key={this.state.key}
              searchKey={this.state.search}
            />
          </div>}
        <div className="footer">
          <ul className="pagination">
            <li>&laquo;</li>
            {this.state.pages.map((item, i) => (
              <li
                key={i}
                // className={this.state.isActive ? "active" : ""}
                onClick={() =>
                  this.setState({ pageNo: item, key: !this.state.key })
                }
              >
                {item}
              </li>
            ))}
            <li>&raquo;</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
