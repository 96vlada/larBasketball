import axios from "axios";
import React, { Component } from "react";

export default class EditLeague extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.match.params.id);

        this.state = {
            old_league_image: null,
            league_image: null,
            league_name: "",

            success: "",
            errors: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.getLeagueForEdit = this.getLeagueForEdit.bind(this);
        this.imageForEdit = this.imageForEdit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.renderSuccess = this.renderSuccess.bind(this);
    }
    handleChangeImage(e) {
        this.setState({
            league_image: e.target.files[0],
        });
        // console.log(this.state.league_image);
    }
    handleChange(e) {
        this.setState({
            league_name: e.target.value,
        });
    }

    getLeagueForEdit() {
        axios
            .get(`/leagues/${this.props.match.params.id}/edit`)
            .then((response) => {
                this.setState({
                    old_league_image: response.data.league.league_image,
                    league_image: response.data.league.league_image,
                    league_name: response.data.league.league_name,
                });
            });
    }

    componentDidMount() {
        $('input[type="file"]').on("change", function () {
            //get the file name
            var fileName = $(this).val().split("\\").pop();
            //replace the "Choose a file" label
            $(this).next(".custom-file-label").html(fileName);
        });

        this.getLeagueForEdit();
    }

    imageForEdit() {
        if (this.state.old_league_image !== "") {
            return (
                <div>
                    <img src={this.state.old_league_image} />
                </div>
            );
        } else {
            return (
                <div className="mb-3">
                    <h2 className="alert alert-danger mb-0">Image not found</h2>
                </div>
            );
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let name = this.state.league_name;
        let file = this.state.league_image;

        let formData = new FormData();

        formData.append("league_name", name);
        formData.append("league_image", file);
        formData.append("_method", "put");

        axios
            .post(`/leagues/${this.props.match.params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                this.setState({
                    old_league_image: response.data.leagues.league_image,
                    success: response.data.success,
                });
                // console.log(response);
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

                console.log(this.state.errors);
            });
    }

    // handle Errors

    renderErrors() {
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

    render() {
        return (
            <div>
                <div className="alert alert-info shadow">
                    <h3 className="mb-0">Edit league</h3>
                </div>
                <form
                    onSubmit={this.handleSubmit}
                    id="vlada"
                    className="shadow p-3 border"
                    encType="multipart/form-data"
                >
                    {this.renderSuccess()}
                    {this.renderErrors()}

                    {this.imageForEdit()}
                    <p>Choose new league image</p>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input
                                onChange={this.handleChangeImage}
                                type="file"
                                name="file"
                                multiple
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
                    <div className="form-group">
                        <label htmlFor="createLeague">Create league</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            id="createLeague"
                            // placeholder="Enter league's name"
                            value={this.state.league_name}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Confirm
                    </button>
                    <a href="/dashboard" className="btn btn-danger ml-2">
                        Cancel
                    </a>
                </form>
            </div>
        );
    }
}
