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
  } catch (error) {
    console.error(error);
  }
};


  
