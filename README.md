🌐 Live Demo(Vercel)

https://dribbble-search-animation-sn9m.vercel.app/


🎥 Video Walkthrough

[🔗 Watch the Loom Recording]
(https://www.loom.com/share/ecb1ec0cc6c34bebadce8439826dfe5b?sid=25a81988-4333-4bea-ac78-19e23210ca0f)

📂 Repository

This GitHub repository contains the full source code of the project.

🚀 Features

Search Input → Dynamic filtering of data from a local JSON file.

Loading State → Skeleton cards with wave animation shown during simulated backend delay.

Counters per Category → Animated counters for Files, People, Chat, and List using a custom hook useItemLength.

Tabs for Categories → Filter results by All, Files, People, Chat, or List.

Looping Logic → Always render at least 6 slots, filling empty ones with skeletons to maintain stable layout.

Highlighted Matches → Search keywords are highlighted inside each result card.

Settings Dropdown → Animated gear rotation + dropdown to toggle category visibility.

Animations (Framer Motion) →

Outer container expand/collapse

Inner results collapse

Skeleton fade/wave effect

Quick Access & Clear buttons fade in/out

Responsive Design → Works seamlessly across desktop, tablet, and mobile.


🛠️ Tech Stack

React.js (Frontend framework)

Framer Motion (Animations)

React Icons (Icons)

Tailwind CSS / CSS Modules (Styling)

Vercel (Hosting)



📦 Installation & Setup

Clone the repo and install dependencies:

# Clone this repository
git clone https://github.com/Ankam592/Dribbble_Search_Animation.git

# Navigate to project folder
cd interactive-search-react

# Install dependencies
npm install

# Start development server
npm start


The app will run on http://localhost:3000/.

📊 Project Structure
src/
 ├── assets/
 │    └── data.json          # Dummy search data
 ├── components/
 │    ├── SearchInput/       # Search bar input
 │    ├── SearchedElement/   # Result card with highlight logic
 │    ├── SkeletonCard/      # Skeleton loader card
 │    ├── Dropdown/          # Settings dropdown with toggles
 │    └── Search/            # Main Search container
 ├── hooks/
 │    └── useItemLength.js   # Custom hook for category counts
 ├── App.js
 └── index.js
