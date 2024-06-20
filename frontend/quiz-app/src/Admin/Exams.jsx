import React from "react";
import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/datepicker3.css";
import "./assets/css/styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';
export default function Exams() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
        <div className="row">
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <em className="fa fa-home"></em>
              </a>
            </li>
            <li className="active">Dashboard</li>
          </ol>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Dashboard</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
