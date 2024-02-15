import React from 'react'
import styled from 'styled-components'
const Loader = () => {
  return (
    <div>
      <Wrapper>

       <div  className='loader' >
      <img src="/images/load.gif" alt="" />
    </div>
      </Wrapper>
    </div>
  )
}

const Wrapper =styled.section`
.loader {
    width:50vh;
    align-items: center;
    justify-content: center;
    place-content: center;
    margin-left: 70vh;
    
}


`
export default Loader
