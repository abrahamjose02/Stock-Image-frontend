Here's a well-structured `README.md` for your "Stock Image" project, based on the details you've provided:

---

# Stock Image Application

## Introduction

The **Stock Image Application** allows users to easily manage their personal image collections. Users can register, log in, upload multiple images with titles, rearrange them through drag-and-drop functionality, edit both image and title, and delete images. The application is designed to provide an intuitive interface and a seamless experience for managing images.

## Features

- **User Authentication:**
  - Secure registration and login using email, phone number, and password.
  - Password reset functionality included.

- **Image Upload:**
  - Bulk upload of images with individual titles.
  - Each user can view, edit, delete, and rearrange their uploaded images.

- **Rearrange Images:**
  - Drag-and-drop functionality to reorder uploaded images.
  - Users can save the rearranged image order.

- **Edit and Delete:**
  - Ability to edit the title and replace the image.
  - Option to delete images from the collection.

## Tech Stack

- **Frontend:** React (running on port 5173)
- **Backend:** Node.js, Express.js (running on port 10000)
- **Database:** MongoDB (hosted on MongoDB Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Storage:** AWS S3 for storing uploaded images
- **File Uploads:** Multer and AWS SDK for handling file uploads
- **Cross-Origin Resource Sharing (CORS):** Configured for frontend-backend communication

## Getting Started

### Set up your `.env` file

Create a `.env` file in the root of your backend project and add the following variables:

```plaintext
MONGO_URI=mongodb+srv://<your_mongo_connection_string>
JWT_ACCESS_SECRET=<your_jwt_access_secret>
JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
AWS_BUCKET_NAME=stock-image-bucket
AWS_REGION=ap-south-1
AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
AWS_ACCESS_KEY_ID=<your_aws_access_key_id>
PORT=10000
NODE_ENV=production
```

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/<your-github-username>/StockImageApp.git
cd StockImageApp/backend
```

2. **Install backend dependencies:**

```bash
npm install
```

3. **Run the backend server:**

```bash
npm start
```

4. **Frontend Setup:**

Navigate to the `client` folder for frontend setup:

```bash
cd ../client
npm install
npm run dev
```

The backend will run on `http://localhost:10000` and the frontend on `http://localhost:5173`.

### Running the Application

1. Ensure that MongoDB and AWS credentials are properly configured in your `.env` file.
2. Start the backend and frontend servers.
3. Access the frontend at `http://localhost:5173` and perform user registration, login, image uploads, and other operations.

### API Endpoints

- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Login with email/phone and password.
- **POST /api/auth/reset-password** - Request a password reset.
- **POST /api/image/upload** - Upload multiple images with titles.
- **PUT /api/image/edit/:id** - Edit an image or its title.
- **DELETE /api/image/delete/:id** - Delete an image.
- **PUT /api/image/rearrange** - Rearrange images using drag-and-drop.

## Tech Features

- **User Authentication:** JWT-based authentication ensures secure user login and session management.
- **AWS S3 Storage:** Uploaded images are securely stored in an AWS S3 bucket.
- **File Handling:** Multer is used for handling multipart form data for image uploads.
- **Drag-and-Drop:** Allows easy rearranging of uploaded images in the frontend.
- **Edit and Delete:** Users can edit or delete uploaded images directly from their profile.

## Conclusion

The **Stock Image Application** provides a simple and effective way to manage personal image collections with essential features like bulk uploads, rearranging, editing, and deleting images. Its backend is robust, scalable, and integrates with AWS S3 for cloud-based image storage.

---
