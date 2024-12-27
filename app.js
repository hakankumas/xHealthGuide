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
const Chronic = require("./models/Chronic");

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
    const list_sick = await Sick.list_sick();
    const list_chronic = await Sick.list_chronic();

    res.render("chronic", {
        title: "Kronik Hastalıklar | Sağlık Rehberi KDS",
        activePage: "chronic",

        info_chronic_sick: info_chronic_sick[0],
        list_sick: list_sick[0],
        list_chronic: list_chronic[0],
    });
});

app.get("/datas", async (req, res) => {
    const list_sick = await Sick.list_sick();

    res.render("datas", {
        title: "Hasta Verileri | Sağlık Rehberi KDS",
        activePage: "datas",

        list_sick: list_sick[0],
    });
});

app.get("/api/blood_pressure", async (req, res) => {
    const blood_pressure = await Api.blood_pressure();

    res.status(200).json({
        blood_pressure: blood_pressure[0],
    });
});

app.get("/api/bpm", async (req, res) => {
    const bpm = await Api.bpm();

    res.status(200).json({
        bpm: bpm[0],
    });
});

app.get("/api/cholesterol", async (req, res) => {
    const cholesterol = await Api.cholesterol();

    res.status(200).json({
        cholesterol: cholesterol[0],
    });
});

app.get("/api/fat", async (req, res) => {
    const fat = await Api.fat();

    res.status(200).json({
        fat: fat[0],
    });
});

app.get("/api/metabolicrate", async (req, res) => {
    const metabolicrate = await Api.metabolicrate();

    res.status(200).json({
        metabolicrate: metabolicrate[0],
    });
});

app.get("/api/step", async (req, res) => {
    const step = await Api.step();

    res.status(200).json({
        step: step[0],
    });
});

app.get("/api/waistline", async (req, res) => {
    const waistline = await Api.waistline();

    res.status(200).json({
        waistline: waistline[0],
    });
});

app.get("/api/weight", async (req, res) => {
    const weight = await Api.weight();

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

app.get("/api/sick_bmi", async (req, res) => {
    const sick_bmi = await Api.sick_bmi();

    res.status(200).json({
        sick_bmi: sick_bmi[0],
    });
});

app.post("/sick/create_data", async (req, res) => {
    const { parameter_type, sick_id, value, process_date } = req.body;
    const create_data = await Sick.create_data(
        parameter_type,
        sick_id,
        value,
        process_date
    );

    if (create_data) res.redirect("/datas");
});

app.post("/sick/create", async (req, res) => {
    const sick = await Sick.create(req.body);

    if (sick) res.redirect("/");
});

app.get("/sick/delete/:id", async (req, res) => {
    const sick = await Sick.delete(req.params.id);
    if (sick) res.redirect("/");
});

app.post("/sick/create_chronic", async (req, res) => {
    const { sick_id, chronic_id } = req.body;
    const create_chronic = await Sick.create_chronic(sick_id, chronic_id);

    if (create_chronic) res.redirect("/chronic");
});

app.get("/sick/delete_chronic/:id", async (req, res) => {
    const sick_chronic = await Sick.delete_chronic(req.params.id);
    if (sick_chronic) res.redirect("/chronic");
});

app.post("/chronic/create", async (req, res) => {
    const chronic = await Chronic.create(req.body.chronic_name);

    if (chronic) res.redirect("/chronic");
});

const PORT = 3001;
app.locals.baseURL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
