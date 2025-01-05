import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";
import { UserApp } from "../../firebase/firebase2";

const db = getFirestore(UserApp);

const getReferenceNo = async (query = false) => {
  try {
    const docRef = doc(
      db,
      "ReferenceNo",
      query ? "queryReference" : "reference",
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { value } = docSnap.data();
      return query ? `query/2425-${value + 1}` : `eEST/2425-${value + 1}`;
    } else {
      return query ? "query/2425-1" : "eEST/2425-1";
    }
  } catch (error) {
    console.error("Error getting referenceNo:", error);
    return null;
  }
};

const incrementReferenceNo = async (query = false) => {
  try {
    const docRef = doc(
      db,
      "ReferenceNo",
      query ? "queryReference" : "reference",
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { value } = docSnap.data();
      await setDoc(docRef, { value: value + 1 });
    } else {
      await setDoc(docRef, { value: 1 });
    }
  } catch (error) {
    console.error("Error incrementing referenceNo:", error);
  }
};

export { getReferenceNo, incrementReferenceNo };
