import { getFirestore, setDoc, doc } from "firebase/firestore";
import { UserApp } from "../../firebase/firebase2";

const db = getFirestore(UserApp);

const addQuery = async (bookingData) => {
  try {
    const { referenceNo } = bookingData;
    // Use the referenceNo as the document ID in the collection
    await setDoc(doc(db, "QueryBooking", referenceNo), {
      ...bookingData,
      createdAt: Date.now(),
    });

    return {
      success: true,
      message: "Booking successfully added.",
      id: referenceNo, // Return the referenceNo as the ID
    };
  } catch (error) {
    console.error("Error submitting Query:", error);
    return {
      success: false,
      message: "An error occurred while submitting the query.",
    };
  }
};

export { addQuery };
