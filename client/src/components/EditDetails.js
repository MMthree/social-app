import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

//Material UI
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
    textField: {
        marginTop: "15px"
    },
    button: {
        float: "right",
    },
    edit: {

    }
});

class EditDetails extends Component {
    state = {
        bio: "",
        website: "",
        location: "",
        open: false
    };

    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : "",
        });
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit Details" placement="top">
                    <Fab size="medium" color="primary" onClick={this.handleOpen} className={classes.button}>
                        <EditIcon className={classes.edit}/>
                    </Fab>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                        <DialogTitle>Edit your details</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    name="bio"
                                    type="text"
                                    label="Bio"
                                    multiline
                                    placeholder="A short bio about yourself"
                                    className={classes.textField}
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                
                                <TextField
                                    name="website"
                                    type="text"
                                    label="Website"
                                    placeholder="Your website"
                                    className={classes.textField}
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                
                                <TextField
                                    name="location"
                                    type="text"
                                    label="Location"
                                    placeholder="Your Location"
                                    className={classes.textField}
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary" variant="contained">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary" variant="contained">
                                Save
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
