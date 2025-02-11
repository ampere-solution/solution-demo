"use client";

import React, {useState} from 'react'
import Image from "next/image"
import {Box, Heading, Text} from "@chakra-ui/react";
import {Button} from "@/components/ui/button";
import {MdOutlineUploadFile, MdSkipPrevious} from "react-icons/md";
import {FaPlay} from "react-icons/fa";
import {IoMicCircleSharp} from "react-icons/io5";
import {IoIosMusicalNotes} from "react-icons/io";
import {MdModeEdit} from "react-icons/md";
import {MdDelete} from "react-icons/md";
import {MdSkipNext} from "react-icons/md";
import {FaRepeat} from "react-icons/fa6";
import {IoMdDownload} from "react-icons/io";
import {PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger} from "@/components/ui/popover";
import Dailog from "@/components/ui/Dailog";

const Whisper = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={"10px"} marginBottom={"25px"}>
        <Box display={"flex"} alignItems={"center"} gap={"15px"}>
          <Button size={"lg"}><MdOutlineUploadFile/> UPLOAD A FILE</Button>
          <Button size={"lg"}><IoMicCircleSharp/> RECORD A AUDIO</Button>
          <Box style={{
            paddingLeft: "15px",
          }} display={"flex"} alignItems={"center"} gap={"15px"}>
            <Button size={"sm"} style={{
              boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
              borderRadius: "45px",
              padding: "6px 32px",
              background: "red",
              color: "white",
              textAlign: "center",
              cursor: "pointer",
            }}><FaPlay/> Start</Button>
            <Button size={"sm"} style={{
              boxShadow: "none",
              padding: "6px 32px",
              border: "1px solid red",
            }}>RESET</Button>
          </Box>
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
      <Box display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} gap={"15px"}>
        <Box boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} padding={"15px"}>
          <Heading>Input Source - Audio File</Heading>
          <Box color={"red"} border={"1px solid red"} display={"grid"} placeItems={"center"}
               padding={"25px"} marginY={"25px"}>
            <IoIosMusicalNotes/>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginY={"25px"}>
            <Heading>Input Source - Microphone</Heading>
            <Box display={"flex"} gap={"10px"} color={"red"}>
              <IoMicCircleSharp/>
              <MdModeEdit/>
              <MdDelete/>
            </Box>
          </Box>
          <Box border={"1px solid #F1F1F1"} padding={"10px"}>
            <Box position={"relative"}>
              <Box position={"absolute"} top={"50%"} transform={"transLateY(-50%)"} left={"20px"}>
                <FaRepeat size={20} color={"#77838F"}/>
              </Box>
              <Box display={"flex"} gap={"50px"} alignItems={"center"} justifyContent={"center"} color={"red"}>
                <MdSkipPrevious size={30}/>
                <Box background={"red"} borderRadius={"50%"} width={"56px"} height={"56px"} display={"grid"}
                     placeItems={"center"}>
                  <FaPlay color={"white"}/>
                </Box>
                <MdSkipNext size={30}/>
              </Box>
            </Box>
            <Box marginY={"25px"}>
              <Box background={"#F1F1F1"} height={"4px"}>
                <Box background={"red"} height={"4px"} width={"50%"}></Box>
              </Box>
              <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} color={"gray"}
                   fontSize={"14px"}>
                <Text>01:18:36</Text>
                <Text>01:57:42</Text>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button size={"sm"} style={{
              boxShadow: "none",
              padding: "6px 32px",
              border: "1px solid red",
            }} marginTop={"25px"}>RESET</Button>
          </Box>
        </Box>
        <Box boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} padding={"15px"}>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Heading>Output Audio</Heading>
            <IoMdDownload color={"red"}/>
          </Box>
          <Box marginY={"25px"} height={"calc(100% - 120px)"} display={"grid"} alignItems={"center"} paddingX={"25px"}>
            <Box position={"relative"}>
              <Box position={"absolute"} top={"50%"} transform={"transLateY(-50%)"} left={"20px"}>
                <FaRepeat size={20} color={"#77838F"}/>
              </Box>
              <Box display={"flex"} gap={"50px"} alignItems={"center"} justifyContent={"center"} color={"red"}>
                <MdSkipPrevious size={30}/>
                <Box background={"red"} borderRadius={"50%"} width={"56px"} height={"56px"} display={"grid"}
                     placeItems={"center"}>
                  <FaPlay color={"white"}/>
                </Box>
                <MdSkipNext size={30}/>
              </Box>
            </Box>
            <Box marginBottom={"25px"}>
              <Box>
                <Box position={"relative"}>
                  <Box position={"relative"} aspectRatio={"6.12"}>
                    <Image src={"/AudioWaves.png"} fill objectFit={"cover"} alt={"AudioWaves"}/>
                  </Box>
                  <Box background={"#F1F1F1"} height={"4px"} position={"absolute"} bottom={"0"} left={"0"}
                       width={"100%"}>
                    <Box background={"red"} height={"4px"} width={"100%"}></Box>
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} color={"gray"}
                     fontSize={"14px"}>
                  <Text>01:18:36</Text>
                  <Text>01:57:42</Text>
                </Box>
              </Box>

            </Box>
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={"25px"}>
            <Button size={"sm"} style={{
              boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
              borderRadius: "45px",
              padding: "6px 32px",
              background: "red",
              color: "white",
              textAlign: "center",
              cursor: "pointer",
            }}><FaPlay/> Start</Button>
          </Box>
        </Box>
        <Box boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} padding={"15px"}>
          <Heading>Transcription</Heading>
          <Box border={"1px solid #F1F1F1"} borderRadius={"4px"} height={"calc(100% - 120px)"}
               maxHeight={"300px"} overflowY={"scroll"}
               padding={"22px"} marginY={"25px"}>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
            <Text>Test transcription</Text>
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={"25px"}>
            <Button size={"sm"} style={{
              boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
              borderRadius: "45px",
              padding: "6px 32px",
              background: "red",
              color: "white",
              textAlign: "center",
              cursor: "pointer",
            }}> Stop</Button>
          </Box>
        </Box>
        <Box gridColumn={"span 3"} boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} padding={"15px"}>
          <Heading>Examples</Heading>
          <Box display={"flex"} alignItems={"center"} gap={"15px"} marginTop={"15px"}>
            <Box flexGrow={1}>
              <Box position={"relative"} aspectRatio={1.79} marginTop={"8px"}>
                <Image
                  src={"/VideoPlaceholder2.png"}
                  alt={"chart1"}
                  fill
                  objectFit={"cover"}
                />
              </Box>
            </Box>
            <Box flexGrow={1}>
              <Box position={"relative"} aspectRatio={1.79} marginTop={"8px"}>
                <Image
                  src={"/Example1.png"}
                  alt={"chart1"}
                  fill
                  objectFit={"cover"}
                />
              </Box>
            </Box>
            <Box flexGrow={1}>
              <Box position={"relative"} aspectRatio={1.79} marginTop={"8px"}>
                <Image
                  src={"/Example2.png"}
                  alt={"chart1"}
                  fill
                  objectFit={"cover"}
                />
              </Box>
            </Box>
            <Box flexGrow={1}>
              <Box position={"relative"} aspectRatio={1.79} marginTop={"8px"}>
                <Image
                  src={"/Example3.png"}
                  alt={"chart1"}
                  fill
                  objectFit={"cover"}
                />
              </Box>
            </Box>
            <Box flexGrow={1}>
              <Box position={"relative"} aspectRatio={1.79} marginTop={"8px"}>
                <Image
                  src={"/Example3.png"}
                  alt={"chart1"}
                  fill
                  objectFit={"cover"}
                />
              </Box>
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
export default Whisper
