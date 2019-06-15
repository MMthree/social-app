import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    form: {
        textAlign: "center"
    },
    image: {
        margin: "20px auto 20px auto",
        width: "100px"
    },
    pageTitle: {
        margin: "10px auto 10px auto"
    },
    textField: {
        margin: "10px auto 10px auto"
    },
    button: {
        marginTop: 20,
        position: "relative"
    },
    customError: {
        color: "red",
        fontSize: "0.8rem"
    },
    progress: {
        position: "absolute"
    },
    signupRedirect: {
        color: "#5252d4",
    }
};


class signup extends Component {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        handle: "",
        loading: "",
        errors: {}
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post("/signup", newUserData)
        .then(res => {
            localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
            this.setState({ loading: false });
            this.props.history.push("/");
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        const { classes } = this.props; 
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img className={classes.image} src={"https://img.icons8.com/material/480/000000/user-male.png"} alt="login icon" />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        ></TextField>

                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        ></TextField>

                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        ></TextField>

                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Username" 
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        ></TextField>

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                        >
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>

                        <br></br>
                        <br></br>
                        
                        <small>Already have an account? <Link className={classes.signupRedirect} to="/login"><b>Login</b></Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)
