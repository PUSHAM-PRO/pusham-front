import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    return await apiClient.post ('/users/signup', payload)
}
export const apiLogin = async (payload) => {
    return await apiClient.post ('/users/login', payload)
}
export const apiProfile = async (payload) => {
    return await apiClient.get ( '/users/me', payload)
}
export const apiUpdateProfile = async (payload) => {
    return await apiClient.patch ( '/users/me', payload)
}
export const apiAddTickets = async () => {
    return await apiClient.post ( '/tickets' )
}
export const apiGetTickets = async () => {
    return await apiClient.get ( '/tickets' )
}
export const apiGetTicket = async () => {
    return await apiClient.get ( '/tickets/672df3d1e3d9ad0248cd4b98' )
}
export const apiDashboard = async () => {
    return await apiClient.get ( '/tickets-stats' )
}
export const apiUpdateTicket = async () => {
    return await apiClient.patch ( '/tickets/672df3d1e3d9ad0248cd4b98' )
}
export const apiDeleteTicket = async () => {
    return await apiClient.delete ( '/tickets/672df824e3d9ad0248cd4ba0' )
}