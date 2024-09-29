const express = require('express');

const axios = require('axios');

const cors = require('cors');

const PORT = process.env.PORT || 8000;

const app= express();

app.use(cors());
app.use(express.json());

const YoutubeAPIkey='AIzaSyBshw2KNLIMTEMLPJxvnrH_XL0m0vugw4c';

const ArticleAPIkey='0341ef45e1744052be8d9927dcd8800c';

app.get('/search', async(req,res)=>{
    const SearchTerm=req.query.q;

    try {
        
        const youtubeResult=await searchYoutubedata(SearchTerm);
        const articleResult=await searchArticledata(SearchTerm);

        const combineResult=[...youtubeResult, ...articleResult];

        const results=rankResult(combineResult);

        res.json(results);

    } catch (error) {
        res.status(404).send("Error occured");
    }   
})

async function searchYoutubedata(searchTerm){

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&type=video&part=snippet&key=${YoutubeAPIkey}`;
    
    const response = await axios.get(apiUrl);

    const videos = response.data.items.map(video => ({
        title: video.snippet.title,
        link: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        views: Math.floor(Math.random() * 100000), // Mocked view count
        likes: Math.floor(Math.random() * 10000),  // Mocked like count
        platform: 'YouTube'

    }));

    return videos;
}

async function searchArticledata(searchTerm){

    const apiUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${ArticleAPIkey}`;
    
    const response = await axios.get(apiUrl);

    const articles = response.data.articles.map(article => ({
        title: article.title,
        link: article.url,
        platform: 'Blog/Article',
        recencyScore: calculateRecencyScore(article.publishedAt)
    }));

    return articles;
}

function rankResult(result){
    return result.sort((a,b)=>(b.views+b.likes)-(a.views+a.likes));
}

function calculateRecencyScore(publishedDate) {
    const currentYear = new Date().getFullYear();
    const publicationYear = new Date(publishedDate).getFullYear();
    return currentYear - publicationYear;  // A simple recency score
}

app.listen(PORT,()=>{
    console.log("app is running");
})