import Category from "../models/category.models.js";
import { BadRequestError, ConflictError, NotFoundError } from "../middleware/error.middleware.js";

// Create category
export const add_category = async (req, res) => {
    const { name, slug } = req.body;

    if (!name || !slug) {
        throw new BadRequestError("Name and slug are required");
    }

    try {
        const existing = await Category.findOne({ slug });
        if (existing) {
            throw new ConflictError("Slug already exists");
        }

        const category = await Category.create({ name, slug });

        res.status(201).json({
            success: true,
            message: "Category created",
            data: category
        });
    } catch (err) {
        throw err;
    }
};

// Get all categories
export const get_all_categories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (categories.length === 0) {
            throw new NotFoundError("No categories found");
        }

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (err) {
        throw err;
    }
};

// Update category
export const update_category = async (req, res) => {
    const { id } = req.params;
    const { name, slug } = req.body;

    if (!id) {
        throw new BadRequestError("Category ID is required");
    }

    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        const updated = await Category.findByIdAndUpdate(
            id,
            { name, slug },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Category updated",
            data: updated
        });
    } catch (err) {
        throw err;
    }
};

// Delete category
export const delete_category = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new BadRequestError("Category ID is required");
    }

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        res.status(200).json({
            success: true,
            message: "Category deleted"
        });
    } catch (err) {
        throw err;
    }
};