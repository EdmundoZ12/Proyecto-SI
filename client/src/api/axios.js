import  axios  from "axios";


const instance=axios.create({ 
    baseURL:"https://wylsomgym.onrender.com/api",
    withCredentials:true
})

export default instance
