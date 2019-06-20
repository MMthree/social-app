import React, { Component, Fragment } from 'react';
import BTN from "../../utils/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

//Material UI
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";


class LikeButton extends Component {
    state = {
        anchorEl: null 
    }

    handleMenu = e => {
        this.setState({ anchorEl: e.currentTarget})
    }; 

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId))
        return true;
        else return false
    };

    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    };
    
    render() {
        const anchorEl = this.state.anchorEl;
        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            <Fragment>
                <BTN tip="Like" onClick={this.handleMenu}>
                    <FavoriteBorder  style={{ fontSize: "20px"}} color="primary" />
                </BTN>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                    >
                       <MenuItem color="primary" onClick={this.handleClose}>
                            <Link style={{color: "#3b82c6"}} to="/login">Sign in to like</Link>
                        </MenuItem> 
                </Menu>
                
            </Fragment>
            
            // <Link to="/login">
            //     <BTN tip="Like">
            //         <FavoriteBorder  style={{ fontSize: "20px"}} color="primary" />
            //     </BTN>
            // </Link>
        ) : this.likedScream() ? (
                <BTN tip="Undo Like" onClick={this.unlikeScream}>
                    <FavoriteIcon  style={{ fontSize: "20px"}} color="secondary" />
                </BTN>
        ) : (
                <BTN tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder  style={{ fontSize: "20px"}} color="primary" />
                </BTN>
        );

        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = { 
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
