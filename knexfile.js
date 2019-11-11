// Update with your config settings.

module.exports = {
   development: {
      client: 'sqlite3',
      connection: {
         filename: './data/users_db.db3'
      },
      useNullAsDefault: true, // needed for sqlite
      migrations: {
         directory: './data/migrations'
      },
      seeds: {
         directory: './data/seeds'
      },
      // sqlite will not enforce Foreign Keys by default
      pool: {
         afterCreate: (conn, done) => {
            conn.run('PRAGMA foreign_keys = ON', done); //turns on the FK enforcement
         }
      }
   },

   staging: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user: 'username',
         password: 'password'
      },
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations'
      }
   },

   production: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user: 'username',
         password: 'password'
      },
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations'
      }
   }
};
