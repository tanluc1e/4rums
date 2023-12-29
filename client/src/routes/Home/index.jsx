import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'stores/Store';
import { PencilSimple } from '@phosphor-icons/react'

import HomeCard from 'components/__test__/HomeCard';
import SpeedDial from 'components/SpeedDial';

const Home = () => {
    document.title = 'Forum'
    const { setPostType, setFabVisible, lang } = useContext(StoreContext)
    const [init, setInit] = useState(true)

    useEffect(() => {
        if (init) {
            setFabVisible(true)
            setPostType({
                type: 'thread',
                id: null
            })
        }
        setInit(false)
        // eslint-disable-next-line
    }, [init])

    return (
        <>
            {/* {navigator.onLine && <Boards lang={lang} />} */}
            {/* <Activity /> */}
            {/* <CardStats /> */}
            <HomeCard />
            <SpeedDial icon={<PencilSimple />} />
        </>
    )
}

export default Home;