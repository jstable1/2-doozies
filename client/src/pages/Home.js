import React from 'react';
import DoozieList from '../components/DoozieList';
import Calendar from '../components/Calendar';
import tasksBackground from '../assets/images/tasks_background.jpeg';

import { useQuery } from '@apollo/client';
import { QUERY_DOOZIES } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_DOOZIES);
    const doozies = data?.doozies || [];

    const moment = require('moment');
    const date = moment().format('l [To-Do List:]');


    return (
        <main className="flex-row">
            <div className="today-list" style={{
                backgroundImage: `url(${tasksBackground})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                padding: '5vw'}}>
                <h2>{date}</h2>
                {loading? (
                    <div>Loading...</div>
                ) : (
                    <DoozieList
                    doozies={doozies}
                />
                )}
            </div>
            <div>
                <Calendar />
            </div>
        </main>
    );
};

export default Home;