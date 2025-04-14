'use client';
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <title>計數器</title>
      <h1>{number}</h1>
      <div>
        <button
          onClick={() => setNumber(number + 1)}
          style={{ marginRight: '10px', padding: '10px', fontSize: '16px' }}
        >
          ➕️
        </button>
        <button
          onClick={() => setNumber(number - 1)}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          ➖️
        </button>
      </div>
    </div>
  );
}