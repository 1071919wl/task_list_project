import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/stylesheets/task.scss';

import { updateTask } from '../../actions/task_actions';
import { fetchList } from '../../actions/list_actions';

const Task = ({task}) => {

    const [taskStatus, setTaskStatus] = useState(true);
    const currentUser = useSelector(state => state.entities.currentUser);
    const dispatch = useDispatch();

    //initialize state with boolean from prop. Task component will take over from there.
    useEffect(() => {
        setTaskStatus(task.status)
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
        </div>
    )
}

export default Task;