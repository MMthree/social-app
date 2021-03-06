import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import BTN from "../../utils/Button";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from "@material-ui/icons/Chat";



const styles = {
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: "cover"
    },
    hiddenHR: {
        border: "none",
        margin: "4px"
    }
}

class Scream extends Component {

    render() {

        dayjs.extend(relativeTime)
        const { classes, 
            scream : { 
                body, 
                createdAt, 
                userImage, 
                userHandle, 
                screamId, 
                likeCount, 
                commentCount 
            },
            user: {
                authenticated,
                credentials: { handle }
            } 
        } = this.props;


        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null
        
        return (
            <Card className={classes.card}> 
                <CardMedia 
                    image={userImage}
                    title="Profile image" 
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography color="primary" variant="h6" component={Link} to={`/users/${userHandle}`}>@{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <hr className={classes.hiddenHR} />
                    <Typography variant="h6">{body}</Typography>
                    <hr className={classes.hiddenHR} />
                    <LikeButton screamId={screamId} />
                    <small><span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span></small>
                    <BTN tip="comments">
                        <ChatIcon style={{ fontSize: "20px"}}  color="primary" />
                    </BTN>
                    <small><span>{commentCount} {commentCount === 1 ? "Comment" : "Comments"}</span></small>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Scream));
