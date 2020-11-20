import * as React from "react";
import DropZone from "./DropZone";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CardActionArea, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import profilePic from "../images/profilePic.png";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { DropzoneAreaBase, DropzoneDialog } from 'material-ui-dropzone';

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
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState(profilePic)

    const uploadImage = async (file) => {
        console.log(file[0])
        let formData = new FormData();
        formData.append("image", file[0]);
        const response = await fetch("/user/imageUpload", {
            method: "post",
            body: formData,
            // credentials: "include",
        });

        const data = await response.json();
        console.log(data)
        setImage(data)
        setOpen(false);
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
                        onClick={() => setOpen(true)}
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
                dropzoneText={"JPEG, PDF or PNG only"}
                maxFileSize={5000000}
                filesLimit={1}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files) => uploadImage(files)}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
        </div>
    );
}

export default ProfilePic;
