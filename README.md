# match-the-past

An educational game where the user must correctly order randomly selected historical events.

## Summary

This is an educational game where students must correctly order events from the Tudor era. Alongside the event name, students will see a description of the event and after successfully completing the order dates for each event will also be displayed. Once a level is passed the player will progress to the next level with the card count increased.

### Prerequisites

- Node.js
- NPM
- A cloud-based database hosting platform (e.g [Supabase](https://supabase.com/))

### Installation
1. Clone the repo
    - Run `git clone git@github.com:jhelangley/match-the-past.git` in the CLI of your choice 
2. Navigate to the project directory
   - Navigate to the project with `cd api`
3. Install dependencies
   - Run `npm install` to install all dependencies for the project
   - The dependencies for this project are:
      - CORS
      - bcrypt
      - dotenv
      - express
      - jsonwebtoeken
      - pg
      - uuid
4. Setup your database
   - Create your database on Supabase, or other cloud based database management systems platform
      - If your database management systems platform requires it, when creating your database save the password to be used later.
   - Retrieve the database URL and copy it
   - Create a `.env` file in the root directory with the following:
     -   `BD_URL=<your_database_url>`
   - Replace `<your_database_url>` with the database URL you just copied from supabase. If required, remember to add your password to the url.
   - Run `npm run setup-db` to setup the database  *We've not got this is the package.json is that an error?* 
5. Setup your port
   - Add a `PORT` key assigned to the port of your choice in your `.env` file
     - `PORT=<port_of_your_choice>`
6. Setup your encryption
   - Add `BCRYPT_SALT_ROUND=<number>` to your `.env` file, replacing `<number>` with a number of rounds you'd like the encryption to do (e.g 10)
   - Go to [GRC](https://www.grc.com/passwords.htm) and copy one of the 3 random strings at the top of the page
   - Add `SECRET_TOKEN=<copied_string>` to your `.env` file and paste your string in place of `<copied_string>`.


### How to Play
1. Load the website via live server or follow this link: `Insert Link Here When Deployed`
2. Create your login details under the student tab and log on
3. Press `Start Game` to start a new game or `Resume Game` to continue one your already playing
4. Use the up and down buttons to order the events chronologically
5. Press `Check Answers`
   - Correct any potentially incorrect answers
   - If all answers are correct you'll be taken to the next level.
6. Save your level with `Save Progress`
7. To end the game press `Logout`


### Database Schema

- The database is created with postgreSQL.

- The following structure has been used to create the events table:
```sql 
CREATE TABLE event_card(
    event_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    date DATE,
    description VARCHAR(250) NOT NULL,
    PRIMARY KEY(event_id)
);
```

- The following structure has been used to create the user_table:
```sql
CREATE TABLE user_table(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    current_score INT DEFAULT 0,
    PRIMARY KEY(user_id)
);
```