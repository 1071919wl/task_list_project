import React, {useState, useEffect} from 'react';
import NavBar from '../nav/navbar';

const Task = ({task}) => {

    // useEffect(() => {
    //     console.log(task)
    // },[])

    return(
        <div>
            {task.task}
            {task.description}
            {task.status ? "Complete" : "Incomplete"}
        </div>
    )
}

export default Task;