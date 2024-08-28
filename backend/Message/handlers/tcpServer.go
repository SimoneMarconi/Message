package handlers

import (
	"fmt"
	"log"
	"net"

	"github.com/gin-gonic/gin"
)

type Port struct {
    Number int
    Listener net.Listener
    Channel chan bool
    Connection net.Conn
}

func OpenPort(init int, ch chan *Port, c *gin.Context) {
    port := fmt.Sprintf("localhost:%d", init)
    listener, err := net.Listen("tcp", port) 
    if err != nil {
        c.JSON(500, gin.H{
            "port": init,
            "status": "fail",
        })
    }
    p := &Port{
        Number: init,
        Listener: listener,
        Channel: make(chan bool),
        // Channel: make(chan net.Conn),
        Connection: nil,
    }
    ch <- p
    log.Println("listening on ", port)
    conn, err := listener.Accept()
    if err != nil {
        c.JSON(500, gin.H{
            "port": init,
            "status": "fail",
        })
    }
    p.Connection = conn
    // ch <-p
    p.Channel <-true
    c.JSON(200, gin.H{
        "port": init,
        "status": "success",
    })
}
