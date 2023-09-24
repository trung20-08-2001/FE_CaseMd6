import * as React from 'react';
import { SyncLoader } from "react-spinners";


export default function SimpleBackdrop() {
  return (
    <div className='mx-auto my-auto'>
      <SyncLoader color="#1e7e34" />
    </div>
  );
}