import React from 'react';
import NavBar from '../components/navbar';

export default class ProductionSheet extends React.Component {
  render() {
    return (
      <div>
        <NavBar className="navbar" />
        <div className="row mt-4  ms-3 me-3">
          <h3 className="main-title col">Production Sheet - Week 1</h3>
          <i className=" col-1 fa-solid fa-clipboard-list" />
          <select className="form-select col m-1 " aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select className=" col form-select m-1" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button type="button" className=" col-1 btn btn-success m-1">Success</button>
        </div>
      </div>
    );
  }
}
