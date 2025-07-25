package main

import (
	"bufio"
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
    if err != nil {
        log.Fatal("The port is not open")
    }
    defer conn.Close()
    detect := 0
    for {
        reader := bufio.NewReader(conn)
        line, _, _ := reader.ReadLine()
        if string(line) == ""{
            detect++
        }else{
            detect = 0
        }
        if detect == 5 {
            return
        }
        log.Println(string(line))
    }
}
