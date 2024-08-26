package main

import (
	"log"
	"net"
	"os"
)

func main() {
    args := os.Args
    if len(args) != 2 {
        log.Fatal("You need to specify the number of the port to connect")
    }
    address := "localhost:" + args[1]
    conn, err := net.Dial("tcp", address)
    defer conn.Close()
    if err != nil {
        log.Panic(err)
    }
    // var msg []byte
    msg := make([]byte, 256)
    for {
        n, _:= conn.Read(msg)
        // if err != nil {
        //     log.Panic(err)
        // }
        if n != 0 {
            log.Println(string(msg))
        }
    }
}
