import { app } from "../firebase";
import {
    collection,
    getDocs,
    getDoc,
    getFirestore,
    doc
  } from "firebase/firestore";

const db = getFirestore(app)

  export const getAllStats = async()=>{
    return await getDocs(collection(db,"stats")).then((snaps)=>snaps.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      })))
  }

  export const getStat = async(statId)=>{
    const statRef = doc(db, "stats", statId);
    const statSnap = await getDoc(statRef);
    if(statSnap){
        return {success:true, ...statSnap.data()}
    }
    else{
        return {success: false}
    }
  }