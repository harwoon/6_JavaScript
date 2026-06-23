const todoInput = document.getElementById("todoInput")
const addBtn = document.getElementById("addBtn")
const todoList = document.getElementById("todoList")
const remainingCount = document.getElementById("remainingCount")
const totalCount = document.getElementById("totalCount")

// 상태를 메모리에만 저장(새로고침하면 사라짐)
const todos = []

function render() {
    todoList.innerHTML = "" //li태그를 비워줌
    // [{text:"아침식사", done: false},{text:"운동하기", done: false},...]

    todos.forEach((todo, index) => { //인덱스를 같이 가져올 수 있음
        const li = document.createElement("li") //<li><li>

        if (todo.done) li.classList.add("done") //완료된 항목은 li에 class항목을 만들어 done이라고 넣어줌
        // <li class=done>운동하기</li>

        const left = document.createElement("div") //<div></div>
        left.className = "left" // <div class="left"></div>

        const checkbox = document.createElement("input") // <input></input>
        checkbox.type = "checkbox" // <input type="checkbox"></input>
        checkbox.checked = todo.done // done이 true,false인 값이 각각 들어감
        //<input type="checkbox" checked="true"></input>
        checkbox.addEventListener("change",()=>{
            todo.done = checkbox.checked
            render() //체크된 값으로 화면 갱신
        })

        const text = document.createElement("span") //<span></span>
        text.className = "todo-text" // <span class="todo-text"></span>
        text.textContent = todo.text // <span class="todo-text">아침식사</span>

        const delBtn = document.createElement("button") //<button></button>
        delBtn.type = "button" //<button type="button"></button>
        delBtn.className = "delete-btn"
        delBtn.textContent = "삭제" // <button type="button">삭제</button>
        delBtn.addEventListener("click",()=>{
            todos.splice(index, 1) //현재 forEach로 하나씩 인덱스와 함께 가져와서, 그 인덱스를 이용해서 해당 내용을 지울 수 있음
            render()
        })

        left.appendChild(checkbox)
        left.appendChild(text)
        left.appendChild(delBtn)

        li.appendChild(left)
        todoList.appendChild(li)
    })
    updateCounts()
}
function updateCounts(){
    const total = todos.length
    const remaining = todos.filter((t) => !t.done).length
    remainingCount.textContent = String(remaining)
    totalCount.textContent = String(total)

    // totalCount.textContent = todos.length

    // let cnt = 0
    // todos.forEach((todo) => {
    //     if(todo['done']){
    //         cnt++
    //     }
    // })

    // remainingCount.textContent = todos.length - cnt
}

function addTodo() {
    const text = todoInput.value.trim()
    //들어오면 안되는 값을 먼저 튕겨내는 것이 좋음(가독성,성능)

    if (!text) return //입력값 비어있으면 리턴.

    todos.push({ text, done: false }) //배열에 객체를 저장.
    // js 특징으로 키값이 변수명과 같으면 키 생략해도 됨.
    //todos.push({ text : text, done: false }) 와 동일
    todoInput.value = ""
    todoInput.focus()

    //화면 그리기
    render()
}

addBtn.addEventListener("click", addTodo) //콜백으로 등록

todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo()
})

render() //한 번은 무조건 실행되도록. 그냥 실행되게