import React, { Component } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Button extends Component {
  render() {
    const { title, txt, action } = this.props;

    return (
      <button
        onClick={() => {
          confirmAlert({
            title: title,
            message: 'Вы точно хотите это сделать?',
            buttons: [
              {
                label: 'Да',
                onClick: action,
              },
              {
                label: 'Нет',
                onClick: () => {},
              },
            ],
          });
        }}
        className='btn btn-outline-dark mr-3'
      >
        {txt}
      </button>
    );
  }
}
