# Enmon Technologies full-stack homework

Create a production-ready React application that will display a list of meters after successful login.

## Guidelines

- TypeScript is recommended

- Try to organize all files in an appropriate directory hierarchy - try to follow the DRY principle

- You can use basic HTML or any component library of your choice

- You can use any state management strategy you like

- Try to make the app easily extendable and maintainable

- Do not use Next.js

## Acceptance Criteria

- User is able to log in by entering an email and a password. Credentials should not be hard coded.

- After successful login user can see a list of meters in a form of a table.

- Display at least 5 meter attributes in the table. Pick appropriate formatter.

- Table supports pagination and sorting (check Strapi docs to find out how to paginate and sort).

- Implement REST PUT endpoint for InventoryMeter entity so that the user is able to edit
  parameters displayed in the table.

- User is able to log out from the application

## Backend

- The API is located at https://tools.dev.enmon.tech/api

- The backend service is built on Strapi V4 headless CMS

- You can find more about Strapi V4 here https://docs.strapi.io/

## Credentials

email: homework@enmon.tech

password: GHrSyhF5m6M8G5PT

### REST Quickstart

- use POST auth/local endpoint to get jwt

  axios.post('https://tools.dev.enmon.tech/api/auth/local', {
  identifier: EMAIL,
  password: PASSWORD,
  });

- use GET inventory-meters endpoint to get list of Meters

  axios.get('https://tools.dev.enmon.tech/api/inventory-meters');

  you can find more about filtering and sorting in the Strapi docs: https://docs.strapi.io/dev-docs/api/rest
