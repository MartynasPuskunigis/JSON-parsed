import * as React from "react";
import * as ReactDOM from "react-dom";
import { User } from "./User";
import { data } from "./data";
import "./index-styles.css";

interface State {
  baseUserData: User[];
  userData: User[];
  genderData: User[];
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      baseUserData: [],
      genderData: [],
      userData: []
    };
  }

  public componentDidMount(): void {
    this.setState({
      userData: data,
      baseUserData: data,
      genderData: data
    });
  }

  protected setMaleFilter: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      genderData: this.state.baseUserData.filter(x => x.gender === "Male"),
      userData: this.state.baseUserData.filter(x => x.gender === "Male")
    });
  };

  protected setFemaleFilter: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    this.setState({
      genderData: this.state.baseUserData.filter(x => x.gender === "Female"),
      userData: this.state.baseUserData.filter(x => x.gender === "Female")
    });
  };
  protected resetFilter: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      genderData: this.state.baseUserData,
      userData: this.state.baseUserData
    });
  };

  protected setNameFilter: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({
      userData: this.state.genderData.filter(
        x =>
          (x.first_name != null
            ? x.first_name.startsWith(event.target.value)
            : "") ||
          (x.last_name != null
            ? x.last_name.startsWith(event.target.value)
            : "")
      )
    });
  };

  public render(): JSX.Element {
    return (
      <div>
        <div className="options">
          <div className="buttons">
            <div className="button"><button onClick={this.setMaleFilter}>Only Males</button></div>
            <div className="button"><button onClick={this.setFemaleFilter}>Only Females</button></div>
            <div className="button"><button onClick={this.resetFilter}>Reset</button></div>
          </div>
          <div className="search">
            <label htmlFor="">Search by first name or last name:</label>
            <input onChange={this.setNameFilter} type="text" />
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Gender</td>
                <td>IP Address</td>
              </tr>
            </thead>
            <tbody>
              {this.state.userData.map((user, i) => (
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
