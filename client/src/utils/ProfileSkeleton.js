import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../images/no-img.png";

// Material UI
import Paper from "@material-ui/core/Paper";


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
          borderRadius: '50%',
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
      },
    handle: {
        height: 20,
        backgroundColor: "#3b82c6",
        width: 60,
        margin: "0 auto 7px auto",
    },
    fullLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "100%",
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "50%",
        margin: "auto",
        marginBottom: 10,
    }
});

const  ProfileSkeleton = props => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image"/>
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <div className={classes.halfLine} />
                    <hr />
                    <div className={classes.halfLine} />
                    <hr />
                    <div className={classes.halfLine} />
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
