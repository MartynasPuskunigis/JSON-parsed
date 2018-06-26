import * as React from "react";
import * as ReactDOM from "react-dom";
import { User } from "./User";
import { data } from "./data";

interface State {
  baseuserdata: User[];
  userdata: User[];
  genderdata: User[];
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      baseuserdata: [],
      genderdata: [],
      userdata: []
    };
  }

  public componentDidMount(): void {
    this.setState({
      userdata: data,
      baseuserdata: data,
      genderdata: data
    });
  }

  protected setMaleFilter: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      genderdata: this.state.baseuserdata.filter(x => x.gender === "Male"),
      userdata: this.state.baseuserdata.filter(x => x.gender === "Male")
    });
  }

  protected setFemaleFilter: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    this.setState({
      genderdata: this.state.baseuserdata.filter(x => x.gender === "Female"),
      userdata: this.state.baseuserdata.filter(x => x.gender === "Female")
    });
  }
  protected resetFilter: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      genderdata: this.state.baseuserdata,
      userdata: this.state.baseuserdata
    });
  }

  protected setNameFilter: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({
      userdata: this.state.genderdata.filter(
        x =>
          (x.first_name != null
            ? x.first_name.startsWith(event.target.value)
            : "") ||
          (x.last_name != null
            ? x.last_name.startsWith(event.target.value)
            : "")
      )
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <button onClick={this.setMaleFilter}>Only Males</button>
        <button onClick={this.setFemaleFilter}>Only Females</button>
        <button onClick={this.resetFilter}>Reset</button><br></br>
        <label htmlFor="">Search by first name or last name:</label>
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
            {this.state.userdata.map((Data, i) =>
              (
                <tr key={i}>
                  <td>{Data.id}</td>
                  <td>{Data.first_name}</td>
                  <td>{Data.last_name}</td>
                  <td>{Data.email}</td>
                  <td>{Data.gender}</td>
                  <td>{Data.ip_address}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
