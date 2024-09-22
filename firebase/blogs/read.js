import { app } from "../firebase";
import {
    collection,
    getDocs,
    getDoc,
    getFirestore,
    doc
  } from "firebase/firestore";

const db = getFirestore(app)

  export const getAllBlogs = async()=>{
    return await getDocs(collection(db,"blogs")).then((snaps)=>snaps.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      })))
  }

  export const getblog = async(blogId)=>{
    const blogRef = doc(db, "blogs", blogId);
    const blogSnap = await getDoc(blogRef);
    if(blogSnap){
        return {success:true, ...blogSnap.data()}
    }
    else{
        return {success: false}
    }
  }