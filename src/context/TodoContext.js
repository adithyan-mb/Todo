import { createContext, useContext } from "react";

export const TodoContext =createContext({
    todos:[
        {
            id:1,
            todo:"work",
            completed:false
        }
    ],
    addtodo:(todo)=>{},
    updatetodo:(id,todo)=>{},
    deletetodo:(id)=>{},
    completetoggle:(id)=>{}

});

export const useTodo=()=>{
    return useContext(TodoContext)

}

export const TodoProvider=TodoContext.Provider