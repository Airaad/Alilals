import { getFirestore, addDoc, collection } from "firebase/firestore";
import { UserApp } from "../../firebase/firebase2";

const db = getFirestore(UserApp);

const addQuery = async (bookingData) => {
  try {
    const { referenceNo } = bookingData;
    await addDoc(collection(db, "QueryBooking"), {
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
