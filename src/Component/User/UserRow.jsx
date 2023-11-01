import {Button, TableCell, TableRow} from "@mui/material";

const UserRow = ({user, handleRemove ,handleEdit}) => {
    return (
  	  <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>
            <Button
                onClick={(e) => {
                    handleEdit(user.id);
                }}
                variant="contained"
                color="primary"
            >
                Edit
            </Button>
            <Button
            onClick={(e) => {
                handleRemove(user.id);
            }}
            variant="contained"
            color="error"
        >
            Delete
            </Button>
        </TableCell>
       </TableRow>
	 );
  };
export default UserRow;