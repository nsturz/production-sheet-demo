import React from 'react';
import NavBar from '../components/navbar';

export default class ProductionSheet extends React.Component {
  render() {
    return (
      <div>
        <NavBar className="navbar" />
        <div className="row">
          <h2 className="col">Production Sheet - Week 1</h2>
          <i className=" col-1 fa-solid fa-clipboard-list" />
          <select className="form-select col  " aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select className=" col form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button type="button" className=" col btn btn-success">Success</button>
        </div>
      </div>
    );
  }
}
