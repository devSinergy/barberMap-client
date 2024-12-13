// // @ts-nocheck
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
// const SECRETKEY = process.env.SECRETKEY;

// export async function handle({event,resolve}){
    
//     const token = event.cookies.get('token');
//     console.log(token)
//     if(token){
//         try {
//             // @ts-ignore
//             const decoded = jwt.verify(token,SECRETKEY );
//             event.local.user = decoded
//         } catch (error) {
//             console.error('Token inválido o expirado:', error);
//             event.locals.user = null; 
//         }
//     }else {
//         event.locals.user = null;
//     }
//     return resolve(event);
// }