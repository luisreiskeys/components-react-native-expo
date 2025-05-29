import { useState } from "react";
import { View, Button, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import ProgressStepper from "@/components/ProgressStepper";

export default function ProgressStepperDemo() {
  const [step, setStep] = useState(0);
  const [step2, setStep2] = useState(0);
  const textColor = useThemeColor({}, "text");

  const steps = [
    { title: "Paid" },
    { title: "Accepted" },
    { title: "Available" },
  ];

  const steps2 = [
    { title: "Account" },
    { title: "Profile" },
    { title: "Preferences" },
    { title: "Confirm" },
  ];

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      <Text style={{ fontSize: 20, color: textColor, marginBottom: 10 }}>
        Etapa {step + 1} de {steps.length}
      </Text>

      <ProgressStepper steps={steps} current={step} />

      <View style={{ flexDirection: "row", gap: 12, marginTop: 32 }}>
        <Button
          title="Anterior"
          disabled={step === 0}
          onPress={() => setStep((prev) => Math.max(prev - 1, 0))}
        />
        <Button
          title="Próximo"
          disabled={step === steps.length - 1}
          onPress={() =>
            setStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
        />
      </View>
      <ThemedView
        style={{ width: "90%", height: 4, borderRadius: 8, marginVertical: 10 }}
        lightColor="#f2f2f2"
        darkColor="#1c1c1e"
      />
      <Text style={{ fontSize: 20, color: textColor, marginBottom: 10 }}>
        Etapa {step2 + 1} de {steps2.length}
      </Text>

      <ProgressStepper steps={steps2} current={step2} />

      <View style={{ flexDirection: "row", gap: 12, marginTop: 32 }}>
        <Button
          title="Anterior"
          disabled={step2 === 0}
          onPress={() => setStep2((prev) => Math.max(prev - 1, 0))}
        />
        <Button
          title="Próximo"
          disabled={step2 === steps2.length - 1}
          onPress={() =>
            setStep2((prev) => Math.min(prev + 1, steps2.length - 1))
          }
        />
      </View>
    </ThemedView>
  );
}
