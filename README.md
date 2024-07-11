# Personal Journaling App (React Native Expo)

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)

## Overview

This is a mobile application built using React Native Expo that allows users to manage their personal journal entries. Users can sign up, log in, create, edit, and delete journal entries, as well as viewing category and summary of their entries over a selected period.

## Features

- User registration and authentication
- Update user profile (names, password and profile picture)
- View,add, edit, and delete journal entries
- Categorize journal entries (e.g., Personal, Work, Travel)
- View a summary of journal entries over a selected period (daily, weekly, monthly)

## Prerequisites

- Node.js (version 14 or higher) installed on your machine
- Yarn or npm package manager installed
- Expo CLI installed globally (`npm install -g expo-cli`)
- Android Studio,Xcode installed or Physical phone (preferably)

## Installation

0. Create project folder:
   ```bash
   cd <project directory>
   mkdir KGGeorge
   cd KGGeorge
   ```
1. Clone the repository:
   ```bash
   git clone https://github.com/GjoeKariuki/shamiri-personal-journaling-apk.git
   cd shamiri-personal-journaling-apk
   ```
2. Install project libraries
   ```
   yarn install
   ```
3. Create a `.env` file in the root directory of the project and add the following environment variables

   ```
   EXPO_PUBLIC_API_URL = `https://entris.cintelcoreams.com`

   ```

4. Build and Run project
   ```
   npx expo start -c
   ```
