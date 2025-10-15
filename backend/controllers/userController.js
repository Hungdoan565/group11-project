let users = [
    { id: 1, name: "Hung", email: "hung@example.com" },
    { id: 2, name: "Huy", email: "huy@example.com" },
    { id: 3, name: "Nghia", email: "nghia@example.com" },
];
let nextId = 4;

// GET /users
exports.getUsers = (req, res) => {
    res.json(users);
};

// POST /users
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and Email are required" });
    }
    const newUser = {
        id: nextId++,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
};