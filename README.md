# Take-home task for Enmon interview

This is my rendition of the take-home task received as part of the interview process. The task calls for a font-end app that consumes an existing API with fake data from company measuring devices and displays it to the user, with the options to sort and paginate the table, but importantly enables the userto edit the data inline and update the database with that data.

The app was build in Typescript 4.9 with React 18.2, Vite 4.1, Axios 1.3. The app consumes data served from the backend using Strapi v4. The editable table component is implemented with a library called React Edit List, v1.1. Styling is mostly handled by the lightweight Pico CSS library, v1.5.

## Criteria

- User can log-in the app using basic credentials, this requests a jwt token and then retrieves data if successful

- After login, the user sees a table of data, paginated byt 25 entries and sorted based on ID

- The table shows 7 data fields, with a date formatted to a familiar string for easier work

- Table supports pagination and sorting by column heads

- User can edit the table data,and after saving it, this triggers a PUT request to the backend, to update the respective data

- User can log out, this changes the visual state of the app, as well as deletes the jwt token from local storage, where it was stored for use in update requestx to the backend

### Downsides

- A date picker was hard to implement in the used library, so the date in the table is a simple string

- Client-side routing has not been done, even though its more natural for a user to see the changes in URL. I wante dot keep it simple, but React Router would be the first choice.

- Typescript was used in the app, but as its not my strongest suite yet, it will probably be faulty. However, I tried my best.
