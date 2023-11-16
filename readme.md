# Todo CRUD API

## Description

This is a simple HTTP API for managing todos items stored in a PostgreSQL database. It uses Express.js, Yup for validation, and Sequelize as the ORM.

## Endpoints

1. **Fetch Todo List** (GET `/todos`)
   - Returns a list of todos.
2. **Fetch Todo Detail** (GET `/todos/:id`)

   - Returns details of a specific todo by ID.

3. **Create Todo** (POST `/todos`)

   - Creates a new todo and returns it with the ID.

4. **Update Todo** (PUT `/todos/:id`)

   - Updates a specific todo and returns the updated todo.

5. **Delete Todo** (DELETE `/todos/:id`)
   - Deletes a specific todo.


## Getting Started


## Validation

Request data is validated using Yup, ensuring data integrity.

## Database

Todos are stored in a PostgreSQL database via Sequelize.

## Status Codes

Proper HTTP status codes are used for clear responses.

## Getting Started

1. Clone the repository to your local machine.

    ```ruby
   cd Express-HTTP-CRUD-API
     ```

2. Create a new file named `.env` and configure your database connection in the file.


 ```ruby

     DB_CONNECTION_STRING ='postgres://username:password@localhost:port_number/database'
        
      * __postgres__: This is the protocol or dialect, which specifies that you're using the PostgreSQL database.
      
      * __username__: This is the username used to connect to the PostgreSQL database.
      
      * __password__: This is the password for the PostgreSQL user specified in the connection string.
      
      * __localhost__: This is the hostname or IP address of the PostgreSQL server. In this case, it's referring to a PostgreSQL database running on the local machine.
      
      * __port_number__: This is the port number on which the PostgreSQL server is listening for connections.
      
      * __database__: This is the name of the PostgreSQL database to which you want to connect.
```

1. Install dependencies

   
   ```ruby
      npm install
   ```

2. Start the app
   ```ruby
      npm start
   ```
3. Open your browser and go to http://localhost:8000 to access the application.
