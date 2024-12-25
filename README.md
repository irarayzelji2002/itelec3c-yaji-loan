<div align="center">
  <img src="https://i.ibb.co/jrRjWWD/logo-with-text-green-bg.png">
</div>

# YAJI Loan: A Modern Loan Management System

**YAJI Loan** is a comprehensive web-based loan management system that streamlines the process of loan applications, payments, and tracking. It provides an intuitive interface for both borrowers and administrators to manage loan transactions efficiently.

## 📚 Table of Contents

1. [Introduction](#-introduction)
2. [Features](#-features)
3. [Installation and Setup](#-installation-and-setup)
4. [Technologies Used](#-technologies-used)
5. [Screenshots & Demo](#-screenshots--demo)
6. [Acknowledgments](#-acknowledgments)

## 📖 Introduction

YAJI Loan is designed to simplify the loan management process by providing a user-friendly platform for loan applications, payment tracking, and account management. The system features robust authentication, real-time loan status updates, and comprehensive reporting capabilities.

## ✨ Features

- **User Authentication & Profile Management**

  - Secure login and registration system
  - Profile customization with image upload
  - Role-based access control

- **Loan Management**

  - Multiple loan type support
  - Detailed loan application form
  - Loan status tracking
  - Payment scheduling and tracking
  - Loan breakdown visualization

- **Payment Processing**

  - Secure payment processing
  - Payment history tracking
  - Real-time balance updates
  - Transaction receipts

- **Dashboard & Reporting**
  - Comprehensive dashboard for loan overview
  - Transaction history
  - Payment schedules
  - Progress tracking with visual indicators

## 💻 Installation and Setup

### ✅ Prerequisites

### 1. Node.js Version

This web app was made with `Node.js v20.16.0`, but you may download the latest LTS version.

**Download Link:** [Node.js LTS](https://nodejs.org/)

### 2. Laravel/PHP/Composer Version

This web app was made with `Laravel Framework 11.30.0`, `PHP 8.3.10`, and `Composer 2.7.7`. Laravel 11.x requires PHP 8.2+ and Composer 2.x.

**Download Links:**

- [PHP](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download/)
- [Laravel](https://laravel.com/docs/10.x)

### ⚙️ Installation

### Step 1: Clone the repository and navigate to the project folder

```bash
git clone https://github.com/irarayzelji2002/itelec3c-yaji-loan.git
cd itelec3c-yaji-loan
```

### Step 2: Install front end and back end depencencies

Install all necessary dependencies and set up the environment:

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

### ▶️ Run the app

This will run the Laravel app in `http://localhost:8080`, and React app in `http://localhost:5173`.

```bash
npm run dev
php artisan serve
```

or you can use this command for simplicity `npm start`.

## 🤖 Technologies Used

- **Front End:** \
   React.js, Inertia.js, Tailwind CSS, Bootstrap

- **Back End:** \
   Laravel, PHP, MySQL

- **UI/UX & Graphics:** \
  [Figma](https://www.figma.com/design/zv3wCInqiP1nDrfRChydc4/loan-app?node-id=0-1&p=f&t=tGd6AxpIkNVTQ4Bw-0)

## 📸 Screenshots & Demo

This section provides an in-depth walkthrough of the system's core features. Each section highlights key functionalities with accompanying visuals to demonstrate their usage and user experience.

### 1. Access, Authentication, and User Dashboard

This section covers how users access and manage their accounts, set notification preferences, and personalize their experience. From registration and login to settings and logout, every step is streamlined for ease of use.

- #### User Authentication Flow

  [GIF/MP4: Landing → Register → Login → Logout → Forgot Password → Login] \
  <img src="" alt="User Authentication Flow"> \
  Overview of how users create accounts, log in, recover passwords, and securely log out.

## 🤗 Acknowledgments

This is a final project presented to the Department of Information Technology, College of Information and Computing Sciences of the University of Santo Tomas for the course ITELEC3C - Web Applications Development Using PHP of Bachelor of Science in Information Technology Specialization in Web and Mobile Development.

This project was a collaborative effort with:

**Proponents:**

- **Jakob Michael M. Palomo** ([JakobPalomo](https://github.com/JakobPalomo)) <<jakobmichael.palomo.cics@ust.edu.ph>>
- **Ira Rayzel S. Ji** ([irarayzelji2002](https://github.com/irarayzelji2002)) <<irarayzel.ji.cics@ust.edu.ph>>
- **Aliah DR. Esteban** ([aliahestbn](https://github.com/aliahestbn)) <<aliah.esteban.cics@ust.edu.ph>>
- **Yna Sophia Del Rosario** ([YnaSophiaDR](https://github.com/YnaSophiaDR)) <<ynasophia.delrosario.cics@ust.edu.ph>>
