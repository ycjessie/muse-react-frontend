import React, { Component } from 'react';
import axios from 'axios';
//https://git.generalassemb.ly/prudential-0921/flask-react-post-delete-dog-app
// make sure to import the form
import CreateSongForm from './CreateSongForm';
import SongList from './SongList'
class SongContainer extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          songs: []
        }
      }
      componentDidMount(){
        this.getSongs();
      }
      getSongs = async () => {
        try {
          const parsedSongs = await axios(
            process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/'
          );
          console.log(parsedSongs.data.data);
          await this.setState({
            songs: parsedSongs.data.data,
          });
        } catch (err) {
          console.log(err);
        }
      };
      addSong = async (e, song) => {
        e.preventDefault();
        console.log(song);
    
        try {
          // The createdDogResponse variable will store the response from the Flask API
          //Option 1
          // const createdSongResponse = await axios.post(
          //   process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/',
          //   song
          // );
          //Option 2
          const createdSongResponse = await axios({
            method: 'POST',
            url: process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/',
            data: song,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // we are emptying all the dogs that are living in state into a new array,
          // and then adding the dog we just created to the end of it
          // the new dog which is called parsedResponse.data
    
          console.log(createdSongResponse.data.data, ' this is response');
          this.setState({
            songs: [...this.state.songs, createdSongResponse.data.data],
          });
        } catch (err) {
          console.log('error', err);
        }
      };
      
      render(){
        return <>
        <SongList songs={this.state.songs} />
        <CreateSongForm addSong={this.addSong}/>
        </>
          
      }
}
 
export default SongContainer;