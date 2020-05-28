import React, { Fragment } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import ModalBox from '../component-table/Modal_Box';
import Button from "@material-ui/core/Button";
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

const useStyles = makeStyles((theme) => ({
    center: {
        width: '100%',
        padding: ' 1px',
        margin: 'auto',
        display: 'inline-flex',
        marginLeft: '20%'
    },
}))

const getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTableHeadCell: {
            root: {
                backgroundColor: "#FFF",
                fontWeight: "bold",
                marginLeft: '20px',
            }
        },
        MuiTableCell: {
            root: {
                padding: "8px"
            }
        },
        MuiTextField: {
            root: {
                height: "50px"
            }
        },
        MuiChip: {
            root: {
                alignItems: "center",
                marginTop: 20,
                direction: "row"
            }
        },
    }
})


const options = {
    filterType: 'checkbox',
    // selectableRows: false,   //no checkbox
    //filterType: "dropdown",  //filter on columns
    //responsive: "scroll",    //scrollbar
    viewColumns: false,
    // download: false,
    print: false,
    filter: false,
};

const RiskTableData = (props) => {

    const classes = useStyles();
    const columns = [
        { id: 'id', label: 'id', minWidth: 10, align: 'center', options: { display: false } },
        { id: 'customer_name', label: 'customer', minWidth: 10, align: 'center', options: { display: false } },
        { id: 'project_name', label: 'Project Name', minWidth: 10, align: 'center' },
        { id: 'project_manager', label: 'Project Manager', minWidth: 10, align: 'center' },
        { id: 'delivery_manager', label: 'delivery  manager', minWidth: 10, align: 'center', options: { display: false } },
        { id: 'status', label: 'Status', minWidth: 10, align: 'center',
               options: {
                   customBodyRender: (value, tableMeta) => {
                    if (tableMeta.rowData[5] === "High")
                        return (<AssistantPhotoIcon style={{ color: "green" }}></AssistantPhotoIcon>);
                    else if (tableMeta.rowData[5] === "Medium")
                        return (<AssistantPhotoIcon style={{ color: "yellow" }}></AssistantPhotoIcon>);
                    else if (tableMeta.rowData[5] === "Low")
                        return (<AssistantPhotoIcon style={{ color: "red" }}></AssistantPhotoIcon>);
                },
            },
        },
        { id: 'sow_start_date', label: 'start Date', minWidth: 10, align: 'center', options: { display: false } },
        { id: 'sow_end_date', label: 'Week End Date', minWidth: 10, align: 'center' },
        {  label: 'Edit',
            options: {
                customBodyRender: (value, tableMeta) => {
                    const rowId = tableMeta.rowData;  //onClick={() => updateRow(rowId[0])}>  //return id
                    console.log(tableMeta.rowData)
                    return (
                        <div>
                            <Button color="primary"
                              // onClick={() => updateRow(tableMeta.rowData)}>
                                onClick={() => updateRow({
                                    id: rowId[0],
                                    project_name: rowId[2],
                                    project_manager: rowId[3],
                                    status: rowId[5],
                                    sow_end_date: rowId[7]
                                })}>
                                <EditIcon />
                            </Button>
                        </div>
                    )
                }
            },
        }
    ]

    const [value, setValue] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [users, setUsers] = React.useState(props.dataSet);

    const initialFormState = {
        id: null,
        customer_name: '',
        project_name: '',
        project_manager: '',
        delivery_manager: '',
        status: '',
        sow_start_date: '',
        sow_end_date: '',
    };
    const [currentUser, setCurrentUser] = React.useState(initialFormState);

    const handleClose = () => {
        setOpen(false);
    }
    function handleClickOpen() {
        setOpen(true);
    }

    const EditDetails = (id, updatedUser) => {
        console.log(updatedUser);
        props.updatedList(id, updatedUser)
    }

    const updateRow = user => {
        console.log(user)
        setOpen(true);
        setEditing(true);
        setCurrentUser(user);
    }

    const dataSet = [];
    props.users.forEach((u) => {
        let data = [];
        data.push(u.id)
        data.push(u.customer_name)
        data.push(u.project_name)
        data.push(u.project_manager)
        data.push(u.delivery_manager)
        data.push(u.status)
        data.push(u.sow_start_date)
        data.push(u.sow_end_date)
        dataSet.push(data);  
    })
    console.log(dataSet)
  
    return (
        <div>

            <Fragment>
                <ModalBox
                    open={open}
                    handleClose={handleClose}
                    dataSet={dataSet}
                    EditDetails={EditDetails}
                    currentUser={currentUser}
                    setOpen={setOpen}
                  
                    setEditing={setEditing}
                />
            </Fragment>

            <div style={{ display: 'flex', marginLeft: '1%' }}>
                <button type="button" className="btn btn-secondary">WSR/Project Tab</button>
                <button type="button" className="btn btn-secondary" style={{ marginLeft: '1%' }}>Risk Register</button>&nbsp;
            </div>
            <br />

            <div style={{ marginLeft: '1%' }}>
                <button type="button" className="btn btn-secondary">
                    <Link to={'/cform'} className="nav-link" style={{ color: 'white' }}>
                        Add New
                    </Link></button>
                <button type="button" className="btn btn-secondary" style={{ marginLeft: '1%' }}>Schedule Audilt Meeting</button>
            </div>
            <br></br>

            <div className={classes.center}>
                <div style={{ display: "inline-flex" }}>
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            data={dataSet}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        </div>
    )
}

export default RiskTableData;