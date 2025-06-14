import React, { createContext, useContext, useState } from "react";
import { ImageNotification } from "./types";
import { ModalRenderer } from "./ModalRenderer";

interface DynamicNotificationContextProps {
  setNotification: (n: ImageNotification | null) => void;
  seenIds: Set<string>;
  markAsSeen: (id: string) => void;
  contentKey: string;
}

export const DynamicNotificationContext =
  createContext<DynamicNotificationContextProps>({
    setNotification: () => {},
    seenIds: new Set(),
    markAsSeen: () => {},
    contentKey: "dynamicNotificationContent",
  });

export const DynamicNotificationProvider = ({
  children,
  contentKey = "dynamicNotificationContent",
}: {
  children: React.ReactNode;
  contentKey?: string;
}) => {
  const [notification, setNotification] = useState<ImageNotification | null>(
    null
  );
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());

  const markAsSeen = (id: string) => {
    setSeenIds((prev) => new Set(prev).add(id));
  };

  const handleClose = () => {
    if (notification?.id) markAsSeen(notification.id);
    setNotification(null);
  };

  return (
    <DynamicNotificationContext.Provider
      value={{ setNotification, seenIds, markAsSeen, contentKey }}
    >
      {children}
      {notification && (
        <ModalRenderer notification={notification} onClose={handleClose} />
      )}
    </DynamicNotificationContext.Provider>
  );
};
