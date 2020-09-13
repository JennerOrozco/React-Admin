const axios = require('axios');

const usersData =  () => {  
  return getData()
}

async function getData() {
  let data = await axios.get('http://localhost/Api/getRolesList.php')    
  return data.data
  
}

export default usersData
