import moment from 'moment'

export const DateParser = (value) => {
    return moment(value).format('MMMM Do YYYY');;
}