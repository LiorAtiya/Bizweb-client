// import axious from 'axios'

// export const loginCall = async (userCredential, dispatch) => {
//     dispatch({ type: "LOGIN_START" });
//     try {
//         const res = await axious.post("http://localhost:5015/api/auth/login", userCredential)
//         dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//         dispatch({ type: "LOGIN_FAILURE", payload: err });
//     }
// }