import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
    public render(): JSX.Element {
        return <div>Index</div>;
    }
}

ReactDOM.render(<App />, document.getElementById("react-app"));