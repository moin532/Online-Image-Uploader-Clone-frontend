import styled from 'styled-components'

export default function ErrorPage(props) {
    // window.location.reload();
    return (
        <Wrapper>

        <div className={"error-page"} id="main">
            <div className={"oops"}>Oops!</div>
            <div className={"message"}>Something went wrong... 
                    <h1 className='red'>Reload a page</h1> 
            </div>
        </div>
        </Wrapper>
    );

}


const Wrapper = styled.section`
#main{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: white;
}

.red{
    color:#2dab00;
    font-size: 40px;
    align-items: center;
}
`