import React, {useState, useEffect} from 'react';
import Posts from './Posts';
import axios from 'axios';

import './posts.css'
import { Button } from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';

const PostsApp = () => {
    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [posts,setPosts] = useState([]);
    const [postsPerPage,setPostsPerPage] = useState(12);

    const [departments,setDepartments] = useState([]);
    const [hashtags,setHashtags] = useState([]);

    

    useEffect(() => {
        const fetchPosts = async () => {
            const fileData = new FormData();
            fileData.append('page_factor',12);
            fileData.append('page_number',currentPage);
            fileData.append('order_by',"uploaded_at");
            setLoading(true);

            const url = 'https://slidertest321.herokuapp.com/api/files/';

            axios.post(url, fileData, {
                headers: {
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                }
              })
              .then(
                  res=>{
                    console.log("post success");
                    setPosts(res.data);
                    setLoading(false);
                  }
              )
              .catch(err => console.log(err))
            
        };

        fetchPosts();
    }, []);

    //pagination
    const pageChange = (event, value) => {
        setCurrentPage(value);
        indexOfLastPost = value * postsPerPage;
        indexOfFirstPost = indexOfLastPost - postsPerPage;
        currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);
        setPosts(currentPosts);
        console.log("first index",indexOfFirstPost);
        console.log("last index", indexOfLastPost);
    }

     //Get current posts
   let indexOfLastPost = currentPage * postsPerPage;
   // setIndexofLastPost(currentPage * postsPerPage);
   let indexOfFirstPost = indexOfLastPost - postsPerPage;
   // setIndexofFirstPost(indexOfLastPost - postsPerPage);
   let currentPosts= posts.slice(indexOfFirstPost,indexOfLastPost) ;

    // fetching departments
    useEffect(() => {
        const fetchDepartments = async () => {
          const res = await axios.get('https://slidertest321.herokuapp.com/api/department/');
          setDepartments(res.data);

        //   console.log("departments:",...departments);
        };
    
        fetchDepartments();
    }, []);

    // fetching hashtags
    useEffect(() => {
        const fetchHashtags = async () => {
          const res = await axios.get('https://slidertest321.herokuapp.com/api/category/');
          setHashtags(res.data);
        };
    
        fetchHashtags();
    }, []);

   

    //change page
    // const paginate = pageNumber => setCurrentPage(pageNumber);
        
    // To display Department Posts
    const displayDeparmentPosts = (e) => {
        const depData = new FormData();
        depData.append("department",e);
        setLoading(true);

        const url = 'https://slidertest321.herokuapp.com/api/getdepartment/';
        console.log("department name = ", e);
        console.log("hitting api");
        axios.post(url, depData,{
            headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
          }
        })
        .then(
            res=>{
              console.log("api hit success");
              console.log(res.data);
              setPosts(res.data);
              setLoading(false);
            }
        )
        .catch(err => console.log(err))
    };

    //To display Hashtag posts
    const displayHashtagPosts = (e) => {
        const hashtagData = new FormData();
        hashtagData.append("category",e);
        setLoading(true);

        const url = 'https://slidertest321.herokuapp.com/api/getcategory/';
        console.log("category name = ", e);
        console.log("hitting category api");
        axios.post(url, hashtagData,{
            headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
          }
        })
        .then(
            res=>{
              console.log("category api hit success");
              console.log(res.data);
              setPosts(res.data);
              setLoading(false);
            }
        )
        .catch(err => console.log(err))
    };

    // const [direction,setDirection]=useState('');
    
    return(
        <div className="container mt-0 mb-5">                       
            {/* display departments */}
                <nav>
                    <div className="d-flex flex-row departments">
                        <label className="p-2 mr-3 title">Departments</label>
                        
                        {departments.map((depts) => {
                            return(                                    
                                <div className="p-2 mr-3">                                        
                                    <Button variant="contained" color="default" value={depts.name} onClick={(e)=> {displayDeparmentPosts(e.currentTarget.value)}}>   
                                        {depts.name}
                                    </Button>                                    
                                </div>
                            )
                        })}
                        
                    </div>
                </nav>
            {/* display hashtags */}
                <nav>
                    <div className="d-flex flex-row hashtags">
                        <label className="p-2 mr-3 title">Hashtags</label>
                        {hashtags.map((hashs) => {
                            return(                                    
                                <div className="p-2 mr-3">                                        
                                    <Button variant="contained" color="default" value={hashs.name} onClick={(e)=> {displayHashtagPosts(e.currentTarget.value)}}>
                                        {hashs.name}
                                    </Button>                                    
                                </div>
                            )
                        })}
                    </div>
                </nav>
            <Posts posts={currentPosts} loading={loading}/>

            {/* <Pagination count={2} page={currentPage} onChange={pageChange} /> */}



            {/* <Pagination totalPosts={posts.length} currentPage={currentPage} paginate={paginate} /> */}
        </div>
    );
};



export default PostsApp;
