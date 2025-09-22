const Task = require("../models/Task.js")

exports.getAllTasks = async (req, res) => {
    const { filter = "today" } = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case "today":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case "week":
            const mondayDate =
                now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case "all":
        default:
            startDate = null;
    };

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try {
        // const task = await Task.find().sort({ createdAt: -1 });
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }],
                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.log("Lỗi không gọi getAllTasks", error);
        res.status(500).json({ message: error })
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });

        const newTask = await task.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.log("Error create new task", error);
        res.status(500).json({ message: error })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { title, status, completeAt } = req.body;
        const taskId = req.params.id;

        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            title,
            status,
            completeAt
        }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" })
        };

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({ message: "Nhiệm vụ không tồn tại" })
        }
        res.status(200).json(deleteTask)
    } catch (error) {
        console.error("Lỗi khi goi deleteTask", error);
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}