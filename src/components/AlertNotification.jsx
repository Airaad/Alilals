"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AlertNotification = ({ alert, onClose, isOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 pt-10 flex flex-col bg-white shadow-lg rounded-lg min-h-3/4 w-full lg:max-w-2xl">
        <>
          <div className="relative w-full overflow-hidden rounded-lg">
            <img
              src={alert.imageUrl}
              alt="Alert Image"
              className="object-cover"
            />
          </div>
          <p className="text-gray-500 text-start text-xs md:text-base">
            {alert.date}
          </p>
          <div className="mt-4 space-y-4">
            <DialogHeader>
              <DialogTitle className="md:text-3xl font-bold text-green-700 text-center">
                Alert Notice: {alert.title}
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 text-justify text-xs md:text-base">
              {alert.brief}
            </p>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default AlertNotification;
