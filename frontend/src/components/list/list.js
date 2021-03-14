import React, {useState, useEffect, useRef} from 'react';
import NavBar from '../nav/navbar';
import TaskForm from '../task/task_form';
import '../../assets/stylesheets/list.css';

import { useSelector, useDispatch } from 'react-redux';
import { postList, fetchList, updateList, deleteList, clearLists } from '../../actions/list_actions';


const List = (props) => {

    const [list, setList] = useState('');
    const [task, setTask] = useState(false);
    //!! const taskContainer = userRef(inputRef.current.focus());
    const didUpdate = useRef(false);
    const allLists = useSelector(state => state.entities.lists);
    const currentUser = useSelector(state => state.entities.currentUser);
    const dispatch = useDispatch();

    //componentDidMount and componentDidUpdate
    useEffect(() => {
        dispatch(fetchList(currentUser.id))
        didUpdate.current = false;
        setTask(false);
    }, [task]);


    // componentWillUnmount list on logout
    useEffect(() => {
        dispatch(clearLists())
    },[]);


    //create list
    const submitList = (e) => {
        e.preventDefault();

        let newList = {
            user: currentUser.id,
            list: list
        };

        if(list === ""){
            alert('Please provide a List title');
        }else{
            dispatch(postList(newList)).then((res) => {
                dispatch(fetchList(currentUser.id));
                setList('');
            });
        }
    }

    //deleting a list
    const removeList = (listId) => {
        dispatch(deleteList(listId)).then(()=>{
            dispatch(fetchList(currentUser.id));
        })

    }

    //!! const scrollToBottom = () => {
    //     let elmnt = document.getElementById("end_contact");
    //     elmnt.scrollIntoView({
    //         behavior: 'smooth'
    //     });
    // };

    return(
        <div className='listContainer'>
            <NavBar />
            <div>
                <form onSubmit={submitList} className='listForm'>
                    <div>
                        <label className='listInput'>
                            Add a List:
                            <input type='text' value={list} onChange={e => setList(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="ques_button_err">
                            <input type='submit' className="submit-question-button" value='Save'/>
                        </label>
                    </div>
                </form>



            </div>
            {allLists.length ? 
                <div>
                    <ul className='allListContainer'>
                        {allLists.map((list) => (
                            <li key={list._id} className='listContainer'>
                                <div className='listItem'>
                                    <div className='listHeadContainer'>
                                        <div className='listIndvTitle'>
                                            {list.list}
                                        </div>
                                        {/* <input type='submit' value='Edit' onClick={setEditSec(true)} /> */}
                                        <div className='listBtn'>
                                            <input type='submit' value='Edit' className='listEditBtn' onClick={() => console.log('edit')} />
                                            <input type='submit' value='Delete' className='listDeleteBtn' onClick={() => removeList(list._id)} />
                                        </div>
                                    </div>

                                    <div className='taskContainer' useRef={taskScroll}>
                                        {list.tasks.map((task) => {
                                            return (
                                                <div key={task._id} className='taskIndvTitle'>
                                                    {task.task}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                
                                <div>
                                    <TaskForm list={list} currentUser={currentUser} onChange={setTask}/>
                                </div>

                            </li>
                        ))} 
                    </ul>
                </div>
                
            :
                <div></div>
            }


        </div>
    )
}

export default List;