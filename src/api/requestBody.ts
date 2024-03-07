import md5 from 'md5'

const password = 'Valantis'
const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
const authString = `${password}_${timestamp}`
const xAuth = md5(authString)

export const url = 'https://api.valantis.store:40000/'

export default xAuth
