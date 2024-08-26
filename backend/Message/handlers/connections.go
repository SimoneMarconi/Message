package handlers

import (
	"log"
	"net"
)

func HandleConnection(port Port, msg string){
    data := []byte(msg)
    var conn net.Conn
    if port.Connection == nil{
        log.Println("waiting")
        // conn = <-port.Channel
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
