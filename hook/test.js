import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import Map from "../components/Map";
import SettingsScreen from "../components/SettingsScreen";
import UserScreen from "../components/UserScreen";
import VehicleScreen from "../components/VehicleScreen";
import EquiposScreen from "../components/EquiposScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const BottomSheet = createBottomSheetNavigator();
const Tab = createBottomTabNavigator();

const InvisibleView = () => {
  return <View style={{ height: 0, width: 0 }} />;
};

export default InvisibleView;

function TabNavigator({ navigation }) {
  
 

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Map />
      </View>

      <View style={styles.container3}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return null;
            },
            tabBarLabel: ({ focused, color, size }) => {
              let Component;

              if (route.name === "Mapa") {
                Component = () => (
                  <>
                    <Iconify icon="gis:map-poi" size={size} color={color} />
                    <Text style={{ color, fontSize: 11 }}>Mapa</Text>
                  </>
                );
              } else if (route.name === "Usuario") {
                Component = () => (
                  <>
                    <Iconify
                      icon="healthicons:factory-worker"
                      size={size}
                      color={color}
                      style={{marginLeft:8 }}
                    />
                    <Text style={{ color, fontSize: 11, marginLeft:8 }}>Usuario</Text>
                  </>
                );
              } else if (route.name === "Vehiculo") {
                Component = () => (
                  <>
                  <Iconify icon="mdi:car" size={size} color={color} style={{marginLeft:22 }} />
                  <Text style={{ color, fontSize: 11 , marginLeft:22 }}>Vehiculo</Text>
                </>
                );
              } else if (route.name === "Equipos") {
                Component = () => (
                  <>
                    <Iconify icon="mdi:amplifier" size={size} color={color} />
                    <Text style={{ color, fontSize: 11 }}>Equipos</Text>
                  </>
                );
              } else if (route.name === "Configuracion") {
                Component = () => (
                  <>
                    <Iconify icon="ph:gear-fill" size={size} color={color} />
                    <Text style={{ color, fontSize: 11 }}>Configuracion</Text>
                  </>
                );
              }

              return (
                <View style={{ alignItems: "center"}}>
                  <Component />
                </View>
              );
            },

            headerShown: false,
            tabBarActiveTintColor: "#009929",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
              {
                display: "flex",
                backgroundColor: "black",
                paddingTop: 10,
                height: 73,
                elevation: 0,
                position: "absolute",
                borderTopWidth: 0,
                borderTopColor: "transparent",
                shadowColor: "#5bc4ff",
              },
            ],
          })}
        >
          <Tab.Screen name="Mapa" component={InvisibleView} />
          <Tab.Screen
            name="Usuario"
            component={UserScreen}
            options={{
              
              tabBarButton : (props) => (
                <TouchableOpacity
                {...props}
                onPress={() => {
                  navigation.navigate("Usuario");
                  navigation.navigate("BigSheet", { id: "1" });
                }}
              />
              ),
                



                
            }}
          />
          <Tab.Screen name="Vehiculo" component={VehicleScreen} />
          <Tab.Screen name="Equipos" component={EquiposScreen} />
          <Tab.Screen name="Configuracion" component={SettingsScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

function BigSheetScreen() {
  return (
    <View style={[styles.container, styles.content]}>
      <Text>Sheet Screen </Text>
    </View>
  );
}

const renderBackdrop = (props) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={1}
    disappearsOnIndex={0}
    pressBehavior="none"
    enableTouchThrough={true}
  />
);

export function SimpleExample() {
  return (
    <NavigationContainer>
      <BottomSheet.Navigator
        screenOptions={{
          backdropComponent: renderBackdrop,
        }}
      >
        <BottomSheet.Screen name="TabNavigator" component={TabNavigator} />

        <BottomSheet.Screen
          name="BigSheet"
          component={BigSheetScreen}
          options={{
            snapPoints: ["50%", "80%"],
          }}
          getId={({ params }) => `sheet-${params.id}`}
        />
      </BottomSheet.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container2: {
    width: "100%",
    height: "93%",
  },
  container3: {
    width: "100%",
    height: "7%",
    textAlign: "center",
  },
  content: {
    marginVertical: 20,
  },
  spacer: {
    margin: 5,
  },
});
