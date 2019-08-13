
import Layout from '../components/Layout';
import UserTable from '../components/users/UserTable';
import fetch from 'isomorphic-unfetch';

export default class Index extends React.Component{

    state = {
        users: []
    }

    onDelete = (userId) => {
        fetch("http://localhost:5000/users/"+ userId, {
            method: "DELETE"
        });

        this.forceUpdate();
    }

    getUsers = () => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    users: data
                });
            })
            .catch(err => console.log(err));
    }

    render(){
        return (
            <Layout title = "Suh"> 
                <h1>Suh</h1>
                <UserTable users = {this.state.users} onDelete = {this.onDelete}></UserTable>
            </Layout> 
        );
    }

    componentDidMount(){
        this.getUsers();
    }

    componentDidUpdate(){
        this.getUsers();
    }
    
}