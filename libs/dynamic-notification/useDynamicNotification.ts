// useDynamicNotification.ts
import { useContext } from "react";
import { DynamicNotificationContext } from "./DynamicNotificationProvider";
import { ImageNotification } from "./types";

export const useDynamicNotification = () => {
  const context = useContext(DynamicNotificationContext);
  if (!context)
    throw new Error("Wrap your app with <DynamicNotificationProvider />");

  const seenIds = context.seenIds ?? new Set();
  const contentKey = context.contentKey ?? "dynamicNotificationContent";

  const triggerManually = (notification: ImageNotification) => {
    context.setNotification(notification);
  };

  const triggerFromResponse = (response: any) => {
    const payload = contentKey ? response?.[contentKey] : response;

    if (!payload || payload?.type !== "image-notification") return;

    const notification = { ...payload };
    if (notification.id && seenIds.has(notification.id)) return;

    if (notification.action) {
      const url = new URL(notification.action.url);
      notification.action.url = url.toString();
    }

    context.setNotification(notification);
  };

  const checkNotification = async (url: string) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      triggerFromResponse(json);
    } catch (e) {
      console.warn("Erro ao buscar notificação:", e);
    }
  };

  return {
    triggerManually,
    triggerFromResponse,
    checkNotification,
  };
};
