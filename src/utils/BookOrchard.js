import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { UserApp } from "../../firebase/firebase2";

const db = getFirestore(UserApp);

const addBooking = async (bookingData) => {
  const { phone, ...restData } = bookingData;

  try {
    // Check if the booking already exists with the same phone number
    const bookingExists = await checkBookingExists(phone);

    if (bookingExists) {
      return {
        success: false,
        message: "A booking with this phone number already exists.",
      };
    }

    // Generate a unique document ID based on phone number
    const bookingRef = doc(collection(db, "OrchardBooking"), phone);

    const timestamp = new Date().toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Add the booking to the Firestore collection
    await setDoc(bookingRef, {
      ...restData,
      phone,
      createdAt: timestamp,
    });

    return { success: true, message: "Booking successfully added." };
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
    // Query the Firestore collection to check for existing booking
    const bookingRef = doc(collection(db, "OrchardBooking"), phone);
    const docSnapshot = await getDoc(bookingRef);

    return docSnapshot.exists();
  } catch (error) {
    console.error("Error checking booking existence:", error);
    throw new Error("Error while checking booking existence.");
  }
};

export { addBooking, checkBookingExists };
