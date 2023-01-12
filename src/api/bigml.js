import axios from "axios";

export const prediction = async (getUserData) => {
    const record = {
        firstname: getUserData.firstname,
        lastname: getUserData.lastname,
        username: getUserData.username,
        email: getUserData.email
    }

    await axios.post(`https://facework-server-production.up.railway.app/api/users/${getUserData._id}/prediction`, record)
    .then((res) => {
        console.log("test")
        return res.data[0];
    })
    .catch((err) => 
        console.log(err)
    );
}