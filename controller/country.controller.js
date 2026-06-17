import Country  from "../models/country.models.js";
import { BadRequestError, ConflictError, NotFoundError } from "../middleware/error.middleware.js";

// Create country
export const add_country = async (req, res) => {
    const {name} = req.body;


    if (!name ) {
        throw new BadRequestError("Name of country are required and also id");
    }

    try {
        const existing = await Country.findOne({ name });
        if (existing) {
            throw new ConflictError("Slug already exists");
        }

        const country = await Country.create({ name });

        res.status(201).json({
            success: true,
            message: "country created",
            data: country
        });
    } catch (err) {
        throw err;
    }
};

// Get all categories
export const get_all_country = async (req, res) => {
    try {
        const country = await Country.find();

        if (country.length === 0) {
            throw new NotFoundError("No categories found");
        }

        res.status(200).json({
            success: true,
            count: country.length,
            data: country
        });
    } catch (err) {
        throw err;
    }
};

// Update category
export const update_country = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
        throw new BadRequestError("country ID is required");
    }

    try {
        const country = await Category.findById(id);
        if (!country) {
            throw new NotFoundError("country not found");
        }

        const updated = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "country updated",
            data: updated
        });
    } catch (err) {
        throw err;
    }
};

// Delete category
export const delete_country = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new BadRequestError("country ID is required");
    }

    try {
        const country = await Country.findByIdAndDelete(id);
        if (!country) {
            throw new NotFoundError("country not found");
        }

        res.status(200).json({
            success: true,
            message: "country deleted"
        });
    } catch (err) {
        throw err;
    }
};