import React, { Component } from "react";
import animateScrollTo from "animated-scroll-to";

export default class Item extends Component {
  convertToDateFormat = (time) => {
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return `${year}:${month < 10 ? `0${month}` : month}:${
      day < 10 ? `0${day}` : day
    } - ${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  render() {
    const { data } = this.props;

    return (
      <div
        className={
          data.deleted
            ? "row item onHoverMouse txt-through"
            : "row item onHoverMouse"
        }
        onClick={() => {
          this.props.handler(data);
          animateScrollTo(0, {
            speed: 1000,
            maxDuration: 2000,
            minDuration: 1000,
          });
        }}
      >
        <div className="col-2 word-wrap">{data.id}</div>
        <div className="col-2 word-wrap">{data.phone}</div>
        <div className="col-2 word-wrap">{data.firstName}</div>
        <div className="col-2 word-wrap">{data.lastName}</div>
        <div className="col-2 word-wrap">{data.username}</div>
        <div className="col-2 word-wrap">
          {this.convertToDateFormat(data.onlineAt)}
        </div>
      </div>
    );
  }
}
