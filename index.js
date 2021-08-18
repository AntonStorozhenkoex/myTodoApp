(() => {
    let todosArray = []

    function createMyTodo() {
        const workSpace = document.getElementById('myApp')
        const todoListContainer = document.createElement('div')
        const header = document.createElement('h2')
        const todoForm = document.createElement('form')
        const formInput = document.createElement('input')
        const formBtn = document.createElement('button')
        const footer = document.createElement('div')
        const clearBtn = document.createElement('button')
        const stateDoneTrue = document.createElement('input')
        const stateDoneFalse = document.createElement('input')
        const stateAll = document.createElement('input')
        const stateDoneTrueContainer = document.createElement('div')
        const stateDoneFalseContainer = document.createElement('div')
        const stateAllContainer = document.createElement('div')
        const stateAllText = document.createElement('label')
        const stateTrueText =document.createElement('label')
        const stateFalseText = document.createElement('label')
        stateAll.type = 'radio'
        stateAll.name = 'radio_btn'
        stateDoneFalse.type = 'radio'
        stateDoneFalse.name = 'radio_btn'
        stateDoneTrue.type = 'radio'
        stateDoneTrue.name = 'radio_btn'
        header.innerText = 'ToDos'
        formBtn.innerText = 'Add'
        clearBtn.innerText = 'Clear'
        stateAll.checked = true




        stateAll.id = 'stateAll'
        stateDoneTrue.id = 'stateTrue'
        stateDoneFalse.id = 'stateFalse'
        console.log(stateAllText)
        stateAllText.setAttribute('for','stateAll')
        stateTrueText.setAttribute('for','stateTrue')
        stateFalseText.setAttribute('for','stateFalse')


        stateAllText.innerText = 'All'
        stateTrueText.innerText = 'Completed'
        stateFalseText.innerText = 'Progress '

        stateAll.classList.add('stateRadio')
        stateDoneTrue.classList.add('stateRadio')
        stateDoneFalse.classList.add('stateRadio')
        clearBtn.classList.add('clearBtn')
        stateTrueText.classList.add('stateAllText')
        stateTrueText.classList.add('stateAllText')
        stateAll.classList.add('stateRadioAll')
        stateFalseText.classList.add('stateAllText')
        workSpace.classList.add('myApp')
        stateAllText.classList.add('stateAllText')
        todoListContainer.classList.add('todoContainer')
        header.classList.add('todoHeader')
        todoForm.classList.add('form')
        formInput.classList.add('input')
        stateAllText.classList.add('stateChange')
        formBtn.classList.add('btn')
        footer.classList.add('footer')
        stateAllContainer.classList.add('stateContainer')
        stateDoneTrueContainer.classList.add('stateContainer')
        stateDoneFalseContainer.classList.add('stateContainer')
        stateAll.classList.add('input-radio')
        workSpace.append(todoListContainer)
        todoListContainer.append(header)
        todoListContainer.append(todoForm)
        todoListContainer.append(footer)
        footer.append(clearBtn)
        stateAllContainer.append(stateAllText)
        stateDoneTrueContainer.append(stateTrueText)
        stateDoneFalseContainer.append(stateFalseText)
        footer.append(stateAllContainer)
        footer.append(stateDoneTrueContainer)
        footer.append(stateDoneFalseContainer)
        stateDoneFalseContainer.append(stateDoneFalse)
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
            stateDoneFalse,
            stateDoneTrueContainer,
            stateDoneFalseContainer,
            stateAllContainer,
            stateAllText,
            stateTrueText,
            stateFalseText
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
                    oldTodo.todoItemText.classList.toggle('completed')
                }
                oldTodo.todoItem.addEventListener('click', () => {
                    oldTodo.todoItemText.classList.toggle('completed')
                    todosArray[i].isDone = !(todosArray[i].isDone)
                    localStorageEdit()
                })

                oldTodo.buttonDelete.addEventListener('click', () => {
                    console.log(todosArray)
                    oldTodo.todoItem.remove()
                    todosArray.splice(i, 1)
                    localStorageEdit()
                })
            }
        }

        todoForm.clearBtn.addEventListener('click', () => {
            while (todoList.lastChild){
                todoList.removeChild(todoList.firstChild)
            }
            todosArray = []
            localStorageEdit()
        })



        todoForm.todoForm.addEventListener('submit', (e) => {
            e.preventDefault()
            if (todoForm.formInput.value) {
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
                    newTodo.todoItemText.classList.toggle('completed')
                    for (let i in todosArray) {
                        if (todosArray[i].name === newTodo.todoItemText.innerText) {
                            todosArray[i].isDone = !(todosArray[i].isDone)
                            localStorageEdit()
                        }
                    }
                })
                todoForm.formInput.value = ''
            }else{
                alert('Введите значение в строку')
            }
        })
        todoForm.stateAll.addEventListener('change', () => {
            let allTodos = Array.from(document.querySelectorAll('.listItem'))
            for (let k in allTodos) {
                allTodos[k].classList.remove('dispayNone')
            }
            todoForm.stateAllText.classList.add('stateChange')
            todoForm.stateFalseText.classList.remove('stateChange')
            todoForm.stateTrueText.classList.remove('stateChange')

        })
        todoForm.stateDoneTrue.addEventListener('change', () => {
            let allTodos = Array.from(document.querySelectorAll('.listItem'))
            for (let k in allTodos) {
                if (!allTodos[k].firstChild.classList.contains('completed')) {
                    allTodos[k].classList.add('dispayNone')
                }
                if (allTodos[k].firstChild.classList.contains('completed')) {
                    allTodos[k].classList.remove('dispayNone')
                }
                todoForm.stateAllText.classList.remove('stateChange')
                todoForm.stateFalseText.classList.remove('stateChange')
                todoForm.stateTrueText.classList.add('stateChange')
            }
        })
        todoForm.stateDoneFalse.addEventListener('change', () => {
            let allTodos = Array.from(document.querySelectorAll('.listItem'))
            for (let k in allTodos) {
                if (allTodos[k].firstChild.classList.contains('completed')) {
                    allTodos[k].classList.add('dispayNone')
                }
                if (!allTodos[k].firstChild.classList.contains('completed')) {
                    allTodos[k].classList.remove('dispayNone')
                }
                todoForm.stateAllText.classList.remove('stateChange')
                todoForm.stateFalseText.classList.add('stateChange')
                todoForm.stateTrueText.classList.remove('stateChange')
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

        todoItem.classList.add('listItem')
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