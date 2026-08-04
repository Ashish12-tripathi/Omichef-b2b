# OmiChef Business — MERN B2B Website

A complete JavaScript MERN website for wholesale, institutional and bulk cookware enquiries. It uses OmiChef's cream, rust-brown and deep-blue visual language, links every collection back to the live Shopify D2C store, includes quote and appointment forms, and provides an admin dashboard for editing website content and managing leads.

## Included

- React + Vite responsive frontend
- Express + MongoDB REST API
- JWT-protected admin dashboard
- Editable hero, contact details, collections, buyer segments, benefits and FAQs
- Bulk quote form
- Appointment booking form
- Inquiry and appointment status management
- Shopify collection links
- Local OmiChef imagery plus editable image URL fields
- Docker Compose file for local MongoDB

## 1. Requirements

- Node.js 18 or newer
- npm 9 or newer
- MongoDB locally, MongoDB Atlas, or Docker Desktop

## 2. Start MongoDB

### Option A — Docker

```bash
docker compose up -d
```

### Option B — MongoDB Atlas

Create a cluster and copy your MongoDB connection string.

## 3. Configure environment variables

Copy the example file:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/omichef_b2b
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@omichef.com
ADMIN_PASSWORD=change-this-password
CLIENT_URL=http://localhost:5173
```

Optional client API override:

```bash
cp client/.env.example client/.env
```

## 4. Install dependencies

From the project root:

```bash
npm install
npm run install:all
```

## 5. Seed default website content

```bash
npm run seed
```

The API also creates default content automatically the first time the public site loads.

## 6. Run locally

```bash
npm run dev
```

- Website: `http://localhost:5173`
- Admin: `http://localhost:5173/admin/login`
- API: `http://localhost:5000/api`

Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values from `server/.env`.

## 7. Production build

```bash
npm run build
npm start
```

When `NODE_ENV=production`, Express serves the Vite build from `client/dist`.

## Main customization options

Open the admin dashboard and choose **Website Content**. You can edit:

- Brand name and announcement
- Hero title, text, buttons and images
- Contact details and appointment URL
- Statistics
- Buyer types
- Benefits and process steps
- Collection names, descriptions, image URLs and Shopify links
- About copy and FAQs
- Theme colors

The initial content is stored in `server/seeds/defaultContent.js`, which is also useful for developer-level defaults.

## Deployment notes

- Frontend + API together: Render, Railway, DigitalOcean, AWS or a VPS.
- Database: MongoDB Atlas is recommended for production.
- Set `CLIENT_URL` to the live frontend URL.
- Use a strong `JWT_SECRET` and change the default admin password.
- Add an email service in `server/controllers/inquiryController.js` if you want instant email notifications.
