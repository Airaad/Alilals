// SuccessDialog.js
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const SuccessDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle className="text-[#44A05B] text-3xl md:text-4xl mb-4">
            Success!
          </DialogTitle>
          <div className="p-4 rounded-lg mb-4">
            <img src="/assets/images/tick.jpg" alt="success" />
          </div>
          <DialogDescription className="md:text-lg text-center">
            Your booking has been successfully recorded. We will contact you
            shortly.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;