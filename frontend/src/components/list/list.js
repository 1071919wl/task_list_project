import React, {useState, useEffect, useRef} from 'react';
import NavBar from '../nav/navbar';

import { useSelector, useDispatch } from 'react-redux';
import { postList, fetchList, updateList, deleteList } from '../../actions/list_actions';


const List = (props) => {

    const [list, setList] = useState('');
    const didUpdate = useRef(false);
    const allLists = useSelector(state => Object.values(state.entities.lists))
    const currentUser = useSelector(state => state.entities.currentUser)
    const dispatch = useDispatch()

    //componentDidMount
    useEffect(() => {
        dispatch(fetchList(currentUser.id))
        didUpdate.current=false;
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
            didUpdate.current=false
        }
    })

    return(
        <div className='listContainer'>
            <NavBar />
            <div>
                <h1>Add a List:</h1>
                <form onSubmit={submitList}>
                    <input type='text' value={list} onChange={e => setList(e.target.value)} />
                    <div>
                        <input type='submit' value='Save'/>
                    </div>
                </form>
            </div>
            {allLists.length ? 
                <div>
                    <ul>
                        {allLists.map((list, i) => (
                            <li key={i}>
                                {list.list}
                                {/* <input type='submit' value='Edit'  /> */}
                                <input type='submit' value='Delete' onClick={() => removeList(list._id)} />
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