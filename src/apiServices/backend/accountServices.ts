
import * as request from '../utils/request'; 

export const loginAccount = async(walletAddress:string) => {
    try {
        var res = await request.postRaw("Account/Login", walletAddress);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAccount = async(id:number) => {
    try {
        var res = await request.get(`Account/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

