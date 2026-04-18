import express, { Application } from "express";
import cors from "cors";
import { surahRoutes } from "./routes/surah.routes";
import { setupSwagger } from "./utils/swagger";

const app: Application = express();

app.use(
  cors({
    origin: ["https://quran-app-frontend-five.vercel.app","http://localhost:3000"] ,
    credentials: true
  })
);
app.use(express.json());

// =============================
// Swagger Setup
// =============================
setupSwagger(app);

// =============================
// Root Route (Dynamic HTML)
// =============================
app.get("/", (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Quran API</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            width: 100%;
            max-width: 900px;
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            backdrop-filter: blur(12px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }

        h1 {
            font-size: 3rem;
            color: #22c55e;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #94a3b8;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }

        .card {
            background: rgba(255,255,255,0.06);
            padding: 25px;
            border-radius: 15px;
            margin-top: 20px;
            text-align: left;
        }

        .card h2 {
            color: #38bdf8;
            margin-bottom: 15px;
        }

        ul {
            list-style: none;
        }

        ul li {
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .badge {
            display: inline-block;
            margin-top: 20px;
            padding: 8px 14px;
            background: #22c55e;
            color: #0f172a;
            border-radius: 999px;
            font-weight: bold;
            font-size: 12px;
        }

        .buttons {
            margin-top: 25px;
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            padding: 12px 20px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s;
        }

        .btn-primary {
            background: #22c55e;
            color: #0f172a;
        }

        .btn-primary:hover {
            background: #16a34a;
        }

        .btn-secondary {
            background: #38bdf8;
            color: #0f172a;
        }

        .btn-secondary:hover {
            background: #0ea5e9;
        }

        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #64748b;
        }

        code {
            background: rgba(255,255,255,0.1);
            padding: 3px 6px;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>📖 Quran API</h1>
        <p class="subtitle">
            A modern REST API built with Node.js + TypeScript + MVC architecture
        </p>


        <div class="buttons">
            <a class="btn btn-primary" href="/api-docs" target="_blank">
                🚀 Open Swagger Docs
            </a>

          
        </div>

      
        <div class="footer">
            Made with ❤️ for Quran Web Application Assignment
        </div>
    </div>
</body>
</html>
    `;

    res.send(html);
});

app.use("/api", surahRoutes);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});