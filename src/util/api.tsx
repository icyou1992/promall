import axios from 'axios'

const url_promotion = 'https://asia-northeast3-promo-332311.cloudfunctions.net/promotionAPI';
const url_user = 'https://asia-northeast3-promo-332311.cloudfunctions.net/userAPI ';

const getPromo = async(param?: any) => {
  return await axios.get(url_promotion, { params: param });
}

const setPromo = async(data: any) => {
  // console.log(JSON.stringify(data))
  return await axios.post(
    url_promotion, 
    data, 
    { headers: { "Content-Type": `application/json` } }
  );
}

const updatePromo = async(data: any) => {
  // console.log(JSON.stringify(data))
  return await axios.patch(
    url_promotion, 
    data, 
    { headers: { "Content-Type": `application/json` } }
  );
}

const getUser = async() => {
  // return await axios.get(url_user)
  return 'user'
}

const createUser = async(email: string, password: string, name?: string, phone?: string) => {
  const data = {
    email: email,
    password: password,
    name: name,
    phone: phone,
  }

  return await axios.post(
    url_user, 
    data, 
    { headers: { "Content-Type": `application/json` } }
  );
}

export { getPromo, setPromo, updatePromo, getUser, createUser }