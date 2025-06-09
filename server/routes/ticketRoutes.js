const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTicket, getTicketsByProject } = require('../controllers/ticketController');

router.post('/', auth, createTicket); // create a ticket
router.get('/:projectId', auth, getTicketsByProject); // get tickets for project

module.exports = router;