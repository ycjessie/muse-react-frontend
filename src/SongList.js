import React from 'react';
import { Card, Button} from 'semantic-ui-react';

function SongList(props){

  const songs = props.songs.map((song) => {
    return (
        <Card key={song.id}>
          <Card.Content>
            <Card.Header>{song.name}</Card.Header>
            <Card.Description>{song.breed}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button>DeleteDog</Button>
            <Button>Edit Dog</Button>
          </Card.Content>
        </Card>
        )
  })

  return (
      <Card.Group>
        { songs }
      </Card.Group>
    )
}

export default SongList