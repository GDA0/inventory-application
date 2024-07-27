#!/usr/bin/env node

const { client } = require("./client-and-pool");

const SQL = `
-- Drop tables if they exist
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS items CASCADE;

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL
);

-- Create genres table
CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  description TEXT,
  category_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert categories
INSERT INTO categories (name) VALUES ('Movies'), ('TV Shows')
ON CONFLICT (id) DO NOTHING;

-- Insert genres for movies
INSERT INTO genres (name, category_id) VALUES 
  ('Action', 1), 
  ('Comedy', 1), 
  ('Drama', 1), 
  ('Horror', 1), 
  ('Sci-Fi', 1)
ON CONFLICT (id) DO NOTHING;

-- Insert genres for TV shows
INSERT INTO genres (name, category_id) VALUES 
  ('Sitcom', 2), 
  ('Drama', 2), 
  ('Reality', 2), 
  ('Documentary', 2), 
  ('Fantasy', 2)
ON CONFLICT (id) DO NOTHING;

-- Insert items
INSERT INTO items (name, description, category_id, genre_id) VALUES
  ('Mad Max: Fury Road', 'A high-octane action film set in a post-apocalyptic world.', 1, 1),
  ('Die Hard', 'A classic action film featuring a lone hero battling terrorists.', 1, 1),
  ('Superbad', 'A hilarious coming-of-age comedy about high school friends.', 1, 2),
  ('Monty Python and the Holy Grail', 'A cult classic comedy about the quest for the Holy Grail.', 1, 2),
  ('Friends', 'A sitcom about six friends navigating life and love in New York City.', 2, 6),
  ('The Office', 'A mockumentary-style sitcom set in a mundane office environment.', 2, 6),
  ('Breaking Bad', 'A high school chemistry teacher turned methamphetamine manufacturer.', 2, 7),
  ('The Crown', 'A historical drama about the reign of Queen Elizabeth II.', 2, 7)
ON CONFLICT (id) DO NOTHING;
`;

async function populateDb() {
  console.log("Seeding database...");
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
  }
}

populateDb();
