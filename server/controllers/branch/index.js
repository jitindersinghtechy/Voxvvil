const Branch = require("../../database/models/admin/branch");


exports.post = async (req, res) => {
    const { name, email, phone, city, state, country, address } = req.body;
    try {
        const existingBranch = await Branch.findOne({ email });
        if (existingBranch) {
            return res.status(400).json({ success: false, message: "Branch email already Exist" });
        }
        await Branch.create({ name, email, phone, city, state, country, address, createdBy: req.user.id });
        return res.status(201).json({ success: true, message: "Branch successfully Added" });
    } catch (err) {
        console.log(err)
        if (err.name === "ValidationError") {
            return res.status(400).json({ success: false, message: "All Feild is required", error: err.message });
        }
        return res.status(400).json({ success: false, message: "There is some error please try again later" });
    }
};


exports.get = async (req, res) => {
    try {
        const data = await Branch.find({ createdBy: req.user.id , isDeleted: false });
        if (!data) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


exports.put = async (req, res) => {
    const { _id, name, email, phone, city, state, country, address } = req.body;
    try {
        await Branch.findByIdAndUpdate(_id, { name, email, phone, city, state, country, address });
        return res.status(200).json({ success: true, message: `Branch successfully updated` });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ success: false, message: "All Feild is required", error: err.message });
        }
        return res.status(400).json({ success: false, message: "There is some error please try again later" });
    }
};

exports.delete = async (req, res) => {
    try {
        await Branch.findByIdAndUpdate(req.params.id, { isDeleted: true });
        // await Admin.findByIdAndUpdate(req.user.id,{ $pull: { branches: req.params.id } },{ new: true });
        return res.status(200).json({ success: true, message: `Branch successfully Deleted` });
    } catch (err) {
        return res.status(400).json({ success: false, message: "There is some error please try again later" });
    }
};