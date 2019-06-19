import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";
import BTN from "../utils/Button";

//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";


const styles = theme => ({
    submitButton: {
        position: "relative"
    },
    progressSpinner: {
        position: "absolute"
    },
    closeButton: {
        position: "absolute",
        left: "90%",
        top: "10%",
    },
    submitButton: {
        marginTop: "20px"
    }
});

class PostScream extends Component {
    state = {
        open: false,
        body: "",
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({
            errors: nextProps.UI.errors
          });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
          this.setState({ body: '' });
          this.handleClose();
        }
      }
 
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, errors: {} });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.postScream({ body: this.state.body });
    }

    render(){
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        
        return (
            <Fragment>
                <BTN onClick={this.handleOpen} tip="Post a Scream!">
                    <AddIcon />
                </BTN>
                    <Dialog
                        open={this.state.open} 
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth="sm"
                        >
                            <BTN tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                                <CloseIcon />
                            </BTN>
                            <DialogTitle>Post a new Scream</DialogTitle>
                            <DialogContent>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        name="body"
                                        type="text"
                                        label="Enter a Scream"
                                        multiline
                                        error={errors.body ? true : false} 
                                        helperText={errors.body}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                        Submit
                                        {loading && (
                                            <CircularProgress size={30} className={classes.progressSpinner} />
                                        )}
                                    </Button>
                                </form>
                            </DialogContent>
                    </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream));