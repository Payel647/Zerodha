import React from 'react';

function Stats() {
    return ( 
       <div className="container p-3">
        <div className="row p-2 align-items-center text-center text-md-start">
            <div className="col-md-6 p-4">
                <h1 className='fs-2 mb-4'>Trust with confidence</h1>
                <h2 className='fs-4'>Customer-first always</h2>
                <p className='text-muted'>That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
                <h2 className='fs-4'>No spam or gimmicks</h2>
                <p className='text-muted'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
                <h2 className='fs-4'>The Zerodha universe</h2>
                <p className='text-muted'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                <h2 className='fs-4'>Do better with money</h2>
                <p className='text-muted'>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
            </div>
            <div className="col-md-6 p-4">
                <img src="media/ecosystem.png" className="img-fluid" alt="Ecosystem" />
                <div className='text-center mt-3'>
                    <a href="" className='mx-3 text-decoration-none'>Explore our products <i className="fa-solid fa-arrow-right-long"></i></a>
                    <a href="" className='text-decoration-none'>Try Kite demo <i className="fa-solid fa-arrow-right-long"></i></a>
                </div>
            </div>
        </div>
       </div>
    );
}

export default Stats;