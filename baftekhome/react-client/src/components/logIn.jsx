import React from "react";
import $ from "jquery";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  checkUser(email, password) {
    var obj = {
      email: email,
      password: password
    };
    $.ajax({
      method: "POST",
      url: `/api/users`,
      data: JSON.stringify(obj),
      contentType: "application/json"
    }).done((res) => {
      if (res) {
        this.props.getUser(res.docs);
        window.localStorage.setItem("accessToken", res.token);
        this.props.changeView("home");
      }
    });
  }

  render() {
    return (
      <div>
        <labe className="label">Email:</labe>
        <br></br>
        <input
          className="input"
          id="logEmail"
          type="email"
          placeholder="Email"
        />
        <br></br>
        <labe className="label">Password:</labe>
        <br></br>
        <input
          className="input"
          id="logPassword"
          type="password"
          placeholder="Pasword"
        />
        <br></br>
        <button
          className="btn"
          onClick={() => {
            this.checkUser($("#logEmail").val(), $("#logPassword").val());
          }}>
          Log In
        </button>
      </div>
    );
  }
}

export default LogIn;
