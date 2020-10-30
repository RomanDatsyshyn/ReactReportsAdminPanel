import React, { Component } from "react";

export default class ItemMessage extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="bg-light mb-3 p-3">
        <div className="col-12 word-wrap">
          <h5>Basic:</h5>
          Date: {data.date} | Message ID: {data.messageId} | Peer ID:
          {data.peerId} | Reason: {data.reason} | Other reason:{" "}
          {data.reasonOther} | User ID: {data.userId}
          <hr />
        </div>
        <div className="col-12 word-wrap">
          <h5>User:</h5>
          User ID: {data.data.user.id} | First name: {data.data.user.firstName}{" "}
          | Last name:
          {data.data.user.lastName} | Phone: {data.data.user.phone} | Username:
          {data.data.user.username} | Deleted: {data.data.user.deleted} |{" "}
          Deleted at: {data.data.user.deletedAt} | Online at:{" "}
          {data.data.user.onlineAt}
          <hr />
        </div>

        <div
          style={{
            display: data.data.channel !== undefined ? "block" : "none",
          }}
          className="col-12 word-wrap"
        >
          <h5>Channel:</h5>
          ID: {data.data.channel !== undefined ? data.data.channel.id : null} |
          Title:{" "}
          {data.data.channel !== undefined ? data.data.channel.title : null} |
          About:{" "}
          {data.data.channel !== undefined ? data.data.channel.about : null} |
          User id:{" "}
          {data.data.channel !== undefined ? data.data.channel.userId : null} |
          Username:{" "}
          {data.data.channel !== undefined ? data.data.channel.username : null}{" "}
          | Deleted:{" "}
          {data.data.channel !== undefined ? data.data.channel.deleted : null}
          <hr />
        </div>

        <div
          style={{
            display: data.data.chat !== undefined ? "block" : "none",
          }}
          className="col-12 word-wrap"
        >
          <h5>Chat:</h5>
          ID: {data.data.chat !== undefined ? data.data.chat.id : null} | Title:{" "}
          {data.data.chat !== undefined ? data.data.chat.title : null} |
          MessageId:{" "}
          {data.data.chat !== undefined ? data.data.chat.messageId : null} |
          User id: {data.data.chat !== undefined ? data.data.chat.userId : null}{" "}
          | Date: {data.data.chat !== undefined ? data.data.chat.date : null} |
          Deleted:{" "}
          {data.data.chat !== undefined ? data.data.chat.deleted : null} |
          DeletedMessagesCount:{" "}
          {data.data.chat !== undefined
            ? data.data.chat.deletedMessagesCount
            : null}
          <hr />
        </div>

        <div
          style={{
            display: data.data.images !== undefined ? "block" : "none",
          }}
          className="col-12 word-wrap"
        >
          <h5>Images:</h5>
          {data.data.images !== undefined ? (
            <img
              src={`https://dashboard-stage.twl.ae/api/file/${data.data.images[0].url}`}
              alt="img"
            />
          ) : null}{" "}
          <hr />
        </div>
      </div>
    );
  }
}
