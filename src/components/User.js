import React, { Component } from 'react';


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut = () => {
    this.props.firebase.auth().signOut();
  }


  render() {
    return (
      <React.Fragment>
      <div className="currentUser">
        <div>Current User: {this.props.user}</div>
        <button type="submit" onClick={this.signInWithPopup}>Sign In</button>
        <button type="submit" onClick={this.signOut}>Sign Out</button>
        </div>
      </React.Fragment>
    );
  }
}

export default User;
