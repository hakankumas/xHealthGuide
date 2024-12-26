const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Admin = require("./models/Admin");
const Count = require("./models/Count");
const Sick = require("./models/Sick");
const Api = require("./models/Api");

app.get("/", async (req, res) => {
    const count_sick = await Count.count_sick();
    const count_sick_by_chronic = await Count.count_sick_by_chronic();
    const count_sick_by_male = await Count.count_sick_by_male();
    const count_sick_by_female = await Count.count_sick_by_female();

    const info_sick = await Sick.info_sick();

    res.render("index", {
        title: "Ana Sayfa | Sağlık Rehberi KDS",
        activePage: "dashboard",

        count_sick: count_sick[0],
        count_sick_by_chronic: count_sick_by_chronic[0],
        count_sick_by_male: count_sick_by_male[0],
        count_sick_by_female: count_sick_by_female[0],

        info_sick: info_sick[0],
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

app.get("/chronic", async (req, res) => {
    const info_chronic_sick = await Sick.info_chronic_sick();

    res.render("chronic", {
        title: "Kronik Hastalıklar | Sağlık Rehberi KDS",
        activePage: "chronic",

        info_chronic_sick: info_chronic_sick[0],
    });
});

app.get("/male", async (req, res) => {
    res.render("male", {
        title: "Erkek Hastalar | Sağlık Rehberi KDS",
        activePage: "male",
    });
});

app.get("/female", async (req, res) => {
    res.render("female", {
        title: "Kadın Hastalar | Sağlık Rehberi KDS",
        activePage: "female",
    });
});

app.get("/api/male/blood_pressure", async (req, res) => {
    const blood_pressure = await Api.blood_pressure(1);

    res.status(200).json({
        blood_pressure: blood_pressure[0],
    });
});

app.get("/api/male/bpm", async (req, res) => {
    const bpm = await Api.bpm(1);

    res.status(200).json({
        bpm: bpm[0],
    });
});

app.get("/api/male/cholesterol", async (req, res) => {
    const cholesterol = await Api.cholesterol(1);

    res.status(200).json({
        cholesterol: cholesterol[0],
    });
});

app.get("/api/male/fat", async (req, res) => {
    const fat = await Api.fat(1);

    res.status(200).json({
        fat: fat[0],
    });
});

app.get("/api/male/metabolicrate", async (req, res) => {
    const metabolicrate = await Api.metabolicrate(1);

    res.status(200).json({
        metabolicrate: metabolicrate[0],
    });
});

app.get("/api/male/step", async (req, res) => {
    const step = await Api.step(1);

    res.status(200).json({
        step: step[0],
    });
});

app.get("/api/male/waistline", async (req, res) => {
    const waistline = await Api.waistline(1);

    res.status(200).json({
        waistline: waistline[0],
    });
});

app.get("/api/male/weight", async (req, res) => {
    const weight = await Api.weight(1);

    res.status(200).json({
        weight: weight[0],
    });
});

app.get("/api/female/blood_pressure", async (req, res) => {
    const blood_pressure = await Api.blood_pressure(2);

    res.status(200).json({
        blood_pressure: blood_pressure[0],
    });
});

app.get("/api/female/bpm", async (req, res) => {
    const bpm = await Api.bpm(2);

    res.status(200).json({
        bpm: bpm[0],
    });
});

app.get("/api/female/cholesterol", async (req, res) => {
    const cholesterol = await Api.cholesterol(2);

    res.status(200).json({
        cholesterol: cholesterol[0],
    });
});

app.get("/api/female/fat", async (req, res) => {
    const fat = await Api.fat(2);

    res.status(200).json({
        fat: fat[0],
    });
});

app.get("/api/female/metabolicrate", async (req, res) => {
    const metabolicrate = await Api.metabolicrate(2);

    res.status(200).json({
        metabolicrate: metabolicrate[0],
    });
});

app.get("/api/female/step", async (req, res) => {
    const step = await Api.step(2);

    res.status(200).json({
        step: step[0],
    });
});

app.get("/api/female/waistline", async (req, res) => {
    const waistline = await Api.waistline(2);

    res.status(200).json({
        waistline: waistline[0],
    });
});

app.get("/api/female/weight", async (req, res) => {
    const weight = await Api.weight(2);

    res.status(200).json({
        weight: weight[0],
    });
});

app.get("/api/distribution_of_chronic_sick", async (req, res) => {
    const distribution_of_chronic_sick =
        await Sick.distribution_of_chronic_sick();

    res.status(200).json({
        distribution_of_chronic_sick: distribution_of_chronic_sick[0],
    });
});

app.get("/api/gender_distribution_of_chronic_sick", async (req, res) => {
    const gender_distribution_of_chronic_sick =
        await Sick.gender_distribution_of_chronic_sick();

    res.status(200).json({
        gender_distribution_of_chronic_sick:
            gender_distribution_of_chronic_sick[0],
    });
});

const PORT = 3001;
app.locals.baseURL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
