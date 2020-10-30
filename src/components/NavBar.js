import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      button: 0,
      isSorted: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.searching(e.target.value);
  }

  render() {
    const { search } = this.state;

    return (
      <div className="jumbotron bg-black text-white pt-4 pb-5 rounded-0">
        <div className="container">
          <h1>
            <Link
              to="/"
              onClick={() => {
                this.setState({ button: 0, isSorted: false });
                this.props.updateState();
              }}
              className="display-5 pb-3 noStyle"
            >
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
                <Link
                  to="/messages"
                  className="btn btn-outline-light mr-3  border-0"
                >
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
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => {
                    this.setState({ button: 0 });
                    this.props.sorting(0);
                  }}
                  className={
                    this.state.button === 0
                      ? "btn btn-outline-light mr-3"
                      : "btn btn-outline-light mr-3 border-0"
                  }
                >
                  All users
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.setState({ button: 1 });
                    this.props.sorting(1);
                  }}
                  className={
                    this.state.button === 1
                      ? "btn btn-outline-light mr-3"
                      : "btn btn-outline-light mr-3 border-0"
                  }
                >
                  Banned
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.setState({ button: 2 });
                    this.props.sorting(2);
                  }}
                  className={
                    this.state.button === 2
                      ? "btn btn-outline-light mr-3"
                      : "btn btn-outline-light mr-3 border-0"
                  }
                >
                  Unbanned
                </button>
              </div>
              <div>
                <p className="d-inline mr-2">Сортировать:</p>
                <button
                  type="button"
                  onClick={() => {
                    this.setState({ isSorted: !this.state.isSorted });
                    this.props.dateSort();
                  }}
                  className="btn btn-outline-light mr-3"
                >
                  {this.state.isSorted
                    ? "От старых к новым"
                    : "От новых к старым"}
                </button>
              </div>
            </div>
            <div
              className="col-sm-12 col-lg-4 
                        order-2 
                        order-sm-2 order-lg-2"
            >
              <div className="form-group mx-sm-3 mb-2">
                <input
                  type="number"
                  className="form-control bg-black form-width"
                  id="inputPassword2"
                  value={search}
                  onChange={this.onChange}
                  name="search"
                  placeholder="Search user by id"
                />
              </div>
              {/* <button type='submit' className='btn btn-light mb-2'>
                  Search
                </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
