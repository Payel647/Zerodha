import React from 'react';
function HeroPage() {
    return ( 
        <div className='container p-5'>
         <div className='row text-center'>
           <img src="media/homeHero.png" alt="Hero Image" className='mb-5'/>
           <h1 className='mt-5'>Invest in everything</h1>
           <p>Online platform to invest in stocks , derivatives , mutual funds , and more</p>
           <button className="p-2 btn btn-primary fs-5"  style={{width:"20%", margin:"0 auto" }}>Signup now</button>
         </div>
        </div>
     );
}

export default HeroPage;