
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'upside-admin', password_digest:'$2a$10$6XQ8wU9p81ezcZ0kmUWtde0pccnkgk.468r19sXExHDNRI/.KzKvK'},
        {id: 2, email: 'website-admin', password_digest: "$2a$10$QUe9x0UcJd.vNQIziY6mZeQZkTU1B.huSJncvpKNPUv9Le0GUd99a"},
      ]);
    });
};
