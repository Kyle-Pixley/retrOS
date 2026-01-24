import React, { useState, useRef, useEffect, useMemo } from 'react';
import ComputerIcon from './assets/my-computer-icon.png';
import CinepixIcon from './assets/cinepix-icon.png';
import PimImage from './assets/pim-icon.png';
import Nav from './components/nav/Nav.jsx';
import Calculator from './components/calculator/Calculator.jsx';
import MyComputer from './components/myComputer/MyComputer.jsx';
import Cinepix from './components/cinepix/cinepix.jsx';
import Pim from './components/pim/pim.jsx';
import PimChatBox from './components/pim/PimChatBox/PimChatBox.jsx';
import isMobile from './components/hooks/isMobile.jsx';
import './App.css';

function App() {

  const [ calculatorComponent, setCalculatorComponent] = useState(false);
  const [ navCalculatorButton, setNavCalculatorButton ] = useState(false);
  const [ calculatorPosition, setCalculatorPosition ] = useState({x: 100, y: 100});
  const [ calculatorInput, setCalculatorInput ] = useState('');
  const [ calculatorResult, setCalculatorResult ] = useState('');
  const [ calculatorZIndex, setCalculatorZIndex ] = useState(0);

  const [ myComputerComponent, setMyComputerComponent ] = useState(false);
  const [ navMyComputerButton, setNavMyComputerButton ] = useState(false);
  const [ myComputerPosition, setMyComputerPosition ] = useState({ x: 150, y:150 });
  const [ myComputerZIndex, setMyComputerZIndex ] = useState(0);
    
  const [ navCinepixButton, setNavCinepixButton ] = useState(false);
  const [ cinepixComponent, setCinepixComponent ] = useState(false);
  const [ cinepixPosition, setCinepixPosition ] = useState({ x: 160, y: 160 });
  const [ cinepixZIndex, setCinepixZIndex ] = useState(0);

  const [ pimComponent, setPimComponent ] = useState(false);
  const [ navPimButton, setNavPimButton ] = useState(false);
  const [ pimPosition, setPimPosition ] = useState({ x: 170, y: 100});
  const [ pimZIndex, setPimZIndex ] = useState(0);

  const [ navChatBoxButton, setNavChatBoxButton ] = useState(false);
  const [ chatBoxZIndex, setChatBoxZindex ] = useState(0);

  const [ openChats, setOpenChats ] = useState([]);
  const [ navBarChats, setNavBarChats ] = useState([]);
  const [ openChatNavButton, setOpenChatNavButton ] = useState(false);
  
  

  const [ componentsZIndexArray, setComponentsZIndexArray ] = useState([ calculatorZIndex, myComputerZIndex, cinepixZIndex, pimZIndex ]);

  const [ startMenu, setStartMenu ] = useState(false);
  const navStartButtonRef = useRef(null);

  const mobile = isMobile();


  // Grabs the largest Z-INDEX of "windowed" components 
  const globalMaxZ = useMemo(() => {
    const components = Math.max(calculatorZIndex, myComputerZIndex, cinepixZIndex, pimZIndex)
    const chatWindow = Math.max(0, ...Object.values(openChats).map(w => w.zIndex));
    return Math.max(components, chatWindow);
  }, [calculatorZIndex, myComputerZIndex, cinepixZIndex, pimZIndex, openChats ]);
  
 // Grabs Makes the component have the largest Z-INDEX
  const nextZ = () => globalMaxZ + 1;

  useEffect(() => {
    setComponentsZIndexArray([ calculatorZIndex, myComputerZIndex, cinepixZIndex ])
  }, [myComputerZIndex, calculatorZIndex, cinepixZIndex, pimZIndex ])

  // When user clicks anywhere outside of Start Menu the Start Menu disapears 
  useEffect(() => {
    const handleClickOutsideStartButton = (e) => {
      if (navStartButtonRef.current && !navStartButtonRef.current.contains(e.target)) {
        setStartMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutsideStartButton);

    return () => {document.removeEventListener('click', handleClickOutsideStartButton)};
  }, []);

  // handle opening windows when "Desktop" icon is clicked 
  const handleMyComputerShortcutClick = () => {
    setMyComputerComponent(true);
    setNavMyComputerButton(true);
  }
  const handleCinepixShortcutClicked = () => {
    setCinepixComponent(true);
    setNavCinepixButton(true);
  }
  const handlePimShortcutClicked = () => {
    setPimComponent(true);
    setNavPimButton(true);
  }
  //=========================================

  // sets chat window to be included in nav bar buttons 
  useEffect(() => {    
    const openChatList = Object.values(openChats ?? {});

    setNavBarChats((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const newChats = openChatList.filter(chat => !safePrev.some(c => c.friend.id === chat.friend.id));
      return [...safePrev, ...newChats];
    })
    
  }, [openChats])
  //==================================================


// handles a new chat from PIM is opened via friend list and adds it to openChats to be displayed or in nav bar at bottom 
  const openChat = (friend) => {
  setOpenChats(prev => {
    if (!friend || typeof friend !== 'object' || friend.id == null) {
      console.error('openChat called with invalid friend:', friend)
      return prev; 
    }

    const existing = prev[friend.id];

    if (existing) {
      return {
        ...prev,
        [friend.id]: { ...existing, minimized: false, zIndex: nextZ() }
      }
    }

    const count = Object.keys(prev).length;
    return {
      ...prev,
      [friend.id]: {
        friend,
        position: { x: 100 + count * 30, y: 40 + count * 30 },
        zIndex: nextZ(),
        minimized: false,
        maximized: mobile ? true : false,
      }
    }
  })
};
//=========================================================================


// handles a chat being closed
  const closeChat = id => {
    console.log(id)
    setOpenChats(prev => {
      const { [id]: _, ...rest } = prev;
        return rest;
    })
    setNavBarChats(prev => (Array.isArray(prev) ? prev.filter(c => c.friend.id !== id) : []));
  };
//============================


  const minimizeChat = id => {
    setOpenChats(prev => ({
      ...prev,[id]: {...prev[id], minimized: true},
    }))
  };

  const setMaximizedChat = (id, value) => {
    setOpenChats(prev => ({
      ...prev,[id]: {...prev[id], maximized: value},
    }))
  };

  const setChatPosition = (id, pos) => {
    setOpenChats(prev => ({
      ...prev, [id]: {...prev[id], position: pos },
    }))
  };

// handles the zIndex of a chat window when the user clicks on it 
//! STILL BUGGY 
  const bringChatToFront = id => {
    setOpenChats(prev => {
      if (!prev[id]) return prev;
      return {...prev, [id]: {...prev[id], zIndex: nextZ()}}
    })
  };
//==============================================================

  return (
    <div id='app'>
      <div className='shortcut-parent'>
        <img className='shortcut-icon' src={ComputerIcon}
        onDoubleClick={() => handleMyComputerShortcutClick()}
        />
        <p className='shortcut-text'>My Computer</p>
      </div>
      <div className='shortcut-parent'>
        <img 
          className='shortcut-icon'
          src={CinepixIcon}
          onDoubleClick={() => handleCinepixShortcutClicked()}/>
          <p className='shortcut-text'>Cinepix</p>
      </div>
      <div className='shortcut-parent'>
        <img
          className='shortcut-icon'
          src={PimImage}
          onDoubleClick={() => handlePimShortcutClicked()}/>
          <p className='shortcut-text'>PIM</p>
    </div>
      <Nav 
        calculatorComponent={calculatorComponent} 
        setCalculatorComponent={setCalculatorComponent}
        navCalculatorButton={navCalculatorButton}
        setNavCalculatorButton={setNavCalculatorButton}
        myComputerComponent={myComputerComponent}
        setMyComputerComponent={setMyComputerComponent}
        navMyComputerButton={navMyComputerButton}
        setNavMyComputerButton={setNavMyComputerButton}
        startMenu={startMenu}
        setStartMenu={setStartMenu}
        navStartButtonRef={navStartButtonRef}

        calculatorZIndex={calculatorZIndex}
        setCalculatorZIndex={setCalculatorZIndex}
        componentsZIndexArray={componentsZIndexArray}
        setComponentsZIndexArray={setComponentsZIndexArray}
        setMyComputerZIndex={setMyComputerZIndex}
        cinepixComponent={cinepixComponent}
        setCinepixComponent={setCinepixComponent}
        navCinepixButton={navCinepixButton}
        setNavCinepixButton={setNavCinepixButton}
        cinepixZIndex={cinepixZIndex}
        setCinepixZIndex={setCinepixZIndex}

        pimComponent={pimComponent}
        setPimComponent={setPimComponent}
        navPimButton={navPimButton}
        setNavPimButton={setNavPimButton}
        pimZIndex={pimZIndex}
        setPimZIndex={setPimZIndex}

        navChatBoxButton={navChatBoxButton}
        setNavChatBoxButton={setNavChatBoxButton}
        chatBoxZIndex={chatBoxZIndex}
        setChatBoxZIndex={setChatBoxZindex}
        navBarChats={navBarChats}
        setNavBarChats={setNavBarChats}

        openChats={openChats}
        setOpenChats={setOpenChats}
        onOpenChat={openChat}

        bringToFront={bringChatToFront}
        nextZ={nextZ}

        />

{/* !NEED TO INCORPERATE NEXTZ() INTO THESE  */}
        {calculatorComponent && <Calculator setCalculatorComponent={setCalculatorComponent} setNavCalculatorButton={setNavCalculatorButton} 
        calculatorPosition={calculatorPosition}
        setCalculatorPosition={setCalculatorPosition}
        calculatorInput={calculatorInput}
        setCalculatorInput={setCalculatorInput}
        calculatorResult={calculatorResult}
        setCalculatorResult={setCalculatorResult}
        calculatorZIndex={calculatorZIndex}
        setCalculatorZIndex={setCalculatorZIndex}
        componentsZIndexArray={componentsZIndexArray}
        setComponentsZIndexArray={setComponentsZIndexArray}
        /> }

        {myComputerComponent && <MyComputer 
        setMyComputerComponent={setMyComputerComponent}
        setNavMyComputerButton={setNavMyComputerButton} 
        myComputerPosition={myComputerPosition}
        setMyComputerPosition={setMyComputerPosition}
        myComputerZIndex={myComputerZIndex}
        setMyComputerZIndex={setMyComputerZIndex}
        componentsZIndexArray={componentsZIndexArray}
        setComponentsZIndexArray={setComponentsZIndexArray}
        />}

        {cinepixComponent && <Cinepix 
          setCinepixComponent={setCinepixComponent}
          setNavCinepixButton={setNavCinepixButton}
          cinepixPosition={cinepixPosition}
          setCinepixPosition={setCinepixPosition}
          cinepixZIndex={cinepixZIndex}
          setCinepixZIndex={setCinepixZIndex}
          componentsZIndexArray={componentsZIndexArray}
          setComponentZIndexArray={setComponentsZIndexArray}/>}

        {pimComponent && <Pim 
          setPimComponent={setPimComponent}
          setNavPimButton={setNavPimButton}
          pimPosition={pimPosition}
          setPimPosition={setPimPosition}
          pimZIndex={pimZIndex}
          setPimZIndex={setPimZIndex}
          componentsZIndexArray={componentsZIndexArray}
          setComponentZIndexArray={setComponentsZIndexArray}
          setNavChatBoxButton={setNavChatBoxButton}
          onOpenChat={openChat}
          nextZ={nextZ}
          bringToFront={() => setPimZIndex(nextZ())}/>}

          {Object.values(openChats)
            .filter(w => w && w.friend && w.position && !w.minimized)
            .sort((a,b) => a.zIndex - b.zIndex)
            .map(w => (
              <PimChatBox
                key={w.friend.id}
                friend={w.friend}
                position={w.position}
                setPosition={setChatPosition}
                zIndex={w.zIndex}
                bringToFront={bringChatToFront}
                maximized={w.maximized}
                setMaximized={setMaximizedChat}
                onClose={closeChat}
                onMinimize={minimizeChat}
                openChatNavButton={openChatNavButton}
                setOpenChatNavButton={setOpenChatNavButton}
              />
            ))}

    </div>
  )
}

export default App;