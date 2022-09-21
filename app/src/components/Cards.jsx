import React from 'react';
import './Cards.css';
import Card from './Card.jsx';

export default function Cards({post}) {

  return (
    <div className='cards'>
        {post.map(p => 
            <Card
              key={p.id}
              id={p.id}
              image={p.image}
              likes={p.likes}
              text={p.text}
              owner={p.owner}
              tags={p.tags}
            />
        )}
    </div>
  );
}