const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const Event = require("../models/Event");

// @route   GET api/events
// @desc    Get all events for user
// @access  Private
router.get("/events", auth, async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// @route   POST api/events
// @desc    Create a new event
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, sharedWith } =
      req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      startTime,
      endTime,
      sharedWith: sharedWith || [],
      user: req.user.id,
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/events/:id
// @desc    Update an event
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, sharedWith } =
      req.body;

    // Build event object
    const eventFields = {};
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (date) eventFields.date = date;
    if (startTime) eventFields.startTime = startTime;
    if (endTime) eventFields.endTime = endTime;
    if (sharedWith) eventFields.sharedWith = sharedWith;

    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Make sure user owns the event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Make sure user owns the event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Event.findByIdAndRemove(req.params.id);

    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
