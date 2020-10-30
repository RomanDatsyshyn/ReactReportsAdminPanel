import React, { Component } from "react";
import { Link } from "react-router-dom";

import Item from "./Item";
import Button from "./Button";
import NavBar from "./NavBar";

import DataService from "../services/data.service";
import Spinner from "./Spiner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default class Users extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      data: [],
      searchedResults: [],
      isSearched: false,
      typeOfSorting: 0,
      loading: false,
      currentUser: null,
      isUserChoosed: false,
      currentPage: 0,
    };

    this.handler = this.handler.bind(this);
    this.sorting = this.sorting.bind(this);
    this.dateSort = this.dateSort.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true,
      currentPage: 0,
    });
    this.retrieveUsers();
  }

  retrieveUsers() {
    DataService.getAllUsers()
      .then((response) => {
        this.setState({
          users: response.data.items,
          data: response.data.items,
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

  handler = (userData) => {
    this.setState({
      currentUser: userData,
      isUserChoosed: true,
    });
  };

  sorting = (param) => {
    // 0 - all
    // 1 - banned
    // 2 - not banned

    if (param === 0) {
      let arr = this.state.isSearched
        ? this.state.searchedResults
        : this.state.users;

      this.setState({
        currentPage: 0,
        typeOfSorting: 0,
        data: arr,
      });
    } else if (param === 1) {
      let arr = this.state.isSearched
        ? this.state.searchedResults
        : this.state.users;

      let totalArray = [];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].deleted === true) totalArray.push(arr[i]);
      }

      this.setState({
        currentPage: 0,
        typeOfSorting: 1,
        data: totalArray,
      });
    } else if (param === 2) {
      let arr = this.state.isSearched
        ? this.state.searchedResults
        : this.state.users;

      let totalArray = [];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].deleted === false) totalArray.push(arr[i]);
      }

      this.setState({
        currentPage: 0,
        typeOfSorting: 2,
        data: totalArray,
      });
    }
  };

  searching = (params) => {
    if (params !== null) {
      let len = params.toString().length;

      if (len >= 1) {
        let arr = this.state.users;
        let totalArray = [];

        for (let i = 0; i < arr.length; i++) {
          let id = arr[i].id;
          let req = params;

          let strId = id.toString();
          let lenReq = req.toString().length;
          let comparePart = strId.slice(0, lenReq);

          if (req === comparePart) {
            totalArray.push(arr[i]);
          }
        }

        let typeOfSort = this.state.typeOfSorting;

        if (typeOfSort === 0) {
          let arr = totalArray;

          this.setState({
            isSearched: true,
            searchedResults: totalArray,
            typeOfSorting: 0,
            currentPage: 0,
            data: arr,
          });
        } else if (typeOfSort === 1) {
          let arr = totalArray;

          let totalArray2 = [];

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].deleted === true) totalArray2.push(arr[i]);
          }

          this.setState({
            isSearched: true,
            searchedResults: totalArray,
            typeOfSorting: 1,
            currentPage: 0,
            data: totalArray2,
          });
        } else if (typeOfSort === 2) {
          let arr = totalArray;

          let totalArray2 = [];

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].deleted === false) totalArray2.push(arr[i]);
          }

          this.setState({
            isSearched: true,
            searchedResults: totalArray,
            typeOfSorting: 2,
            currentPage: 0,
            data: totalArray2,
          });
        }
      } else if (len === 0) {
        //
        let typeOfSort = this.state.typeOfSorting;

        if (typeOfSort === 0) {
          this.setState({
            isSearched: false,
            searchedResults: [],
            typeOfSorting: 0,
            currentPage: 0,
            data: this.state.users,
          });
        } else if (typeOfSort === 1) {
          let arr = this.state.users;

          let totalArray2 = [];

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].deleted === true) totalArray2.push(arr[i]);
          }

          this.setState({
            isSearched: false,
            searchedResults: [],
            typeOfSorting: 1,
            currentPage: 0,
            data: totalArray2,
          });
        } else if (typeOfSort === 2) {
          let arr = this.state.users;

          let totalArray2 = [];

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].deleted === false) totalArray2.push(arr[i]);
          }

          this.setState({
            isSearched: false,
            searchedResults: [],
            typeOfSorting: 2,
            currentPage: 0,
            data: totalArray2,
          });
        }
      }
    }
  };

  dateSort = () => {
    this.setState({ data: this.state.data.reverse(), currentPage: 0 });
  };

  updateState = () => {
    this.setState({
      loading: true,
    });

    DataService.getAllUsers().then((response) => {
      this.setState({
        users: response.data.items,
        data: response.data.items,
        loading: false,
        currentPage: 0,
      });
    });
  };

  showButtons = (id, deleted) => {
    return (
      <div>
        <Link to={`/users/edit/${id}`} className="btn btn-outline-dark mr-3">
          Изменить
        </Link>

        <Button
          title="Подтвердите действие"
          txt={deleted === true ? "Разбанить" : "Забанить"}
          action={() => {
            this.setState({
              loading: true,
            });

            if (deleted) {
              DataService.recoverById(id)
                .then((response) => {
                  this.retrieveUsers();
                  console.log(response);
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
            } else {
              DataService.deleteById(id)
                .then((response) => {
                  this.retrieveUsers();
                  console.log(response);
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
          }}
        />
      </div>
    );
  };

  render() {
    const { data, loading, currentUser, currentPage } = this.state;

    let arr = [];
    let amount = Math.round(data.length / 25) + 1;

    for (let i = currentPage * 25; i < currentPage * 25 + 25; i++) {
      if (data[i] !== undefined) arr.push(data[i]);
    }

    let items;

    if (arr === null || loading) {
      items = <Spinner />;
    } else if (arr.length > 0) {
      items = arr.map((i) => {
        return <Item key={Math.random()} data={i} handler={this.handler} />;
      });
    } else {
      items = <h4 className="mt-2">There are no one users...</h4>;
    }

    return (
      <div>
        <NavBar
          sorting={this.sorting}
          searching={this.searching}
          dateSort={this.dateSort}
          updateState={this.updateState}
        />
        <div className="container">
          <div className="row">
            <div
              className="col-sm-12 col-lg-8 
                        order-2 
                        order-sm-2 order-lg-1"
            >
              <div className="row sm-mt">
                <div className="col-2 word-wrap">ID</div>
                <div className="col-2 word-wrap">Телефон</div>
                <div className="col-2 word-wrap">Имя</div>
                <div className="col-2 word-wrap">Фамилия</div>
                <div className="col-2 word-wrap">Username</div>
                <div className="col-2 word-wrap">Последний онлайн</div>
              </div>
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
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
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
                    {currentPage + 1 < amount - 1 ? (
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
                    {currentPage + 2 < amount - 1 ? (
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
                    {currentPage + 3 < amount - 1 ? (
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
                            currentPage: amount - 2,
                          });
                        }}
                      >
                        {amount - 1}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className="col-sm-12 col-lg-4 
                        order-1 
                        order-sm-1 order-lg-2"
            >
              <h3 className="word-wrap">
                {currentUser === null
                  ? "Выберите пользователя"
                  : currentUser.id}
              </h3>
              <h6 className="word-wrap">
                {currentUser === null ? () => {} : currentUser.phone}
                <hr />
                {currentUser === null ? () => {} : currentUser.firstName}
                <br />
                <br />
                {currentUser === null ? () => {} : currentUser.lastName}
                <hr />
              </h6>
              {this.state.isUserChoosed
                ? this.showButtons(currentUser.id, currentUser.deleted)
                : () => {}}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
