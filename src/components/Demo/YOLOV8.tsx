"use client";

import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import {Box, Heading, Text} from "@chakra-ui/react";
import Image from "next/image";
import {MdOutlineUploadFile} from "react-icons/md";
import {FaPlay} from "react-icons/fa";
import {PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger} from "@/components/ui/popover";
import Dailog from "@/components/ui/Dailog";

const YOLOV8 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={"10px"} marginBottom={"25px"}>
        <Box display={"flex"} alignItems={"center"} gap={"15px"}>
          <Button size={"lg"}><MdOutlineUploadFile/> UPLOAD A VIDEO</Button>
          <Box style={{
            borderLeft: "1px solid red",
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
      <Box style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
      }}>
        <Box gridColumn="span 2" color={"black"}
             boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}>
          <Heading padding={"10px"}>Original
            Video</Heading>
          <Box>
            <Box position={"relative"}
                 aspectRatio={1.79} marginTop={"8px"}>
              <Image
                src={"/VideoPlaceholder1.png"}
                alt={"chart1"}
                fill
                objectFit={"cover"}
              /></Box>
          </Box>
        </Box>
        <Box gridColumn="span 2" color={"black"}
             boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}>
          <Heading padding={"10px"}>YOLO</Heading>
          <Box background={"gray.700"} color={"white"}>
            <Box position={"relative"} aspectRatio={1.79} marginTop={"8px"}>
              <Image
                src={"/VideoPlaceholder2.png"}
                alt={"chart1"}
                fill
                objectFit={"cover"}
              />
            </Box>
          </Box>
        </Box>
        <Box gridRow={"1 / span 2"} gridColumn={"5"} color={"black"} overflowY={"scroll"}
             padding={"22px"} boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}>
          <Box maxHeight={"371px"}>
            <Text paddingY={"10px"}>
              2023-09-14 11:47:29 UTC: No DSB pods present to delete
            </Text>

            <Text paddingY={"10px"}>
              2023-09-14 11:47:29 UTC: No Spark pods present to delete
            </Text>

            <Text paddingY={"10px"}>
              2023-09-14 11:47:29 UTC: No VPP pods present to delete
            </Text>

            <Text paddingY={"10px"}>
              2023-09-14 11:48:32 UTC: dsb-wrk2 pod deleted from dsb-wrk2 namespace.
            </Text>

            <Text paddingY={"10px"}>
              2023-09-14 11:48:33 UTC: dummy-spark-hadoop-pod pod deleted from spark-hadoop namespace.
            </Text>

            <Text paddingY={"10px"}>
              2023-09-14 11:48:33 UTC: No VPP pods present to delete
            </Text>
          </Box>
        </Box>
        <Box gridColumn="span 4" color={"black"} padding={"22px"}
             boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}>
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
          </Box>
        </Box>
        <Box gridColumn={"span 4"} display={"grid"} gridTemplateColumns={"subgrid"}
             color={"black"} padding={"22px"} boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}>
          <Box gridColumn={"span 2"} border={"1px solid #F1F1F1"} padding={"10px"}>
            <Heading>Ampere Host Power (W)</Heading>
            <Box position={"relative"}
                 aspectRatio={1.86} marginTop={"8px"}>
              <Image
                src={"/ChartPlaceholder.png"}
                alt={"chart1"}
                fill
                objectFit={"contain"}
              /></Box>
          </Box>
          <Box gridColumn={"span 2"} border={"1px solid #F1F1F1"} padding={"10px"}>
            <Heading>CPU Busy</Heading>
            <Box position={"relative"}
                 aspectRatio={1.86} marginTop={"8px"}>
              <Image
                src={"/ChartPlaceholder.png"}
                alt={"chart1"}
                fill
                objectFit={"contain"}
              /></Box>
          </Box>

        </Box>
        <Box boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} padding={"22px"}>
          <Heading>Power Reading in Watts</Heading>
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"}
               gap={"15px"} marginTop={"15px"}>
            <Box position={"relative"}
                 aspectRatio={1} marginTop={"8px"}>
              <Image
                src={"/CircularProgressBar1.png"}
                alt={"chart1"}
                fill
                objectFit={"contain"}
              /></Box>
            <Box position={"relative"}
                 aspectRatio={1} marginTop={"8px"}>
              <Image
                src={"/CircularProgressBar2.png"}
                alt={"chart1"}
                fill
                objectFit={"contain"}
              /></Box>
            <Box position={"relative"}
                 aspectRatio={1} marginTop={"8px"}>
              <Image
                src={"/CircularProgressBar3.png"}
                alt={"chart1"}
                fill
                objectFit={"contain"}
              /></Box>
            <Box position={"relative"}
                 aspectRatio={1} marginTop={"8px"}>
              <Image
                src={"/CircularProgressBar4.png"}
                alt={"chart1"}
                fill
                objectFit={"contain"}
              /></Box>
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
export default YOLOV8
