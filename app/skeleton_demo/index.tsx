import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import Skeleton from "@/components/Sketleton";

export default function SkeletonDemo() {
  const textColor = useThemeColor({}, "text");
  const [loading, setLoading] = useState(true);

  // Simula o carregamento de dados
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos

    return () => clearTimeout(timeout);
  }, []);

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

      <View style={{ width: "100%", gap: 20 }}>
        {loading ? (
          <>
            {/* Avatar + texto simulando um card de perfil */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <Skeleton borderRadius={30} width={60} height={60} />
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
          </>
        ) : (
          <>
            {/* Conteúdo real após o loading */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <Image
                source={{ uri: "https://i.pravatar.cc/60" }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: textColor }}
                >
                  João da Silva
                </Text>
                <Text style={{ fontSize: 14, color: textColor, opacity: 0.7 }}>
                  Desenvolvedor Frontend
                </Text>
              </View>
            </View>

            <Image
              source={{ uri: "https://picsum.photos/400/160" }}
              style={{ width: "100%", height: 160, borderRadius: 16 }}
              resizeMode="cover"
            />

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View
                style={{
                  backgroundColor: "#ddd",
                  paddingHorizontal: 8,
                  borderRadius: 10,
                  paddingVertical: 3,
                  justifyContent: "center",
                }}
              >
                <Text>Curtir</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#ddd",
                  paddingHorizontal: 8,
                  borderRadius: 10,
                  paddingVertical: 3,
                  justifyContent: "center",
                }}
              >
                <Text>Comentar</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#ddd",
                  paddingHorizontal: 8,
                  borderRadius: 10,
                  paddingVertical: 3,
                  justifyContent: "center",
                }}
              >
                <Text>Compartilhar</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ThemedView>
  );
}
