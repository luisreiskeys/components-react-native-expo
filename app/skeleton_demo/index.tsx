import { View, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import Skeleton from "@/components/Sketleton";

export default function SkeletonDemo() {
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: textColor,
          marginBottom: 8,
        }}
      >
        Skeleton Loader
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: textColor,
          opacity: 0.7,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        Componentes esqueléticos usados como placeholders visuais durante o
        carregamento de conteúdo real.
      </Text>

      {/* Avatar + texto simulando um card de perfil */}
      <View style={{ width: "100%", gap: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Skeleton variant="circle" width={60} height={60} />
          <View style={{ flex: 1, gap: 8 }}>
            <Skeleton width="80%" height={18} />
            <Skeleton width="50%" height={14} />
          </View>
        </View>

        {/* Imagem ou conteúdo principal */}
        <Skeleton width="100%" height={160} borderRadius={16} />

        {/* Linha de ações */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Skeleton width={80} height={20} borderRadius={10} />
          <Skeleton width={60} height={20} borderRadius={10} />
          <Skeleton width={40} height={20} borderRadius={10} />
        </View>
      </View>
    </ThemedView>
  );
}
