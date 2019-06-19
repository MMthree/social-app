import React, { Component, Fragment } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import BTN from "../utils/Button";
import { deleteScream } from "../redux/actions/dataActions";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { DialogTitle } from '@material-ui/core';


const styles = {
    deleteButton: {
        position: "absolute",
        top: "10%",
        left: "90%"
    }
}

class DeleteScream extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false })
    };

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
                <BTN 
                tip="Delete Scream"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="error" />
                </BTN>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                        <DialogTitle>
                            Are you sure you want to delete this scream?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} variant="contained" color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.deleteScream} variant="contained" color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
