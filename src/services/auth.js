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
export const apiAddTickets = async (ticketData) => {
    try {
      const token = localStorage.getItem('token'); 
      
   
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
    
      const response = await apiClient.post('/tickets', ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding ticket:", error);
      throw error;
    }
  };
  
export const apiUpdateProfile = async (payload) => {
    return await apiClient.patch ( '/users/me', payload)
}
export const apiAddTickets = async () => {
    return await apiClient.post ( '/tickets' )
}
export const apiGetTickets = async () => {
    const token = localStorage.getItem('token');
    
    return await apiClient.get('/tickets', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const apiGetTicket = async () => {
    return await apiClient.get ( '/tickets/672df3d1e3d9ad0248cd4b98' )
}
export const apiDashboard = async () => {
    const token = localStorage.getItem('token'); 

    return await apiClient.get('/tickets-stats', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const apiUpdateTicket = async (id,formData) => {
    return await apiClient.patch (`/tickets/${id}`,formData )
}
export const apiDeleteTicket = async () => {
    return await apiClient.delete ( '/tickets/672df824e3d9ad0248cd4ba0' )
}