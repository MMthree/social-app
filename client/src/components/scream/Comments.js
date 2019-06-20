import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    commentImage: {
        maxWidth: "100%",
        height: 100,
        objectFit: "cover",
        borderRadius: "50%"
    },
    main: {
      padding: "0px 20px",
      marginBottom: "10px"
    },
    hiddenHR: {
        border: "none",
        margin: "4px"
    },
    commentData: {
        marginLeft: 20
    },
    HRVisible: {
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0,1",
        marginBottom: 20
    }
});

class Comments extends Component {
    render() {

        const { classes, comments } = this.props;
        return(
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return(
                        <Fragment key={createdAt}>
                      
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}> 
                                            <Typography
                                                variant="body1"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary"
                                            >
                                                @{userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                                            </Typography>
                                            <hr className={classes.hiddenHR} />
                                            <Typography variant="h6">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length -1 && (
                                <hr className={classes.HRVisible}/>
                            )}
                        </Fragment> 
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);