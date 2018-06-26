import * as React from "react";
import * as ReactDOM from "react-dom";
import { User } from "./User";
import { data } from "./data";

interface Props {}

interface State {
  baseuserdata: User[];
  userdata: User[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      baseuserdata: [],
      userdata: []
    };
  }

  public componentDidMount() {
    this.setState({
      userdata: data,
      baseuserdata: data
    });
  }

  protected setMaleFilter: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      userdata: this.state.baseuserdata.filter(x => x.gender === "Male")
    });
  };

  protected setFemaleFilter: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    this.setState({
      userdata: this.state.baseuserdata.filter(x => x.gender === "Female")
    });
  };
  protected resetFilter: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      userdata: this.state.baseuserdata
    });
  };

  protected setNameFilter: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({
      userdata: this.state.baseuserdata.filter(x =>
        x.first_name != null ? x.first_name.startsWith(event.target.value) : ""
      )
    });
  };

  public render(): JSX.Element {
    return (
      <div>
        <button onClick={this.setMaleFilter}>Male</button>
        <button onClick={this.setFemaleFilter}>Female</button>
        <button onClick={this.resetFilter}>Reset</button>
        <input onChange={this.setNameFilter} type="text" />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userdata.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.id}</td>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>{data.email}</td>
                  <td>{data.gender}</td>
                  <td>{data.ip_address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
