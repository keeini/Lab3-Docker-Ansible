// Data lives in an in-memory array: if the process restarts, data is lost.
const Joi = require("joi");
const express = require("express");
const os = require("os");

const app = express();
app.use(express.json()); // middleware: parses the JSON body into req.body

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

const courseSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

app.get("/", (req, res) => {
  // inside a container os.hostname() = container ID: handy with --scale
  res.send(`Deployed with Ansible - billiken-10 - skee001 - K=48 - Hostname: ${os.hostname()}`);
});

app.get("/api/student", (req, res) => {
  res.json({ student: "skee001", k: 48 });
});

// Used by Docker/Compose to check that the app is alive
app.get("/health", (req, res) => {
  res.send({ status: "ok" });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with that ID was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = courseSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.status(201).send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
