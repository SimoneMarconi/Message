package handlers

import (
	"log"
	"net"

	"github.com/gin-gonic/gin"
)

func HandleConnection(port *Port, msg string){
    data := []byte(msg)
    var conn net.Conn
    if port.Connection == nil{
        log.Println("waiting on port ", port.Number)
        <-port.Channel
        conn = port.Connection
    }else {
        conn = port.Connection
        log.Println(conn)
    }
    // defer conn.Close()
    n, err := conn.Write(data)
    log.Println(n)
    if err != nil {
        log.Panic("Error writing data to the client on port ", port.Number)
    }
    if n != len(data) {
        log.Panic("Could not write all data")
    }
}

func WhatchStatus(p *Port, c *gin.Context){
    for {
        if p.Connection != nil {
            c.JSON(200, gin.H{
                "port": p.Number,
            })
            log.Println("status change")
            return
        }
    }
}
