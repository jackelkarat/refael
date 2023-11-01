import axios from "axios";
import {
    AddRequest,
    RemoveRequest,
    UpdateRequest,
    getAllRequestFail,
    getAllRequestSuccess,
    getbycodeSuccess,
    makeRequest,
    getUserByIdSuccess
} from "./Action"
import { toast } from "react-toastify";

export const GetAllUsers = () => {
    return (dispatch) => {
        dispatch(makeRequest());
            axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
                dispatch(getAllRequestSuccess(res.data));
            }).catch(err => {
                dispatch(getAllRequestFail(err.message));
            });

    }
}

export const CreateUser = (data) => {
    return (dispatch) => {
            dispatch(AddRequest(data));
            toast.success('User created successfully.')
    }
}

export const getUserById = (id) => {
    return (dispatch) => {
        dispatch(getUserByIdSuccess(id));
    }
}
export const UpdateUser = (data) => {
    return (dispatch) => {
            dispatch(UpdateRequest(data));
            toast.success('User updated successfully.')
    }
}

export const RemoveUser = (code) => {
    return (dispatch) => {
            dispatch(RemoveRequest(code));
            toast.success('User Removed successfully.')

    }
}


