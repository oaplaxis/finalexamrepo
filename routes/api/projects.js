const express = require('express');
const router = express.Router();
const Project = require('../../models/project')

router.get('/', async (req, res, next) => {
    let projects = await Project.find();
    res.status(200).json(projects);
})

router.post('/', async (req, res, next) => {

    if (!req.body.name) {
        res.status(400).json({ 'ValidationError': 'Name is a required field' });
    }
    else if (!req.body.course) {
        res.status(400).json({ 'ValidationError': 'Course is a required field' });
    }
    else {
        let newProject = new Project({
            name: req.body.name,
            dueDate: req.body.dueDate,
            course: req.body.course
        });
        // Save the new project to the database
        await newProject.save();
        res.status(200).json(newProject);
    }
});

// PUT /projects/:_id
router.put('/:_id', async (req, res, next) => {
    // Validate required fields
    if (!req.body.name) {
        res.json({ 'ValidationError': 'Name is a required field' }).status(400);
    }
    else if (!req.body.course) {
        res.json({ 'ValidationError': 'Course is a required field' }).status(400);
    }
    else {
        await Project.findOneAndUpdate(
            { _id: req.params._id }, // filter query
            {
                name: req.body.name,
                dueDate: req.body.dueDate,
                course: req.body.course,
                status: req.body.status
            }
        );
        res.status(200).json({ 'success': 'true' });
    }
});

// DELETE /projects/:_id
router.delete('/:_id', async (req, res, next) => {
    await Project.findByIdAndDelete(req.params._id);
    res.status(200).json({ 'success': 'true' });
});

module.exports = router;