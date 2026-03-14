# BharatBridge — India's #1 B2B Export Marketplace

A production-ready B2B export marketplace connecting Indian exporters with global buyers.

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: MySQL
- **Auth**: JWT
- **DevOps**: PM2, Nginx, Let's Encrypt SSL

## Getting Started

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env   # Fill in your DB credentials
npx prisma migrate dev
npm run seed
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
cp .env.example .env.local   # Set NEXT_PUBLIC_API_URL
npm run dev
\`\`\`

## Live
Visit: http://localhost:3000
# bharatbridge
