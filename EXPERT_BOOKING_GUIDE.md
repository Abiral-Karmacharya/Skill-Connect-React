# Expert Booking System

This application now includes a comprehensive expert booking and viewing system with the following features:

## New Pages Added

### 1. `/experts` - Find and Book Experts
- **Search & Filter**: Search experts by name or skills, filter by specific skill categories
- **Expert Profiles**: View detailed expert information including bio, ratings, and pricing
- **Book Consultation**: Click "Book Consultation" to open the booking modal
- **Responsive Design**: Works on desktop and mobile devices

### 2. `/bookings` - Manage Your Bookings
- **View All Bookings**: See all your consultation bookings in one place
- **Filter by Status**: Filter bookings by status (All, Pending, Confirmed, Completed, Cancelled)
- **Booking Details**: View date, time, duration, cost, and contact method for each booking
- **Cancel Bookings**: Cancel pending or confirmed bookings
- **Join Calls**: Quick access to join confirmed video calls

## Features

### Booking Modal
- **Date Selection**: Choose your preferred consultation date
- **Time Slots**: Select from available time slots (9 AM - 6 PM)
- **Duration Options**: Choose 30, 60, or 90-minute sessions with transparent pricing
- **Contact Methods**: Select video call, phone call, or text chat
- **Custom Message**: Add a message to describe your project or questions

### Navigation
- **Updated Navigation Bar**: Easy access to Dashboard, Find Experts, and My Bookings
- **Dashboard Integration**: Quick link from dashboard to browse all experts

### Data Storage
- **Local Storage**: Currently uses browser local storage for booking data
- **Ready for API Integration**: Code structure ready to connect to backend APIs

## Usage Instructions

1. **Browse Experts**: Navigate to `/experts` to see all available experts
2. **Search/Filter**: Use the search bar or skill filter to find specific experts
3. **Book Consultation**: Click "Book Consultation" on any expert card
4. **Fill Booking Form**: Select date, time, duration, and add any messages
5. **Submit Booking**: Click "Book Now" to submit your booking request
6. **View Bookings**: Go to `/bookings` to manage your appointments
7. **Cancel if Needed**: Cancel bookings that are still pending or confirmed

## Technical Details

### Components Created
- `src/assets/pages/experts.jsx` - Main experts listing page
- `src/assets/pages/bookings.jsx` - Bookings management page
- `src/assets/pages/components/BookingModal.jsx` - Booking form modal

### Styling
- **Tailwind CSS**: Modern, responsive design using Tailwind CSS
- **Consistent UI**: Matches existing application design patterns
- **Mobile-First**: Responsive design that works on all devices

### Future Enhancements
- Connect to actual backend API for expert and booking data
- Add payment processing integration
- Implement real-time video calling
- Add expert availability calendar
- Email/SMS notifications for booking confirmations
- Rating and review system for completed consultations

## Development

The application is running on `http://localhost:5173` and includes:
- Hot module replacement for development
- Modern React with hooks
- React Router for navigation
- React Hot Toast for notifications
- Tailwind CSS for styling

Start the development server with:
```bash
npm run dev
```