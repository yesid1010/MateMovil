export const firebaseConfig = {
  apiKey: "AIzaSyCzsYPPLzHjLfVRp7Wh2wSMZWHbF2Rq2m4",
  authDomain: "matemovil-287c9.firebaseapp.com",
  databaseURL: "https://matemovil-287c9.firebaseio.com",
  projectId: "matemovil-287c9",
  storageBucket: "matemovil-287c9.appspot.com",
  messagingSenderId: "123926081906"
  };

  export const snapshotToArray = snapshot =>{
    let returnArray = [];
    snapshot.forEach(element => {
      let item = element.val();
      item.key = element.key;
      returnArray.push(item);
    });
    return returnArray;
  }