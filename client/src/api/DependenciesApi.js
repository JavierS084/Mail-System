import axios from 'axios';

export const getAllDependencies = async () => 
    await axios.get('http://localhost:3030/departaments');