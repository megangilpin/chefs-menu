import * as React from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, LinearProgress } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
}));

function MealPicLoader(props) {
    const classes = useStyles();
    const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const showSnackBar = (message, variant) => {
        enqueueSnackbar(message, { variant: variant, autoHideDuration: "6000" });
    };

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
        saveMealPic(formData)
            .then((res) => {
                setLoading(false);
                setDropzoneOpen(false);
                if (res.result) {
                    props.upload(res.url);
                    showSnackBar("Meal picture uploaded!", "success");
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

export default MealPicLoader;
