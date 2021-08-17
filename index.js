(() => {
    let todosArray = []

    function createMyTodo() {
        const workSpace = document.getElementById('my-app')
        const todoListContainer = document.createElement('div')
        const header = document.createElement('h2')
        const todoForm = document.createElement('form')
        const formInput = document.createElement('input')
        const formBtn = document.createElement('button')
        const footer = document.createElement('div')
        const clearBtn = document.createElement('button')
        const stateDoneTrue = document.createElement('input')
        const stateDoneFasle = document.createElement('input')
        const stateAll = document.createElement('input')
        const stateDoneTrueContainer = document.createElement('div')
        const stateDoneFasleContainer = document.createElement('div')
        const stateAllContainer = document.createElement('div')
        stateAll.type = 'radio'
        stateAll.name = 'radio_btn'
        stateDoneFasle.type = 'radio'
        stateDoneFasle.name = 'radio_btn'
        stateDoneTrue.type = 'radio'
        stateDoneTrue.name = 'radio_btn'
        header.innerText = "ToDos"
        formBtn.innerText = "Add"
        clearBtn.innerText = 'Clear'
        stateAll.checked = true



        stateAllContainer.innerText = 'Все дела'
        stateDoneTrueContainer.innerText = 'Выполненные дела'
        stateDoneFasleContainer.innerText = 'В процессе'

        stateAll.classList.add('stateAll')
        clearBtn.classList.add('clearBtn')

        workSpace.classList.add('my-app')
        todoListContainer.classList.add('todoContainer')
        header.classList.add('todoHeader')
        todoForm.classList.add('form')
        formInput.classList.add('input')
        formBtn.classList.add('btn')
        footer.classList.add('footer')

        stateAll.classList.add('input-radio')
        workSpace.append(todoListContainer)
        todoListContainer.append(header)
        todoListContainer.append(todoForm)
        todoListContainer.append(footer)
        footer.append(clearBtn)
        footer.append(stateAllContainer)
        footer.append(stateDoneTrueContainer)
        footer.append(stateDoneFasleContainer)
        stateDoneFasleContainer.append(stateDoneFasle)
        stateDoneTrueContainer.append(stateDoneTrue)
        stateAllContainer.append(stateAll)
        todoForm.append(formInput)
        todoForm.append(formBtn)

        return {
            todoForm,
            formInput,
            formBtn,
            clearBtn,
            stateAll,
            stateDoneTrue,
            stateDoneFasle
        }
    }

    function createTodoList() {
        const todoList = document.createElement('ul')
        todoList.classList.add('list')
        return todoList;
    }

    function createTodoApp() {
        const todoList = createTodoList()
        const todoForm = createMyTodo()

        if (localStorage.length > 0) {
            todosArray = JSON.parse(localStorage.getItem('array'))
            for (let i in todosArray) {
                let oldTodo = createNewTodo(todosArray[i].name)
                todoList.append(oldTodo.todoItem)

                if (todosArray[i].isDone) {
                    oldTodo.todoItemText.classList.toggle('complited')
                }

                oldTodo.buttonDelete.addEventListener('click', () => {
                    oldTodo.todoItem.remove()
                    todosArray.splice(i, 1)
                    localStorageEdit()
                })

                oldTodo.todoItem.addEventListener('click', () => {
                    oldTodo.todoItemText.classList.toggle('complited')
                    todosArray[i].isDone = !(todosArray[i].isDone)
                    localStorageEdit()
                })
            }
        }

        todoForm.clearBtn.addEventListener('click', () => {
            while (todoList.lastChild)
                todoList.removeChild(todoList.firstChild)
        })



        todoForm.todoForm.addEventListener('submit', (e) => {
            if (todoForm.formInput.value) {
                e.preventDefault()
                let newTodo = createNewTodo(todoForm.formInput.value)
                addNewValuetoArray(todoForm.formInput.value)
                localStorageEdit()
                todoList.append(newTodo.todoItem)

                newTodo.buttonDelete.addEventListener('click', () => {
                    for (let k in todosArray) {
                        if (todosArray[k].name === (newTodo.todoItemText.innerText)) {
                            todosArray.splice(k, 1)
                            localStorageEdit()
                        }
                    }
                    newTodo.todoItem.remove()


                })


                newTodo.todoItem.addEventListener('click', () => {
                    newTodo.todoItemText.classList.toggle('complited')
                    for (let i in todosArray) {
                        if (todosArray[i].name === newTodo.todoItemText.innerText) {
                            todosArray[i].isDone = !(todosArray[i].isDone)
                            localStorageEdit()
                        }
                    }
                })
                todoForm.formInput.value = ""
            }
        })
        todoForm.stateAll.addEventListener('change', () => {
            let allTodos = Array.from(document.querySelectorAll('.list-item'))
            for (let k in allTodos) {
                allTodos[k].classList.remove('dispay-none')
            }

        })

        todoForm.stateDoneTrue.addEventListener('change', () => {
            let allTodos = Array.from(document.querySelectorAll('.list-item'))
            for (let k in allTodos) {
                if (!allTodos[k].firstChild.classList.contains('complited')) {
                    allTodos[k].classList.add('dispay-none')
                }
                if (allTodos[k].firstChild.classList.contains('complited')) {
                    allTodos[k].classList.remove('dispay-none')
                }
            }

        })
        todoForm.stateDoneFasle.addEventListener('change', () => {
            let allTodos = Array.from(document.querySelectorAll('.list-item'))
            for (let k in allTodos) {
                if (allTodos[k].firstChild.classList.contains('complited')) {
                    allTodos[k].classList.add('dispay-none')
                }
                if (!allTodos[k].firstChild.classList.contains('complited')) {
                    allTodos[k].classList.remove('dispay-none')
                }
            }
        })
        todoForm.todoForm.append(todoList)
    }


    function createNewTodo(name) {
        let todoItem = document.createElement('li')
        let todoItemText = document.createElement('span')
        const buttonDelete = document.createElement('button')

        todoItemText.innerHTML = name
        buttonDelete.innerText = 'x'

        todoItem.classList.add('list-item')
        buttonDelete.classList.add('deleteBtn')
        todoItem.append(todoItemText)
        todoItem.append(buttonDelete)




        return {
            todoItem,
            buttonDelete,
            todoItemText
        }
    }

    function addNewValuetoArray(name) {
        let obj = new Object()
        obj.name = name
        obj.isDone = false
        todosArray.push(obj)
    }

    function localStorageEdit(array = todosArray) {
        localStorage.setItem('array', JSON.stringify(array))

    }
    document.addEventListener('DOMContentLoaded', createTodoApp)

})()