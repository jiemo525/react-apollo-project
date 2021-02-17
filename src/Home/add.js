import React from "react";
import { useMutation, gql } from '@apollo/client';

const HomeAdd = () => {
  const ADD_TODO = gql`
    mutation AddTodo($type: String!) {
      addTodo(type: $type) {
        id
        type
      }
    `;
  const [addTodo, { data }] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      //cache有 readQuery, writeQuery, readFragment, writeFragment and modify方法
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `
            });
            return [...existingTodos, newTodoRef];
          }
        }
      });
    }
  });

  const handleClickAdd = () => {
    addTodo({ variables: { type: input.value } });
  }
 
  return (<div>
    <button onClick={handleClickAdd}>添加</button>
  </div>)
}

export default HomeAdd;