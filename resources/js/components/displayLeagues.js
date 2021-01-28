import axios from "axios";
import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

export default class DisplayLeagues extends Component {
    constructor(props) {
        super(props);

        // this.getLeagues = this.getLeagues.bind(this);
        this.renderLeagues = this.renderLeagues.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(id) {
        // remove from local state
        // const isNotId = (league) => league.id !== id;
        // this.setState({ tasks: updatedTasks });
        const isNotId = (league) => league.id !== id;

        axios.delete(`/leagues/${id}`);

        this.props.updateLeagueStateFromChild(isNotId);
        // make delete request to the backend
    }

    renderLeagues() {
        const divStyle = {
            width: "40px",
            height: "50px",
        };
        // console.log(this.state.leagues);
        return this.props.leagues.map((league) => (
            <li
                key={league.id}
                className="list-group-item d-flex flex-wrap align-items-center justify-content-between"
            >
                <div className="d-flex align-items-center">
                    <img
                        src={
                            league.league_image == ""
                                ? "images/no-image.png"
                                : league.league_image
                        }
                        style={divStyle}
                    />
                    <div className="ml-3">{league.league_name}</div>
                </div>

                <div>
                    <Link className="btn btn-primary" to={`/${league.id}/edit`}>
                        Edit
                    </Link>
                    <button
                        onClick={() => this.handleDelete(league.id)}
                        className="btn btn-danger ml-2"
                    >
                        Delete
                    </button>
                </div>
            </li>
        ));
    }

    render() {
        return (
            <div>
                <div id="jovaLoading" className="text-center mt-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

                <div id="displayLeagues" className="row d-none">
                    <div className="col-12">
                        <ul className="list-group">{this.renderLeagues()}</ul>
                    </div>

                    {/* Pagination start */}
                    <div className="mt-3 ml-3">
                        <Pagination
                            activePage={parseInt(this.props.activePage)}
                            itemsCountPerPage={parseInt(
                                this.props.itemsCountPerPage
                            )}
                            totalItemsCount={parseInt(
                                this.props.totalItemsCount
                            )}
                            pageRangeDisplayed={3}
                            onChange={this.props.handlePageChange.bind(this)}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                    {/* Pagination end */}
                </div>
            </div>
        );
    }
}
