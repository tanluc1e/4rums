import React, { useContext } from 'react'
import './style.css'
import { StoreContext } from 'stores/Store';
import Boards from 'routes/Home/Boards';

import { bg2 } from 'assets';
import Threads from 'routes/Home/Threads';

export default function HomeCard() {
    const { lang } = useContext(StoreContext)
    return (
        <div className="merge">
            <div className="post">
                <div className="welcome-container">
                    <div className="welcome-flex">
                        <div className="welcome-text">
                            <p className="welcome-title">Join on The Events In the Community</p>
                            <p className="welcome-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Natus nulla quaerat libero vel laborum fugiat, dolorum et. Fugit velit, amet
                                laboriosam, ad sed cumque itaque architecto quis quisquam expedita fugiat?</p>
                            <a href="#" className="get-started">Get Started</a>
                        </div>
                        <img className="calendar" src={bg2} alt="Calendar" />
                    </div>
                </div>

                {navigator.onLine && <Boards lang={lang} />}

                {/* <div className="community-forums">

                    <div className="cf-title">
                        <i className='bx bxs-conversation'></i>
                        <p className="cf-title-text">Community Forums</p>
                    </div>

                    <div className="cf-tags">
                        <a href="#!" className="tags-count">
                            <p className="tags-name">All</p>
                        </a>
                        <a href="#!" className="tags-count">
                            <p className="tags-name">Official Forums</p>
                        </a>

                        <div className="filter">
                            <box-icon name='filter'></box-icon>
                        </div>
                    </div>

                    <div className="cf-topics">
                        <div className="cf-topics-count">

                            <div className="cf-topics-texts">
                                <div className="cf-topics-icon-1">
                                    <i className="fa-solid fa-rocket"></i>
                                </div>
                                <div className="cft-text">
                                    <p className="cf-topic-name">Installation, Upgrade, and Import Support</p>
                                    <p className="forum-type">Sub-Forum</p>
                                </div>
                            </div>

                            <div className="cf-topic-reactions">
                                <div className='cf-topic-threads'>
                                    <p className="threads-amount">5.1K</p>
                                    <p>Threads</p>
                                </div>
                                <div className='cf-topic-messages'>
                                    <p className="messages-amount">302.5K</p>
                                    <p>Messages</p>
                                </div>
                            </div>

                        </div>

                        <div className="cf-topics-count">
                            <div className="cf-topics-texts">
                                <div className="cf-topics-icon-2">
                                    <i className="fa-solid fa-chart-area"></i>
                                </div>
                                <div className="cft-text">
                                    <p className="cf-topic-name">Troublesshooting and Problems</p>
                                </div>
                            </div>

                            <div className="cf-topic-reactions">
                                <div className='cf-topic-threads'>
                                    <p className="threads-amount">5.1K</p>
                                    <p>Threads</p>
                                </div>
                                <div className='cf-topic-messages'>
                                    <p className="messages-amount">302.5K</p>
                                    <p>Messages</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <Threads lang={lang} />
            </div>


            {/*  right   */}

            <div className="right">

                {/* staff  */}

                <div className="staff-container">
                    <div className="title">
                        <div className="title-flex">
                            <i className='mt bx bxs-user'></i>
                            <p className="staff-text">STAFF ONLINE</p>
                        </div>
                    </div>

                    <div className="member-count">
                        <div className="member-flex">
                            <div className="member-icon">
                                <i className='icon bx bx-user'></i>
                                <div className="member-text">
                                    <p className="staff-name">Darrel Steward</p>
                                    <p className="staff-rank">System Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="member-count">
                        <div className="member-flex">
                            <div className="member-icon">
                                <i className='icon bx bx-user'></i>
                                <div className="member-text">
                                    <p className="staff-name">Guy Hawkins</p>
                                    <p className="staff-rank">Forum Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="member-count">
                        <div className="member-flex">
                            <div className="member-icon">
                                <i className='icon bx bx-user'></i>
                                <div className="member-text">
                                    <p className="staff-name">Ralph Edwards</p>
                                    <p className="staff-rank">Network Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="homecard-line"></div>

                {/* recent threads  */}

                <div className="threads-container">
                    <div className="title">
                        <div className="title-flex">
                            <i className='mt bx bxs-time-five'></i>
                            <p className="staff-text">RECENT THREADS</p>
                        </div>
                    </div>

                    <div className="threads-count">
                        <div className="member-flex">
                            <div className="threads-icon">
                                <i className='icon bx bx-user'></i>
                                <div className="threads-text">
                                    <p className="threads-title">Setting Up Advertisement Within Brand New Forum
                                        Community</p>
                                    <div className="threads-author">
                                        <p className="threads-creator">By: Wankel</p>
                                        <p className="threads-time">- Today at 6:57 PM</p>
                                    </div>
                                    <p className="threads-tag">Forum Questions and Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="threads-count">
                        <div className="member-flex">
                            <div className="threads-icon">
                                <i className='icon bx bx-user'></i>
                                <div className="threads-text">
                                    <p className="threads-title">Setting Up Advertisement Within Brand New Forum
                                        Community</p>
                                    <div className="threads-author">
                                        <p className="threads-creator">By: Wankel</p>
                                        <p className="threads-time">- Today at 6:57 PM</p>
                                    </div>
                                    <p className="threads-tag">Forum Questions and Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="threads-count">
                        <div className="member-flex">
                            <div className="threads-icon">
                                <i className='icon bx bx-user'></i>
                                <div className="threads-text">
                                    <p className="threads-title">Setting Up Advertisement Within Brand New Forum
                                        Community</p>
                                    <div className="threads-author">
                                        <p className="threads-creator">By: Wankel</p>
                                        <p className="threads-time">- Today at 6:57 PM</p>
                                    </div>
                                    <p className="threads-tag">Forum Questions and Support</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
