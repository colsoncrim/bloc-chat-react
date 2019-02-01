import React, { Component } from 'react';



class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      newMessageContent:null
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {

      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  createMessage(newMessage) {
    this.messagesRef.push({
      username: this.props.currentUser ? this.props.user.displayName: "Guest",
      content: this.state.newMessageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomId
    });
    this.setState({
      newMessageContent:''
    });
  }

  handleChange(e) {
    this.setState({newMessageContent: e.target.value});
  }

  render() {

    const activeRoomId = this.props.activeRoomId
    return (
    <React.Fragment>
      <div className="activeRoom">
        Active Room: {this.props.activeRoom}
      </div>

      {this.state.messages
        .filter(message => {
          console.log(message.roomId + "is equal to" + this.props.activeRoomId + "?" + message.roomId == this.props.activeRoomId)
          return message.roomId == this.props.activeRoomId;
        })
        .map((message, i) => (
          <div>
            <p key={i}>Message content: {message.content}</p>

            <p key={i}>Username: {message.username}</p>
            <p key={i}>Sent at: {message.sentAt}</p>
          </div>

        ))};

          <div className = "newMessageTextBox">
            <h3 className = "newMessageHeader">Write your message here...</h3>
              <form
              id = "messageTextBox"
              onSubmit={ e => {
                e.preventDefault();
                this.createMessage(this.state.newMessageContent);
              }}>
              <input
              type = "text"
              id = "roomName"
              value = {this.state.newMessageContent}
              onChange = { (e) => this.handleChange(e) } />
              <input type = "submit" />
              </form>
          </div>

      </React.Fragment>
    )
  }
}



export default MessageList;
