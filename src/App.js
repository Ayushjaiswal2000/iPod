import React, { Component } from 'react';
import Style from './App.module.css'; // Ensure this file exists and contains the necessary styles.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: ['Cover Flow', 'Music', 'Games', 'Settings'],
      activeIndex: 0,
      isGameActive: false, // Track whether the game screen is active
    };
  }

  handleMouseMove = (event) => {
    const wheel = this.wheelRef;
    if (!wheel) return; // Ensure wheel reference exists
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
    
    if (menuItems[activeIndex] === 'Games') {
      // Activate the game screen when "Games" is selected
      this.setState({ isGameActive: true });
    }
  };

  render() {
    const { menuItems, activeIndex, isGameActive } = this.state;

    return (
      <div className={Style.ipodContainer}>
        {isGameActive ? (
          <div className={Style.gameContainer}>
            {/* Game screen or icon can be placed here */}
            <i className="fas fa-gamepad" style={{ fontSize: '80px', color: '#333' }}></i>
            <p>Game Screen</p>
          </div>
        ) : (
          <>
            {/* Dynamic Heading on top of the container */}
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
        <div
          className={Style.ipodControls}
          onMouseMove={this.handleMouseMove}
          ref={(ref) => (this.wheelRef = ref)}
        >
          <div className={Style.wheel}>
            <div className={Style.buttonMenu}>MENU</div>
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
