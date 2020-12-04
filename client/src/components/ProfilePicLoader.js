import * as React from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { UserContext } from "../contexts/user/UserContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, LinearProgress } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
}));

function ProfilePicLoader(props) {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const showSnackBar = (message, variant) => {
        enqueueSnackbar(message, { variant: variant, autoHideDuration: "6000" });
    };

    const [loading, setLoading] = React.useState(false);

    const handleUpload = (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", file[0]);
        user.uploadProfileImage(formData)
            .then((res) => {
                setLoading(false);
                if (res.result) {
                    showSnackBar("Profile Picture updated", "success");
                    setDropzoneOpen(false);
                } else {
                    showSnackBar(res.message, "error");
                }
            })
            .catch((error) => {
                setLoading(false);
                showSnackBar("Error while making request!", "error");
            });
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
        </div>
    );
}

export default ProfilePicLoader;
