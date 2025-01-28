# PulseGen Assignment
**Assignment for PulseGen**

This project provides a script to fetch filtered reviews from the **Twingly API**.

---

## 🚀 Features

- **Dynamic API URL**  
  Accepts user input for constructing the base URL (e.g., `twingly` part).

- **Customizable Inputs**  
  Allows the user to specify:
  - **Company Name**: For which reviews are to be fetched.
  - **Date Range**: Start and end dates in the format `YYYY-MM-DDTHH:mm:ssZ`.
  - **Source**: Must be entered as `"twingly"`.

---

## 🛠 How to Run

### Step 1: Install Dependencies

Open your terminal and run the following commands to initialize the project and install required dependencies:

```bash
npm init -y
npm install axios express
node fetchReviews.js
```

### Step 2: Install Dependencies

During script execution, you will be prompted to enter the following details:

```bash
Enter the company name: HighRadius
Enter the start date: 2025-01-17T17:30:00Z
Enter the end date: 2025-01-27T17:30:00Z
Enter the Source: twingly

```


