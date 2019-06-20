import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "../profile/EditDetails";

// Material UI
import Fab from '@material-ui/core/Fab';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        position: "relative",
        textAlign: 'center',
        marginBottom: "20px",
        '& .button': {
          boxShadow: "1px 2px 3px grey",
          cursor: "pointer",
          position: 'absolute',
          top: '185px',
          left: "36%"
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '5%',
      },
      '& .profile-details': {
        marginBottom: "20px",
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  });

class Profile extends Component {

    handleImageChange = e => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditImage = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const { 
            classes, 
            user: { 
                credentials: {handle, createdAt, imageUrl, bio, website, location }, 
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            
            authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input 
                            type="file" 
                            id="imageInput" 
                            hidden="hidden"
                            onChange={this.handleImageChange} 
                        />

                        {/* <Tooltip title="Edit Profile Picture" placement="top"> */}
                            <div onClick={this.handleEditImage} >
                                <Chip className="button" color="primary" size="small" label="Update Image" />
                            </div>
                        {/* </Tooltip> */}
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography> }
                        <hr />
                        { location && (
                            <Fragment>
                                <LocationOn color="primary"/> <span>{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {" "}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="primary"/>{" "}
                        <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                    </div>
                    <Tooltip title="Logout" placement="top">
                        <Fab size="medium" color="primary" onClick={this.handleLogout} href="/login">
                            <KeyboardReturn />
                        </Fab>
                    </Tooltip>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>)

        return profileMarkup;
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
