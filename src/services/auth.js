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
// export const apiAddTickets = async (ticketData) => {
//     try {
//         // Get the image name from the file if it exists
//         const imageName = ticketData.photo?.name || 'default-image';
        
//         const payload = {
//             problem: ticketData.problem,
//             description: ticketData.description,
//             photo: `https://savefiles.org/${imageName}?shareable_link=502`,  // Dynamic image URL
//             category: "technical support",
//             assignedTo: "not assigned",
//             department: "payment",
//             location: "Accra",
//             status: "initialized"
//         };

//         console.log('Exact payload being sent:', JSON.stringify(payload, null, 2));

//         const response = await apiClient.post("/tickets", payload);
//         return response;
//     } catch (error) {
//         console.error('Backend Error Details:', {
//             status: error.response?.status,
//             data: error.response?.data,
//             headers: error.response?.headers
//         });
//         throw error;
//     }
// }
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
export const apiGetOneUserTicket = async () => {
    try {
        console.log('Fetching user ticket stats...');
        const response = await apiClient.get("/tickets-stats/user");
       
        return response;
    } catch (error) {
        console.error('Error fetching ticket stats:', error.response?.data || error);
        throw error;
    }
}
export const apiGeticketByUser = async () => {
    try {
        console.log('Fetching user tickets...');
        const response = await apiClient.get("/tickets/byUser");
      
        return response;
    } catch (error) {
        console.error('Error fetching user tickets:', error.response?.data || error);
        throw error;
    }
}
export const apiAddTickets = async (payload) => {
    const imageName = payload.photo?.name || 'default-image';
 
    const ticketData = {
        department: payload.department,
        location: payload.location,
        problem: payload.problem,
        description: payload.description,
        category: payload.category,
        photo: `https://savefiles.org/${imageName}?shareable_link=502`, 
      
    };

    return await apiClient.post("/tickets", ticketData);
}