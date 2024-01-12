const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "code-test",
  password: "postgres",
  port: 54321,
});
// const createTableQuery = ` CREATE TABLE posts ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT,rate INT,user_id INT,created_at TIMESTAMP DEFAULT current_timestamp, FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ); `;
// const dropTable = `DROP TABLE posts`;
// const createUsertable = `CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL )`;
// pool.connect((err, client) => {
//   if (err) {
//     console.error("Error establishing connection:", err);
//     return;
//   }

//   client.query(createTableQuery, (err, result) => {
//     if (err) {
//       console.error('Error creating "posts" table:', err);
//     } else {
//       console.log('Successfully created "posts" table');
//     }

//     client.release();
//   });
// });
async function seedPosts() {
  try {
    const posts = [];
    for (let i = 1; i <= 50000; i++) {
      posts.push({
        title: `Post ${i}`,
        content: `Lorem ipsum dolor sit amet ${i}`,
        rate: 5,
        user_id: Math.ceil(Math.random() * 100),
      });
    }
    for (const post of posts) {
      await pool.query(
        "INSERT INTO posts (title, content,rate,user_id) VALUES ($1, $2,$3,$4)",
        [post.title, post.content, post.rate, post.user_id]
      );
    }
    console.log("Successfully seeded the database with 50k posts");
  } catch (err) {
    console.error("Error seeding the database:", err);
  } finally {
    pool.end();
  }
}
seedPosts();
async function seedUsers() {
  try {
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        name: `Lorem ipsum dolor sit amet ${i}`,
      });
    }
    for (const user of users) {
      await pool.query("INSERT INTO users (name) VALUES ($1)", [user.name]);
    }
    console.log("Successfully seeded the database with 100 users");
  } catch (err) {
    console.error("Error seeding the database:", err);
  } finally {
    pool.end();
  }
}
// seedUsers();
async function fetchData() {
  const posts = await pool.query(`SELECT * from posts`);
  console.log(posts);
}
// fetchData();
async function clearTable() {
  await pool.query(`DELETE FROM posts`);
  console.log("Cleared");
}
// clearTable();
