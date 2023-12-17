import axios from 'axios';

const configAPI = 'https://healthcaresystem20231211232135.azurewebsites.net/';

export const callAPI =() =>{
    return axios.get(configAPI+'api/Locations')
    .then(response => {
      return response.data;
    })
    .catch(error => console.error(error));



}

export const registerUser = async (user) => {
  try {
    const response = await axios.post(configAPI+'api/Accounts/register', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const loginUser = async (user) => {
  try {
    const response = await axios.post(configAPI+'api/Accounts/login', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateUser = async (userId, user) => {
  try {
    const response = await axios.put(configAPI+'api/Users/'+userId, user);
    return response.data
  } catch (error) {
    console.error(error);
  }
};
export const addAppointment = async (data) => {
  try {
    const response = await axios.post(configAPI+'api/Appointments', data);
    return response.data
  } catch (error) {
    console.error(error);
  }
};

// export const getAppointmentByUserID = async () => {
//   try {

//     const response= await axios.get(configAPI+'api/Appointments/user/6');
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
export const getAppointmentByUserID =async (userId) =>{
    try {
      const response = await axios.get(configAPI+ 'api/Appointments/user/'+userId);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const deleteAppointmentByUserID =async (id) =>{
  try {
    const response = await axios.delete(configAPI+ 'api/Appointments/'+id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



  
