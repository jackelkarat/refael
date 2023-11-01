import { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
    CreateUser,
    GetAllUsers,
    getUserById,
    RemoveUser,
    UpdateUser,
} from "../../Redux/ActionCreater";
import { OpenPopup } from "../../Redux/Action";
import UserRow from "./UserRow";
import './User.css';

const User = (props) => {
    const columns = [
        { id: "name", name: "Name" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
        { id: "action", name: "Action" },
    ];

    const dispatch = useDispatch();

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const [rowPerPage, setRowPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState("Create user");

    const editObj = useSelector((state) => state.user.userObj);

    useEffect(() => {
        if (Object.keys(editObj).length > 0) {
            setId(editObj.id);
            setName(editObj.name);
            setEmail(editObj.email);
            setPhone(editObj.phone);
        } else {
            clearUser();
        }
    }, [editObj]);

    const handlePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowPerPage = (event) => {
        setRowPerPage(+event.target.value);
        setPage(0);
    };

    const addNewUser = () => {
        setIsEdit(false);
        setTitle("Create user");
        openpopup();
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const openpopup = () => {
        setOpenModal(true);
        clearUser();
        dispatch(OpenPopup());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const _obj = { id, name, email, phone };
        if (isEdit) {
            dispatch(UpdateUser(_obj));
        } else {
            dispatch(CreateUser(_obj));
        }
        closeModal();
    };

    const handleEdit = (id) => {
        setIsEdit(true);
        setTitle("Update user");
        setOpenModal(true);
        dispatch(getUserById(id))
    };

    const handleRemove = (code) => {
        dispatch(RemoveUser(code));
    };

    const clearUser = () => {
        setId(0);
        setName("");
        setEmail("");
        setPhone("");
    };

    useEffect(() => {
        props.getAllUsers();
    }, []);

    return props.userState.isLoading ? (
        <div>
            <h2>Loading.....</h2>
        </div>
    ) : props.userState.errormessage ? (
        <div>
            <h2>{props.userState.errormessage}</h2>
        </div>
    ) : (
         <div>
            <Paper>
                <div className="tableContainer">
                    <div>
                        <Button onClick={addNewUser} variant="contained">
                            Add New User
                        </Button>
                    </div>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="tableHeader">
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>
                                            {column.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.userState &&
                                    props.userState.userList
                                        .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                                        .map((row, i) => {
                                            return (
                                                <UserRow user={row}
                                                 handleEdit={handleEdit}
                                                 handleRemove={handleRemove}
                                                />
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[2, 10, 10, 20]}
                        rowsPerPage={rowPerPage}
                        page={page}
                        count={props.userState.userList.length}
                        component={'div'}
                        onPageChange={handlePage}
                        onRowsPerPageChange={handleRowPerPage}
                    />
                </div>
            </Paper>
            <Dialog open={openModal} onClose={closeModal} fullWidth maxWidth="sm">
                <DialogTitle>
                    <span>{title}</span>
                    <IconButton className="closeModal" onClick={closeModal}>
                        <CloseIcon color="primary"></CloseIcon>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} margin={2}>
                            <TextField
                                required
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                variant="outlined"
                                label="Name"
                            />
                            <TextField
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                variant="outlined"
                                label="Email"
                            />
                            <TextField
                                required
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                variant="outlined"
                                label="Phone"
                            />
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const mapStatetoProps = (state) => {
    return {
        userState: state.user,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(GetAllUsers()),
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(User);
