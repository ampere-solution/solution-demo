"use client";

import React, {useState} from 'react'
import {Box, Heading, Input, Text} from '@chakra-ui/react'
import {Button} from "@/components/ui/button";
import {IoMdSettings} from "react-icons/io";
import Dailog from "@/components/ui/Dailog";
import Image from "next/image";
import {PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger} from "@/components/ui/popover";

const SergeChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" marginY={"20px"}>
        <Box display="flex" alignItems="center" gap={"10px"}>
          <Button size={"sm"} style={{
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
            borderRadius: "45px",
            padding: "6px 32px",
            background: "red",
            color: "white",
            textAlign: "center",
            cursor: "pointer",
          }}>New Chat</Button>
          <Button size={"sm"}>Download Models</Button>
          <Button size={"sm"}><IoMdSettings/></Button>
        </Box>
        <Box display="flex" alignItems="center" gap={"10px"}>
          <Button size={"sm"} style={{
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
            borderRadius: "45px",
            padding: "6px 32px",
            background: "red",
            color: "white",
            textAlign: "center",
            cursor: "pointer",
          }} onClick={() => setIsOpen(true)}>Scalability</Button>
          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button size={"sm"}>Advantages</Button>
            </PopoverTrigger>
            <PopoverContent maxHeight={"500px"} overflowY={"scroll"}>
              <PopoverBody>
                <Text>
                  Eco-Friendly Server Rack – LLAMA3 Share knowledge, save energy
                  <br/>
                  <br/>
                  Annual rack-level evaluation
                  <br/>
                  <br/>
                  🔋 Utilize 28 Ton kWh/year Energy consumption per rack annually
                  <br/>
                  <br/>
                  🌍 Utilize 20 Tons CO2 emissions CO2 emissions per rack annually
                  <br/>
                  <br/>
                  Note: Per 20 of 2U servers in 42U rack. Assume 12.5kW rack power
                  <br/>
                  <br/>
                  Customer Values
                  <br/>
                  <br/>
                  Better inference/watt vs. competition
                  Best solution in terms of unit economics for large-scale deployment of optimized small-size large
                  language models (LLMs)
                  Allow to deploy more serge-chat instances vs. competition due to high core density without noise
                  neighbor effects
                  <br/>
                  <br/>
                  How does it show?
                  <br/>
                  <br/>
                  A generative AI chatbot deployment. It processes incoming real-time input in the form of a user prompt
                  and generates the output per user’s instructions.
                  Better price/performance, power, and TCO as measured by price per million tokens without compromising
                  quality.</Text>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </Box>
      </Box>
      <Box display={"grid"} gridTemplateColumns={"1fr 2fr"} gap={"20px"} marginY={"20px"} paddingInline={"20px"}
           maxHeight={"calc(100vh - 235px)"} overflowY={"hidden"}>
        <Box boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} padding={"15px"} marginBottom={"10px"}
             maxHeight={"calc(100vh - 245px)"} overflow={"hidden"}>
          <Heading>Chat History</Heading>
          <Box padding={"10px"} overflowY={"scroll"} maxHeight={"calc(100vh - 290px)"}>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 1</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 2</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 3</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 4</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 5</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 6</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 7</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 8</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 9</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 10</Text>
            <Text
              borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 1</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 2</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 3</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 4</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 5</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 6</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 7</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 8</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 9</Text>
            <Text borderBottom={"1px solid #E3E3E3"} paddingY={"10px"}>Chat 10</Text>
          </Box>
        </Box>
        <Box boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} padding={"15px"} marginBottom={"10px"}
             maxHeight={"calc(100vh - 245px)"} overflow={"hidden"}><Heading>Serge
          Chat</Heading>
          <Box padding={"10px"} overflowY={"scroll"} maxHeight={"calc(100vh - 290px)"} height={"calc(100% - 110px)"}
               border={"1px solid #E3E3E3"}>
            <Box aria-label="chatbot-response" background={"#F1F1F1"} border={"1px solid #E6E6E6"} borderRadius={"4px"}
                 width={"60%"} marginY={"20px"} padding={"10px"}>
              <Text>
                Lorem
                ipsum dolor sit
                amet, consectetur adipiscing
                elit,
                sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut.
              </Text>
            </Box>
            <Box aria-label="user-input"
                 marginY={"20px"} display={"flex"} justifyContent={"flex-end"}>
              <Text width={"60%"} border={"1px solid #E6E6E6"} borderRadius={"4px"} padding={"10px"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut.
              </Text>
            </Box>
            <Box aria-label="chatbot-response" background={"#F1F1F1"} border={"1px solid #E6E6E6"} borderRadius={"4px"}
                 width={"60%"} marginY={"20px"} padding={"10px"}>
              <Text>
                Lorem
                ipsum dolor sit
                amet, consectetur adipiscing
                elit,
                sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut.
              </Text>
            </Box>
            <Box aria-label="user-input"
                 marginY={"20px"} display={"flex"} justifyContent={"flex-end"}>
              <Text width={"60%"} border={"1px solid #E6E6E6"} borderRadius={"4px"} padding={"10px"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut.
              </Text>
            </Box>
            <Box aria-label="chatbot-response" background={"#F1F1F1"} border={"1px solid #E6E6E6"} borderRadius={"4px"}
                 width={"60%"} marginY={"20px"} padding={"10px"}>
              <Text>
                Lorem
                ipsum dolor sit
                amet, consectetur adipiscing
                elit,
                sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut.
              </Text>
            </Box>
            <Box aria-label="user-input"
                 marginY={"20px"} display={"flex"} justifyContent={"flex-end"}>
              <Text width={"60%"} border={"1px solid #E6E6E6"} borderRadius={"4px"} padding={"10px"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut.
              </Text>
            </Box>

          </Box>
          <Box position={"relative"} marginY={"20px"}>
            <Input placeholder={"Enter your message here"} height={"60px"}/>
            <Box display={"flex"} alignItems={"center"} gap={"10px"} position={"absolute"} right={"10px"} top={"50%"}
                 transform={"translateY(-50%)"}>
              <Button size={"sm"} style={{
                boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
                borderRadius: "45px",
                padding: "6px 32px",
                background: "red",
                color: "white",
                textAlign: "center",
                cursor: "pointer",
              }}>Enter</Button>
              <Button size={"sm"}><IoMdSettings/></Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dailog isOpen={isOpen} onClose={() => setIsOpen(false)}
              title={<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"10px"}><Text>Scalability
                for YOLOv8 Model- AmpereOne vs AMD Bergamo 9754</Text>
                <Button onClick={() => setIsOpen(false)} size={"sm"} style={{
                  background: "none",
                  color: "gray",
                  boxShadow: "none",
                }}>X</Button></Box>}
              body={<>
                <Image src={"/scalability-chart.jpeg"} alt={"SergeChat"} width={1000} height={1000}/>
              </>}/>

    </Box>
  )
}
export default SergeChat;
