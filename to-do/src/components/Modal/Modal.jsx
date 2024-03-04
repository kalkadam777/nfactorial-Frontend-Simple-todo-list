import './modal.css'


export default function Modal({todoNew, addTodo,setTodoNew}){
    return (
        <div className='container_modal'>
            <div className='title_todo'>Add New To Do</div>
            <input value={todoNew} onChange={(event)=>{setTodoNew(event.target.value)}} type="text" placeholder="Your text" className="input_text" />
            <button onClick={addTodo} className='add_btn'>Add</button>
        </div>
    )
}