import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

const columnsFromBackend = {
  'To Do': [],
  'In Progress': [],
  'Done': []
};

const KanbanBoard = ({ projectId }) => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const token = localStorage.getItem('token');

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/tickets/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const organized = {
        'To Do': [],
        'In Progress': [],
        'Done': []
      };

      res.data.forEach((ticket) => {
        organized[ticket.status].push(ticket);
      });

      setColumns(organized);
    } catch (err) {
      console.error('Error loading tickets:', err);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5050/api/tickets/${ticketId}`, {
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Error updating ticket:', err);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];

    const [movedTicket] = sourceCol.splice(source.index, 1);
    movedTicket.status = destination.droppableId;
    destCol.splice(destination.index, 0, movedTicket);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });

    updateTicketStatus(movedTicket._id, destination.droppableId);
  };

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line
  }, [projectId]);

  return (
    <div className="flex gap-4 mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, tickets]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                className="bg-gray-100 rounded p-4 w-1/3 min-h-[300px]"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-lg font-bold mb-2">{columnId}</h2>
                {tickets.map((ticket, index) => (
                  <Draggable draggableId={ticket._id} index={index} key={ticket._id}>
                    {(provided) => (
                      <div
                        className="bg-white p-3 mb-2 shadow rounded"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <strong>{ticket.title}</strong>
                        <p className="text-sm text-gray-600">{ticket.priority}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;