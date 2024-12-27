const Admin = require("../models/Admin");
const Api = require("../models/Api");
const Sick = require("../models/Sick");

exports.login = async (req, res) => {
    const admin = await Admin.get(req.body);
    if (admin[0][0]) res.redirect("/");
    else res.redirect("/login");
};

exports.blood_pressure = async (req, res) => {
    const blood_pressure = await Api.blood_pressure();

    res.status(200).json({
        blood_pressure: blood_pressure[0],
    });
};

exports.bpm = async (req, res) => {
    const bpm = await Api.bpm();

    res.status(200).json({
        bpm: bpm[0],
    });
};

exports.cholesterol = async (req, res) => {
    const cholesterol = await Api.cholesterol();

    res.status(200).json({
        cholesterol: cholesterol[0],
    });
};

exports.fat = async (req, res) => {
    const fat = await Api.fat();

    res.status(200).json({
        fat: fat[0],
    });
};

exports.metabolicrate = async (req, res) => {
    const metabolicrate = await Api.metabolicrate();

    res.status(200).json({
        metabolicrate: metabolicrate[0],
    });
};

exports.step = async (req, res) => {
    const step = await Api.step();

    res.status(200).json({
        step: step[0],
    });
};

exports.waistline = async (req, res) => {
    const waistline = await Api.waistline();

    res.status(200).json({
        waistline: waistline[0],
    });
};

exports.weight = async (req, res) => {
    const weight = await Api.weight();

    res.status(200).json({
        weight: weight[0],
    });
};

exports.distribution_of_chronic_sick = async (req, res) => {
    const distribution_of_chronic_sick =
        await Sick.distribution_of_chronic_sick();

    res.status(200).json({
        distribution_of_chronic_sick: distribution_of_chronic_sick[0],
    });
};

exports.gender_distribution_of_chronic_sick = async (req, res) => {
    const gender_distribution_of_chronic_sick =
        await Sick.gender_distribution_of_chronic_sick();

    res.status(200).json({
        gender_distribution_of_chronic_sick:
            gender_distribution_of_chronic_sick[0],
    });
};

exports.sick_bmi = async (req, res) => {
    const sick_bmi = await Api.sick_bmi();

    res.status(200).json({
        sick_bmi: sick_bmi[0],
    });
};

exports.number_of_sick_by_age = async (req, res) => {
    const number_of_sick_by_age = await Api.number_of_sick_by_age();

    res.status(200).json({
        number_of_sick_by_age: number_of_sick_by_age[0],
    });
};

exports.number_of_sick_by_gender = async (req, res) => {
    const number_of_sick_by_gender = await Api.number_of_sick_by_gender();

    res.status(200).json({
        number_of_sick_by_gender: number_of_sick_by_gender[0],
    });
};
