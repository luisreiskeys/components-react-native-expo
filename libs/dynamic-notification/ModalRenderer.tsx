// ModalRenderer.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ImageNotification } from "./types";

interface Props {
  notification: ImageNotification;
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");

export const ModalRenderer = ({ notification, onClose }: Props) => {
  const [aspectRatio, setAspectRatio] = useState(3 / 4);

  useEffect(() => {
    Image.getSize(
      notification.imageUrl,
      (w, h) => setAspectRatio(w / h),
      () => setAspectRatio(3 / 4)
    );
  }, [notification.imageUrl]);

  return (
    <Modal animationType="fade" transparent visible>
      <SafeAreaView style={styles.overlay}>
        <View style={[styles.modalContainer, { aspectRatio }]}>
          <Image
            source={{ uri: notification.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>

          <View style={styles.footer}>
            {notification.alt && (
              <Text style={styles.altText}>{notification.alt}</Text>
            )}
            {notification.action?.url && (
              <Pressable
                style={styles.actionButton}
                onPress={() => Linking.openURL(notification.action!.url)}
              >
                <Text style={styles.actionText}>
                  {notification.action.label}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0008",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    position: "relative",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#0009",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#000000c7",
  },
  altText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
