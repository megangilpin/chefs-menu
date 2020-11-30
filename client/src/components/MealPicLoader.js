import * as React from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { UserContext } from "../contexts/user/UserContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, LinearProgress, Snackbar } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
}));

function MealPicLoader(props) {
    const classes = useStyles();
    const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const saveMealPic = async (formData) => {
        const response = await fetch(`/meals/mealImageUpload`, {
            method: "post",
            body: formData,
        });

        const data = await response.json();

        if (data.errors) {
            return {
                result: false,
                message: data.errors,
            };
        } else {
            return {
                result: true,
                url: data,
            };
        }
    };

    const handleUpload = (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", file[0]);
        console.log(formData);
        saveMealPic(formData)
            .then((res) => {
                setLoading(false);
                setDropzoneOpen(false);
                if (res.result) {
                    console.log(res.url);
                    props.upload(res.url);
                    setSeverity("success");
                    setMessage("Profile Picture updated");
                    setSnackBarOpen(true);
                } else {
                    setSeverity("error");
                    setMessage(res.message);
                    setSnackBarOpen(true);
                }
            })
            .catch((error) => {
                setLoading(false);
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
            <IconButton
                className={classes.root}
                aria-label="update profile image"
                color="primary"
                onClick={() => setDropzoneOpen(true)}
            >
                <AddAPhotoIcon />
            </IconButton>
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

export default MealPicLoader;
