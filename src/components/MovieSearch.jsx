import PropType from "prop-types";
import { useContext } from "react";
import { MovieContext } from "../context/MovieProvider";


const MovieSearch = ({title,data}) => {
    const {handleTrailer}=useContext(MovieContext)

  return (
    <div className="text-white px-10 w-full my-10">
      <h2 className="uppercase text-xl font-bold mb-4">{title}</h2>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
      {data && data.length>0 &&data.map((item) =>(
                <div key={item.id} className="w-[350px] h-[450px] bg-red-500 relative group cursor-pointer" 
                onClick={()=>handleTrailer(item.id)}
                >
                    <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out" >
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40"/>
                    <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`} alt={item.title} className="w-full h-full object-cover"/>
                    <div className="absolute bottom-4 left-8">
                        <p className="uppercase text-md">{item.title || item.original_title}</p>
                    </div>
                    </div>
                </div>   
            ))}
      </div>
    </div>
  )
}
MovieSearch.propTypes={
    title:PropType.string,
    data:PropType.array
}

export default MovieSearch
