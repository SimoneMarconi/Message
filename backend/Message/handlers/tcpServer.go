package handlers

import (
	"fmt"
	"log"
	"net"
)

type Port struct {
    Number int
    Listener net.Listener
    // Channel chan net.Conn
    Connection net.Conn
}

func OpenPort(init int, ch chan Port) {
    port := fmt.Sprintf("localhost:%d", init)
    listener, err := net.Listen("tcp", port) 
    if err != nil {
        log.Panic(err)
    }
    p := Port{
        Number: init,
        Listener: listener,
        // Channel: make(chan net.Conn),
        Connection: nil,
    }
    // ch <- p
    log.Println("Opened Port ", init)
    for {
        conn, err := listener.Accept()
        if err != nil {
            log.Panic(err)
        }
        p.Connection = conn
        ch <-p
        // p.Channel <- conn
    }
}
