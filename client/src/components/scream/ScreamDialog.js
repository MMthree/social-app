import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";
import BTN from "../../utils/Button";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

const styles = theme => ({
    hiddenHR: {
        border: "none",
        margin: "4px"
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: "5%",
        objectFit: "cover"
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: "absolute",
        left: "90%"
    },
    load: {
        margin: "auto"
    },
    expandButton: {
        position: "absolute",
        left: "90%"
    },
    HRVisible: {
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0,1",
        marginBottom: 20
    }
});

class ScreamDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });   
        this.props.getScream(this.props.screamId);     
    };

    handleClose= () => {
        this.setState({ open: false });        
    }

    render() {
        const { 
            classes, 
            scream: { 
                screamId, 
                body, 
                createdAt, 
                likeCount, 
                userImage, 
                userHandle,
                commentCount,
                comments
            }, 
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <Grid container>
                <CircularProgress className={classes.load} size={50} />
            </Grid>
            
        ) : (
            <Grid container spacing={5}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="body1"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                    </Typography>
                    <hr className={classes.hiddenHR} />
                    <Typography variant="h6">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
                    <BTN tip="comments">
                        <ChatIcon color="primary" />
                    </BTN>
                    <span>{commentCount} {commentCount === 1 ? "Comment" : "Comments"}</span>
                </Grid>
                
                <Comments comments={comments} /> 
            </Grid>
        )


        return (
            <Fragment>
                <BTN onClick={this.handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </BTN>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <BTN
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </BTN>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>

            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));