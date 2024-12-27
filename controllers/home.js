const Count = require("../models/Count");
const Sick = require("../models/Sick");

exports.index = async (req, res) => {
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
};

exports.login = (req, res) => {
    res.render("login", {
        title: "Yönetici Giriş | Sağlık Rehberi KDS",
    });
};

exports.datas = async (req, res) => {
    const list_sick = await Sick.list_sick();

    res.render("datas", {
        title: "Hasta Verileri | Sağlık Rehberi KDS",
        activePage: "datas",

        list_sick: list_sick[0],
    });
};
