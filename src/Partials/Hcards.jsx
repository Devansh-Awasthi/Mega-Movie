import React, { useEffect, useState } from "react";
import Call from "../Utils/Call";
import axios from "axios";
import { Link } from "react-router-dom";
function Hcards() {
  const k = "95e6ba64";
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        var traktMovie = await Call.get("/movies/trending", {
          params: { limit: 20, page: 1 },
        });
        // var traktShow = await Call.get("/shows/trending");
        // traktMovie.append(traktShow);
        // console.log(traktMovie.data);
        // console.log(traktShow.data);

        var b = await Promise.all(
          traktMovie.data.map(async (i) => {
            try {
              const omdbMovie = await axios.get(
                `http://www.omdbapi.com/?i=${i.movie.ids.imdb}&apikey=${k}`
              );
              return omdbMovie.data;
            } catch (e) {
              console.error(e);
              return null;
            }
          })
        );
        console.log(b);
        setTrending(b.filter((movie) => movie !== null));
      } catch (e) {
        console.error(e);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="text-[#F1F1F1] h-[70vh] w-full overflow-hidden bg-[#181818] ">
      <h1 className="text-[#F1F1F1] text-[4rem] font-bold">Trending</h1>
      <div className=" overflow-x-auto w-full">
      <div className="bg-transparent  h-[60vh] flex flex-nowrap w-max items-center">
        {trending.length > 0 &&
          trending.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#181818] hover:bg-[#F4A261] flex-col rounded-xl ml-5 h-[78%] w-[16vw] "
                >
                  <img src={item.Poster} className="h-[70%] rounded-xl w-full object-center "></img>
                  <h1 className="text-[#F1F1F1] text-[2rem] ml-2 text-nowrap overflow-hidden font-bold">{item.Title}</h1>
                  <span> <p className="ml-4">{item.Plot.slice(0,85)}
                  <Link>...Read more</Link></p></span>
                </div>
              );
          })}
  </div>
      
      </div>
    </div>
  );
}

export default Hcards;
