import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Input,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    FormHelperText,
} from "@material-ui/core";
import allCuisines from "../lib/allCuisines";

const useStyles = makeStyles((theme) => ({
    chefButton: {
        padding: "10px",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
        borderRadius: "10px",
        background: theme.background.secondary,
        color: "#ffffff",
    },
    error: {
        color: "#f12",
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ChefSignUp = (props) => {
    const user = React.useContext(UserContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [specialty, setSpecialty] = React.useState([]);
    const [hasError, setError] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setError(false);
        setSpecialty(event.target.value);
    };

    const registerChef = () => {
        if (!specialty.length > 0) {
            setError(true);
            return;
        }

        const formValues = {
            cuisineSpecialty: [...specialty],
        };
        user.registerChef(formValues);
    };

    return (
        <React.Fragment>
            <Button
                className={classes.chefButton}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Become A Chef
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title" color="primary">
                    Become A Chef!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To become a chef simply pick at least one specialty type, hit
                        sign up and then start creating your personal menu!
                    </DialogContentText>
                    <Box mt={3}>
                        <Grid container>
                            <Grid item xs={6}>
                                <InputLabel id="specialty-type">
                                    <Box fontWeight="fontWeightBold">
                                        Cuisine Specialties
                                    </Box>
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="specialty-type"
                                    multiple
                                    value={specialty}
                                    onChange={handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    className={classes.chip}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {allCuisines.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            <Checkbox
                                                checked={
                                                    specialty.indexOf(type) > -1
                                                }
                                            />
                                            <ListItemText primary={type} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={registerChef} color="primary">
                        Sign Up
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ChefSignUp;
