import StarRating from "@/components/StarRating";
import { View, Text } from "react-native";

export default function StarRatingDemo() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#000",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: "#fff",
          marginBottom: 10,
          fontWeight: "600",
        }}
      >
        O que você achou do componente?
      </Text>
      <Text style={{ color: "#ccc", marginBottom: 20 }}>
        Escolha de 1 a 5 estrelas para classificar.
      </Text>
      <StarRating
        defaultRating={0}
        onRatingChange={(rating) => console.log("Avaliação:", rating)}
        compact={false}
        labels={[
          "Péssimo 😡",
          "Ruim 😞",
          "Regular 😐",
          "Bom 🙂",
          "Excelente 🤩",
        ]}
      />
    </View>
  );
}
