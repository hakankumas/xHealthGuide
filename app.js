const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Admin = require("./models/Admin");
const Count = require("./models/Count");

app.get("/", async (req, res) => {
    const count_sick = await Count.count_sick();
    const count_sick_by_chronic = await Count.count_sick_by_chronic();
    const count_sick_by_male = await Count.count_sick_by_male();
    const count_sick_by_female = await Count.count_sick_by_female();

    res.render("index", {
        title: "Ana Sayfa | Sağlık Rehberi KDS",

        count_sick: count_sick[0],
        count_sick_by_chronic: count_sick_by_chronic[0],
        count_sick_by_male: count_sick_by_male[0],
        count_sick_by_female: count_sick_by_female[0],
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        title: "Yönetici Giriş | Sağlık Rehberi KDS",
    });
});

app.post("/api/login", async (req, res) => {
    const admin = await Admin.get(req.body);
    if (admin[0][0]) res.redirect("/");
    else res.redirect("/login");
});

const PORT = 3001;
app.locals.baseURL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
