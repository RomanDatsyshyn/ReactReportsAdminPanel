import React, { Component } from "react";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";

import DataService from "../services/data.service";
import Spinner from "./Spiner";
import ItemMessage from "./ItemMessage";

export default class Messages extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      messages: [],
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
      currentPage: 0,
    });
    this.retrieveMessages();
  }

  retrieveMessages() {
    DataService.getMessages()
      .then((response) => {
        this.setState({
          messages: response.data.items,
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
        });
        confirmAlert({
          title: e.name,
          message: e.message,
          buttons: [
            {
              label: "OK",
              onClick: () => {},
            },
          ],
        });
        console.log(e);
      });
  }

  render() {
    const { loading, messages, currentPage } = this.state;

    let arr = [];
    let amount = Math.round(messages.length / 25) + 1;

    for (let i = currentPage * 25; i < currentPage * 25 + 25; i++) {
      if (messages[i] !== undefined) arr.push(messages[i]);
    }

    let items;

    if (arr === null || loading) {
      items = <Spinner />;
    } else if (arr.length > 0) {
      items = arr.map((i) => {
        return (
          <ItemMessage key={Math.random()} data={i} handler={this.handler} />
        );
      });
    } else {
      items = <h4 className="mt-2">Please, wait...</h4>;
    }

    return (
      <div>
        <div className="jumbotron bg-black text-white pt-4 pb-5 rounded-0">
          <div className="container">
            <h1>
              <Link to="/" className="display-5 pb-3 noStyle">
                Reports
              </Link>
            </h1>
            <div className="row">
              <div
                className="col-sm-12 col-lg-8 
                        order-1 
                        order-sm-1 order-lg-1 mb-3"
              >
                <div className="mb-2">
                  <Link to="/messages" className="btn btn-outline-light mr-3">
                    Messages
                  </Link>
                  <Link
                    to="/chats"
                    className="btn btn-outline-light mr-3 border-0"
                  >
                    Groups
                  </Link>
                  <Link
                    to="/channels"
                    className="btn btn-outline-light mr-3 border-0"
                  >
                    Channels
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {items}
          {items.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px",
                marginTop: "15px",
              }}
              class="btn-toolbar mx-auto"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div class="btn-group mr-2" role="group" aria-label="First group">
                {" "}
                {currentPage > 2 ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      this.setState({
                        currentPage: currentPage - 3,
                      });
                    }}
                  >
                    {currentPage - 2}
                  </button>
                ) : null}
                {currentPage > 1 ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      this.setState({
                        currentPage: currentPage - 2,
                      });
                    }}
                  >
                    {currentPage - 1}
                  </button>
                ) : null}
                {currentPage > 0 ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      this.setState({
                        currentPage: currentPage - 1,
                      });
                    }}
                  >
                    {currentPage}
                  </button>
                ) : null}
                {/* CP */}
                <button type="button" class="btn btn-dark">
                  {currentPage + 1}
                </button>
                {/* NP */}
                {currentPage + 1 < amount ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      this.setState({
                        currentPage: currentPage + 1,
                      });
                    }}
                  >
                    {currentPage + 2}
                  </button>
                ) : null}
                {/* NP */}
                {currentPage + 2 < amount ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      this.setState({
                        currentPage: currentPage + 2,
                      });
                    }}
                  >
                    {currentPage + 3}
                  </button>
                ) : null}
                {/* NP */}
                {currentPage + 3 < amount ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      this.setState({
                        currentPage: currentPage + 3,
                      });
                    }}
                  >
                    {currentPage + 4}
                  </button>
                ) : null}
              </div>
              <div class="btn-group" role="group" aria-label="Third group">
                {currentPage + 1 !== amount ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      this.setState({
                        currentPage: amount - 1,
                      });
                    }}
                  >
                    {amount}
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
