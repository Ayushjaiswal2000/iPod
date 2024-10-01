import React, { Component } from 'react';
import Style from './App.module.css'; // Ensure this file exists and contains the necessary styles.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: ['Cover Flow', 'Music', 'Games', 'Settings'],
      activeIndex: 0,
      isGameActive: false,
      isCoverFlowActive: false,
      isMusicActive: false,
      isSettingsActive: false,
      isMenu: true,
      isMouseDown: false, // Track mouse down state
    };
  }

  handleMouseDown = () => {
    this.setState({ isMouseDown: true });
  };

  handleMouseUp = () => {
    this.setState({ isMouseDown: false });
  };

  handleMouseMove = (event) => {
    const { isMouseDown } = this.state; // Get the mouse down state
    const wheel = this.wheelRef;
    if (!wheel || !isMouseDown) return; // Ensure wheel reference exists and mouse is down

    const wheelRect = wheel.getBoundingClientRect();
    const mouseY = event.clientY - wheelRect.top;
    const wheelHeight = wheelRect.height;
    const newIndex = Math.floor((mouseY / wheelHeight) * this.state.menuItems.length);

    // Set the new active index, ensuring it's within bounds
    if (newIndex >= 0 && newIndex < this.state.menuItems.length) {
      this.setState({ activeIndex: newIndex });
    }
  };

  handleCenterClick = () => {
    const { activeIndex, menuItems } = this.state;
    this.setState({ isMenu: false }); // Close the menu when an item is selected

    if (menuItems[activeIndex] === 'Games') {
      this.setState({ isGameActive: true });
    } else if (menuItems[activeIndex] === 'Cover Flow') {
      this.setState({ isCoverFlowActive: true });
    } else if (menuItems[activeIndex] === 'Music') {
      this.setState({ isMusicActive: true });
    } else if (menuItems[activeIndex] === 'Settings') {
      this.setState({ isSettingsActive: true });
    }
  };

  handleMenuClick = () => {
    if (this.state.isGameActive || this.state.isCoverFlowActive || this.state.isMusicActive || this.state.isSettingsActive) {
      // Reset the state when going back to the menu
      this.setState({ isMenu: true, isGameActive: false, isCoverFlowActive: false, isMusicActive: false, isSettingsActive: false, activeIndex: 0 });
    } else {
      this.setState({ isMenu: true }); // Open the menu if already in menu
    }
  };

  render() {
    const { menuItems, activeIndex, isGameActive, isCoverFlowActive, isMusicActive, isSettingsActive, isMenu } = this.state;

    return (
      <div className={Style.ipodContainer}>
        {isGameActive ? (
         <div className={`${Style.gameContainer} ${Style.ipodScreen}`}>
          
            <p style={{marginLeft:'70px'}}>Game Screen</p>
            <img className={Style.bounce} src="https://cdn-icons-png.flaticon.com/128/10147/10147124.png" alt="Game Icon" style={{ width: '130px', height: '130px' }} />
          </div>
        ) : isCoverFlowActive ? (
          <div className={`${Style.coverFlowContainer}  ${Style.ipodScreen}`}>
            <p style={{marginLeft:'50px'}}>Cover Flow Screen</p>
          </div>
        ) : isMusicActive ? (
          <div className={`${Style.musicContainer}  ${Style.ipodScreen}`}>
            <p style={{marginLeft:'70px'}}>Music Screen</p>
            <img className={Style.bounce} src="https://as1.ftcdn.net/v2/jpg/05/82/46/04/1000_F_582460459_dPFQtVYmznmhk6R9xzscOjL1j0LMorDG.jpg" alt="Game Icon" style={{ width: '100px', height: '100px' }} />

          </div>
        ) : isSettingsActive ? (
          <div className={`${Style.settingsContainer}  ${Style.ipodScreen}`}>
            <p style={{marginLeft:'60px'}}>Settings Screen</p>
            <img className={Style.bounce} src="https://cdn-icons-png.flaticon.com/128/14665/14665744.png" alt="Game Icon" style={{ width: '100px', height: '100px' }} />

          </div>
        ) : (
          <>
            {isMenu && ( // Render the menu if isMenu is true
              <>
                <div className={Style.ipodHeader}>
                  <h1 className={Style.dynamicHeading}>{menuItems[activeIndex]}</h1>
                </div>
                <div className={Style.ipodScreen}>
                  <ul className={Style.ipodMenu}>
                    {menuItems.map((item, index) => (
                      <li key={index} className={`${Style.menuItem} ${index === activeIndex ? Style.active : ''}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>
        )}
        <div
          className={Style.ipodControls}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown} // Handle mouse down event
          onMouseUp={this.handleMouseUp} // Handle mouse up event
          ref={(ref) => (this.wheelRef = ref)}
        >
          <div className={Style.wheel}>
            <div
              className={Style.buttonMenu}
              onClick={this.handleMenuClick}
            >
              MENU
            </div>
            <div
              className={Style.buttonCenter}
              onClick={this.handleCenterClick} // Handle center click event
            ></div>
            <div className={Style.buttonPrev}>◀</div>
            <div className={Style.buttonPlayPause}>▶/||</div>
            <div className={Style.buttonNext}>▶</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
