import React, { Component } from 'react';
import axios from "axios";
import Post from "./Post/Post"

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    (async() => {
      try{
        const res = await axios.get('https://practiceapi.devmountain.com/api/posts')
        // console.log(res.data)
        this.setState({
          posts: res.data
        })
      } catch(err) {console.log(err)}
    })()

 }

  updatePost(id, text) {
    (async() => {
      try{
        const res = await axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
        // console.log(res.data)
        this.setState({
          posts: res.data
        })
      } catch(err) {console.log(err)}
    })()
  }

  deletePost(id) {
    (async() => {
      try{
        const res = await axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
        // console.log(res.data)
        this.setState({
          posts: res.data
        })
      } catch(err) {console.log(err)}
    })()
  }


  createPost(text) {
    (async() => {
      try{
        const res = await axios.post('https://practiceapi.devmountain.com/api/posts', {text})
        // console.log(res.data)
        this.setState({
          posts: res.data
        })
      } catch(err) {console.log(err)}
    })()
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
         {posts.map(post => (
          <Post 
            key={post.id} 
            id={post.id}
             text={post.text} 
             date={post.date} 
             updatePostFn={this.updatePost} 
             deletePostFn={this.deletePost}
             />))} 
        </section>
      </div>
    );
  }
}

export default App;
