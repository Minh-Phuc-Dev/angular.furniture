const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')


const crossOrigin = process.env.CROSS_ORIGIN
const origin = (crossOrigin?.startsWith("[") && crossOrigin?.endsWith("]")) ? JSON.parse(crossOrigin) : []

app.use(express.json())
app.use(cookieParser())
app.use(
    require('cors')(
        {
            origin,
            credentials: true
        }
    )
)
app.use("/api", require("@routers/index"))



app.use(
    "/public",
    express.static("public")
)


app.use(express.static("dist", {fallthrough:  false}))

app.use(
    (error, request, response, next) => {
        if(error.status === 404){
            response.status(200).sendFile([process.cwd(), "dist", "index.html"].join("/")   )
            return
        }
        response.status(error.status).send(error.message)
    }
)







require("@databases/ModelSynchronized")


module.exports = {
    app
}