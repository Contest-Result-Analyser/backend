/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('contests', function (table) {
            table.increments('id').unsigned().primary();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable();
            table.string('name', 25);
            table.enu('open', ['0', '1']).defaultTo('1');
        })
        .then(function () {
            return knex.schema.createTable('categories', function (table) {
                table.increments('id').unsigned().primary();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').nullable();
                table.integer('contest_id').unsigned().references('id').inTable('contests');
                table.string('operator', 25);
                table.string('assisted', 25);
                table.string('band', 15);
                table.string('power', 5);
                table.string('station', 50);
                table.string('mode', 5);
                table.string('transmitter', 10);
                table.string('overlay', 15);
            });
        })
        .then(function () {
            return knex.schema.createTable('logs', function (table) {
                table.increments('id').unsigned().primary();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').nullable();
                table.string('version', 10);
                table.integer('category_id').unsigned().references('id').inTable('categories');
                table.string('grid_locator', 8);
                table.integer('claimed_score');
                table.text('address');
                table.text('soapbox');
                table.string('contest', 32);
                table.string('callsign', 10);
                table.string('location', 16);
                table.string('created_by', 32);
                table.string('name', 75);
                table.text('club');
                table.text('operators');
            });
        })
        .then(function () {
            return knex.schema.createTable('operators', function (table) {
                table.increments('id').unsigned().primary();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').nullable();
                table.string('callsign', 13).unique();
                table.string('license', 2);
                table.text('owner');
                table.text('residence');
            });
        })
        .then(function () {
            return knex.schema.createTable('qsos', function (table) {
                table.increments('id').unsigned().primary();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').nullable();
                table.integer('log_id').unsigned().references('id').inTable('logs');
                table.string('freq', 5);
                table.string('mode', 2);
                table.string('date', 10);
                table.integer('time');
                table.string('tx_call', 10);
                table.integer('tx_rst');
                table.string('tx_exch', 10);
                table.string('tx_ov', 25);
                table.string('tx_locator', 10);
                table.string('rx_call', 10);
                table.integer('rx_rst');
                table.string('rx_exch', 10);
                table.string('rx_ov', 25);
                table.string('rx_locator', 10);
            });
        })
        .then(function () {
            return knex.raw(`
            CREATE TRIGGER update_contests_updated_at
            AFTER UPDATE ON contests
            FOR EACH ROW
            BEGIN
                UPDATE contests
                SET updated_at = CURRENT_TIMESTAMP
                WHERE id = OLD.id;
            END
        `);
        })
        .then(function () {
            return knex.raw(`
            CREATE TRIGGER update_qsos_updated_at
            AFTER UPDATE ON qsos
            FOR EACH ROW
            BEGIN
                UPDATE qsos
                SET updated_at = CURRENT_TIMESTAMP
                WHERE id = OLD.id;
            END
        `);
        })
        .then(function () {
            return knex.raw(`
            CREATE TRIGGER update_categories_updated_at
            AFTER UPDATE ON categories
            FOR EACH ROW
            BEGIN
                UPDATE categories
                SET updated_at = CURRENT_TIMESTAMP
                WHERE id = OLD.id;
            END
        `);
        })
        .then(function () {
            return knex.raw(`
            CREATE TRIGGER update_logs_updated_at
            AFTER UPDATE ON logs
            FOR EACH ROW
            BEGIN
                UPDATE logs
                SET updated_at = CURRENT_TIMESTAMP
                WHERE id = OLD.id;
            END
        `);
        })
        .then(function () {
            return knex.raw(`
            CREATE TRIGGER update_operators_updated_at
            AFTER UPDATE ON operators
            FOR EACH ROW
            BEGIN
                UPDATE operators
                SET updated_at = CURRENT_TIMESTAMP
                WHERE id = OLD.id;
            END
        `);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('qsos')
        .then(function () {
            return knex.schema.dropTable('operators');
        })
        .then(function () {
            return knex.schema.dropTable('logs');
        })
        .then(function () {
            return knex.schema.dropTable('categories');
        })
        .then(function () {
            return knex.schema.dropTable('contests');
        });
};