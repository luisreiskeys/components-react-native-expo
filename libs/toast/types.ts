export interface ToastMessage {
  id: string;
  type?: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}
