# CodeLeap Network

CodeLeap Network is a React TypeScript application that allows users to create, edit, delete, and like posts, with advanced sorting and filtering capabilities. It features a responsive, modern UI styled with Tailwind CSS and leverages Tanstack Query for data fetching and mutations.

## Features

- **User Authentication**: Simple username-based login (stored in `localStorage`).
- **Post Management**:
  - Create, edit, and delete posts (only by the post's author).
  - Like posts with real-time like count updates (stored in `localStorage`).
- **Sorting and Filtering**:
  - Sort posts by newest, oldest, or most liked.
  - Filter posts by username, title/content, or all fields.
- **Responsive UI**:
  - Mobile-friendly layout with stacked controls.
  - Desktop-optimized horizontal layout.
- **Accessibility**: Includes ARIA attributes and proper focus management.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/codeleap-network.git
   cd codeleap-network
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   
4. **Build for Production**:
   ```bash
   npm run build
   ```
## Usage

1. **Login**:
   - Enter a username on the login page to access the app.
   - The username is stored in `localStorage`.

2. **Create a Post**:
   - Use the form at the top of the posts page to create a new post with a title and content.

3. **Edit/Delete Posts**:
   - If the logged-in user is the post’s author, edit and delete buttons appear in the post header.
   - Edit opens a modal to update the post; delete opens a confirmation modal.

4. **Like Posts**:
   - Click the "Like" button to increment a post’s like count.
   - Like counts are stored in `localStorage` and update in real-time.

5. **Sort and Filter**:
   - Use the filter dropdown to select "All", "Username", or "Title/Content".
   - Enter a search term to filter posts.
   - Use the sort dropdown to order posts by "Newest First", "Oldest First", or "Most Liked".

6. **Logout**:
   - Click the power icon in the header to log out and return to the login page.
