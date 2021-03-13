import React, {useState, useEffect, useRef} from 'react';
import NavBar from '../nav/navbar';
import '../../assets/stylesheets/list.css';

import { useSelector, useDispatch } from 'react-redux';
import { postList, fetchList, updateList, deleteList } from '../../actions/list_actions';



const List = (props) => {

    const [list, setList] = useState('');
    // const [edit, setEdit] = useState('');
    // const [editSec, setEditSec] = useState(false);
    const didUpdate = useRef(false);
    // const allLists = useSelector(state => Object.values(state.entities.lists))
    const allLists = useSelector(state => state.entities.lists);
    const currentUser = useSelector(state => state.entities.currentUser)
    const dispatch = useDispatch()

    //componentDidMount
    useEffect(() => {
        dispatch(fetchList(currentUser.id))
        didUpdate.current = false;
    }, []);

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

    //delete list
    const removeList = (listId) => {
        dispatch(deleteList(listId));
        didUpdate.current = true;
    }


    //deleting a list and rerendering
    useEffect(() => {
        if(didUpdate.current){
            dispatch(fetchList(currentUser.id));
            didUpdate.current=false;
        }
    })

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
                        {allLists.map((list, i) => (
                            <li key={i} className='listContainer'>
                                <div className='listItem'>
                                    <div>
                                        {list.list}
                                    </div>
                                    {/* <input type='submit' value='Edit' onClick={setEditSec(true)} /> */}
                                    <div>
                                        <input type='submit' value='Edit' onClick={() => console.log('edit')} />
                                        <input type='submit' value='Delete' onClick={() => removeList(list._id)} />
                                    </div>
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