import { app } from "../firebase";
import {
    collection,
    getDocs,
    getDoc,
    getFirestore,
    doc
  } from "firebase/firestore";

const db = getFirestore(app)

  export const getAllProjects = async()=>{
    return await getDocs(collection(db,"projects")).then((snaps)=>snaps.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      })))
  }

  export const getProject = async(projectId)=>{
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);
    if(projectSnap){
        return {success:true, ...projectSnap.data()}
    }
    else{
        return {success: false}
    }
  }