const connection = require("../database/db");

module.exports = class Chronic {
    // Kronik Hastalık Ekleme
    static create(chronic_name) {
        return connection.execute(
            `
            INSERT INTO chronic (name)
            VALUES (?)
        `,
            [chronic_name]
        );
    }
};
