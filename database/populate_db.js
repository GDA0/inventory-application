#!/usr/bin/env node

const { client } = require("./client-and-pool");

const SQL = `
-- Drop tables if they exist
DROP TABLE IF EXISTS item_genre CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

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
  likes INTEGER DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create item_genre table for many-to-many relationship
CREATE TABLE item_genre (
  item_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (item_id, genre_id),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id)
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
INSERT INTO items (name, description, category_id) VALUES
  ('Mad Max: Fury Road', 'A high-octane action film set in a post-apocalyptic world.', 1),
  ('Die Hard', 'A classic action film featuring a lone hero battling terrorists.', 1),
  ('Superbad', 'A hilarious coming-of-age comedy about high school friends.', 1),
  ('Monty Python and the Holy Grail', 'A cult classic comedy about the quest for the Holy Grail.', 1),
  ('Friends', 'A sitcom about six friends navigating life and love in New York City.', 2),
  ('The Office', 'A mockumentary-style sitcom set in a mundane office environment.', 2),
  ('Breaking Bad', 'A high school chemistry teacher turned methamphetamine manufacturer.', 2),
  ('The Crown', 'A historical drama about the reign of Queen Elizabeth II.', 2)
ON CONFLICT (id) DO NOTHING;

-- Insert relationships between items and genres
INSERT INTO item_genre (item_id, genre_id) VALUES
  (1, 1),  -- 'Mad Max: Fury Road' is Action
  (2, 1),  -- 'Die Hard' is Action
  (3, 2),  -- 'Superbad' is Comedy
  (4, 2),  -- 'Monty Python and the Holy Grail' is Comedy
  (5, 6),  -- 'Friends' is Sitcom
  (6, 6),  -- 'The Office' is Sitcom
  (7, 7),  -- 'Breaking Bad' is Drama
  (8, 7)   -- 'The Crown' is Drama
ON CONFLICT (item_id, genre_id) DO NOTHING;
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
