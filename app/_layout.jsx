import { Stack, Tabs } from "expo-router";

export default RootLayout = () => {
    return (
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
              headerTitle:"Home Page",
          }}
        />
        <Tabs.Screen
          name="Rive"
          options={{
            headerTitle: "Rive Test",
          }}
        />
        <Tabs.Screen
          name="Opencv"
          options={{
            headerTitle: "OpenCV test",
          }}
        />
      </Tabs>
    )
}