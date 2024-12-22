const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Ana Sayfa | Sağlık Rehberi KDS",
    });
});
app.get("/a", (req, res) => {
    res.render("index2", {
        title: "Ana Sayfa | Sağlık Rehberi KDS",
    });
});
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Yönetici Giriş | Sağlık Rehberi KDS",
    });
});

const Admin = require("./models/Admin");
app.post("/api/login", async (req, res) => {
    const admin = await Admin.get(req.body);
    if (admin[0][0]) res.redirect("/");
    else res.redirect("/login");
});

const PORT = 3000;
app.locals.baseURL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
