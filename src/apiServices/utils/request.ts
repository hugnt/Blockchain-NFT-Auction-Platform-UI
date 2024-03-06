import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {"Content-Type": "application/json"},

});

export const get = async(path:string, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
}

export const post = async(path:string, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
}

export const postRaw = async(path:string, content: string) => {
    const response = await request.post(path, content);
    return response.data;
}

export default request;

export const GET_IMAGE = (img:string) => process.env.REACT_APP_IMAGE_URL+img