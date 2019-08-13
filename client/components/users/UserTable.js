import React from 'react'
import { Table } from 'react-materialize';
import PropTypes from 'prop-types';

import UserRow from './UserRow';

const UserTable = (props) => (
    <Table>
        <tbody>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
            </tr>
            { props.users.map((user, index) => {
                return <UserRow key = {user.id} user = {user} onDelete = {() => props.onDelete(user.id)}></UserRow>;
            }) }
        </tbody>
        
    </Table>
);

UserTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default UserTable;
