# Automated Development Environment

This project includes a fully automated development environment setup that handles MongoDB Atlas IP whitelist management, backend and frontend services, and more.

## 🚀 Quick Start

Get everything up and running with a single command:

```bash
npm run setup
```

This will:
1. Install all dependencies
2. Set up MongoDB Atlas credentials
3. Update your IP in MongoDB Atlas
4. Configure auto-startup (optional)
5. Start all services (optional)

## 📋 Available Commands

### One-Command Solutions

- `npm run setup` - Complete automated setup
- `npm run start-all-windows` - Start all services in separate windows
- `npm run start-all` - Start all services in one terminal

### MongoDB Atlas IP Management

- `npm run update-mongo-ip` - Update your IP in MongoDB Atlas once
- `npm run auto-update-ip` - Start daemon to keep your IP updated automatically

### Services

- `npm run frontend` - Start frontend server
- `npm run backend` - Start backend server
- `npm run dev` - Start both frontend and backend

### Automation

- `npm run configure-auto-startup` - Set up services to start automatically at login
- `npm run install-all` - Install all dependencies

## ⚙️ How It Works

### Automated IP Management

The system automatically:
1. Detects your current public IP address
2. Checks if it has changed since last run
3. Updates MongoDB Atlas IP whitelist via their API
4. Keeps track of your last known IP

### Multi-Service Startup

- Each service runs in its own window for easier debugging
- IP updater runs in the background checking for changes every 15 minutes
- Updates happen automatically without interrupting your workflow

## 🔑 Credentials

MongoDB Atlas credentials are securely stored in your `.env` file. If you need to update them:

1. Edit the `backend/.env` file
2. Update these values:
   ```
   MONGODB_PUBLIC_KEY=your_public_key
   MONGODB_PRIVATE_KEY=your_private_key
   MONGODB_PROJECT_ID=your_project_id
   ```

## 🔧 Troubleshooting

- Check log files in `Scripts/ip-daemon.log` and `Scripts/ip-update.log`
- If services don't start, make sure all dependencies are installed
- For MongoDB connection issues, check your IP in the Atlas dashboard

# Job Assistant AI

CarrerSync AI is an intelligent job application platform designed to automate and optimize the job search process. It scrapes job listings from various platforms, summarizes job details, and provides auto-resume generation to streamline applications.

## Features

- **Job Scraping:** Fetch job listings from platforms like Internshala, Glassdoor, and more.
- **Job Description Summarization:** AI-generated concise descriptions of job roles.
- **Auto Resume Building:** Automatically generates optimized resumes for different job applications.
- **Application Auto-Fill:** Uses AI to answer application questions efficiently.
- **Gmail Tracking:** Monitors job-related emails and provides updates.

## Tech Stack

- **Backend:** Flask API
- **Frontend:** React
- **Database:** MongoDB
- **Automation:** Python scripts for job scraping and auto-applying
- **Authentication:** Google OAuth 2.0

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-assistant-ai.git
   cd job-assistant-ai
   ```

2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Usage

1. **Login with Google OAuth** to start using the platform.
2. **View job listings** scraped from different platforms.
3. **Enable auto-apply** to let the AI automatically fill applications.
4. **Monitor your applications** and receive email updates.

## Future Enhancements

- Implement AI-powered interview preparation assistance.
- Support for additional job platforms.
- Advanced resume customization options.
- Integration with LinkedIn for better job tracking.

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License.


