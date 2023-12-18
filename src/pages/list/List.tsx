import { useState } from 'react';

import { Container, Typography } from '@mui/material'

import CreateList from './CreateList';
import ShowList from './ShowList';

import { initialListData } from '../../data/listData';


const List = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(initialListData.users.length < 1);
    const [list, setList] = useState(initialListData);

    const handleCreate = () => {
      setIsCreating(!isCreating);
    };

//     if (isLoading) {
//         return (
//             <Container>
//                 Loading list...
//         </Container>
//     )
// }

  return (
      <Container>
          <Typography variant="h2">{ list.title}</Typography>
      {isCreating && (
        <CreateList list={list} handleCreate={handleCreate} />
      )}
      {!isCreating && <ShowList list={list} />}
    </Container>
  );
}

export default List
