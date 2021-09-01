import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import axios from 'axios';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

var fileDownload = require('js-file-download');

const Posts = ({posts,loading}) => {
    const classes = useStyles();

    const [fileName,setFileName] = useState("");

    // download function
    const handleDownload = () => {
        const downloadData = new FormData();
        downloadData.append("file_name","/documents/2.png");
        const url = "http://localhost:8000/download/";

        axios.post(url,downloadData,{
            responseType:'blob',
        })
        .then(res=> {
            fileDownload(res.data,"/documents/B171129_P.Gopi_SS_Assignment_5.pdf");
            console.log(res);
            console.log(fileName);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(loading){
        return <h2 className="text-center">Loading...</h2>
    }
        return(
            <>
                <Container maxWidth="md">
                    <Grid container spacing={5} alignItems="flex-end">
                        {posts.map((post) => {                                
                            return(
                                <Grid item key={post.id} xs={12} md={4}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                            className={classes.media}
                                            image="imgurl"
                                            title="title name"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {post.name}
                                                </Typography>   
                                                <div className="d-flex flex-row">
                                                    <label>Departments:</label>                                                                                         
                                                    {post.filedep.map(dep=>(                                                    
                                                        <div className="boxdeps">
                                                            {dep.department},
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="d-flex flex-row hashtagdisplay">
                                                    <label>Hashtags:</label>                                                                                         
                                                    {post.filecat.map(cat=>(                                                    
                                                        <div className="boxdeps">
                                                            {cat.category},
                                                        </div>
                                                    ))}
                                                </div>                                                                                            
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View
                                            </Button>
                                            <Button size="small" color="primary" onClick={() => handleDownload()} target="_blank">
                                                Download
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </>
        );
};
export default Posts;