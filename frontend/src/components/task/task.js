import Comment from '../comment/comment';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, fetchTask, deleteComment } from '../../actions/task_actions';
import { fetchList } from '../../actions/list_actions';
import '../../assets/stylesheets/task.scss';

const Task = ({task}) => {

    const [taskStatus, setTaskStatus] = useState(true);

    const currentUser = useSelector(state => state.entities.currentUser);
    const stateComments = useSelector(state => state.entities.tasks.comments);
    const dispatch = useDispatch();

    //initialize state with boolean from prop. Task component will take over from there.
    //fetches task information
    useEffect(() => {
        setTaskStatus(task.status)
        dispatch(fetchTask(task._id))
    },[])


    //toggles task status boolean
    const statusToggle = () => {
        let updateStatus;

        if (task.status === true){
            updateStatus = false
        } else {
            updateStatus = true
        };

        let newUpdate = {
            status: `${updateStatus}`
        };

        dispatch(updateTask(task._id, newUpdate)).then(() => {
            setTaskStatus(updateStatus);
            dispatch(fetchList(currentUser.id));
        });
    }

    //delete comment on buttton click
    const handleCommentDel = (commentId) => {
        console.log('cID',commentId)
        console.log('tID',task._id)
        dispatch(deleteComment(task._id, commentId));
    }

    return(
        <div>
            <div className='taskTitleContainer'>
                <h1>{task.task}</h1>
            </div>
            <div className='descriptStatusContainer'>
                <div className="descriptionContainer">
                    <label>Description:</label>
                    <div>
                        {task.description}
                    </div>
                </div>
                <div className='toggleContainer'>
                    <div>
                        <button type='submit' onClick={() => statusToggle()}>
                            {taskStatus ? 'Reopen' : 'Mark as complete'}
                        </button>
                    </div>
                    <div>
                        {taskStatus ? <div className='finish'>Complete &#10003; </div> : <div className='unfinish'>Incomplete &#10007;</div>}
                    </div>
                </div>
            </div>
            <div>
                {stateComments?.map((comment) => {
                    return(
                        <div key={comment._id}>
                            <div>
                                {comment.comment}
                            </div>
                            <div>
                                <button type='submit' onClick={() => handleCommentDel(comment._id)}>Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Comment task={task} />
        </div>
    )
}

export default Task;