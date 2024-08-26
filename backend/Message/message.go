package main

import (
	"context"
	"fmt"
	"log"
	"message/handlers"

	"github.com/gin-gonic/gin"
)

type Msg struct{
    Port int `json:"port"`
    Payload string `json:"payload"`
}

type CloseMsg struct{
    Port int `json:"port"`
}

type contextKey string

func main(){
    table := make(handlers.PortTable)

    router := gin.Default()
    router.Use(func(c *gin.Context) {
        ctx := context.WithValue(c.Request.Context(), contextKey("portTable"), table)
        c.Request = c.Request.WithContext(ctx)
        c.Next()
    })

    router.GET("", testing)
    router.POST("/message", sendMessage)
    router.GET(("/port"), getPorts)
    router.POST("/port", closePort)

    router.Run(fmt.Sprintf("localhost:%d", 4200))
}

func sendMessage(c *gin.Context){
    var m Msg
    var table handlers.PortTable

    if err := c.BindJSON(&m); err != nil{
        return
    }
    if found := c.Request.Context().Value(contextKey("portTable")); found != nil {
        if t, ok := found.(handlers.PortTable); ok {
            table = t
        } else {
            log.Println("Could not handle context, err: ")
        }
    }
    portChannel := make(chan handlers.Port)
    port, err := table.Get(m.Port)
    //TODO: add required initial init message
    if err != nil {
        go handlers.OpenPort(m.Port, portChannel)
        log.Println("waiting for a Client to connect")
        port = <- portChannel
        table.Add(port)
        c.JSON(200, gin.H{
            "port": port.Number,
            "status": "success",
        })
    }
    log.Println(port)
    go handlers.HandleConnection(port, m.Payload)
}

func closePort(c *gin.Context){
    table := make(handlers.PortTable)
    var Cmsg CloseMsg
    if found := c.Request.Context().Value(contextKey("portTable")); found != nil {
        if t, ok := found.(handlers.PortTable); ok {
            table = t
        } else {
            log.Println("Could not handle context, err: ")
        }
    }
    c.BindJSON(&Cmsg)
    port, err := table.Get(Cmsg.Port)
    if err != nil {
        log.Panic(err)
    }
    err = port.Listener.Close()
    if err != nil {
        c.JSON(500, gin.H{
            "port": Cmsg.Port,
            "status": "fail",
        })
        log.Panic("could not close port ", Cmsg.Port, ", err: ", err)
    }
    err = port.Connection.Close()
    if err != nil{
        c.JSON(500, gin.H{
            "port": Cmsg.Port,
            "status": "fail",
        })
        log.Panic("could not close port ", Cmsg.Port, ", err: ", err)
    }
    table.Remove(Cmsg.Port)
    c.JSON(200, gin.H{
        "port": Cmsg.Port,
        "status": "success",
    })
}

func testing(c *gin.Context){
    if v := c.Request.Context().Value(contextKey("portTable")); v != nil{
        fmt.Println(v)
    }else{
        fmt.Println("value not found")
    }
}

func getPorts(c *gin.Context){
    type portsResponse struct{
        Ports []int `json:"ports"`
    }
    var table handlers.PortTable
    if found := c.Request.Context().Value(contextKey("portTable")); found != nil {
        if t, ok := found.(handlers.PortTable); ok {
            table = t
        } else {
            log.Println("Could not handle context, err: ")
        }
    }
    ports := portsResponse{
        Ports: table.GetAllNumbers(),
    }
    c.JSON(200, ports)
}
