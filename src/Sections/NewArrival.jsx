import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import img1 from '../assets/Images/1.webp'
import img2 from '../assets/Images/2.webp'
import img3 from '../assets/Images/3.webp'
import img4 from '../assets/Images/4.webp'
import img5 from '../assets/Images/5.webp'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const Section = styled.section`

    min-height: 100vh;
    width: 100vw;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    // background-color: yellow;
`

const Overlay = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    height: 90vh;

    box-shadow: 0 0 0 5vw ${props => props.theme.text};
    border: 3px solid ${props => props.theme.body};
    z-index: 11;

    @media (max-width: 70em) {
        width: 40vw;
        height: 80vh;
    }

    @media (max-width: 64em) {
        width: 50vw;
        box-shadow: 0 0 0 60vw ${props => props.theme.text};
    }

    @media (max-width: 48em) {
        width: 60vw;
    }
    
    @media (max-width: 30em) {
        width: 80vw;
        height: 60vh;
    }
`

const Title = styled.h1`

    font-size: ${props => props.theme.fontxxxl};
    font-family: "Kaushan Script";
    font-weight: 300;
    text-transform: capitalize;

    text-shadow: 1px 1px 1px ${props => props.theme.text};
    color: ${props => props.theme.body};
    position: absolute;
    top: 1rem;
    left: 5%;
    z-index: 11;

    @media (max-width: 64em) {
        font-size: ${props => props.theme.fontxxxl};
    }
    @media (max-width: 48em) {
        font-size: ${props => props.theme.fontxl};
    }

`
const Text = styled.div`
    width: 20%;
    font-size: ${props => props.theme.fontlg};
    font-weight: 300;
    position: absolute;
    padding: 2rem;
    top: 0;
    right: 0;
    z-index: 11;

    @media (max-width: 48em) {
        display: none;
    }
`

const Container = styled.div`

    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 25vw;
    height: auto;
    // width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 64em) {
        width: 30vw;
    }
    @media (max-width: 48em) {
        width: 40vw;
    }
    @media (max-width: 30em) {
        width: 60vw;
    }

`

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 5rem 0;
    img {
        width: 100%;
        height: auto;
        z-index: 5;
    }

`

const Product = ({img, title=''}) => {
    return (
        <Item       
        >
            <img src={img} alt={title} />
            <h2>{title}</h2>
        </Item>
    )
}

const NewArrival = () => {
    gsap.registerPlugin(ScrollTrigger);
    const ref = useRef(null)
    const ScrollingRef = useRef(null)


    const allImage = [img1, img2, img3, img4, img5]

    useEffect(() => {
        let element = ref.current;
        let scrollingElement = ScrollingRef.current;
        let t1 = gsap.timeline();
  
        setTimeout(() => {
          t1.to(element, {
              scrollTrigger: {
                  trigger: element, 
                  start: 'top top',
                  end: 'bottom+=100% top-=100%',
                  scroller: '.App', // locomotive element
                  scrub: true,
                  pin: true,
                //   markers: true,
              },
              // We have to increase scrolling height of this element same as the scrolling element width
              ease: 'none'
          })
  
          // Vertical Scroll
          t1.fromTo(scrollingElement, {
            y: '0',
          }, {
              y: '-100%',
              scrollTrigger: {
                  trigger: scrollingElement, 
                  start: 'top top',
                  end: 'bottom top',
                  scroller: '.App', // locomotive element
                  scrub: true,
                //   markers: true,
              },
              // We have to increase scrolling height of this element same as the scrolling element width 
          })
          ScrollTrigger.refresh();
        }, 1000)
      
        return () => {
          // Let's clear instance 
          t1.kill();
          ScrollTrigger.kill()
        }
      }, [])
    return (
        <Section ref={ref} id="new-arrival">
            <Overlay />
            <Title
                data-scroll data-scroll-speed="-2"
                data-scroll-direction="horizontal"
            >New Collection</Title>


        <Container ref={ScrollingRef}>
            {
                allImage.map((image, id=0) => <Product key={id+1} img={image} title="xyz" />)
            }
        </Container>


            <Text data-scroll data-scroll-speed="-4">
                There is new collection available for cool clothes in all sizes.
                This collection is a great way to find a new look for you.
                It offers a variety of cool apparel styles to fit your taste, while you can also find some cool clothes that you can wear everyday.
                <br />
                <br />
                The first line of clothing you will see on this collection is for men.
                The collection also includes three new styles for women.
                <br />
                <br />
                Give it a try and experience a new look.
            </Text>
        </Section>
    )
}

export default NewArrival