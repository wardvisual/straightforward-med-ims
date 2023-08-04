![banner](/public/assets/screenshots/banner.jpg)

## Simplified CSU-Clinic's IMS

Note: This project is a school requirement and is intended for showcasing purposes only. It is not a complete and fully functional system for production use.

### Built With:

- PNPM - Package Manager
- ReactJS Typescript - Frontend
- Supabase - Backend As A Service
- PostgreSQL - SQL Database

### Design Overview:

![schema](/public/assets/screenshots/designs.jpg)

### Supabase Schema:

The schema and data types presented here are tailored for educational purposes and may not reflect real-world accuracy. As such, it is important to customize and adapt the schema based on specific project requirements and data needs.

![schema](/public/assets/screenshots/schema.jpg)

### Prerequisites:

- Node.js and pnpm installed on your machine
- A code editor of your choice
- Familiarity with terminal or command prompt

### Setup:

1. Clone the repository to your local machine.

   ```sh
   git clone https://github.com/your-username/straightforward-med-ims.git
   ```

2. Navigate to the directory

   ```sh
   cd straightforward-med-ims
   ```

3. Install PNPM Packages

   ```sh
   pnpm install
   ```

4. Create a Supabase account and set up a new project.

5. Obtain your Supabase API URL and Service Key and update the .env file in the project root with the following information:

   ```sh
   REACT_APP_SUPABASE_URL=your_supabase_api_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_service_key
   ```

6. Run the application.

   ```sh
   pnpm run dev
   ```

### Usage:

The CSU Clinic's Inventory Management System provides the following functionalities:

1. Dashboard Overview: Upon logging in, you will see an overview of the system, displaying the count of new medicines, upcoming medicines, expired medicines, and the total number of medicines.

2. Inventory Menu: This section allows you to manage the medicine inventory and perform various actions.

3. Create a Cabinet: This feature allows you to add and manage medicine cabinets, which contain drawers for organizing medicines.

4. Manage Medicine Inventory: In this section, you can add new medicines to the inventory by providing details such as medicine name, stock, quantity, expiration date, and more. You can also choose a cabinet and a drawer to store the medicine. The system will keep track of the medicine stock levels and notify you about low stock.

5. View Medicines: The table displays the details of added medicines, allowing you to view, edit, and delete medicine records.

### License:

This project is licensed under the `LICENSE`.

## Contact

[Edward Fernadnez](https://wardvisual.me/)
