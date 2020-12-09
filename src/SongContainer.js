import React, { Component } from 'react';
import axios from 'axios';
//https://git.generalassemb.ly/prudential-0921/flask-react-post-delete-dog-app
// make sure to import the form
import CreateSongForm from './CreateSongForm';
import SongList from './SongList'
class SongContainer extends Component {
    state = {
          songs: [],
          songToEdit: {
            title: '',
            artist: '',
            album: '',
            id: ''
          },
          showEditModal: false//pop up open/close window
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
          // The createdSongResponse variable will store the response from the Flask API
          //Option 1
          // const createdSongResponse = await axios.post(
          //   process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/',
          //   song
          // );
          //Option 2
          //https://www.npmjs.com/package/react-axios#custom-axios-instance
          const createdSongResponse = await axios({
            method: 'POST',
            url: process.env.REACT_APP_FLASK_API_URL + '/api/v1/songs/',
            data: song,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // we are emptying all the songs that are living in state into a new array,
          // and then adding the song we just created to the end of it
          // the new song which is called parsedResponse.data
    
          console.log(createdSongResponse.data.data, ' this is response');
          this.setState({
            songs: [...this.state.songs, createdSongResponse.data.data],
          });
        } catch (err) {
          console.log('error', err);
        }
      };
      deleteSong = async (id) => {
        console.log(id);
        const deleteSongResponse = await axios.delete(
          `${process.env.REACT_APP_FLASK_API_URL}/api/v1/songs/${id}`
        );
        console.log(deleteSongResponse);
        // Now that the db has deleted our item, we need to remove it from state
        // Then make the delete request, then remove the song from the state array using filter
        this.setState({ songs: this.state.songs.filter((song) => song.id !== id) });
    
        console.log(deleteSongResponse, ' response from Flask server');
      };
      openAndEdit = (songFromTheList) => {
        console.log(songFromTheList, ' songToEdit  ');
      
        this.setState({
          showEditModal: true,
          songToEdit: {
            ...songFromTheList,//spread operator
            //lifting up from the DogList component.
          },
        });
      };
      render(){
        return <>
        <SongList 
          songs={this.state.songs} 
          deleteSong={this.deleteSong}
          //pass function to render; 
          //add onClick in SongList
          openAndEdit={this.openAndEdit} />
        <CreateSongForm addSong={this.addSong}/>
        </>
          
      }
}
 
export default SongContainer;