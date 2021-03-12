import React, {useState, useEffect} from 'react';
import NavBar from '../nav/navbar';

import { useSelector, useDispatch } from 'react-redux';
import { fetchLists, postList, fetchList, updateList, deleteList } from '../../actions/list_actions';


const List = (props) => {

    const [list, setList] = useState('');
    const allLists = useSelector(state => Object.values(state.entities.lists))
    const currentUser = useSelector(state => state.entities.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(fetchLists())
        dispatch(fetchList(currentUser.id))
    }, []);

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
                dispatch(fetchLists());

            })
        }

    }

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
                        {allLists.map((list) => (
                            <li key={list._id}>
                                {list.list}
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