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
      username: this.props.user ? this.props.user : "Guest",
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
         {this.props.activeRoom}
      </div>

      {this.state.messages
        .filter(message => {
          console.log(message.roomId + "is equal to" + this.props.activeRoomId + "?" + message.roomId == this.props.activeRoomId)
          return message.roomId == this.props.activeRoomId;
        }).sort((a, b) => {
          console.log(a.sentAt + " vs " + b.sentAt + "; " + typeof a.sentAt);
          return a.sentAt - b.sentAt;
        }).map((message, i) => (
          <div key={i} className="messageBubble">
            <ul>
              <li className="messageContent"> {message.content}</li>
              <li className="userSignature"> -{message.username}</li>
              <li> {message.sentAt}</li>
            </ul>
          </div>
        ))
      };

          <div className = "newMessageTextBox">
              <form
              id = "messageTextBox"
              onSubmit={ e => {
                e.preventDefault();
                this.createMessage(this.state.newMessageContent);
              }}>
              <input
              type = "text"
              id = "messageInput"
              value = {this.state.newMessageContent}
              onChange = { (e) => this.handleChange(e) } />
              <div className="wrapTwo">
                <input type = "submit" value="Send" id="sendButton"/>
              </div>
              </form>
          </div>
      </React.Fragment>
    )
  }
}



export default MessageList;
