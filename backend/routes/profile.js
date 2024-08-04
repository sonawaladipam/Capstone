import React from 'react';
import Profile from './components/Profile';

const user = {
    profilePicture: 'https://via.placeholder.com/200',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'A passionate developer and tech enthusiast.',
    location: 'New York, USA',
    memberSince: '2020-01-15T00:00:00Z',
    interests: ['Coding', 'Reading', 'Gaming']
};

function App() {
    return (
        <div>
            <Profile user={user} />
        </div>
    );
}

export default App;
