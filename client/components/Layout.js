import React from 'react'
import Head from 'next/head';

export default class Layout extends React.Component{
    render(){
        return (
            <div className = "container">
                <Head>
                    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet" />
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Head>
                {this.props.children}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            </div>
        );
    }

    
}