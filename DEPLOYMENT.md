# Deployment Guide for Namo

This guide outlines the steps to deploy the **frontend** to **Vercel** and the **backend** to **Render**.

## Prerequisites

*   Push your latest code to GitHub: `https://github.com/shreyagr29/namo`
*   Accounts on [Vercel](https://vercel.com/) and [Render](https://render.com/).

---

## Part 1: Backend Deployment (Render)

1.  **Log in to Render** and go to your [Dashboard](https://dashboard.render.com/).
2.  Click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub repository: `shreyagr29/namo`.
4.  **Configure the Service:**
    *   **Name:** `namo-backend` (or similar)
    *   **Root Directory:** `backend` (Important! This tells Render where the backend code lives)
    *   **Environment:** `Node`
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
    *   **Instance Type:** Free (for hobby projects)
5.  **Environment Variables:**
    *   Scroll down to the "Environment Variables" section.
    *   Add the following keys (copy values from your local `.env` or use production values):
        *   `MONGO_URI`: `mongodb+srv://shreyvinayakagrawal1111:haaanjiiDatabase01@haaanjii.bh1em.mongodb.net/`
        *   `PORT`: `5000` (Render will override this internally, but good to have)
        *   `CLIENT_URL`: `https://namo-frontend.vercel.app` (See Note below)
6.  Click **"Create Web Service"**.
7.  **Wait for Deployment:** Render will build and deploy. Once finished, copy the **Service URL** (e.g., `https://namo-backend.onrender.com`).

**Note on CLIENT_URL:** You won't have the Frontend URL until Part 2 is done. You can initially set it to `*` or update it later after deploying the frontend.

---

## Part 2: Frontend Deployment (Vercel)

1.  **Log in to Vercel** and go to your Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the repository `shreyagr29/namo`.
4.  **Configure the Project:**
    *   **Project Name:** `namo-frontend`
    *   **Root Directory:** Click "Edit" and select the `frontend` folder.
    *   **Framework Preset:** Vercel should auto-detect "Vite".
5.  **Environment Variables:**
    *   Expand the "Environment Variables" section.
    *   Add:
        *   `VITE_SERVER_URL`: Paste your Render Backend URL here (e.g., `https://namo-backend.onrender.com`).
6.  Click **"Deploy"**.
7.  **Finalise:**
    *   Once deployed, Vercel will give you a domain (e.g., `https://namo-frontend.vercel.app`).
    *   **Go back to Render** (Part 1, Step 5) and update the `CLIENT_URL` variable with this new Frontend URL to fix CORS issues.

---

## 🚀 Troubleshooting

*   **CORS Errors:** If you see CORS errors in the browser console, ensure the `CLIENT_URL` in Render matches *exactly* (no trailing slash) the Vercel URL.
*   **Whitelisting:** If using MongoDB Atlas, ensure your "Network Access" whitelists `0.0.0.0/0` (Allow Access from Anywhere) so Render can connect.
