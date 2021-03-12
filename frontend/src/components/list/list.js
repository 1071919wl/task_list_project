import React, {useState, useEffect} from 'react';
import NavBar from '../nav/navbar';

import { useSelector, useDispatch } from 'react-redux';
import { fetchLists, postList, updateList, deleteList } from '../../actions/list_actions';


const List = (props) => {

    const [list, setList] = useState('');
    const allLists = useSelector(state => state.entities.lists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLists())
    }, [])

    return(
        <div>
            <NavBar />
            This is the List Page
            <ul>
                {allLists.map((list, i) => (
                    <li key={i}>
                        {list.list}
                    </li>
                ))} 
            </ul>
        </div>
    )
}

export default List;