import React, {useState, useEffect} from 'react';


const ListEdit = ({list}) => {
    const [editInput, setEditInput] = useState('');

    // useEffect(() => {
    //     console.log(task)
    // },[])

    return(
        <div>
            <div className='listIndvTitle'>
                <input type='text' value={editInput} onChange={e => setEditInput(e.target.value)} />
            </div>
        </div>
    )
}

export default ListEdit;