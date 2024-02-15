import React ,{Fragment,useState}from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MetadaData from '../Home/MetaData';

const Search = () => {

    const navigate = useNavigate(); 
    const [keyword, setkeyword] = useState("");

    const SearchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/images/${keyword}`);
        }else{
            navigate("/images")
        }
    }
  return (
   <Wrapper>
     <Fragment>
            <MetadaData title=" Images and Search  ---MM"/>
        <form className="searchBox" onSubmit={SearchSubmitHandler}>
            <input type="text"
            placeholder='search a IMAGE ...'
            onChange={(e)=>  setkeyword(e.target.value)}
            />
      <input type="submit" value="search"/>
        </form>
        </Fragment>


   </Wrapper>
  )
}

const Wrapper = styled.section`
.searchBox{
  
  display:flex;
  justify-content: center;
  align-items:center;
  position: relative;
  margin-bottom: 12vh;

}
.searchBox > input[type="text"]{
    /* height: 8%; */
    width: 50%;

}

.searchBox > input[type="submit"]{
    width: 9%;
    height: 5%;
    margin-top: 0px;
    
}


`
export default Search