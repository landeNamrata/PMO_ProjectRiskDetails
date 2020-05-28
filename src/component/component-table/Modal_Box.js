import React, { Fragment, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme => ({
    textField1: {
        width: '100%'
    }
})));

const project_name = [
  
     'Product Engineering',
     'Professional Services',
     'Data Services',
     'Developer',
]


const project_manager = [
    "Manager 1",
    "Manager 2",
    "Manager 3",
    "Manager 4",
]

const status = [
    "High",
    "Medium",
    "Low"
]

const ModalBox = (props) => {

    const classes = useStyles(0);
    const [value, setValue] = React.useState(props.currentUser);
   // console.log(value)

    useEffect(
        () => {
            setValue(props.currentUser)
        },
        [props]
    )

    const handleChange = (name) => (event) => {
        setValue({ ...value, [name]: event.target.value });
    };

    const handleSubmit = (id) => {
    //    console.log(id)
    //    console.log(value)
       props.setEditing(true);
       props.EditDetails(id,value);
       props.handleClose()
    }

    return (
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit Risk Project Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit Risk Details</DialogContentText>
                    <table>
                        <tr>
                            <td>
                                <Autocomplete
                                    id="project_name"
                                    value={value.project_name}
                                    defaultValue={value.project_name}
                                    options={project_name}
                                    getOptionLabel={option => option}
                                    onChange={(event, project_name) => {
                                        setValue({ ...value, project_name });
                                    }}
                                    style={{ marginLeft: "10px", width: "220px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Project Name"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                            </td>
                            <td>
                                <Autocomplete
                                    id="project_manager"
                                    value={value.project_manager}
                                   defaultValue={value.project_manager}
                                    options={project_manager}
                                    getOptionLabel={option => option}
                                    onChange={(event, project_manager) => {
                                        setValue({ ...value, project_manager });
                                    }}
                                    style={{ marginLeft: "10px", width: "220px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Project Manager"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Autocomplete
                                    id="status"
                                    value={value.status}
                                   defaultValue={value.status}
                                    options={status}
                                    getOptionLabel={option => option}
                                    onChange={(event, status) => {
                                        setValue({ ...value, status });
                                    }}
                                    style={{ marginLeft: "10px", width: "220px" }}
                                    renderInput={params => <TextField {...params}
                                        label="Status"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />
                            </td>
                            <td>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    id="sow_end_date"
                                    label="Week End Date"
                                    className={classes.textField1}
                                    margin="normal"
                                    variant="outlined"
                                    defaultValue={value.sow_end_date}
                                   value={value.sow_end_date}
                                    onChange={handleChange('sow_end_date')}
                                    type="date"
                                />
                            </td>
                        </tr>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} variant="contained" color="primary">
                        Cancel
                        </Button>
                    <Button
                       onClick={()=> handleSubmit(props.currentUser.id)}
                        variant="contained" color="secondary">
                        Save
                        </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ModalBox;