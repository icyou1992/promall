import axios from 'axios'
import { signInWithEmailAndPassword, sendEmailVerification, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth'
import { addDoc, collection, getDocs, Timestamp, query, where, orderBy, doc, updateDoc } from 'firebase/firestore'
import { IsLDevice } from './responsive';

const url_promotion = 'https://asia-northeast3-promo-332311.cloudfunctions.net/promotionAPI';
const url_user = 'https://asia-northeast3-promo-332311.cloudfunctions.net/userAPI ';

const toCustomDate = (date: Timestamp) => {
  return date.toDate().toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

// const getPromotionAPI = async(param?: any) => {
//   return await axios.get(url_promotion, { params: param });
// }

export const getPromotionAPI = async(db: any, data?: any) => {
  let docs: any = [];

  try {
    if(data && Object?.keys(data)[0] === 'category') {
      const querySnapshot = await getDocs(query(collection(db, 'promotion'), where('category', '==', data[Object.keys(data)[0]].toString()), where('expirationDate', '>=', Timestamp.now())));
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        data.effectiveDate = toCustomDate(data.effectiveDate);
        data.expirationDate = toCustomDate(data.expirationDate);
        
        docs.push(data);
      })
      return docs;
    } else if(data && Object?.keys(data)[0] === 'keyword') {
      // querySnapshot = await getDocs(query(collection(db, 'promotion'), orderBy('expirationDate'), where('expirationDate', '>=', Timestamp.now()), where('title', 'in', data[Object.keys(data)[0]].toString())));
  
    } else {     
      const querySnapshot = await getDocs(query(collection(db, 'promotion'), where('expirationDate', '>=', Timestamp.now())));
  
      querySnapshot.forEach(doc => {
        const data = doc.data();
        data.effectiveDate = toCustomDate(data.effectiveDate);
        data.expirationDate = toCustomDate(data.expirationDate);
  
        docs.push(data);  
      })      
      return docs;
    }
  } catch(err) {
    console.log(err)
  }
}
// const setPromotionAPI = async(data: any) => {
//   return await axios.post(
//     url_promotion, 
//     data, 
//     { headers: { "Content-Type": `application/json` } }
//   );
// }

export const setPromotionAPI = async(db: any, data: any) => {
  const querySnapshot = await addDoc(collection(db, 'promotion'), data)

  return querySnapshot.id;
}

// const updatePromotionAPI = async(data: any) => {
//   return await axios.patch(
//     url_promotion, 
//     data, 
//     { headers: { "Content-Type": `application/json` } }
//   );
// }

export const updatePromotionAPI = async(db: any, id: any, data: any) => {
  const docRef = doc(db, 'promotion', id)
  const documentSnapshot = await updateDoc(docRef, data)

  return documentSnapshot;
}


export const getAuthAPI = async() => {
  return await axios.get(url_user);
}

// const signInAPI = async(email: string, password: string) => {
//   return await axios.get(url_user, { params: { 'signin': true } });
// }

export const signInAPI = async(auth: any, email: string, password: string) => {
  try {
    if(email && password) {
      await signInWithEmailAndPassword(auth, email, password).then(userCredential => {
        // Signed in
        const user = userCredential.user;

        return user
      })
    }
  } catch(err) {
    console.log(err)
    return null
  }
}

const getSignMode = (auth: any, authProvider: any, getScreen: boolean) => { 
  return getScreen ? 
  (
    signInWithPopup(auth, authProvider)
  ) : (
    signInWithRedirect(auth, authProvider)
  ) 
}

export const signInWithOAuthAPI = async(auth: any, provider: string, getScreen: boolean) => {
  let authProvider;
  switch(provider) {
    case 'google':
      authProvider = new GoogleAuthProvider();
      await getSignMode(auth, authProvider, getScreen).then((res: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(res)
        const token = credential?.accessToken
        const user = res.user;

        return user
      })
      .catch(err => { console.log(err) })
      break;

    case 'facebook':
      authProvider = new FacebookAuthProvider();
      await getSignMode(auth, authProvider, getScreen).then((res: any) => {
        const credential = FacebookAuthProvider.credentialFromResult(res)
        const token = credential?.accessToken
        const user = res.user;

        return user
      })
      .catch(err => { console.log(err) })
      break;
      
    case 'apple':
      authProvider = new OAuthProvider('apple.com');
      // authProvider.addScope('email');
      // authProvider.addScope('name');
      
      // authProvider.setCustomParameters({
      //   locale: 'fr'
      // })
      await getSignMode(auth, authProvider, getScreen).then((res: any) => {
        const credential = OAuthProvider.credentialFromResult(res)
        const token = credential?.accessToken
        const user = res.user;

        return user
      })
      .catch(err => { console.log(err) })
      break;
    default:
      console.log('?? provider')
      break;
  }
}


// const signUpAPI = async(email: string, password: string, name?: string, phone?: string) => {
//   const data = {
//     email: email,
//     password: password,
//     name: name,
//     phone: phone,
//   }

//   return await axios.post(
//     url_user, 
//     data, 
//     { headers: { "Content-Type": `application/json` } }
//   );
// }

export const signUpAPI = async(auth: any, email: string, password: string, name: string | null, phone: string | null) => {
  try {
    const profile = {
      displayName: name,
      phone: phone,
    }
    const register = await createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
      updateProfile(userCredential.user, profile)
    })
    return register
  } catch(err) {
    console.log(err)
  }
}

export const signOutAPI = async(auth: any) => {
  try {
    return await signOut(auth)
  } catch(err) {
    console.log(err)
  }
} 

export const getCurrrentUserAPI = (auth: any) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // User is signed in
      return currentUser;
    } else {
      // User is signed out
      return null;
    }
  });
}

export const sendEmailVerificationAPI = async(user: any, url: any) => {
  const actionCodeSettings = {
    url: 'https://localhost:3000',
    iOS: {
      bundleId: 'com.'
    },
    android: {

    },
    handleCodeInApp: true,
    dynamicLinkDomain: 'example.page.link'
  }

  try {
    return await sendEmailVerification(user, url)
  } catch (err) {
    console.log(err)
  }
}

