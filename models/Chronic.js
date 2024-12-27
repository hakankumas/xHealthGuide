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

    // Kronik Hastalık Silme
    static delete(chronic_id) {
        return connection.execute(
            `DELETE FROM chronic WHERE id = ${chronic_id}`
        );
    }
};
