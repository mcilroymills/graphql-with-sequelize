const Sequelize = require('sequelize')
const _ = require('lodash');
const Faker = require('faker');

const Conn = new Sequelize(
  'mills',
  'mills',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
)
// These define postgres tables
const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Relationships
Person.hasMany(Post);
Post.belongsTo(Person);


// Sync ^^ with DB
Conn.sync({force: true}).then(() => {
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(person => {
      return person.createPost({
        title: `Sample title by ${person.firstName}`,
        content: 'This is a sample article'
      })
    })
  })
})

module.exports.Conn = Conn;


