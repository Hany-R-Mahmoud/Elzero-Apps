"

# Project Name

A collection of mini-apps, gathered in one interactive website,
following tutorials from Elzero Web School

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Features](#features)
5. [Contributing](#contributing)
6. [License](#license)
7. [Acknowledgements](#acknowledgements)

## Description

An interactive Websites with the following sections:

1- Random Quote Display.

2- A Currency Converter.

3- A Latest News Section.

4- An Event Manager.

5- A Bookmark Manager.

6- A Password Generator.

### Technologies Used:

- **HTML**
- **CSS/SCSS**
- **JavaScript** / **TypeScript**
- **Bootstrap**
- **Font Awesome**
- **SweetAlert2**
- **exchangerate-api.com**
- **newsapi.org**

## Screenshots

Screenshots are avaialable in the `Screenshots` folder.
Here's an example:
![Sample Screenshot](Screenshots/Elzero-Apps-Screenshot1.png)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/hany-r-mahmoud/Elzero-Apps.git

   ```

2. Navigate into your project folder:

cd Elzero Apps

3. Install dependencies:

npm install

## Usage

To compile the Sass and TypeScript files and start the project:

1. Compile Sass (CSS) files:
   npm run build

2. Start watching sass and ts:
   npm run watch

3. Open your browser and navigate to http://localhost:3000 (or your server's address) to view the project in action.

## Features

1- Random Quote Display.
-- Abstracting quotes from JSON file, which can be modified as needed.
-- Showing quotes randomly on page load.
-- Can generate either Auto, on manually.

2- A Currency Converter.
-- Using API from exchangerate-api.com, up-to-date currency exchange rates.
-- A number of currencies are used as a sample, can be modified.

3- A Latest News Section.
-- Using API from gnews.io, up-to-date news.
-- Can be modified to be country, language, topic specific as needed.
-- Showing 6 pieces of news as a sample, can be modified.

4- An Event Manager.
-- Creating event cards, with each sorted into event name, event organizer and event date.
-- A live countdown timer to the specific date of each event.

5- A Bookmark Manager.
-- Saving bookmarks, with bookmarke title/name , specific URL.
-- Categorization of saved bookmarks.
-- Showing all bookmarks, or specific to each created category.

6- A Password Generator.
-- Creating random password, as a sample, length between 8-32 characters.
-- option to be only letters, or with addition of either numbers or special characters.
-- option to show a sample of previous created passwords.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create your feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -m 'Add new feature')
4. Push to the branch (git push origin feature-name)
5. Open a pull request

Please make sure your code follows the project's code style and includes tests where applicable.

## Acknowledgements

Bootstrap: Used for responsive layout and components.

Font Awesome: Used for icons.

SweetAlert2 : Used for showing Alerts.

exchangerate-api.com : Used for the currency exchange rate API.

gnews.io : Used for the latest news API.
