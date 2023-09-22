const express = require("express")
const socket = require("socket.io")

const app = express()
app.get("/",(req,res)=>{
    res.send({msg:"This is the data for / routing"})
})
const server = app.listen(8000,()=>{
    console.log("Server is live on port no. 8000")
})

const io = socket(server,{
            cors:{
                origin:"*"
            }
})

const arr = []

io.on("connection",(client)=>{
    client.on("Username",(data)=>{
        const Data = {
            ClientId : client.id,
            User : data
        }
        arr.push(Data)
        client.broadcast.emit("TotalMembers",arr)
        // client.join("Hrep")
        // client.on("VERIFY",(data)=>{
        //     const Temp = {
        //         msg:data,
        //         ClientId: client.id
        //     }
        //     io.to("Hrep").emit("MessageToAll",Temp)
        // })
    })
    client.on("VERIFY",(data)=>{
        client.broadcast.emit("SENDTOUSER",data)
    })
})