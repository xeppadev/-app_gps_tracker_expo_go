import { View, Text, TouchableOpacity} from 'react-native'
import { Iconify } from "react-native-iconify";

const VehicleScreen = ({ setModalVisible }) => {
    return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity 
      style={{ 
        position: 'absolute', 
        top: 12, 
        left: 12,
        backgroundColor: '#e9e9e9', // color de fondo
        borderRadius: 60, // radio de borde para hacerlo circular
        width: 24, // ancho del botón
        height: 24, // altura del botón
        justifyContent: 'center', // centrar el icono verticalmente
        alignItems: 'center' // centrar el icono horizontalmente
      }} 
      onPress={() => setModalVisible(false)}
    >
      <Iconify icon="bxs:left-arrow" size={12} color={"#2c2c2c"} />
    </TouchableOpacity>
          
        </View>
      )
    }

export default VehicleScreen