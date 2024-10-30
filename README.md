## The App

Bundled as a submodule is an app that is a Kanban board written in Vue 3 + Typescript + Vite + TailwindCSS. You can create boards, lists and cards. You can drag and drop cards between lists, upload a picture to the card detail and more. There’s also a simple signup and login feature which will allow you to create private boards.

Note: This is not a production level app. It is just used for testing new hire candidates. You may even find some bugs hidden in the app. If you find any, feel free to include a bug report pdf document with your completed exam for extra credit.

## App & Cypress Installation

The point of this app is to be very easy to install and run, so that you don’t need to set up a complicated database and have several scripts running in order to open the app.

### Install

**Note:** If you do not already have Cypress version 12.7.3 installed on your laptop, you will need to install it first: `npm install -D cypress@12.17.3`. You will also need node and npm installed as well.

1. Open a terminal in VS Code and run (make sure you are in the vue-boards folder): `npm install`

### Running the App and Cypress

Once the install is finished, open both the app and Cypress:

1. Run: `npm run serve`
2. Open your browser on `http://localhost:3000` to see the App.

### Verify Cypress Tests

Run the following Cypress test to make sure everything is working okay.

`ui.cy.js`

## Exam

Review the App information below then begin creating the tests. Try to finish as many as you can, if you are stuck on one for too long, move on to the next test.

## Tests to create

1. Add the following API tests in the api.cy.js file:
   1. Create a new user using API and check the status is 201.
   2. Create a new board, a list for that board and a card for that list using API.

2. Add the following UI tests in the ui.cy.js file:
   1. Create a Sign-up test.
   2. Create a login test with valid email and valid password - verify they login successfully.
   3. Create a smoke test that does the following: Login, create a new Board, rename the board, click the star icon, add a list, add a card, open the card, click the dropdown Due Date calendar and select a date in the following week, delete the board. Add assertion for each part.

Note: If you finish and have time left over, feel free to create any other tests you think would be valuable for this app. Show us what you got :)

## When finished or the allotted time is up

Zip up the project and upload it to HackerRank. Note: You can first delete the node_modules folder to make the zip file smaller.

## App Information

### Database

The application uses a json file for a database which you can find in `vue-boards/backend/data/database.json`.

### Uploaded files

Files uploaded on the card detail are in `vue-boards/backend/data/uploaded` folder.

## API documentation

**`GET`** `/api/boards`

Returns all boards

**example (unauthorized user):**

```json
[
  {
    "name": "new project",
    "user": 0,
    "id": 27315982008,
    "starred": false,
    "created": "2020-09-01"
  },
  {
    "name": "moon landing 2",
    "user": 0,
    "id": 14254049205,
    "starred": true,
    "created": "2020-09-01"
  }
]
```

**example (authorized user):**

```json
[
  {
    "name": "new project",
    "user": 0,
    "id": 27315982008,
    "starred": false,
    "created": "2020-09-01"
  },
  {
    "name": "moon landing 2",
    "user": 0,
    "id": 14254049205,
    "starred": true,
    "created": "2020-09-01"
  },
  {
    "name": "private board",
    "user": 1, // user id of the board author
    "id": 6606529940,
    "starred": false,
    "created": "2020-09-01"
  }
]
```

---

**`POST`** `/api/boards`

Creates a new board

**example request:**

```json
{
  "name": "moon landing 2"
}
```

**example response:**

```json
{
  "name": "moon landing 2",
  "user": 1,
  "id": 22559285486,
  "starred": false,
  "created": "2020-09-01"
}
```

---

**`GET`** `/api/boards/{boardId}`

Returns details of a board with given `boardId`

**example response:**

```json
{
  "name": "new project",
  "user": 0,
  "id": 27315982008,
  "starred": false,
  "created": "2020-09-01"
}
```

---

**`PATCH`** `/api/boards/{boardId}`

Changes details of a board with given `boardId`. `starred` and `name` attributes can be changed

**example request:**

```json
{
  "starred": true,
  "name": "project alpha"
}
```

---

**`DELETE`** `/api/boards/{boardId}`

Deletes a board with given `boardId`

---

**`GET`** `/api/lists`

Returns all lists
**example response**

```json
[
  {
    "boardId": 123456789,
    "name": "Groceries",
    "order": 0,
    "id": 68040017610,
    "created": "2022-01-26"
  },
  {
    "boardId": 987654321,
    "name": "Drugstore",
    "order": 1,
    "id": 87979775072,
    "created": "2022-02-11"
  }
]
```

---

**`GET`** `/api/lists?boardId={boardId}`

Returns all lists with given `boardId`

---

**`POST`** `/api/lists`

Creates a new list

**example request**

```json
{
  "boardId": {boardId}, // required
  "name": "to do"
}

```

---

**`PATCH`** `/api/lists/{listId}`

Changes details of a list with given `listId`.

**example request**

```json
{
  "name": "renamed list"
}
```

---

**`DELETE`** `/api/lists/{listId}`

Deletes a list with given `listId`.

---

**`POST`** `/api/cards`

Creates a new card

**example request**

```json
{
  "boardId": {boardId}, // required
  "listId": {listId}, // required
  "name": "buy milk"
}

```

---

**`PATCH`** `/api/cards/{cardId}`

Changes details of a card `cardId`

**example request**

```json
{
  "completed": true
}
```

---

**`DELETE`** `/api/cards/{cardId}`
Changes details of a card `cardId`

---

**`GET`** `/api/users`

Returns information for the current user

**example response**

```json
{
  "user": {
    "email": "vue-boards@boards.net",
    "password": "$2a$10$fdK.5O8uogdfjgklôjgd/gf90890NKLJ",
    "id": 1
  }
}
```

---

**`POST`** `/api/signup`

Creates a new user

**example request**

```json
{
  "email": "vue-boards@boards.net",
  "password": "nbusr1234"
}
```

---

**`POST`** `/api/welcomeemail`

Sends a request for a welcome email

**príklad tela API volania:**

```json
{
  "email": "vue-boards@boards.net"
}
```

---

**`POST`** `/api/login`

Logs in a user

**example request**

```json
{
  "email": "vue-boards@boards.net",
  "password": "nbusr1234"
}
```

---

## Special endpoints for handling database state

---

**`POST`** /api/reset

Deletes all boards, lists, cards and users

---

**`DELETE`** /api/boards

Deletes all boards, lists and cards

---

**`DELETE`** /api/lists

Deletes all lists and cards

---

**`DELETE`** /api/cards

Deletes all cards

---

**`DELETE`** /api/users

Deletes all users

---
