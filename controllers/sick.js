const Sick = require("../models/Sick");

exports.create_data = async (req, res) => {
    const { parameter_type, sick_id, value, process_date } = req.body;
    const create_data = await Sick.create_data(
        parameter_type,
        sick_id,
        value,
        process_date
    );

    if (create_data) res.redirect("/datas");
};

exports.create = async (req, res) => {
    const sick = await Sick.create(req.body);

    if (sick) res.redirect("/");
};

exports.delete = async (req, res) => {
    const sick = await Sick.delete(req.params.id);
    if (sick) res.redirect("/");
};

exports.create_chronic = async (req, res) => {
    const { sick_id, chronic_id } = req.body;
    const create_chronic = await Sick.create_chronic(sick_id, chronic_id);

    if (create_chronic) res.redirect("/chronic");
};

exports.delete_chronic = async (req, res) => {
    const sick_chronic = await Sick.delete_chronic(req.params.id);
    if (sick_chronic) res.redirect("/chronic");
};
