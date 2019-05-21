import React from "react";
import Search from "./Search";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataSearch: [],
      begin: 0,
      end: 100,
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    let pageNo = this.props.pageNo
    fetch('http://localhost:5000/details', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageNo: pageNo
      }),
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data.data, isLoading:false })
      }
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  filterSearch = searchKey => {
    var newArr = this.state.dataSearch.filter(item => {
      return item.title.toLowerCase().includes(searchKey);
    });
    this.setState({ data: newArr });
  };

  sortUsingDate = () => {
    let sortedCars1 = this.state.data.sort(
      (a, b) =>
        new Date(...a.joinnig_date.split("/").reverse()) -
        new Date(...b.joinnig_date.split("/").reverse())
    );
    this.setState({ data: sortedCars1 });
  };

  sortByTitle(a, b) {
    const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    return diff;
  }

  sortByTitle1 = () => {
    let newArr = this.state.data.sort((a, b) => this.sortByTitle(a, b));
    this.setState({ data: newArr });
  };
  render() {
    return (
      <div>
        <Search search={this.filterSearch} />
        <table>
          <thead>
            <tr className="tablehead">
              <th>Employee id</th>
              <th onClick={this.sortByTitle1}>Employee name</th>
              <th onClick={this.sortUsingDate}>Joining date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, i) => (
              <tr key={i}>
                <td>{item.employee_id}</td>
                <td>{item.name}</td>
                <td>{item.joinnig_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Table;
