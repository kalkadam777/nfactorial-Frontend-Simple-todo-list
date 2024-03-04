import vector_icon from '../../images/galochka.svg'
import icon_delete from '../../images/iconka_musor.svg'
import './trash.css'

export default function Trash({onRestore, onDeleteForever}){
    return (
        <div className='menu_trash'>
            <div className="delete_icon" onClick={onDeleteForever}>
                <img src={icon_delete} alt="" />
                <div>Delete Forever</div>
            </div>
            <div className="vector_icon" onClick={onRestore}>
                <img src={vector_icon}  alt="" />
                <div>Move Back To To Do</div>
            </div>
        </div>
    )
}