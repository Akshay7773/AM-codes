import React,{useEffect, useState} from 'react'
import axios from 'axios'
 
import ReactPaginate from 'react-paginate'

import {Line, Bar} from 'react-chartjs-2'
import {Chart, registerables} from 'chart.js'
Chart.register(...registerables)
function Data() {
    const [post, setPost]=useState({})
    useEffect(()=>{
        axios.get(`https://api.covid19api.com/summary`)
        .then((response)=>{
            setPost(response.data.Countries)
            
        })
        .catch((error)=>
        (
            console.log(error)
        ))
    },[])
    
    //  if(post&&post.length)
    //  {
    // //     const country=post;
    // //     console.log(country)
    // //      console.log(country[0])
    // // //     // country.map(c=>
    // // //     //     console.log(c))
    //     console.log(post)
        
    // }
   // const [cnt, setCnt]=useState(0)

    //console.log(post)

    const pageCount=Math.ceil(post.length/5)

    const [pageNumber, setPageNumber]=useState(0)
    
   
    const changePage=({selected})=>{
       setPageNumber(selected)
    }
    console.log('object')
    const userPerPage=5;
    const pageVisited=userPerPage*pageNumber;
    //console.log(userPerPage, pageNumber, pageVisited)
    // console.log(pageVisited)
    const lineChart =(
        post && post.length
        ?(
            <Bar
                data={{
                    labels:post.map(({Country})=>Country).splice(pageVisited,5),
                    datasets:[{
                        data:post.map(({TotalConfirmed})=>TotalConfirmed).splice(pageVisited,5),
                        label:"Confirmed",
                        backgroundColor:'#3333ff',
                         fill:true,
                    },{
                        data:post.map(({TotalDeaths})=>TotalDeaths).splice(pageVisited,5),
                        label:"Deaths",
                        backgroundColor:'rgb(255, 0, 0)',
                         fill:true,
                    },{
                        data:post.map(({TotalRecovered})=>TotalRecovered).splice(pageVisited, 5),
                        label:"Recovered",
                        backgroundColor:'#FFFF00',
                        fill:true
                    }]
                }}
            />

        )
        :null
    )
   
    return (
      
            <div  className='chart'>
                {lineChart}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                ></ReactPaginate>
               
            </div>
           
       
    )
}

export default Data
