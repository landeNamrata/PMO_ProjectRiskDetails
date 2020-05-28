import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RiskTableData from '../component-table/RiskTableData';

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
}));

const project_name = [
    {
        value: 'Product Engineering',
        label: "Product Engineering"
    },
    {
        value: 'Professional Services',
        label: "Professional Services"
    },
    {
        value: 'Data Services',
        label: "Data Services"
    },
    {
        value: 'Developer',
        label: "Developer"
    },
]

const project_manager = [
    {
        value: 'Manager 1',
        label: "Manager 1"
    },
    {
        value: 'Manager 2',
        label: "Manager 2"
    },
    {
        value: 'Manager 3',
        label: "Manager 3"
    },
    {
        value: 'Manager 4',
        label: "Manager 4"
    },
]

const delivery_manager = [
    {
        value: 'Unit 1',
        label: "Unit 1"
    },
    {
        value: 'Unit 2',
        label: "Unit 2"
    },
    {
        value: 'Unit 3',
        label: "Unit 3"
    },
    {
        value: 'Unit 4',
        label: "Unit 4"
    },

]

const status = [
    {
        value: 'High',
        label: "High"
    },
    {
        value: 'Medium',
        label: "Medium"
    },
    {
        value: 'Low',
        label: "Low"
    },
]

const customer_name = [
    {
        value: 'Sony',
        label: "Sony"
    },
    {
        value: 'Microsoft',
        label: "Microsoft"
    },
    {
        value: 'Yahoo',
        label: "Yahoo"
    },
    {
        value: 'Google',
        label: "Google"
    },

]


const initialValues = {
    project_name: '',
    project_manager: '',
    status: '',
    sow_end_date: ''
    // sow_start_date: '',
    // customer_name: '',
    //  delivery_manager: '',
}

const validationSchema = Yup.object({
    project_name: Yup.string().required('Required'),
    project_manager: Yup.string().required('Required'),
    sow_end_date: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    //  sow_start_date: Yup.string().required('Required'),
    // delivery_manager: Yup.string().required('Required'),
    //  customer_name: Yup.string().required('Required')
})

const WsrTabComponent = () => {

    const classes = useStyles();
    const [users, setUsers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = React.useState(false);


    const addData = user => {
        user.id = users.length + 1;
        setUsers([...users, user]);
    }
const  initialValues = 
    {
        project_name: '',
        project_manager: '',
        status: '',
        sow_end_date: '',
        sow_start_date: '',
        customer_name: '',
         delivery_manager: '',
    }

    const onSubmit = values => {
        //console.log('formik data', values)
        let data = {
            customer_name: values.customer_name,
            project_name: values.project_name,
            project_manager: values.project_manager,
            delivery_manager: values.delivery_manager,
            status: values.status,
            sow_start_date: values.sow_start_date,
            sow_end_date: values.sow_end_date,
        }
        //console.log(data)
        addData(data);
        formik.handleReset()
    }

    //update data
    const data = [];
    const updatedList = (id, updatedUser) => {
        console.log(updatedUser);
        console.log(id)
        setEditing(true);
        data.push(users.filter(user => user.id !== id));
        data[0].push(updatedUser);
        setUsers([...data[0]]);
        setOpen(false)
    }

    //formik Initialization
    const formik = useFormik({
        initialValues,
        onSubmit,
        //validate
        validationSchema
    })

    // console.log(users)

    return (
        <div>
            <form id='formid' onSubmit={formik.handleSubmit}>
                <div style={{ marginTop: "20px", }}>
                    <div style={{ display: "flex", marginLeft: '15%' }}>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Customer Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="customer_name"
                                    name="customer_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.customer_name}
                                    onBlur={formik.handleBlur}
                                    label="Customer Name"
                                    variant="outlined"
                                >
                                    {customer_name.map((e, key) => {
                                        return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            {/* {formik.touched.customer_name && formik.errors.customer_name ? (
                                <div style={{ color: 'red' }}>{formik.errors.customer_name}</div>
                            ) : null} */}
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Project Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="project_name"
                                    name="project_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.project_name}
                                    onBlur={formik.handleBlur}
                                    label="Project Name"
                                    variant="outlined"

                                >
                                    {project_name.map((e, key) => {
                                        return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            {formik.touched.project_name && formik.errors.project_name ? (
                                <div style={{ color: 'red' }}>{formik.errors.project_name}</div>
                            ) : null}
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">project Manager</InputLabel>
                                <Select
                                    id="project_manager"
                                    name="project_manager"
                                    onChange={formik.handleChange}
                                    value={formik.values.project_manager}
                                    onBlur={formik.handleBlur}
                                    label="project Manager"
                                    variant="outlined"
                                >
                                    {project_manager.map((e, key) => {
                                        return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            {formik.touched.project_manager && formik.errors.project_manager ? (
                                <div style={{ color: 'red' }}>{formik.errors.project_manager}</div>
                            ) : null}
                        </div>

                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Delivery Manager</InputLabel>
                                <Select
                                    id="delivery_manager"
                                    name="delivery_manager"
                                    onChange={formik.handleChange}
                                    value={formik.values.delivery_manager}
                                    onBlur={formik.handleBlur}
                                    label="Delivery Manager"
                                    variant="outlined"
                                >
                                    {delivery_manager.map((e, key) => {
                                        return <MenuItem key={key} value={e.label}>{e.value}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            {/* {formik.touched.delivery_manager && formik.errors.delivery_manager ? (
                                <div style={{ color: 'red' }}>{formik.errors.delivery_manager}</div>
                            ) : null} */}
                        </div>

                    </div>

                    <div style={{ marginLeft: "15%", display: "flex" }} >
                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                <Select
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

                        <div>
                            <TextField
                                label="Start Date"
                                id="sow_start_date"
                                name="sow_start_date"
                                onChange={formik.handleChange}
                                value={formik.values.sow_start_date}
                                InputLabelProps={{ shrink: true }}
                                style={{ marginLeft: "5%", width: "200px" }}
                                type="date"
                                onBlur={formik.handleBlur}
                                margin="normal"
                                variant="outlined"
                            />
                            {/* {formik.touched.sow_start_date && formik.errors.sow_start_date ? (
                                <div style={{ color: 'red' }}>{formik.errors.sow_start_date}</div>
                            ) : null} */}
                        </div>

                        <div>
                            <TextField
                                label="End Date"
                                id="sow_end_date"
                                name="sow_end_date"
                                onChange={formik.handleChange}
                                value={formik.values.sow_end_date}
                                InputLabelProps={{ shrink: true }}
                                style={{ marginLeft: "14%", width: "200px" }}
                                type="date"
                                onBlur={formik.handleBlur}
                                margin="normal"
                                variant="outlined"
                            />
                            {formik.touched.sow_end_date && formik.errors.sow_end_date ? (
                                <div style={{ color: 'red' }}>{formik.errors.sow_end_date}</div>
                            ) : null}
                        </div>
                    </div>
                </div>


                <div className={classes.resetButton}>

                    <button type="submit" className="btn btn-success"
                        disabled={!formik.dirty}
                    >Add</button>

                    <button type="button" className="btn btn-danger"
                        disabled={!formik.dirty}
                        onClick={formik.handleReset}
                        style={{ marginLeft: '2px' }}>Reset</button>
                </div>

            </form>
            <hr />

            <RiskTableData
                users={users}
                updatedList={updatedList}
            />
        </div>
    );
}

export default WsrTabComponent; 