# 🌾 AgroBridge

### AI-Powered Market Intelligence & Price Discovery for Farmers

> **Right Market. Right Buyer. Right Time. Better Realization.**

AgroBridge is an AI-powered agricultural market intelligence platform
designed to help farmers make better selling decisions by bringing
**market prices, demand, buyer opportunities, crop quality, logistics,
and AI-driven recommendations** into one simple platform.

Built for **Smart India Hackathon 2026 --- SIH26132**.

------------------------------------------------------------------------

## 🚜 The Problem

Farmers often face fragmented and incomplete information when selling
their produce:

-   Limited access to transparent, localized market prices
-   Difficulty identifying the best market for a crop
-   Low visibility into buyer demand and requirements
-   Uncertainty about whether to **sell now or wait**
-   Transportation costs reducing actual earnings
-   Difficulty comparing multiple buyer offers
-   Limited visibility into buyer reliability
-   Crop-quality differences affecting final prices
-   Market, buyer, quality, and logistics information spread across
    different sources

The result is a simple but important problem:

> **A farmer may know the market price without knowing their best
> available selling opportunity.**

------------------------------------------------------------------------

# 💡 Our Solution

AgroBridge is designed as a **farmer decision engine --- not just
another marketplace.**

Instead of only answering:

> **"What is today's market price?"**

AgroBridge aims to answer:

> **"Where should I sell, which buyer should I choose, when should I
> sell, and how much can I actually realize after costs?"**

### The AgroBridge Journey

``` text
🌾 Crop
   ↓
📊 Market Intelligence
   ↓
🧠 AI Fair Price
   ↓
📈 Sell / Wait Recommendation
   ↓
🏪 Buyer Matching
   ↓
💰 Offer Comparison
   ↓
🧮 Best Net Realization
   ↓
🚚 Logistics
   ↓
💳 Transaction & Payment
```

------------------------------------------------------------------------

# ⭐ Key Features

## 🧠 AgroBridge Opportunity Engine™

The core decision-support layer combines multiple signals to identify
promising selling opportunities.

It considers:

-   Current market prices
-   Historical price trends
-   Buyer demand
-   Crop quality
-   Buyer requirements
-   Distance
-   Transportation cost
-   Buyer trust
-   Expected realization

These signals can be translated into a simple **Opportunity Score**,
helping farmers compare complex choices more easily.

------------------------------------------------------------------------

## 💰 AI Fair Price

AgroBridge aims to estimate a reasonable price range for a crop using
available market information, historical trends, demand, and quality
signals.

``` text
Current Market Price
        +
Historical Trends
        +
Demand
        +
Crop Quality
        ↓
AI Fair Price Range
```

This helps farmers understand whether an offer appears attractive
compared with the expected market value.

------------------------------------------------------------------------

## 📈 Sell or Wait Recommendation

AgroBridge converts market signals into a simple decision:

🟢 **SELL** --- Current conditions may be favorable.

🟡 **WAIT** --- Monitoring the market may provide a better opportunity.

The objective is not to overwhelm farmers with charts, but to turn
market intelligence into an understandable action.

------------------------------------------------------------------------

## 🏪 Smart Buyer Matching

Farmers can discover relevant buyers based on:

-   Crop
-   Quantity
-   Quality
-   Location
-   Buyer requirements
-   Expected price

This helps connect each farmer with buyers whose requirements better
match their available produce.

------------------------------------------------------------------------

## 🤝 Buyer Trust & Verification

AgroBridge is designed to make buyer information more transparent
through indicators such as:

-   Verification status
-   Transaction history
-   Reliability indicators
-   Offer history
-   Buyer requirements

The goal is to help farmers make decisions using more than just the
quoted price.

------------------------------------------------------------------------

## 🧮 Best Net Realization

**The highest offer is not always the most profitable option.**

For example:

  Buyer        Offer   Transport   Net Realization
  --------- -------- ----------- -----------------
  Buyer A     ₹2,500        ₹400        **₹2,100**
  Buyer B     ₹2,350        ₹100        **₹2,250**

Even though Buyer A offers more, Buyer B produces the better outcome
after transportation costs.

### Core Metric

``` text
Best Net Realization
= Expected Sale Value − Associated Costs
```

AgroBridge therefore focuses on **what the farmer can actually
realize**, rather than simply displaying the highest quoted price.

------------------------------------------------------------------------

## 🚚 Smart Logistics

Transportation can significantly affect the economics of a sale.

AgroBridge aims to connect selling opportunities with logistics
information such as:

-   Distance
-   Estimated transportation cost
-   Suitable transport options
-   Shared transportation opportunities
-   Delivery planning

This allows farmers to evaluate the **complete economics of a sale**.

------------------------------------------------------------------------

## 🗺️ Market Intelligence

AgroBridge brings important market information into one place.

Potential insights include:

-   Market prices
-   Price trends
-   Buyer demand
-   Arrival volumes
-   Nearby markets
-   Crop-specific opportunities

------------------------------------------------------------------------

## 💬 AI Selling Copilot

The AI assistant is designed as a **contextual agricultural selling
companion**, rather than a generic chatbot.

Example questions:

``` text
“What is the best market for my tomatoes?”

“Should I sell today?”

“Which buyer gives me the best realization?”

“Why is this offer better?”

“What should I do next?”
```

The Copilot can guide farmers toward relevant AgroBridge features and
decisions.

------------------------------------------------------------------------

# 🖥️ Platform Modules

  Module                   Purpose
  ------------------------ ----------------------------------------------
  🏠 Dashboard             Overview of crops, real government feeds and opportunities
  📊 Market Intelligence   Explore data.gov.in / Agmarknet live rates & TFT multi-horizon forecasts
  🏛️ Govt Schemes          Discover & check eligibility for Maharashtra schemes (Karjmukti, Namo Shetkari, MahaDBT)
  🧬 Digital Twin          Virtual farm simulation (soil chemistry, Kanda Chawl storage, liquidity)
  📦 Farm-to-Fork          Consumer QR provenance tracking from farm field to retail shelf
  🌾 My Crops              Manage crops and available produce
  🧠 Opportunity Engine    Identify promising selling opportunities & fair price
  🏪 Marketplace           Discover verified buyers and offers
  🔬 Quality Check         Capture & evaluate crop quality with blockchain certificate hash
  🚚 Logistics             Hyper-local shared truck pooling saving 40-60% freight
  💳 Transactions          Blockchain smart contract ledger with 2.1-day automated settlement
  💬 MahaVISTAAR AI        Contextual agricultural copilot in Marathi, Hindi, and English
  🏆 SIH & Govt Showcase   Maharashtra Government alignment, roadmap, DPDP Act compliance & live demo presets
  🆘 Support               Access help and grievance assistance
  👨‍🌾 Profile               Manage farmer information and landholding

------------------------------------------------------------------------

# 🎯 Target Users

### 👨‍🌾 Farmers

Discover better markets, buyers and selling opportunities.

### 🏢 Farmer Producer Organizations (FPOs)

Aggregate produce and improve collective market access.

### 🏪 Buyers

Discover relevant agricultural produce from farmers and FPOs.

### 🚚 Logistics Providers

Connect transportation with agricultural selling opportunities.

### 🏛️ Agricultural Ecosystem

Improve transparency, connectivity and market efficiency.

------------------------------------------------------------------------

# 🏗️ System Architecture

``` text
                         ┌─────────────────┐
                         │     FARMER      │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │    AgroBridge Frontend  │
                    │       React + Vite      │
                    └────────────┬────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      AgroBridge API     │
                    │         FastAPI          │
                    ├─────────────────────────┤
                    │ Authentication           │
                    │ Market Intelligence      │
                    │ AI Predictions            │
                    │ Buyer Matching            │
                    │ Transactions              │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
       ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
       │  Database   │    │   AI / ML   │    │ Market Data │
       └─────────────┘    └─────────────┘    └─────────────┘
```

------------------------------------------------------------------------

# 🛠️ Technology Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Framer Motion
-   Lucide React
-   Recharts
-   React Router
-   Axios

### Backend

-   Python
-   FastAPI
-   REST APIs

### AI / ML

-   Python
-   Machine Learning
-   Market prediction
-   Opportunity scoring
-   AI-assisted recommendations

### Database

-   SQLite for development
-   Designed with future scalability in mind

------------------------------------------------------------------------

# 📁 Project Structure

``` text
AgroBridge/
│
├── backend/
│   ├── api/
│   │   ├── chatbot.py
│   │   └── predictions.py
│   │
│   ├── db/
│   │   ├── database.py
│   │   └── models.py
│   │
│   ├── ml/
│   │   ├── predict.py
│   │   └── train.py
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── package-lock.json
```

------------------------------------------------------------------------

# 🚀 Getting Started

## Prerequisites

Make sure you have:

-   **Node.js 18+**
-   **npm**
-   **Python 3.10+**
-   **Git**

------------------------------------------------------------------------

## 1. Clone the Repository

``` bash
git clone https://github.com/harshm13/AgroBridge-SIH26132.git
cd AgroBridge-SIH26132
```

------------------------------------------------------------------------

## 2. Frontend Setup

``` bash
cd frontend
npm install
npm run dev
```

The frontend normally runs at:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## 3. Backend Setup

From the project root:

``` bash
cd backend
python -m venv venv
```

### Linux / macOS

``` bash
source venv/bin/activate
```

### Windows

``` bash
venv\Scripts\activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Start the API:

``` bash
uvicorn main:app --reload
```

The backend normally runs at:

``` text
http://localhost:8000
```

------------------------------------------------------------------------

# 🔐 Environment Variables

Create a local environment file:

``` text
backend/.env
```

Keep secrets and API keys out of Git.

> **Never commit `.env` files, passwords, tokens, or API keys to
> GitHub.**

Use `.env.example` as the template whenever available.

------------------------------------------------------------------------

# 🗺️ Development Roadmap

``` text
Phase 1
Frontend Foundation
        ↓
Phase 2
Market Intelligence
        ↓
Phase 3
Opportunity Engine
        ↓
Phase 4
Buyer Matching
        ↓
Phase 5
Smart Logistics
        ↓
Phase 6
AI Selling Copilot
        ↓
Phase 7
Transactions & Trust
        ↓
Phase 8
FPO & Multilingual Expansion
```

------------------------------------------------------------------------

# 🌱 Future Scope

## 📱 Farmer-First Mobile Experience

A lightweight experience optimized for smartphones and rural
connectivity.

## 🌐 Multilingual Support

Planned support for:

-   Marathi
-   Hindi
-   English
-   Additional regional languages

## 📶 Low-Connectivity Experience

Important market and opportunity information should remain accessible
even with limited connectivity.

## 👥 FPO Aggregation

Enable FPOs to aggregate produce from multiple farmers and explore
collective selling opportunities.

## 🔔 Smart Alerts

Notifications for:

-   Price changes
-   New buyer opportunities
-   Demand changes
-   Recommended selling windows
-   Offer updates

## 📍 Opportunity Map

A geographical view of markets, buyers, demand and logistics
opportunities.

## 📊 Farmer Impact Analytics

Track potential impact through:

-   Improved realization
-   Transportation savings
-   Successful transactions
-   Buyer reliability
-   Market reach

------------------------------------------------------------------------

# 🏆 Smart India Hackathon 2026

**Problem Statement:** SIH26132

**Theme:** Agriculture, FoodTech & Rural Development

**Focus:** Strengthening market linkages and price discovery for farmers

AgroBridge is built around a simple principle:

> **Farmers need more than market prices. They need actionable
> intelligence to make better selling decisions.**

------------------------------------------------------------------------

# 💡 What Makes AgroBridge Different?

Traditional market platforms may answer:

> **"What is today's market price?"**

AgroBridge aims to answer:

> **"Considering price, demand, quality, buyer reliability, distance and
> logistics, what is my best selling opportunity?"**

### The Key Shift

``` text
PRICE DISPLAY
      ↓
MARKET INFORMATION
      ↓
DECISION INTELLIGENCE
      ↓
ACTIONABLE SELLING OPPORTUNITY
```

AgroBridge focuses on the decision that matters most:

> **How can a farmer make the best possible selling decision with the
> information available?**

------------------------------------------------------------------------

# 🌍 Impact

AgroBridge aims to contribute toward:

-   Better price discovery
-   Improved farmer realization
-   More transparent buyer relationships
-   Lower transaction and logistics costs
-   Better market connectivity
-   Stronger FPO participation
-   More informed selling decisions
-   Reduced dependence on fragmented market information

------------------------------------------------------------------------

# 🔭 Vision

We envision an agricultural ecosystem where farmers can make selling
decisions using **transparent, understandable and actionable
information**.

> **Every farmer should know the value of their produce, understand
> their options, and have the information needed to choose the best
> selling opportunity.**

------------------------------------------------------------------------

# 👨‍💻 Team

## Team TerminalStack 🇮🇳

Built with ❤️ for **Smart India Hackathon 2026**.

------------------------------------------------------------------------

# 📜 License

This project is developed for **educational, research and hackathon
purposes**.

------------------------------------------------------------------------

::: {align="center"}
## 🌾 AgroBridge

### Right Market • Right Buyer • Right Time • Better Realization

**Built for Smart India Hackathon 2026 🇮🇳**
:::
