import express from "express"
import morgan from "morgan";
import cors from "cors"

const app = express();

app.use(morgan('dev'));

app.use(express.json())

app.use(cors({
    origin: "",
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, access-control-allow-origin',
}));


app.get("/", (req, res ) => {
    res.json({
        message: "Hola al traductor",
    })
})


app.use((req, res)=>{
    res.status(404).json({
        message: "Endpoint not found",
    })
})

export default app;