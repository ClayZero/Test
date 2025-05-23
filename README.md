# Next.js WhatsApp Message Sender

This project is a simple Next.js application that allows users to send WhatsApp messages via the Twilio API.

## Features

-   Enter a recipient's phone number (E.164 format) and a message.
-   Sends the message using WhatsApp through a backend API powered by Twilio.
-   Basic UI for message input and feedback.

## Prerequisites

-   Node.js (v16.x or later recommended)
-   npm or yarn
-   A Twilio Account with:
    -   Account SID
    -   Auth Token
    -   A Twilio WhatsApp-enabled phone number (or use the Twilio Sandbox for WhatsApp)

## Setup

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    This project requires Twilio credentials to send messages.
    *   Create a file named `.env.local` in the root of the project.
    *   Add your Twilio credentials to it like so:

        ```
        TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        TWILIO_AUTH_TOKEN="your_auth_token_xxxxxxxxxxxxxx"
        TWILIO_WHATSAPP_FROM="+14155238886" # Your Twilio WhatsApp number (e.g., +1234567890) or Sandbox number
        ```

    *   **Important:**
        *   Replace the placeholder values with your actual Twilio Account SID, Auth Token, and your Twilio WhatsApp-enabled phone number.
        *   The `TWILIO_WHATSAPP_FROM` number should be in E.164 format (e.g., `+12345678900`).
        *   The `.env.local` file is already listed in `.gitignore` and should not be committed to your repository.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How it Works

-   The frontend is a Next.js React page (`pages/index.js`) that provides a form to input the phone number and message.
-   When the form is submitted, it makes a POST request to the backend API route (`pages/api/send-whatsapp.js`).
-   The backend API route uses the official Twilio Node.js library to send the WhatsApp message using the credentials stored in the environment variables.

## Project Structure

-   `pages/index.js`: Frontend React component for the message sending form.
-   `pages/api/send-whatsapp.js`: Backend API route for handling message sending via Twilio.
-   `public/`: Static assets.
-   `styles/`: Global styles and CSS modules.
-   `.env.local`: For storing environment variables (Twilio credentials). Not committed to git.
