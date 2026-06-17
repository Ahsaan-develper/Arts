import  Payment  from "../models/payment.models.js";
import  Ticket  from "../models/tickets.models.js";
import  User  from "../models/user.models.js";
import { BadRequestError, NotFoundError } from "../middleware/error.middleware.js";

// 1. CREATE
export const create_payment = async (req, res) => {
    const { amount, method, status, ticket, user } = req.body;

    if (!amount || !method || !ticket || !user) {
        throw new BadRequestError("Please provide amount, method, ticket, and user");
    }

    // Verify ticket exists
    const ticketExists = await Ticket.findById(ticket);
    if (!ticketExists) {
        throw new NotFoundError("Ticket not found");
    }

    // Verify user exists
    const userExists = await User.findById(user);
    if (!userExists) {
        throw new NotFoundError("User not found");
    }

    try {
        const payment = await Payment.create({
            amount,
            method,
            status: status || "pending",
            ticket,
            user
        });

        const populated = await Payment.findById(payment._id)
            .populate("ticket", "UID price event")
            .populate("user", "name email");

        res.status(201).json({
            success: true,
            message: "Payment created",
            data: populated
        });
    } catch (err) {
        throw err;
    }
};

// 2. GET ALL
export const get_all_payments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("ticket", "UID price event")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (err) {
        throw err;
    }
};

// 3. GET SINGLE
export const get_single_payment = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new BadRequestError("Id not given");
    }

    try {
        const payment = await Payment.findById(id)
            .populate("ticket", "UID price event")
            .populate("user", "name email");

        if (!payment) {
            throw new NotFoundError("Payment not found");
        }

        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (err) {
        throw err;
    }
};

// 4. UPDATE
export const update_payment = async (req, res) => {
    const { id } = req.params;
    const { amount, method, status, ticket, user } = req.body;

    if (!id) {
        throw new BadRequestError("Id not given");
    }

    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            throw new NotFoundError("Payment not found");
        }

        // Verify new ticket if changing
        if (ticket && ticket !== payment.ticket.toString()) {
            const ticketExists = await Ticket.findById(ticket);
            if (!ticketExists) throw new NotFoundError("Ticket not found");
        }

        // Verify new user if changing
        if (user && user !== payment.user.toString()) {
            const userExists = await User.findById(user);
            if (!userExists) throw new NotFoundError("User not found");
        }

        const updateData = {};
        if (amount) updateData.amount = amount;
        if (method) updateData.method = method;
        if (status) updateData.status = status;
        if (ticket) updateData.ticket = ticket;
        if (user) updateData.user = user;

        const updated = await Payment.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
            .populate("ticket", "UID price event")
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            message: "Payment updated",
            data: updated
        });
    } catch (err) {
        throw err;
    }
};

// 5. DELETE
export const delete_payment = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new BadRequestError("Id not given");
    }

    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            throw new NotFoundError("Payment not found");
        }

        await Payment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Payment deleted"
        });
    } catch (err) {
        throw err;
    }
};