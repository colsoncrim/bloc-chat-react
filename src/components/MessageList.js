import React, { Component } from 'react';



class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [],
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
    this.messageRef.push({
      username: this.props.currentUser ? this.props.currentUser: "userOne",
      content: this.state.newMessageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomId
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
            <p key={i}>Room ID: {message.roomId}</p>
            <p key={i}>Username: {message.username}</p>
            <p key={i}>Sent at: {message.sentAt}</p>
          </div>
        ))};

      </React.Fragment>
    )
  }
}



export default MessageList;
