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
// export const apiAddTickets = async () => {
//     return await apiClient.post ( '/tickets' )
// }
export const apiGetTickets = async () => {
    const token = localStorage.getItem('token');
    
    return await apiClient.get('/tickets', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const apiGetTicket = async (id) => {
    return await apiClient.get ( `/tickets/${id}` )
}
export const apiDashboard = async () => {
    const token = localStorage.getItem('token'); 

    return await apiClient.get('/tickets-stats', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const apiUpdateTicket = async (id, updatedData) => {
    // Define valid status values
    const validStatuses = ['initialized', 'in_progress', 'completed'];

    // Prepare payload with defaults
    const payload = {
        ...updatedData,
        assignedTo: updatedData.assignedTo || 'not assigned',
        status: updatedData.status || 'initialized', // Default to 'initialized' if status is missing
    };

    // Validate status
    if (!validStatuses.includes(payload.status)) {
        console.error(`Invalid status: ${payload.status}. Allowed values are ${validStatuses.join(', ')}`);
        throw new Error('Invalid status value');
    }

    // Log the payload to debug
    console.log('Sending to API:', { id, payload });

    try {
        const response = await apiClient.patch(`/tickets/pro/${id}`, payload);
        console.log('API Response:', response.data);
        return response;
    } catch (error) {
        console.error('Error updating ticket:', error.response?.data || error.message);
        throw new Error(`Failed to update ticket: ${error.response?.data?.message || error.message}`);
    }
};

export const apiDeleteTicket = async (id) => {
    return await apiClient.delete( `/tickets/${id}` )
}
export const apiCreateDepartment = async (payload) => {
    return await apiClient.post( "addcategory" , payload)
}
// export const apiEditTicket= async (id) => {
//     return await apiClient.patch(`tickets/com/${id}`, )
// }

// For professional/agent to change status to in_progress
export const apiUpdateTicketPro = async (id, updatedData) => {
    const payload = {
        ...updatedData,
        status: 'in_progress'
    };

    console.log('Sending to Pro API:', { id, payload });
    return await apiClient.patch(`/tickets/pro/${id}`, payload);
};

// For completing tickets
export const apiUpdateTicketComplete = async (id, updatedData) => {
    const payload = {
        ...updatedData,
        status: 'completed'
    };

    console.log('Sending to Complete API:', { id, payload });
    return await apiClient.patch(`/tickets/com/${id}`, payload);
};

export const apiDepartmentLogin = async (credentials) => {
  return await fetch('API_URL/department-login', { // Replace with actual API endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then(response => response.json());
};