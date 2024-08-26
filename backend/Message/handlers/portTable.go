package handlers

import (
	"errors"
)

type PortTable map[int]Port

func (t PortTable) Add(p Port) (PortTable, error){
    if _, ok := t[p.Number]; ok == true{
        return nil, errors.New("Port already opened")
    }
    t[p.Number] = p
    return t, nil
}

func (t PortTable) Remove(port int) (PortTable, error) {
    if _, ok := t[port]; ok == true {
        delete(t, port)
        return t, nil
    }
    return nil, errors.New("Port not found for deletion")
}

func (t PortTable) Get(port int) (Port, error){
    if val, ok := t[port]; ok == true {
        return val, nil
    }
    return Port{}, errors.New("Port not found")
}

func (t PortTable) GetAll() []Port{
    var res []Port
    for _, val := range t{
        res = append(res, val)
    }
    return res
}

func (t PortTable) GetAllNumbers() []int{
    var res []int
    for _, val := range t{
        res = append(res, val.Number)
    }
    return res
}
