import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    userId: "",
    accessCode: "",
    accessToken: "",
    patientId: "",
    patientName: "",
    everything: "",
  };

  generateAccessCode = async () => {
    const accessCode = await fetch(`api/codes/${this.state.userId}`, {
      method: "POST",
    }).then((r) => r.json());
    this.setState({ accessCode: accessCode.code });
  };

  generateAccessToken = async (e) => {
    e.preventDefault();
    await this.generateAccessCode();
    const accessToken = await fetch(`api/tokens/${this.state.accessCode}`, {
      method: "POST",
    }).then((r) => r.json());
    this.setState({ accessToken: accessToken.access_token });
  };

  getPatientId = async (e) => {
    e.preventDefault();
    const patientId = await fetch(`api/patients`, {
      headers: new Headers({
        Authorization: `Bearer ${this.state.accessToken}`,
      }),
    }).then((r) => r.json());
    this.setState({ patientId: patientId.entry[0].resource.id });
    this.setState({ patientName: patientId.entry[0].resource.name[0].text });
  };

  getEverything = async (e) => {
    e.preventDefault();
    const everything = await fetch(`api/patients/${this.state.patientId}`, {
      headers: new Headers({
        Authorization: `Bearer ${this.state.accessToken}`,
      }),
    }).then((r) => r.json());
    this.setState({ everything: everything.entry });
  };

  render() {
    if (this.state.everything) {
      let entryList = this.state.everything.map((entry) => {
        return entry.resource.text.div;
      });

      return (
        <div className="App">
          <header className="App-header">
            <p>1upHealth Dashboard</p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: entryList }} />
        </div>
      );
    } else if (this.state.patientId) {
      return (
        <div className="App">
          <header className="App-header">
            <p>1upHealth Dashboard</p>
          </header>
          <button type="button" onClick={this.getEverything}>
            Get everything for patient {this.state.patientName}
          </button>
        </div>
      );
    } else if (this.state.accessToken) {
      return (
        <div className="App">
          <header className="App-header">
            <p>1upHealth Dashboard</p>
          </header>
          <p>
            <a
              className="App-link"
              href={`https://api.1up.health/connect/system/clinical/4707?client_id=ac4a5562a1fe5aaf1fa0db5399f3c1ad&amp;access_token=${this.state.accessToken}`}
              target="_blank"
              rel="noreferrer"
            >
              Connect to Cerner
            </a>
          </p>
          <button type="button" onClick={this.getPatientId}>
            Get patient
          </button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <p>1upHealth Dashboard</p>
          </header>
          <form onSubmit={this.generateAccessToken}>
            <input
              type="text"
              placeholder="Enter user ID"
              value={this.state.userId}
              onChange={(e) => this.setState({ userId: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }
}

export default App;
