# HobbyMate

A Next.js project for discovering and booking hobby classes with Supabase authentication.

## Features

- 🔐 User authentication (Sign up, Login, Logout)
- 🎨 Hobby discovery and search
- ❤️ Wishlist functionality
- 📅 Booking system
- 👤 User profile management
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository and install dependencies:

```bash
cd apps/hobbyfind
npm install
```

2. Set up Supabase:

   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the database migrations:

   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the migration files in order:
     - `supabase/migrations/001_initial_schema.sql`
     - `supabase/migrations/002_sample_data.sql`
     - `supabase/migrations/006_rollback_and_restructure.sql`

**중요**: 이 프로젝트는 **커스텀 인증 시스템**을 사용합니다. 자세한 설정은 [CUSTOM_AUTH_SETUP.md](./CUSTOM_AUTH_SETUP.md)를 참고하세요.

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Authentication**: Custom Authentication System

## Database Schema

The project includes the following main tables:

- `profiles` - User profiles
- `categories` - Hobby categories
- `hobbies` - Hobby classes
- `hobby_images` - Hobby images
- `hobby_schedules` - Class schedules
- `events` - Special events
- `wishlists` - User wishlists
- `reservations` - Booking records
- `reviews` - User reviews

## Project Structure

```
src/
├── app/           # Next.js App Router pages
│   ├── login/     # Login page
│   ├── signup/    # Signup page
│   ├── search/    # Search results
│   ├── mypage/    # User dashboard
│   └── hobby/     # Hobby detail pages
├── components/    # Reusable React components
├── hooks/         # Custom React hooks
│   ├── useAuth.ts     # Authentication hook
│   └── useProfile.ts  # User profile hook
├── lib/           # Utility functions
│   └── supabase.ts    # Supabase client
└── ...

supabase/
└── migrations/    # Database migration files
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
