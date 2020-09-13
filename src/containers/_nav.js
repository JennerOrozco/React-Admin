const axios = require('axios');

const Nav =  () => {  
  return getData()
}
// eslint-disable-next-line
async function getData() {
  let data = await axios.get('http://localhost/Api/getUserPermisos.php')    
  return data.data
  
}

export default Nav;