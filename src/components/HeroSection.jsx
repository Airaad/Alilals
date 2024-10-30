"use client";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { useSuccessDialog } from "@/context/DialogContext";
import SuccessDialog from "./SuccessDialog";
import AlertNotification from "./AlertNotification";
import { getAlert } from "../../firebase/alert/read";

const HeroVideo = () => {
  const { isOpen, closeDialog, alertOpen, closeAlert } = useSuccessDialog();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlert().then((data) => {
      console.log("alert fetched");
      setAlert(data);
      setLoading(false);
    });
  }, [alert]);

  return (
    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/videos/Website Video-2.mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      <SuccessDialog isOpen={isOpen} onClose={closeDialog} />
      {loading ? (
        ""
      ) : alert?.publish ? (
        <AlertNotification
          alert={alert}
          isOpen={alertOpen}
          onClose={closeAlert}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default HeroVideo;
