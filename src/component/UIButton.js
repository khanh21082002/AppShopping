import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {colors ,fontSizes} from '../theme'
function UIButton(props) {
    const {onPress, title , isSelected} = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderColor: 'white',
                borderWidth: 1,
                height: 45,
                borderRadius: 5,
                marginHorizontal: 15,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isSelected==true ? 'white' : null,
            }}>

            {isSelected ==true && <Icon
                name="check-circle"
                size={20}
                color="green"
                style={{
                    position: 'absolute',
                    left: 10,
                    right: 10
                }}

            />}
            <Text style={{
                color: isSelected==true ? colors.primary : 'white',
                fontSize: fontSizes.h3
            }}>{title}</Text>

        </TouchableOpacity>
    )
}

export default UIButton