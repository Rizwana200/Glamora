import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminAppointments() {

  const [appointments, setAppointments] = useState([]);


  const fetchAppointments = async () => {
    try {

      const response = await api.get("/admin/appointments");

      setAppointments(response.data);

    } catch(error){

      console.log(error);

    }
  };


  useEffect(()=>{

    fetchAppointments();

  },[]);



  const updateStatus = async(id,status)=>{

    try{

      await api.put(
        `/admin/appointments/${id}/status`,
        {
          status: status
        }
      );


      alert(`Appointment ${status}`);

      fetchAppointments();


    }catch(error){

      console.log(error);

      alert("Failed to update");

    }

  };



  return (

    <div className="container-fluid p-4">

      <h2 className="mb-4">
        Manage Appointments
      </h2>


      <table className="table table-bordered table-hover">


        <thead className="table-dark">

          <tr>

            <th>ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>



        <tbody>


        {
          appointments.map((appointment)=>(

            <tr key={appointment.appointment_id}>


              <td>
                {appointment.appointment_id}
              </td>


              <td>
                {appointment.customer_name}
              </td>


              <td>
                {appointment.phone}
              </td>


              <td>
                {appointment.service}
              </td>


              <td>
                {
                new Date(
                  appointment.appointment_date
                ).toLocaleDateString("en-GB")
                }
              </td>


              <td>
                {
                appointment.appointment_time.slice(0,5)
                }
              </td>


              <td>
                {appointment.status}
              </td>


              <td>

                <button
                className="btn btn-success btn-sm me-2"
                onClick={()=>
                  updateStatus(
                    appointment.appointment_id,
                    "Approved"
                  )
                }
                >
                  Approve
                </button>



                <button
                className="btn btn-danger btn-sm"
                onClick={()=>
                  updateStatus(
                    appointment.appointment_id,
                    "Rejected"
                  )
                }
                >
                  Reject
                </button>


              </td>


            </tr>

          ))
        }


        </tbody>


      </table>


    </div>

  );
}


export default AdminAppointments;