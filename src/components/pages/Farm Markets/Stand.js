import React, { Component } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";
import PropTypes from "prop-types";
import color from "../../../constants/colors";

// components
import Directions from "./Directions.js";
import SliderAnimation from "./SliderAnimation.js";

// styled components
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 1em;
  width: 100%;
  height: 30em;
  color: ${color.whitePrimary};
`;

const ImageContainer = transition.div.attrs({
  unmountOnExit: true,
  timeout: 3000
})`
  position: relative;
  overflow: hidden;
  width: 28em;
  height: 25em

    &:enter {
        transform: translateY(-120%);
    }

    &:enter-active {
        transform: translateY(0%);
        transition: all 1000ms ease-out 0.6s;
    }

    &:exit {
        transform: translateY(0%);
    }

    &:exit-active {
        transform: translateY(-150%);
        transition: all 1000ms ease-out;
    }
`;

const FarmImage = styled.img`
  height: 100%;
  width: 100%;
`;

const DescriptionSlider = transition.div.attrs({
  unmountOnExit: true,
  timeout: 1000
})`
    position: absolute;
    background-color: ${color.greyDark};
    bottom: 0;
    width: 100%;
    height: 50%;
    opacity: 0.8;
    text-align: center;
    font-family: 'Bitter', serif;
    font-size: 0.8em;
  
    h2 {
      padding: 0.75rem 0;
    }
  
    h3 {
      padding: 0.25rem 0;
    }
  
    p {
      padding: 0.75rem;
      font-family: 'Lato', sans-serif;
    }
  
    &:enter {
        opacity: 0.01;
        transform: translateY(100%);
    }
  
    &:enter-active {
        opacity: 0.8;
        transform: translateY(0%);
        transition: all 1000ms ease-out;
    }
  
    &:exit {
        opacity: 0.8; 
        transform: translateY(0%);
    }
  
    &:exit-active {
        opacity: 0.01;
        transform: translateY(100%);
        transition: all 1000ms ease-out;
    }
`;

const DescriptionHeader = transition.div.attrs({
  unmountOnExit: true,
  timeout: 1000
})`
      border: 2px solid ${color.whitePrimary};
      z-index: 98;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: ${props => (props.ifClicked ? "0" : "2.5em")};
      width: 15em;
      height: 2em;
      font-family: 'Ultra', serif;
      font-size: 1em;
      opacity: 0.9;
      background-color: ${color.greyDark};
      transform: ${props =>
        props.ifClicked
          ? "translateY(0%); transition: all 1000ms ease-out;"
          : "opacity: 0.01; transition: all 1000ms ease-out;"};
  
      &:enter {
          opacity: 0.01;
      }
  
      &:enter-active {
          opacity: 0.9;
          transition: all 1000ms ease-out;
      }
  
      &:exit {
          opacity: 0.9;
      }
  
      &:exit-active {
          opacity: 0.01;
          transition: all 1000ms ease-out;
      }
  `;

const DirectionContainer = transition.div.attrs({
  unmountOnExit: true,
  timeout: 3000
})`
    z-index: 97;
    position: absolute;
    height: 30em;
    width: 80%;
    background-color: ${color.greyPrimary};

    &:enter {
        transform: translateY(-100%);
    }

    &:enter-active {
        transform: translateY(0%);
        transition: all 1000ms ease-out 2s;
    }

    &:exit {
        transform: translateY(0%);
    }

    &:exit-active {
        transform: translateY(-100%);
        transition: all 1000ms ease-out;
    }
`;

class Stand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      showDirections: false
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleHover() {
    this.setState(prevState => ({
      hover: !prevState.hover
    }));
  }

  handleClick() {
    this.setState(prevState => ({
      showDirections: !prevState.showDirections
    }));
  }

  render() {
    const headerState = this.state.hover || this.state.showDirections;

    return (
      <Container
        directions={this.state.showDirections}
        showChildren={this.state.showDirections}
        onClick={this.handleClick}
      >
        <DescriptionHeader
          in={headerState}
          ifClicked={this.state.showDirections}
        >
          {this.props.standInfo.name}
        </DescriptionHeader>

        <ImageContainer
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          in={!this.state.showDirections}
        >
          <FarmImage src={this.props.standInfo.image} alt={"Ellington Stand"} />
          <DescriptionSlider in={this.state.hover}>
            {this.props.description}
          </DescriptionSlider>
        </ImageContainer>

        <SliderAnimation showState={this.state.showDirections} />

        <DirectionContainer in={this.state.showDirections}>
          <Directions
            position={this.props.standInfo.position}
            link={this.props.standInfo.directionLink}
            description={this.props.directions}
            click={this.handleClick}
          />
        </DirectionContainer>
      </Container>
    );
  }
}

Stand.propTypes = {
  standInfo: PropTypes.object
};

export default Stand;
