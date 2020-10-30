import React, { Component } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import DataService from "../services/data.service";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      id: null,
      firstname: " ",
      lastname: " ",
      username: " ",
      phone: null,
      onlineAt: null,
      staticAuthCode: null,
      deleted: false,
    };
  }

  componentDidMount() {
    this.GetById();
  }

  GetById() {
    DataService.getById(this.props.match.params.id)
      .then((res) => {
        this.setState({
          id: res.data.id,
          firstname: res.data.firstName,
          lastname: res.data.lastName,
          username: res.username,
          phone: res.data.phone,
          staticAuthCode: res.data.staticAuthCode,
          onlineAt: res.data.onlineAt,
          deleted: res.data.deleted,
          submitted: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveUser() {
    var data = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      phone: this.state.phone,
      username: this.state.username,
      staticAuthCode: this.state.staticAuthCode,
    };

    DataService.editById(this.state.id, data)
      .then((res) => {
        this.setState({
          id: res.data.id,
          firstname: res.data.firstName,
          lastname: res.data.lastName,
          username: res.username,
          phone: res.phone,
          staticAuthCode: res.data.staticAuthCode,
          onlineAt: res.data.onlineAt,
          deleted: res.data.deletsed,
          submitted: true,
        });

        confirmAlert({
          title: "Успешно изменено!",
          buttons: [
            {
              label: "Хорошо",
            },
          ],
        });
        this.props.history.push(`/`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { firstname, lastname, username, phone, staticAuthCode } = this.state;

    return (
      <div>
        <div className="jumbotron bg-black text-white pt-4 pb-5 rounded-0">
          <div className="container">
            <h1>
              <Link to="/" className="display-5 pb-3 noStyle">
                Reports
              </Link>
            </h1>
          </div>
        </div>
        <div className="container">
          <form>
            <div class="row">
              <div class="col-6 pl-0">
                <div class="form-group">
                  <label htmlFor="firstname">Имя</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    value={firstname}
                    onChange={this.onChange}
                    name="firstname"
                  />
                </div>
              </div>
              <div class="col-6 pr-0">
                <div class="form-group">
                  <label htmlFor="lastname">Фамилия</label>
                  <input
                    type="text"
                    placeholder="Lastname"
                    class="form-control"
                    id="lastname"
                    value={lastname}
                    onChange={this.onChange}
                    name="lastname"
                  />
                </div>
              </div>
              <div class="col-12 p-0">
                <label htmlFor="username">Имя пользователя</label>
                <label class="sr-only" htmlFor="inlineFormInputGroup">
                  Username
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">@</div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChange}
                    name="username"
                  />
                </div>
              </div>
              <div class="col-6 pl-0">
                <div class="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    value={phone}
                    onChange={this.onChange}
                    name="phone"
                  />
                </div>
              </div>
              <div class="col-6 pr-0">
                <div class="form-group">
                  <label>Статичный код (пароль)</label>
                  <input
                    type="text"
                    class="form-control"
                    id="staticAuthCode"
                    value={staticAuthCode}
                    onChange={this.onChange}
                    name="staticAuthCode"
                  />
                </div>
              </div>
              <hr />
              <button
                type="button"
                onClick={this.saveUser}
                class="btn btn-dark btn-lg btn-block"
              >
                Изменить
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
