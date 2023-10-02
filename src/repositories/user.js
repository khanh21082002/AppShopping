import { Alert } from "react-native"
import axios from "axios"

const SERVER_NAME ='randomuser.me'

const getUserDetail = async() => {
    try {
        let response = await axios.get(`https://${SERVER_NAME}/api`)
        if(response.status !=200){
            throw 'Failed to fetch data'
        }
        if(response.data.results.length > 0){
            let responseUser = response.data.results[0]
            let user = {               
            } 
            user.dateOfBirth = new Date(responseUser.dob.date)
            user.email = responseUser.email ?? ''
            user.gender = responseUser.gender ?? "male"
            user.userName = `${responseUser.id.name}${responseUser.id.value}`
            user.address = `${responseUser.location.state},${responseUser.location.street.name}` ??''
            user.url =responseUser.picture.large ?? ''
            user.phone = responseUser.phone ?? ''
            user.registerDate = new Date(responseUser.registered.date) ?? ''           
            return user
        }
        throw 'User not found'
        
    } catch (error) {
        
        throw error
    }
}

const login = ({email, password}) => {


}

export default {
    getUserDetail,
    login
}