import axios from 'axios';

export const callAPI =() =>{
    return axios.get('https://healthcaresystem20231211232135.azurewebsites.net/api/Locations')
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => console.error(error));
}

export const registerUser = async (user) => {
  try {
    const response = await axios.post('https://healthcaresystem20231211232135.azurewebsites.net/api/Register', user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const loginUser = async (user) => {
  try {
    const response = await axios.post('https://healthcaresystem20231211232135.azurewebsites.net/api/Login', user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateUser = async (userId, user) => {
  try {
    const response = await axios.put('https://healthcaresystem20231211232135.azurewebsites.net/api/Users/'+userId, user);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


  
