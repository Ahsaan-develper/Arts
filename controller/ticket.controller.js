import  Ticket  from "../models/tickets.models.js"; 
import  Event from "../models/events.models.js";     
import { BadRequestError, NotFoundError } from "../middleware/error.middleware.js"; 

// 1. CREATE
export const create_ticket = async (req, res) => {
    const { UID, price, quantity, event } = req.body;

    if (!UID || !price || !quantity || !event) {
        throw new BadRequestError("Please provide UID, price, quantity, and event");
    }

    // Verify event exists
    const eventExists = await Event.findById(event);
    if (!eventExists) {
        throw new NotFoundError("Event not found");
    }

    try {
        const ticket = await Ticket.create({
            UID,
            price,
            quantity,
            event
        });

        res.status(201).json({
            success: true,
            message: "Ticket created",
            data: ticket
        });
    } catch (err) {
     
        if (err.code === 11000) {
            throw new BadRequestError("Duplicate UID, price, or quantity value");
        }
        throw err;
    }
};

// 2. GET ALL
export const get_all_tickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate("event", "title start_date end_date location") 
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (err) {
        throw err;
    }
};

// 3. GET SINGLE
export const get_single_ticket = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new BadRequestError("Id not given");
    }

    try {
        const ticket = await Ticket.findById(id)
            .populate("event", "title start_date end_date location");

        if (!ticket) {
            throw new NotFoundError("Ticket not found");
        }

        res.status(200).json({
            success: true,
            data: ticket
        });
    } catch (err) {
        throw err;
    }
};

// 4. UPDATE
export const update_ticket = async (req, res) => {
    const { id } = req.params;
    const { UID, price, quantity, event } = req.body;

    if (!id) {
        throw new BadRequestError("Id not given");
    }

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new NotFoundError("Ticket not found");
        }

     
        if (event && event !== ticket.event.toString()) {
            const eventExists = await Event.findById(event);
            if (!eventExists) {
                throw new NotFoundError("Event not found");
            }
        }

        const updateData = {};
        if (UID) updateData.UID = UID;
        if (price) updateData.price = price;
        if (quantity) updateData.quantity = quantity;
        if (event) updateData.event = event;

        const updated = await Ticket.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("event", "title start_date end_date location");

        res.status(200).json({
            success: true,
            message: "Ticket updated",
            data: updated
        });
    } catch (err) {
        if (err.code === 11000) {
            throw new BadRequestError("Duplicate UID, price, or quantity value");
        }
        throw err;
    }
};

// 5. DELETE
export const delete_ticket = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new BadRequestError("Id not given");
    }

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new NotFoundError("Ticket not found");
        }

        await Ticket.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Ticket deleted"
        });
    } catch (err) {
        throw err;
    }
};