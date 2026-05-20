import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://support-crm-system.onrender.com/api";

function App() {
  const [tickets, setTickets] = useState([]);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `${API}/tickets`,
        {
          params: {
            search,
            status,
          },
        }
      );

      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  const createTicket = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/tickets`,
        formData
      );

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

      fetchTickets();

      alert("Ticket Created Successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    ticketId,
    newStatus
  ) => {
    try {
      await axios.put(
        `${API}/tickets/${ticketId}`,
        {
          status: newStatus,
          notes: `Status updated to ${newStatus}`,
        }
      );

      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Support CRM System
        </h1>

        {/* Create Ticket Form */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Create New Ticket
          </h2>

          <form
            onSubmit={createTicket}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              placeholder="Customer Name"
              className="border p-3 rounded-lg"
              value={formData.customer_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer_name:
                    e.target.value,
                })
              }
              required
            />

            <input
              type="email"
              placeholder="Customer Email"
              className="border p-3 rounded-lg"
              value={formData.customer_email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer_email:
                    e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Subject"
              className="border p-3 rounded-lg md:col-span-2"
              value={formData.subject}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                })
              }
              required
            />

            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg md:col-span-2"
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 md:col-span-2"
            >
              Create Ticket
            </button>

          </form>
        </div>

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search tickets..."
            className="border p-3 rounded-lg flex-1"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="border p-3 rounded-lg"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="">
              All Status
            </option>

            <option value="Open">
              Open
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

        </div>

        {/* Tickets Table */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">
                  Ticket ID
                </th>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Subject
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {tickets.map((ticket) => (

                <tr
                  key={ticket.ticket_id}
                  className="border-t"
                >

                  <td className="p-4">
                    {ticket.ticket_id}
                  </td>

                  <td className="p-4">
                    <div>
                      <p className="font-semibold">
                        {ticket.customer_name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {ticket.customer_email}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    {ticket.subject}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white
                      ${
                        ticket.status ===
                        "Open"
                          ? "bg-red-500"
                          : ticket.status ===
                            "In Progress"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {ticket.status}
                    </span>

                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() =>
                        updateStatus(
                          ticket.ticket_id,
                          "In Progress"
                        )
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Progress
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          ticket.ticket_id,
                          "Closed"
                        )
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Close
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;