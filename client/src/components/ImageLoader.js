import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CardActionArea, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import profilePic from "../images/profilePic.png";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { DropzoneAreaBase, DropzoneDialog } from 'material-ui-dropzone';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        background: "none",
        boxShadow: "none",
    },
    media: {
        height: 140,
        paddingTop: "81.25%",
        borderRadius: "50%",
        margin: "28px",
        marginBottom: "10px",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: "2px solid #000",
        padding: theme.spacing(2, 4, 3),
    },
}));


function ProfilePic(props) {
    const classes = useStyles();
    const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
    const [image, setImage] = React.useState(profilePic)
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [message, setMessage] = React.useState("");

    const uploadImage = async (file) => {
        console.log(file[0])
        let formData = new FormData();
        formData.append("image", file[0]);
        const response = await fetch("/user/imageUpload", {
            method: "post",
            body: formData,
        });

        const data = await response.json();

        if (data.errors) {
            console.log(data.errors)
            setSeverity("error");
            setMessage(data.errors.detail);
            setSnackBarOpen(true);
        } else {
            console.log(data)
            setImage(data)
            setDropzoneOpen(false);
        }
    };

    const snackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Contemplative Reptile"
                />
                <Box ml={4}>
                    <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => setDropzoneOpen(true)}
                    >
                        <AddAPhotoIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Card>
            <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                dialogTitle={"Upload Profile Picture"}
                dropzoneText={"JPEG, PDF, PNG or SVG 5MB max"}
                maxFileSize={5000000}
                filesLimit={1}
                open={dropzoneOpen}
                onClose={() => setDropzoneOpen(false)}
                onSave={(files) => uploadImage(files)}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={snackBarClose}>
                <MuiAlert onClose={snackBarClose} severity={severity}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default ProfilePic;
