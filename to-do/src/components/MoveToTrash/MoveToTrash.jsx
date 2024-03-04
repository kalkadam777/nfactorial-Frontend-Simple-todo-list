import icon_delete from '../../images/delete.svg'
import './movetotrash.css'
export default function MoveToTrash({onMoveToTrash,currentTaskId}) {
    return (
        <div className='remove_div' onClick={()=>onMoveToTrash(currentTaskId)}>
            <img src={icon_delete} alt="" />
            <div>Move to Trash</div>
        </div>
    )
}