import axios from 'axios';

const ax = axios.create({
    baseURL: 'https://localhost:5001/movies',
    headers:{
        // withCredentials: true,

    }
});


export async function GetData() {
    try {
        const response = await ax.get();
        return response.data
    }catch (e) {
        console.log(e);

    }
}


export async function PostData(data) {
    try {
        const response = await ax.post("", data, {headers: {
            'Content-Type': 'application/json'
            }});
        return response;
    }catch (e) {
        console.log(e)
    }
}

