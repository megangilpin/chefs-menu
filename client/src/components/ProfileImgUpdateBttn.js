import * as React from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { UserContext } from "../contexts/user/UserContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    CardMedia,
    Card,
    IconButton,
    LinearProgress,
    Snackbar,
} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
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
    profile: {
        maxWidth: 140,
        background: theme.palette.primary,
        paddingTop: "81.25%",
        borderRadius: "50%",
        margin: "28px",
        marginBottom: "10px",
    },
}));

function ProfileImgUpdateBttn(props) {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleUpload = (file) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("image", file[0]);
        user.uploadProfileImage(formData)
            .then((res) => {
                setLoading(false);
                if (res.result) {
                    setSeverity("success");
                    setMessage("Profile Picture updated");
                    setSnackBarOpen(true);
                    setDropzoneOpen(false);
                } else {
                    setSeverity("error");
                    setMessage(res.message);
                    setSnackBarOpen(true);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.message);
                setSeverity("error");
                setMessage("Error while making request");
                setSnackBarOpen(true);
            });
    };

    const snackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    return (
        <div>
            <Box ml={4}>
                <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => setDropzoneOpen(true)}
                >
                    <AddAPhotoIcon fontSize="large" />
                </IconButton>
            </Box>
            <DropzoneDialog
                acceptedFiles={["image/png", "image/jpeg"]}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                dialogTitle={
                    !loading ? (
                        "Upload Profile Picture"
                    ) : (
                        <LinearProgress color="secondary" />
                    )
                }
                dropzoneText={"JPEG or PNG  -  5MB max"}
                maxFileSize={5000000}
                filesLimit={1}
                open={dropzoneOpen}
                onClose={() => setDropzoneOpen(false)}
                onSave={(files) => handleUpload(files)}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={snackBarClose}
            >
                <MuiAlert onClose={snackBarClose} severity={severity}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default ProfileImgUpdateBttn;
