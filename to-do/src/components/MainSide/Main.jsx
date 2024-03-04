import icon from '../../images/Plus_Math.svg'
import iconka from '../../images/Icon.svg'
import iconka_done from '../../images/Done=True.svg'
import icon_more from '../../images/IconMenu.svg'
import { useEffect, useState } from 'react';
import './main.css'
import Modal from '../Modal/Modal'
import MoveToTrash from '../MoveToTrash/MoveToTrash'
import Trash from '../Trash/Trash';


export default function Main(){
    const [todoNew, setTodoNew] = useState('')
    const [isModalOpen, setModalOpen] = useState(false)
    const [filteredStatus, setfilteredStatus] = useState('todo')
    const [showMoveToTrash, setShowMoveToTrash] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    const [activeButton, setActiveButton] = useState('todo')

    const saveTodosToLocalStorage = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };


    const openModal = () => {
        setModalOpen((prevState)=>!prevState)
    }


    const handleButtonClick = (btnName)=>{
        setActiveButton(btnName)
        setfilteredStatus(btnName)
    }

    const [todo, setTodo] = useState(()=> {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos) : [{
                id:Date.now(),
                title:'My first todo',
                status: 'todo'
        }]
    })

    useEffect(() => {
        saveTodosToLocalStorage(todo)
    }, [todo])
    const addTodo = () => {
        if(!todoNew.trim()){
            return;
          }
        const newTodoItem = {
            id:Date.now(),
            title:todoNew,
            status:'todo'
        }

        const updatedTodos = [...todo, newTodoItem];
        setTodo(updatedTodos);
        saveTodosToLocalStorage(updatedTodos);
        setTodoNew('')
        closeModal()
    }
    
    const moveToTrash = (id) => {
        setTodo(prevTodos => prevTodos.map(todo => 
            todo.id === id ? { ...todo, status: 'trash' } : todo
        ));
        closeMoveToTrash()
    };

    const makeTodoDone = (idx)=>{
        const newTodos = todo.map((item) => {
            if (item.id === idx) {
                return {...item, status: item.status === 'todo' ? 'done' : 'todo'};
            }
            return item;
        });
        setTodo(newTodos);
    }

    const closeModal = () => {
        setModalOpen(false)
      }

    const closeMoveToTrash = () => {
        setShowMoveToTrash(false)
    }
    const closeTrash = () => {
        setShowTrash(false)
    }

    const handleIconMoreClick = (id) => {

        if(activeButton==='trash') {
            
            setShowTrash(!showTrash)
            setShowMoveToTrash(false);
        }
        else{
            setShowMoveToTrash(!showMoveToTrash)
            setShowTrash(false)
        }
        setCurrentTaskId(id);
    }

    const onDeleteForever = (id) => {
        setTodo(prevTodos => prevTodos.filter(todo => todo.id !== id));
        closeTrash()
    };

    const onRestore = (id) => {
        setTodo(prevTodos => prevTodos.map(todo => 
            todo.id === id ? { ...todo, status: 'todo' } : todo
        ));
        closeTrash()
    };

    const filteredTodos = todo.filter((task)=>{
        if(filteredStatus === 'todo' && task.status === 'todo') return task
        if(filteredStatus === 'done' && task.status === 'done') return task
        if(filteredStatus === 'trash' && task.status === 'trash') return task
      })

    return (
        <div className="container">
            <div className="title_div">
                <div className="title">Simple To Do List</div>
                <div className="description">Today is awesome day. The weather is awesome, you are awesome too!</div>
            </div>
            <div className='btns'>
                <div className='block_btn'>
                    <button 
                        className={`btn ${activeButton === 'todo' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('todo')}
                        >To Do</button>
                    <button 
                        className={`btn ${activeButton === 'done' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('done')}
                    >Done</button>
                    <button 
                        className={`btn ${activeButton === 'trash' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('trash')}
                    >Trash</button>
                </div>
                {isModalOpen && <Modal addTodo={addTodo} todoNew={todoNew} setTodoNew={setTodoNew} />}
                <div className='btn_plus_div'>
                    <button className='btn_plus' onClick={openModal}>
                        <img src={icon} alt="iconka"/>
                    </button>
                </div>
            </div>
            <div className='second_section'>
                <div className='title_2'>
                    {activeButton === 'todo' && 'To Do'}
                    {activeButton === 'done' && 'Done'}
                    {activeButton === 'trash' && 'Trash'}
                </div>
                <div className='divider'></div>
            </div>

            <div className='item_list'>
                {filteredTodos.map((item, idx)=>(
                    <div className={`first_item ${item.status==='done' ? 'done' : ''}`}>
                        <div onClick={()=>handleIconMoreClick(item.id)}><img src={icon_more} alt="" /></div>
                        <div onClick={() => makeTodoDone(item.id)}><img src={item.status === 'done' ? iconka_done : iconka} alt="" /></div>
                        <div className='title_item' style={{ textDecoration: item.status === 'done' ? 'line-through' : 'none' }} >{item.title}</div>
                    </div>
                ))}
                
            </div>
            {showMoveToTrash && activeButton !== 'trash' && (
                <MoveToTrash currentTaskId={currentTaskId} onMoveToTrash={moveToTrash} />
            )}
            {showTrash && activeButton === 'trash' && (
                <Trash onDeleteForever={() => onDeleteForever(currentTaskId)} onRestore={() => onRestore(currentTaskId)} />
            )}            
        </div>
    )
}