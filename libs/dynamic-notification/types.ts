export interface ImageNotification {
  id: string;
  type: "image-notification";
  imageUrl: string;
  alt?: string;
  closeable?: boolean;
  action?: {
    label: string;
    url: string;
  };
}
