import React from 'react'

import './style.css'

// import icons
import { BsArrowRightShort, BsQuestionCircle } from "react-icons/bs";

import video from "assets/video.mp4"
import img from "assets/1.png"

export default function CardStats() {
    return (
        <div className="cardSection flex">
            <div className="rightCard flex">
                <h1>Create and sell extraordinary products</h1>
                <p>The world's fast growing industry today are natural made products!</p>

                <div className='buttons flex'>
                    <button className='btn'>Explore More</button>
                    <button className='btn transparent'>Top Sellers</button>
                </div>

                <div className="videoDiv">
                    <video src={video} autoPlay loop></video>
                </div>
            </div>

            <div className="leftCard flex">
                <div className="main flex">
                    <div className="textDiv">
                        <h1>My Stats</h1>

                        <div className='flex'>
                            <span>
                                Today <br /> <small>4 Orders</small>
                            </span>
                            <span>
                                This Month <br /> <small>127 Orders</small>
                            </span>
                        </div>

                        <div className='flex link'>
                            Go to my orders <BsArrowRightShort className='icon' />
                        </div>
                    </div>

                    <div className="imgDiv">
                        <img src={img} alt="" />
                    </div>
                </div>

                <div className="sideBarCard">
                    <BsQuestionCircle className='icon' />
                    <div className="cardContent">
                        <div className="circle1"></div>
                        <div className="circle2"></div>

                        <h3>Help Center</h3>
                        <p>Having trouble in Plant, please contact us from for more questions.</p>
                        <button className='btn'>Go to help center</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
