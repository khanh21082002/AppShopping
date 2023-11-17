import moment from 'moment'
export const convertDateToString = (dateTime) => {
    return moment(dateTime).format('DD-MM-YYYY')
}