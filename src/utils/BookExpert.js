import {
  getFirestore,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { UserApp } from "../../firebase/firebase2";

const db = getFirestore(UserApp);

const addBooking = async (bookingData) => {
  const { phone, referenceNo, ...restData } = bookingData;

  try {
    // Check if the booking already exists with the same phone number
    const bookingExists = await checkBookingExists(phone);

    if (bookingExists) {
      return {
        success: false,
        message: "A booking with this phone number already exists.",
      };
    }

    // Use the referenceNo as the document ID in the collection
    await setDoc(doc(db, "ExpertBooking", referenceNo), {
      ...restData,
      phone,
      createdAt: Date.now(),
      referenceNo,
      checked: false,
    });

    return {
      success: true,
      message: "Booking successfully added.",
      id: referenceNo, // Return the referenceNo as the ID
    };
  } catch (error) {
    console.error("Error adding booking:", error);
    return {
      success: false,
      message: "An error occurred while adding the booking.",
    };
  }
};

const checkBookingExists = async (phone) => {
  try {
    // Query the Firestore collection to find a document with the matching phone field and checked equal to false
    const bookingsCollection = collection(db, "ExpertBooking");
    const q = query(
      bookingsCollection,
      where("phone", "==", phone),
      where("checked", "==", false),
    );

    const querySnapshot = await getDocs(q);

    // Check if any documents match the query
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking booking existence:", error);
    throw new Error(
      "Error while checking booking existence with this phone number and checked property.",
    );
  }
};

export { addBooking, checkBookingExists };
