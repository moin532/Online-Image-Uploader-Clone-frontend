import styled from "styled-components";

const Skeleton = () => {
    return(
        <Wrapper>
           <div className="skeleton">
            <div className="skeleton-blog">
                <header>
                    <div className="skeleton-avatar">
                    </div>
 
                    <div className="skeleton-author">
                    </div>
                </header>
 
                <main className="skeleton-image">
                </main>
 
                <footer className="skeleton-footer">
                </footer>
            </div>  
            </div>


            <div className="skeleton">
            <div className="skeleton-blog">
                <header>
                    <div className="skeleton-avatar">
                    </div>
 
                    <div className="skeleton-author">
                    </div>
                </header>
 
                <main className="skeleton-image">
                </main>
 
                <footer className="skeleton-footer">
                </footer>
            </div>  
            </div>
            <div className="skeleton">
            <div className="skeleton-blog">
                <header>
                    <div className="skeleton-avatar">
                    </div>
 
                    <div className="skeleton-author">
                    </div>
                </header>
 
                <main className="skeleton-image">
                </main>
 
                <footer className="skeleton-footer">
                </footer>
            </div>  
            </div>

           
 
 </Wrapper>
 
 );
 };

 const Wrapper = styled.section`

 .skeleton{
    display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
 }
 .skeleton-blog{
     margin-bottom: 2em;
 animation: scale 4s infinite;
}
@keyframes scale {
    0% {transform: scale(0.9)}
    100% {transform: scale(1)}
 }
.skeleton-avatar{
 background: #E5E4E2;
 height: 60px;
  width: 60px;
  border-radius: 50%;
}
.skeleton-author{
background:#fff;
 height: 30px;
 width: 150px;
 margin-left: 1rem;
 border-radius: 6px;
}
.skeleton-image{
 height: 200px;
 width: 320px;
 border-radius: 6px;
 background: ${({ theme }) => theme.colors.helper};
 margin-top: 10px;
}
.skeleton-footer{
 height: 30px;
 width: 280px;
 border-radius: 6px;
 background: #E5E4E2;
 margin-top: 10px;
}

 `

 export default Skeleton;