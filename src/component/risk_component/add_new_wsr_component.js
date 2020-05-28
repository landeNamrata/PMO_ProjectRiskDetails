import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { DropzoneArea } from 'material-ui-dropzone'
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    resetButton: {
        marginLeft: '70%',
    },
    center: {
        width: '60%',
        border: '2px solid black',
        display: 'inline-flex',
        marginLeft: '20%'
    },
    textField: {
        width: '70%',
        marginLeft: '15%'
    },

    heading: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: 'grey',
        marginLeft: '4px',
        marginRight: '4px'
    },
}));

const risk_Type = [
    {
        value: 'Country',
        label: "Country"
    },
    {
        value: 'Market',
        label: "Market"
    },
    {
        value: 'Political',
        label: "Political"
    },
    {
        value: 'Credit',
        label: "Credit"
    },
]

const intern_extern = [
    {
        value: 'Internal',
        label: "Internal"
    },
    {
        value: 'External',
        label: "External"
    },
]
const owner = [
    {
        value: 'Owner  1',
        label: "Owner  1"
    },
    {
        value: 'Owner  2',
        label: "Owner  2 "
    },
    {
        value: 'Owner  3',
        label: "Owner  3 "
    },
    {
        value: 'Owner  4',
        label: "Owner 4"
    },
]
const severity = [
    {
        value: 'Critical',
        label: "Critical "
    },
    {
        value: 'Major',
        label: "Major "
    },
    {
        value: 'Moderate',
        label: "Moderate"
    },
    {
        value: 'Low',
        label: "Low "
    },
]

const priority = [
    {
        value: 'High',
        label: "High "
    },
    {
        value: 'Medium',
        label: "Medium "
    },
    {
        value: 'Low',
        label: "Low "
    },
    {
        value: 'None',
        label: "None"
    },
]

const age = [
    {
        value: '10',
        label: "10 "
    },
    {
        value: '19',
        label: "19 "
    },
    {
        value: '25',
        label: "25 "
    },
    {
        value: '33',
        label: "33"
    },
]


const status = [
    {
        value: 'Active',
        label: "Active"
    },
    {
        value: 'InActive',
        label: "InActive"
    },
]

const initialValues = {
    risk_Type: '',
    intern_extern: '',
    owner: '',
    severity: '',
    priority: '',
    raised_date: '',
    age: '',
    status: '',
}

const validationSchema = Yup.object({
    risk_Type: Yup.string().required('Required'),
    intern_extern: Yup.string().required('Required'),
    owner: Yup.string().required('Required'),
    severity: Yup.string().required('Required'),
    priority: Yup.string().required('Required'),
    raised_date: Yup.string().required('Required'),
    age: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
})

const AddNewWsr = () => {

    const classes = useStyles();
    const [files, setfiles] = useState([]);
    const [users, setUsers] = React.useState([]);

    const handleChange1 = (file) => {
        setfiles(file);
    };

    const onSubmit = values => {
        console.log('formik data', values)
        let data = {
            risk_Type: values.risk_Type,
            intern_extern: values.intern_extern,
            owner: values.owner,
            severity: values.severity,
            priority: values.priority,
            raised_date: values.raised_date,
            age: values.age,
            status: values.status,
        }
        console.log(data)
        addRisks(data);
        formik.handleReset()
    }

    const addRisks = user => {
        user.id = users.length + 1;
        setUsers([...users, user]);
    }

    const handleRemove = (id) => {
        console.log(id);
        users.splice(id, 1);
        setUsers(users.filter(user => user.id !== id))
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <Fragment>

            <div>
                <Button style={{ marginLeft: '1250px' }}>
                    <Link to={'/'} className="nav-link">
                        <ArrowBackIcon />
                    </Link>
                </Button>
            </div>

            <DialogTitle>Add New WSR</DialogTitle>
            <ExpansionPanel
                style={{ height: "500px" }}
                defaultExpanded
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.heading}
                >
                    <Typography><b>UploadFiles</b></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div style={{ marginLeft: '35%' }}>
                        <DropzoneArea
                            acceptedFiles={[]}
                            filesLimit={1000}
                            showFileNames={true}
                            maxFileSize={5000000}
                            dropzoneText='Drag and Drop Files Here To Upload'
                            onChange={handleChange1.bind("file")}
                            showPreviewsInDropzone={false}
                            showPreviews={true}
                            useChipsForPreview={true}
                            fullWidth={false}
                        />
                    </div>
                </ExpansionPanelDetails>
                <TextField
                    className={classes.textField}
                    label="Links/Comment"
                    multiline={true}
                    rows={2}
                    rowsMax={5}
                    variant="outlined"
                />
                <br /><br />
                <div className="mainContent">
                    <form onSubmit={formik.handleSubmit} >
                        <div className={classes.root1}>
                            <ExpansionPanel
                                style={{ height: "370px" }}
                                defaultExpanded
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className={classes.heading}
                                >
                                    <Typography ><b>Risks</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{ marginTop: "10px", width: "100%", marginLeft: '20%' }}>
                                        <div style={{ display: "inline-flex" }}>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Risk Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="risk_Type"
                                                        name="risk_Type"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.risk_Type}
                                                        onBlur={formik.handleBlur}
                                                        label="Customer"
                                                        variant="outlined"
                                                    >
                                                        {risk_Type.map((e, key) => {
                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {formik.touched.risk_Type && formik.errors.risk_Type ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.risk_Type}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Internal/External</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="intern_extern"
                                                        name="intern_extern"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.intern_extern}
                                                        onBlur={formik.handleBlur}
                                                        label="Internal/External"
                                                        variant="outlined"
                                                    >
                                                        {intern_extern.map((e, key) => {
                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {formik.touched.intern_extern && formik.errors.intern_extern ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.intern_extern}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Owner</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="owner"
                                                        name="owner"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.owner}
                                                        onBlur={formik.handleBlur}
                                                        label="Owner"
                                                        variant="outlined"
                                                    >
                                                        {owner.map((e, key) => {
                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {formik.touched.owner && formik.errors.owner ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.owner}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "inline-flex" }}>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Severity</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="severity"
                                                        name="severity"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.severity}
                                                        onBlur={formik.handleBlur}
                                                        label="Severity"
                                                        variant="outlined"
                                                    >
                                                        {severity.map((e, key) => {
                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {formik.touched.severity && formik.errors.severity ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.severity}</div>
                                                ) : null}
                                            </div>

                                            <div>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="priority"
                                                        name="priority"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.priority}
                                                        onBlur={formik.handleBlur}
                                                        label="Priority"
                                                        variant="outlined"

                                                    >
                                                        {priority.map((e, key) => {
                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {formik.touched.priority && formik.errors.priority ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.priority}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <TextField
                                                    label="Risk Raised Date"
                                                    //required={true}
                                                    id="raised_date"
                                                    name="raised_date"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.raised_date}
                                                    //onChange={handleChange("sow_end_date")}
                                                    InputLabelProps={{ shrink: true }}
                                                    style={{ marginLeft: "5%", width: "200px" }}
                                                    type="date"
                                                    //type="text" 
                                                    onBlur={formik.handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                                {formik.touched.raised_date && formik.errors.raised_date ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.raised_date}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <br />
                                        <div style={{ marginLeft: 2, display: "flex" }}>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="age"
                                                        name="age"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.age}
                                                        onBlur={formik.handleBlur}
                                                        label="Age"
                                                        variant="outlined"
                                                    >
                                                        {age.map((e, key) => {
                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                        })}

                                                    </Select>
                                                </FormControl>
                                                {formik.touched.age && formik.errors.age ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.age}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="status"
                                                        name="status"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.status}
                                                        onBlur={formik.handleBlur}
                                                        label="Status"
                                                        variant="outlined"
                                                    >
                                                        {status.map((e, key) => {
                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                        })}

                                                    </Select>
                                                </FormControl>
                                                {formik.touched.status && formik.errors.status ? (
                                                    <div style={{ color: 'red' }}>{formik.errors.status}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '14%', marginRight: '60%' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={!formik.dirty}
                                            style={{ width: 10 }} >
                                            <AddIcon />
                                        </Button>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div>
                                {
                                    users.map(user => (
                                        <div>
                                            <form>
                                                <Button type="button" onClick={() => handleRemove(user.id)} style={{ marginTop: "20px", marginLeft: "78%" }} >
                                                    <DeleteIcon />
                                                </Button>
                                                <div className={classes.center}>
                                                    <div style={{ marginTop: "10px", width: "90%", marginLeft: '6%' }}>
                                                        <div style={{ display: "inline-flex" }}>
                                                            <div>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Risk Type</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="risk_Type"
                                                                        name="risk_Type"
                                                                        defaultValue={user.risk_Type}
                                                                        label="Customer"
                                                                        variant="outlined"
                                                                        readOnly
                                                                    >
                                                                        {risk_Type.map((e, key) => {
                                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                                        })}
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                            <div>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Internal/External</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="intern_extern"
                                                                        name="intern_extern"
                                                                        defaultValue={user.intern_extern}
                                                                        label="Internal/External"
                                                                        variant="outlined"
                                                                        readOnly
                                                                    >
                                                                        {intern_extern.map((e, key) => {
                                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                                        })}
                                                                    </Select>
                                                                </FormControl>

                                                            </div>
                                                            <div>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Owner</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="owner"
                                                                        name="owner"
                                                                        defaultValue={user.owner}
                                                                        label="Owner"
                                                                        variant="outlined"
                                                                        readOnly
                                                                    >
                                                                        {owner.map((e, key) => {
                                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                                        })}
                                                                    </Select>
                                                                </FormControl>

                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex", }}>
                                                            <div>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Severity</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="severity"
                                                                        name="severity"
                                                                        defaultValue={user.severity}
                                                                        label="Severity"
                                                                        variant="outlined"
                                                                        readOnly
                                                                    >
                                                                        {severity.map((e, key) => {
                                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                                        })}
                                                                    </Select>
                                                                </FormControl>

                                                            </div>

                                                            <div>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="priority"
                                                                        name="priority"
                                                                        defaultValue={user.priority}
                                                                        label="Priority"
                                                                        variant="outlined"
                                                                        readOnly
                                                                    >
                                                                        {priority.map((e, key) => {
                                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                                        })}
                                                                    </Select>
                                                                </FormControl>

                                                            </div>
                                                            <div>
                                                                <TextField
                                                                    label="Risk Raised Date"
                                                                    //required={true}
                                                                    id="raised_date"
                                                                    name="raised_date"
                                                                    defaultValue={user.raised_date}
                                                                    //onChange={handleChange("sow_end_date")}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    style={{ marginLeft: "5%", width: "200px" }}
                                                                    type="date"
                                                                    //type="text" 
                                                                    onBlur={formik.handleBlur}
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    readOnly
                                                                />

                                                            </div>
                                                        </div>
                                                        <div style={{ marginLeft: 2, display: "flex" }}>
                                                            <div>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="age"
                                                                        name="age"
                                                                        defaultValue={user.age}
                                                                        label="Age"
                                                                        variant="outlined"
                                                                        readOnly
                                                                    >
                                                                        {age.map((e, key) => {
                                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                                        })}

                                                                    </Select>
                                                                </FormControl>

                                                            </div>
                                                            <div>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="status"
                                                                        name="status"
                                                                        defaultValue={user.status}
                                                                        label="Status"
                                                                        variant="outlined"
                                                                        readOnly
                                                                    >
                                                                        {status.map((e, key) => {
                                                                            return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                                                        })}
                                                                    </Select>
                                                                </FormControl>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    ))
                                }
                            </div>
                            <br></br>
                        </div>
                    </form>
                </div>
            </ExpansionPanel>
            <br /><br />
        </Fragment>
    )
}

export default AddNewWsr;