import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import BTN from "../utils/Button";
import DeleteScream from "./DeleteScream";

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";


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
    }
}

class Scream extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
        return true;
        else return false
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    };

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

        const likeButton = !authenticated ? (
            <BTN tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary" />
                </Link>
            </BTN>
        ) : this.likedScream() ? (
                <BTN tip="Undo Like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary" />
                </BTN>
        ) : (
                <BTN tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary" />
                </BTN>
        );

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
                    <Typography color="primary" variant="h5" component={Link} to={`/users/${userHandle}`}>@{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <BTN tip="comments">
                        <ChatIcon color="primary" />
                    </BTN>
                    <span>{commentCount} Comments</span>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
