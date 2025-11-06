# SkillSwap 🔄

A modern platform for exchanging skills and knowledge between talented individuals. Connect with others, share your expertise, and learn something new!

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.1-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-2.50.5-3ECF8E?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)

## 🌟 Features

### Core Features
- **🔐 User Authentication**: Secure sign-up and login with Supabase Auth
- **👤 User Profiles**: Create and customize your profile with skills and availability
- **🔍 Smart Search**: Filter users by skills, availability, and ratings
- **💬 Skill Swap Requests**: Send and manage skill exchange requests
- **⭐ Rating System**: Rate your skill exchange experiences
- **💬 AI Chatbot**: Get instant help and guidance
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### User Features
- Browse and discover talented individuals
- View detailed user profiles with skills offered and wanted
- Real-time availability status
- Pagination for easy navigation
- Request skill swaps with personalized messages
- Manage incoming and outgoing swap requests
- Accept, reject, or cancel swap requests

### Admin Features
- 🔧 Admin Dashboard for platform management
- 📊 User statistics and analytics
- 🚫 User moderation (ban/unban users)
- 📢 Send notifications to all users
- 📈 Track total swaps and active users

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend as a Service
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions
  - Row Level Security (RLS)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- A **Supabase** account (free tier works great!)

## 🛠️ Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/abhikhurannah/odoo_hackerthon.git
cd odoo_hackerthon
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned

#### Get Your Credentials
1. Go to **Project Settings** → **API**
2. Copy your **Project URL** and **anon public** key

#### Apply Database Migrations
You have two options to set up the database schema:

**Option A: Using Supabase CLI (Recommended)**
```bash
# Install Supabase CLI
brew install supabase/tap/supabase  # macOS
# or
npm install -g supabase  # Cross-platform

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

**Option B: Manual Setup via Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and execute each SQL file from `supabase/migrations/` in order:
   - `20250712082113_flat_sun.sql`
   - `20250712082123_velvet_thunder.sql`
   - `20250712082710_rough_wood.sql`
   - `20250712085635_wispy_wave.sql`

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"
```

> ⚠️ **Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### 5. Run the Development Server

```bash
npm run dev
```

The app will open at [http://localhost:5173](http://localhost:5173)

## 🧪 Testing Database Connection

We've included a handy script to test your Supabase connection:

```bash
# Test connection to profiles table
npm run test:supabase

# Test a specific table
TEST_TABLE=swap_requests npm run test:supabase
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test:supabase` | Test Supabase connection |

## 📁 Project Structure

```
odoo_hack/
├── src/
│   ├── components/         # React components
│   │   ├── AdminDashboard.tsx
│   │   ├── AuthModal.tsx
│   │   ├── Chatbot.tsx
│   │   ├── Header.tsx
│   │   ├── UserCard.tsx
│   │   ├── UserProfile.tsx
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useUsers.ts
│   │   └── useSwapRequests.ts
│   ├── lib/               # Utilities and config
│   │   └── supabase.ts    # Supabase client setup
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── utils/             # Helper functions
│   │   └── mockData.ts
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── supabase/
│   └── migrations/        # Database migrations
├── scripts/
│   └── test-supabase.js   # Connection test script
├── .env.example           # Environment variables template
└── README.md             # You are here!
```

## 🗄️ Database Schema

### Tables

#### `profiles`
Stores user profile information:
- `id` (UUID, Primary Key)
- `name` (Text)
- `location` (Text, nullable)
- `avatar_url` (Text, nullable)
- `skills_offered` (Text Array)
- `skills_wanted` (Text Array)
- `availability` (Text Array)
- `rating` (Numeric)
- `total_swaps` (Integer)
- `is_online` (Boolean)
- `is_admin` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### `swap_requests`
Manages skill exchange requests:
- `id` (UUID, Primary Key)
- `from_user_id` (UUID, Foreign Key)
- `to_user_id` (UUID, Foreign Key)
- `skill_offered` (Text)
- `skill_wanted` (Text)
- `message` (Text)
- `status` (Enum: pending, accepted, rejected, completed, cancelled)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## 🔒 Security

- Environment variables are used for sensitive data
- `.env` is gitignored by default
- Supabase Row Level Security (RLS) policies protect user data
- Authentication is handled securely via Supabase Auth

## 🎨 Customization

### Changing the Theme
Edit `tailwind.config.js` to customize colors, fonts, and more.

### Adding New Skills Categories
Update the skill categories in `src/components/SearchBar.tsx`.

### Modifying User Fields
Update the TypeScript types in `src/types/index.ts` and corresponding database schema.

## 🐛 Troubleshooting

### "Could not find the table 'public.profiles'"
- Make sure you've applied the database migrations
- Verify your Supabase credentials in `.env`
- Run `npm run test:supabase` to test the connection

### Authentication Not Working
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Restart the dev server after changing `.env`
- Check browser console for detailed error messages

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Abhay Kumar** - [@abhikhurannah](https://github.com/abhikhurannah)
- **Prayash Sinha** - [@Prayash007](https://github.com/Prayash007)
- **Leora Saharia**

## 🙏 Acknowledgments

- Built for Odoo Hackathon
- Powered by [Supabase](https://supabase.com)
- Icons by [Lucide](https://lucide.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)

## 📧 Support

If you have any questions or run into issues, please:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review closed issues in the repository
3. Open a new issue with detailed information

---

Made with ❤️ for the skill-sharing community