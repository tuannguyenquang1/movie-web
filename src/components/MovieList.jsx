import { useState } from "react";
import Proptypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from 'react-modal'
import YouTube from "react-youtube";


  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const MovieList = ({title, data}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [trailerKey, setTrailerKey]=useState("");

    const handleTrailer=async (id)=>{
      setTrailerKey('');
        try{
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
            const options = {
                method: "GET",
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                },
            };

            const movieKey=await fetch(url, options);
            const data=await movieKey.json();
            setTrailerKey(data.results[0].key)
            setModalIsOpen(true)
        }catch(error){
          setModalIsOpen(false)
            console.log(error)
        }
    }
  return (
    <div className="text-white px-10 w-full my-10">
    <h2 className="uppercase text-xl font-bold mb-4">{title}</h2>
    <Carousel responsive={responsive} className="flex items-center space-x-4 left-0">
            {data && data.length>0 &&data.map((item) =>(
                <div key={item.id} className="w-[350px] h-[450px] bg-red-500 relative group cursor-pointer" onClick={()=>handleTrailer(item.id)}>
                    <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out" >
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40"/>
                    <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`} alt={item.title} className="w-full h-full object-cover"/>
                    <div className="absolute bottom-4 left-8">
                        <p className="uppercase text-md">{item.title || item.original_title}</p>
                    </div>
                    </div>
                </div>   
            ))}
    </Carousel>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setModalIsOpen(false)}
        style={{
          overlay:{
            position:"fixed",
            zIndex:9999,
          },
          content:{
            top:"50%",
            left:"50%",
            right:"auto",
            bottom:"auto",
            marginRight:"-50%",
            transform:"translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
      <YouTube videoId={trailerKey} opts={opts}/>;
      </Modal>
    </div>
  )
};

MovieList.propTypes={
    title:Proptypes.string.isRequired,
    data:Proptypes.array,
}

export default MovieList
