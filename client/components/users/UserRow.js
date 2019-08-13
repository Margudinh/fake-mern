import React from 'react'
import { Button } from 'react-materialize'

const UserRow = (props) => (
    <tr>
        <td>{props.user.id}</td>
        <td>{props.user.firstName}</td>
        <td>{props.user.lastName}</td>
        <td>
            <Button onClick = {props.onDelete}><i className = "material-icons">delete</i></Button>
        </td>
    </tr>
);

export default UserRow;