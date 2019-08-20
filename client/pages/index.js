
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import { auth } from '../utils/auth';


export default class Index extends React.Component{
    render(){
        return (
            <Layout title = "Suh"> 
                <h1>Suh</h1>
            </Layout> 
        );
    }

    static async getInitialProps(ctx) {
        const token = auth(ctx);
        return { token };
    }
}