import axios from "axios";

let token = sessionStorage.getItem("token");
console.log('-----token: ', token)
let config = {
    "Authorization" : "",
    "Content-Type" : "application/json"
};
if (token) {
    config["Authorization"] = `Token ${token}`;
}


const instance = axios.create({
    baseURL : "http://localhost:5280/api/",
    headers : config
}) 


export default instance;