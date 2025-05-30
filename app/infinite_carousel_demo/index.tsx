import InfiniteCarousel from "@/components/InfiniteCarousel";
import { Text, View, TouchableOpacity, Image } from "react-native";

export default function InfiniteCarouselDemo() {
  return (
    <InfiniteCarousel>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#ffeaa7",
          padding: 16,
          borderRadius: 12,
          justifyContent: "center",
          width: "100%",
        }}
        onPress={() => console.log("Card 1")}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Promoção</Text>
        <Text style={{ fontSize: 14 }}>Aproveite os descontos da semana!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 12,
          overflow: "hidden",
          width: "100%",
        }}
        onPress={() => console.log("Card 2")}
      >
        <Image
          source={{ uri: "https://picsum.photos/id/26/400/200" }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          resizeMode="cover"
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              width: "100%",
              padding: 12,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Imagem com overlay
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#81ecec",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
          width: "100%",
        }}
        onPress={() => console.log("Card 3")}
      >
        <Text style={{ fontSize: 18 }}>Notificações</Text>
        <View
          style={{
            marginTop: 8,
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: "#00cec9",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>3 novas</Text>
        </View>
      </TouchableOpacity>
    </InfiniteCarousel>
  );
}
