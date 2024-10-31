"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import { useSuccessDialog } from "@/context/DialogContext";
import SuccessDialog from "./SuccessDialog";
import AlertNotification from "./AlertNotification";
import { useAlert } from "@/context/AlertContext";

const HeroVideo = () => {
  const { alert, loading, error } = useAlert();
  const { isOpen, closeDialog, alertOpen, closeAlert } = useSuccessDialog();

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
