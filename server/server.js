import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const localStoragePath = path.join(__dirname, "users.json");

let usersList = await getUsersList();
async function setNewUser(newUser) {
  try {
    usersList = [...usersList, newUser];
    const data = JSON.stringify(usersList);
    await fs.writeFile(localStoragePath, data);
    console.log("users.json updated");
  } catch (error) {
    console.log(`error trying to write users.json ${error}`);
  }
}

async function getUsersList() {
  try {
    const data = await fs.readFile(localStoragePath, "utf8");
    console.log("Success reading the users list file");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error trying to get users list ${error}`);
    return [];
  }
}

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("<h1>Hello from the server!<h1/>");
});

// Send the usersList as response
app.get("/api/users", async (_, res) => {
  res.json({ usersList });
});

// Add new user to the list & writes into json file
app.post("/api/users", async (req, res) => {
  const { name, job, age } = req.body;
  if (!name || !job || !age) {
    res.status(400).json({ msg: "please provide all values" });
    return;
  }
  const id = nanoid();
  const newUser = { id, name, job, age };
  await setNewUser(newUser);
  res.json(newUser);
});

app.patch("/api/users/:id", async (req, res) => {
  const newUsersList = usersList.filter((user) => user.id !== req.params.id);
  const data = JSON.stringify(newUsersList);
  await fs.writeFile(localStoragePath, data);
});

app.listen(port, () => {
  console.log("Server Running on port " + port);
});
