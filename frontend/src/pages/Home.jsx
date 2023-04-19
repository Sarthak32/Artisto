import React,{useState,useEffect} from 'react';
import { Loader,Card,Form } from '../components';

const RenderCards = ({data,title}) =>{
    if(data?.length>0) {
        return data.map((post) => <Card key={post._id} {...post}/>
        )}
    return (
        <h2 className='mt-5 font-bold text-[#6646ff] text-xl uppercase'>{title}</h2>
    )
}

const Home = () => {
const [loading, setLoading] = useState(false)
const [allposts, setAllposts] = useState(null)  

const [Searchfield, setSearchField] = useState('')

const [searchedResult, setSearchedResult] = useState(null)

const [SearchTimeout, setSearchTimeout] = useState(null)


    const fetchPosts = async() =>{
        setLoading(true);
        try {
            const response = await fetch ('http://localhost:8080/post',{
          method :'GET',
          headers : {
            'Content-Type':'application/json',
          },
          })
          if(response.ok){
            const results = await response.json();

            setAllposts(results.data.reverse());
          }
        } catch (error) {
            alert(error)
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPosts();
      }, []);

const handlesearchChange = (e)=>{
    setSearchField(e.target.value)
    
    setSearchTimeout(
    setTimeout(()=>{const searchResult = allposts.filter((item) => item.name.toLowerCase().includes(Searchfield.toLowerCase()) || item.prompt.toLowerCase().includes(Searchfield.toLowerCase()));
        setSearchedResult(searchResult);
     },500)
    );
}
return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className='font-extrabold text-[#22238] text-[32px]'>Explore</h1>
            <p className='mt-2 text-[#66632] text-[13px] max-w [500px]'>
            Unleash your creativity with Artisto's explore page - where imagination meets possibility!
            </p>
        </div>
        <div className='mt-16'>
            <Form labelName="Search Posts"
            type="text"
            name="text"
            placeholder="Search Posts"
            value={Searchfield}
            handleChange={handlesearchChange} />

        </div>
        <div className='mt-10'>
            {loading ?(
                <div className='flex justify-center item-center'>
                    <Loader/>
                </div>
            ) : (
                <>
                {Searchfield &&(
                    <h2 className='font-medium text-[#666e75] text-xl mb-3'>Showing results for : <span className='text-[#222328]'>{Searchfield}</span></h2>
                
                )}
                <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 '>
                {Searchfield ? (
                <RenderCards
                  data={searchedResult}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allposts}
                  title="No Posts Yet"
                />
              )}
                </div>
                </>
            ) }

        </div>
    </section>
  )
}

export default Home