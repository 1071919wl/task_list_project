import React from 'react';

const ListItem = ({list}) => {

    return (
        <div>
            <div>
                {list.list}
            </div>
            {/* <div className='listBtn'>
                <div>
                    <input type='submit' value='Edit' className='listEditBtn' onClick={() => listEditSec(list)} />
                    <input type='submit' value='Delete' className='listDeleteBtn' onClick={() => removeList(list._id)} />
                </div>
            </div> */}
        </div>
    )
};

export default ListItem;