import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";

// import child component

import DisplayLeagues from "./displayLeagues";

export default class CreateLeagues extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leagues: [],
            league_name: "",
            league_image: null,
            errors: [],
            success: false,

            // state for pagination
            activePage: "",
            itemsCountPerPage: "",
            totalItemsCount: "",

            // state for key file input
            keyFileInput: [1],
        };

        // bind
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderSuccess = this.renderSuccess.bind(this);
        this.updateStateForChild = this.updateStateForChild.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.getLeagues = this.getLeagues.bind(this);
        this.updateLeagueStateFromChild = this.updateLeagueStateFromChild.bind(
            this
        );
        this.createFileInput = this.createFileInput.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeImage(e) {
        this.setState({
            league_image: e.target.files[0],
        });

        // console.log(this.state.keyFileInput);
    }

    handleChangeName(e) {
        this.setState({
            league_name: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let name = this.state.league_name;
        let file = this.state.league_image;

        let formData = new FormData();

        formData.append("league_name", name);
        formData.append("league_image", file);

        axios
            .post("/leagues", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // console.log(response);

                // document.getElementById("inputGroupFile01").value = null;
                // $("#inputGroupFile01")
                //     .next(".custom-file-label")
                //     .html("Choose file");

                var jovaLoading = document.getElementById("jovaLoading");
                jovaLoading.classList.add("d-block");

                var displayLeagues = document.getElementById("displayLeagues");
                displayLeagues.classList.add("d-none");

                setTimeout(function () {
                    jovaLoading.classList.remove("d-block");
                    displayLeagues.classList.remove("d-none");
                }, 400);

                var updateKeyFileInput = parseInt(this.state.keyFileInput) + 1;

                this.setState({
                    leagues: [response.data.leagues, ...this.state.leagues],
                    league_name: "",
                    league_image: null,
                    success: response.data.success,
                    errors: [],

                    keyFileInput: [updateKeyFileInput],
                });
                console.log(this.state.keyFileInput);
                this.getLeagues();
            })
            .catch((err) => {
                var arr = err.response.data.errors;

                var errors = {};
                for (const [key, value] of Object.entries(arr)) {
                    errors[key] = value;
                }

                this.setState({
                    errors: [errors],
                    success: "",
                });
            });
    }

    renderError() {
        if (this.state.errors.length !== 0) {
            return this.state.errors.map((error, i) => (
                <div key={i} className="alert alert-danger">
                    <p className="mb-0">{error.league_name}</p>
                    <p className="mb-0">{error.league_image}</p>
                </div>
            ));
        }
    }

    renderSuccess() {
        if (this.state.success) {
            return (
                <div className="alert alert-success">
                    <p className="mb-0">{this.state.success}</p>
                </div>
            );
        }
    }

    // UPDATE STATE FROM CHILD
    updateStateForChild($leagues_arg) {
        this.setState({
            leagues: [...$leagues_arg],
        });
    }
    // UPDATE STATE FROM CHILD

    // ################################################
    // functions for pagination start

    getLeagues() {
        axios.get("/leagues").then((response) => {
            var displayLeagues = document.getElementById("displayLeagues");
            var jovaLoading = document.getElementById("jovaLoading");

            setTimeout(function () {
                jovaLoading.classList.add("d-none");
                displayLeagues.classList.remove("d-none");
            }, 400);

            // console.log(response);
            this.setState({
                activePage: response.data.leagues.current_page,
                itemsCountPerPage: response.data.leagues.per_page,
                totalItemsCount: response.data.leagues.total,
            });

            this.updateStateForChild(response.data.leagues.data);

            // console.log(typeof this.state.totalItemsCount);
        });
    }

    componentDidMount() {
        this.getLeagues();
    }

    handlePageChange(pageNumber) {
        const url = "/leagues?page=" + pageNumber;

        axios.get(url).then((response) => {
            this.setState({
                activePage: pageNumber,
                itemsCountPerPage: response.data.leagues.per_page,
                totalItemsCount: response.data.leagues.total,
            });
            this.updateStateForChild(response.data.leagues.data);

            // console.log(typeof this.state.totalItemsCount);
        });
        // this.setState({ activePage: pageNumber });

        // console.log(this.state.activePage);
    }
    // functions for pagination end
    // ################################################

    updateLeagueStateFromChild(isNotId) {
        axios.get("/leagues").then((response) => {
            this.setState({
                leagues: response.data.leagues.data,
            });

            const updatedLeagues = this.state.leagues.filter(isNotId);

            this.setState({
                leagues: updatedLeagues,
                activePage: response.data.leagues.current_page,
                itemsCountPerPage: response.data.leagues.per_page,
                totalItemsCount: response.data.leagues.total,
            });
        });
    }

    createFileInput() {
        return this.state.keyFileInput.map((keyFile) => (
            <div key={keyFile} id="oldFileInput" className="input-group mb-3">
                <div className="custom-file">
                    <input
                        onChange={this.handleChangeImage}
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                    />
                    <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                    >
                        Choose file
                    </label>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
                    <div className="alert alert-info shadow">
                        <h3 className="mb-0">Create league</h3>
                    </div>

                    <form
                        id="jovaCreateLeagueForm"
                        className="shadow p-3 border"
                        onSubmit={this.handleSubmit}
                        encType="multipart/form-data"
                    >
                        {this.renderError()}
                        {this.renderSuccess()}
                        <p>Choose league image</p>
                        {/* file input */}
                        {this.createFileInput()}
                        <div className="form-group">
                            <label htmlFor="createLeague">Create league</label>
                            <input
                                onChange={this.handleChangeName}
                                value={this.state.league_name}
                                type="text"
                                className="form-control"
                                id="createLeague"
                                placeholder="Enter league's name"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
                    <div className="alert alert-info shadow">
                        <h3 className="mb-0">All leagues</h3>
                    </div>

                    {/* <div className="text-center">{this.handleLoading()}</div> */}

                    <DisplayLeagues
                        leagues={this.state.leagues}
                        loading={this.state.loading}
                        updateLeagueStateFromChild={
                            this.updateLeagueStateFromChild
                        }
                        handlePageChange={this.handlePageChange}
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                    />
                </div>
            </div>
        );
    }
}
