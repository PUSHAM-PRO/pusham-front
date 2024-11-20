import { apiClient } from "./config"

export const apiGetDepartmentTickets = async (category) => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await apiClient.get('/tickets', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                category: category // Add category as a query parameter
            }
        });
        
        // If you want to filter on the client side as well
        const tickets = response.data;
        return category 
            ? tickets.filter(ticket => ticket.category === category)
            : tickets;
            
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
};
