import React from 'react';
import ProgramIcon from '../../../../../../assets/default_program_icon.png';

function Kernel32({ fileIconClicked, myComputerIconClicked, setIsDoNotOpen }) {
  return (
    <>
        <section 
            className={`shell-object ${myComputerIconClicked == 'do_not_open' ? 'clicked' : null}`}
            onClick={e => fileIconClicked(e, 'do_not_open')}
            onDoubleClick={() => setIsDoNotOpen(true)}
            >
            <img src={ProgramIcon}
                style={{ width: '60px' }}></img>
            <p>do_not_open.exe</p>
        </section>
    </>
  )
}

export default Kernel32