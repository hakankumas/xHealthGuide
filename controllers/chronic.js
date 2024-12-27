const Chronic = require("../models/Chronic");
const Sick = require("../models/Sick");

exports.index = async (req, res) => {
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
};

exports.create = async (req, res) => {
    const chronic = await Chronic.create(req.body.chronic_name);

    if (chronic) res.redirect("/chronic");
};

exports.delete = async (req, res) => {
    const chronic = await Chronic.delete(req.params.id);
    if (chronic) res.redirect("/chronic");
};
