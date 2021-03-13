import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postTask } from '../../actions/task_actions';

import '../../assets/stylesheets/task.css';

const TaskForm = (props) => {

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');

    //create list
    const submitTask = (e) => {
        e.preventDefault();

        let newTask = {
            list: props.list._id,
            task: task
        };

        // if(task === ""){
        //     alert('Please provide a Task title');
        // }else{
        //     dispatch(postTask(newTask)).then((res) => {
        //         // dispatch(fetchList(currentUser.id));
        //         setTask('');
        //     });
        // }
        console.log(newTask);
    }

    return(
        <div>
            <form onSubmit={submitTask} className='taskForm'>
                <div className='taskInputContainer'>
                    <label className='taskInput'>Task title:
                        <input type='text' value={task} onChange={e => setTask(e.target.value)} />
                    </label>
                    <label className='taskInput'>Description:
                        <input type='text' value={description} onChange={e => setDescription(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label className="taskSubmitContainer">
                        <input type='submit' className="submitTaskButton" value='Add Task'/>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;