import Icon from 'react-native-vector-icons/FontAwesome5';
import { images, icons, fontSizes, colors } from "../../theme";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
function FiveStars(props) {
    const { numberofStars } = props
    return [1, 2, 3, 4, 5].map((item, index) => {
        return <Icon key={index} name="star"
            size={10}
            color={numberofStars >= item ? colors.openingSoon : colors.disabled}
            style={{
                marginEnd: 1,

            }}
        />

    })
}
export default FiveStars