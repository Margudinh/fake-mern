import Router from 'next/router';
import { Cookie } from 'next-cookie';

export const auth = ctx => {

    if(ctx.req && !token){
        ctx.res.writeHead(302, {Location: '/login'});
        ctx.res.end();
        return;
    }

    if(!token){
        Router.push('/login');
    }
    return token;
}