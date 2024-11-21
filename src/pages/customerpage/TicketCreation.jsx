// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import RootLayout from '../../layouts/RootLayout';


// const TicketCreation = () => {
//   const [formData, setFormData] = useState({
//     location: '',
//     problem: '',
//     description: '',
//     photo: null,
//   });

//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedPhoto(file);
//     setFormData((prevData) => ({ ...prevData, photo: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.location || !formData.problem || !formData.description) {
//       Swal.fire({
//         title: 'Error!',
//         text: 'Please fill in all required fields',
//         icon: 'error',
//         confirmButtonColor: '#22c55e'
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const submitData = new FormData();
//       submitData.append('date', formData.date);
//       submitData.append('department', formData.department);
//       submitData.append('location', formData.location);
//       submitData.append('problem', formData.problem);
//       submitData.append('description', formData.description);
//       if (formData.photo) {
//         submitData.append('photo', formData.photo);
//       }

//       const response = await axios.post('/tickets', submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       await Swal.fire({
//         title: 'Success!',
//         text: 'Ticket created successfully',
//         icon: 'success',
//         confirmButtonColor: '#22c55e'
//       });

//       setFormData({
//         location: '',
//         problem: '',
//         description: '',
//         photo: null
//       });
//       setSelectedPhoto(null);

//     } catch (error) {
//       Swal.fire({
//         title: 'Error!',
//         text: error.response?.data?.message || 'Failed to create ticket. Please try again.',
//         icon: 'error',
//         confirmButtonColor: '#22c55e'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleAddAnother = () => {
//     setFormData({
//       location: '',
//       problem: '',
//       description: '',
//       photo: null
//     });
//     setSelectedPhoto(null);
//   };

//   return (
//     <RootLayout>
//       <div className="bg-white rounded-xl shadow p-8 mx-4  lg:mr-20  max-w-screen-xl">
     
//       <h2 className="text-2xl font-bold mb-6">Ticket creation</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="border-b-8 border-green-500 mb-6 rounded-lg">
//           <span className="text-green-500 font-medium">Ticket Information</span>
//         </div>

//         <div className="space-y-4">
//           {/* Location of Customer */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Location of Customer</label>
//             <input
//               type="text"
//               name="location"
//               placeholder="Enter location"
//               className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
//               onChange={handleInputChange}
//               value={formData.location}
//               required
//             />
//           </div>


//           {/* Type of Problem */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Type of problem</label>
//             <input
//               type="text"
//               name="problem"
//               placeholder="Enter problem type"
//               className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
//               onChange={handleInputChange}
//               value={formData.problem}
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               name="description"
//               placeholder="Enter description"
//               className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
//               onChange={handleInputChange}
//               value={formData.description}
//               required
//               rows={4}
//             />
//           </div>

//           {/* Add Photo */}
//           <div className="mb-4">
//             <label className="block text-gray-600 font-medium text-center mb-2" htmlFor="photo">
//               Add photo (Optional)
//             </label>
//             <label
//               htmlFor="dropzone-file"
//               className="flex flex-col justify-center items-center w-full sm:w-2/4 h-40 sm:h-52 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 mx-auto"
//             >
//               {formData.photo ? (
//                 <img
//                   src={URL.createObjectURL(formData.photo)}
//                   alt="Selected"
//                   className="max-w-full max-h-full object-contain"
//                 />
//               ) : (
//                 <div className="flex flex-col justify-center items-center pt-5 pb-6">
//                   <svg
//                     aria-hidden="true"
//                     className="mb-3 w-8 sm:w-10 h-8 sm:h-10 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                     ></path>
//                   </svg>
//                   <p className="mb-2 text-xs sm:text-sm text-gray-500">
//                     <span className="font-semibold">Select a file or drag and drop here</span>
//                   </p>
//                   <p className="text-xs text-gray-500">In PNG, JPG, JPEG ..., the file size does not exceed 10 MB</p>
//                 </div>
//               )}
//               <input
//                 id="dropzone-file"
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//               />
//             </label>
//           </div>
//         </div>

//         <div className="flex justify-end items-center gap-4 mt-6">
//           <button
//             type="button"
//             onClick={handleAddAnother}
//             className="py-2 px-4 text-gray 600 font-medium rounded-full border border-gray-300 hover:bg-gray-200"
//           >
//             Add another ticket
//           </button>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
//             disabled={isSubmitting}
//           >
//             Continue
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </form>
//     </div>
//    </RootLayout>
//   );
// };

// export default TicketCreation;

import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiAddTickets } from '../../services/auth';
import RootLayout from '../../layouts/RootLayout';

const TicketCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    department: 'billing',
    location: '',
    problem: '',
    description: '',
    category: 'Billing',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!formData.department || !formData.location || !formData.problem || !formData.description || !formData.category) {
        Swal.fire({
          icon: 'error',
          title: 'Required Fields Empty',
          text: 'Please fill in all required fields.',
          confirmButtonText: 'OK',
        });
        return;
      }


      const ticketData = {
        // department: formData.department,
        location: formData.location,
        problem: formData.problem,
        description: formData.description,
        // category: formData.category,
        status: 'initialized',
        assignedTo: 'not assigned',
        photo: formData.photo ? formData.photo : 'default-image'
      };

      const response = await apiAddTickets(ticketData);

      Swal.fire({
        icon: 'success',
        title: 'Ticket Added!',
        text: 'Your ticket has been successfully added.',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    } catch (error) {
      console.error('Error adding ticket:', error);
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        'An error occurred while adding the ticket.';
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Ticket',
        text: errorMessage,
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <RootLayout>
      <div className="bg-white rounded-xl shadow p-8 mx-4  lg:mr-20  max-w-screen-xl">
      <h1 className="text-3xl font-bold text-gray-800 mt-8">Ticket creation</h1>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg mt-8 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-green-600 mb-1">Ticket information</h2>
          <div className="w-full h-1 bg-green-600 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
            />

          </div> */}


          <div>
            <label className="block text-gray-700 font-medium mb-1">Location of customer</label>
            <input
              type="text"
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-1">Type of problem</label>
            <input
              type="text"
              name='problem'
              value={formData.problem}
              onChange={handleChange}
              placeholder="Describe the problem"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
            ></textarea>
          </div>
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1 w-full">category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
            >
              <option value="">Select Category</option>
              <option value="technical support">Technical Support</option>
              <option value="billing">Billing</option>
              <option value="account management">Account Management</option>
              <option value="sales enquiry">Sales Enquiry</option>
            </select>
          </div> */}

          <div className="p-6 flex flex-col justify-center ">
            <p className="text-gray-500 font-medium flex  justify-center">Add photo (Optional)</p>
            <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">

              <div className="flex flex-col items-center mt-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                  <FiUpload className="w-6 h-6 text-gray-400" /> {/* React Icon */}
                </div>
                <p className="text-sm text-gray-500 mt-2">Select a file or drag and drop here</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="photo-upload"
                  className="mt-4 px-4 py-2 bg-white text-black rounded-full border border-black text-sm cursor-pointer"
                >
                  Select photo
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button type="button" className="py-1.5 px-4 text-gray 600 font-medium rounded-full border border-gray-300 hover:bg-gray-200">
              Add another ticket
            </button>
            <button type="submit" className="px-6 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600">
              Continue →
            </button>
          </div>
        </form>
      </div>
    </div>
    </RootLayout>
  );
};

export default TicketCreation;
