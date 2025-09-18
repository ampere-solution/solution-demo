"use client";

import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Box, Card, Heading, Button, Switch, Text} from "@chakra-ui/react";
import {IoMdSwap} from "react-icons/io";
import socket from "@/lib/socket/socket";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {TiArrowLeft} from "react-icons/ti";
import {keyframes} from "@emotion/react";
import CacheIcon from "@/components/CacheIcon";
import WebServerIcon from "@/components/WebServerIcon";
import LoadBalancerIcon from "@/components/LoadBalancerIcon";
import {DSB_MIGRATION_GRAFANA_LINKS} from "@/constants/common";


const X86_TO_ARM = "X86_TO_ARM";
const ARM_TO_X86 = "ARM_TO_X86";
type MyDirection = typeof X86_TO_ARM | typeof ARM_TO_X86;

const growLine = keyframes`
    from {
        transform: scaleX(0);
    }
    to {
        transform: scaleX(1);
    }
`;

const moveArrow = keyframes`
    from {
        right: 0;
    }
    to {
        right: 100%;
    }
`;


const animation = `${growLine} 2s ease-in-out infinite`;
const arrowAnimation = `${moveArrow} 2s ease-in-out infinite`;

const Connector = ({eventPostFix, isRunning = false, service, ...props}: {
  eventPostFix: MyDirection
  isRunning: boolean;
  service: string;
}) => {

  if (!isRunning) {
    return <Box/>;
  }

  if (service === "database") {
    return (
      <Box
        display="flex"
        alignItems="center"
        position="relative"
        transform={eventPostFix === X86_TO_ARM ? "rotate(180deg)" : "0deg"}
        {...props}
      >
        <Box
          position="absolute"
          right="0"
          top="50%"
          animation={arrowAnimation}
          transform="translateY(-50%)"
          mr="-7px"
        >
          <TiArrowLeft size="25px" fill="red"/>
        </Box>

        <Box
          flex={"1"}
          height="2px"
          bg="red"
          animation={animation}
          transformOrigin="right"
        />
        <Box
          width="2px"
          bg="red"
          height="50%"
          position="absolute"
          right="0"
          {...eventPostFix === ARM_TO_X86 ? {bottom: "0"} : {top: "0"}}
        />
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      position="relative"
      transform={eventPostFix === X86_TO_ARM ? "rotate(180deg)" : "0deg"}
      {...props}
    >
      <Box
        position="absolute"
        right="0"
        top="50%"
        animation={arrowAnimation}
        transform="translateY(-50%)"
        mr="-7px"
      >
        <TiArrowLeft size="25px" fill="red"/>
      </Box>

      <Box
        flex={"1"}
        height="2px"
        bg="red"
        animation={animation}
        transformOrigin="right"
      />
      <Box
        width="2px"
        bg="red"
        height="100%"
        position="absolute"
        right="0"
        bottom="0"
      />
    </Box>
  )
}


const DsbMigration = () => {
  const [logs, setLogs] = useState<string[]>([""]);
  const [checked, setChecked] = useState(false);
  const [running, setRunning] = useState(false); //TODO - make it false by default
  const [migrationCount, setMigrationCount] = useState(0);
  const [eventPostFix, setEventPostFix] = useState<MyDirection>(ARM_TO_X86); //TODO - make it ARM_TO_X86 by default
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState({
    ARM: 400,
    X86: 400
  })
  const [dbSizes, setDbSizes] = useState({
    ARM: 0,
    X86: 0,
  });
  const [isMigrationError, setIsMigrationError] = useState({
    message: "",
    value: false
  });

  useEffect(() => {
    if (logsContainerRef.current) {
      // eslint-disable-next-line
      //@ts-ignore
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logsContainerRef, logs])

  useEffect(() => {
    if (migrationCount == 2) {
      setRunning(false);
    }
  }, [migrationCount]);

  const handleStartMigration = () => {
    setLogs([""]);
    setMigrationCount(0);
    setRunning(true);
    setDbSizes({
      ARM: 0,
      X86: 0
    })
    setIsMigrationError({
      message: "",
      value: false
    })
    setTimeout(() => {
      setLogs([...logs, `\n\n[UI] Run requested. - ${eventPostFix}\n\n`]);
      socket.emit(`run:all-${eventPostFix}`);
    }, 2000)

  }

  const handleRunWrk = (arch: "X86" | "ARM") => {
    if (arch === "X86") {
      socket.emit("wrkRunX86");
    } else {
      socket.emit("wrkRunArm");
    }
  }

  const handleFlushDB = (arch: "X86" | "ARM") => {
    if (arch === "X86") {
      socket.emit("flushDBOnX86");
    } else {
      socket.emit("flushDBOnArm");
    }
  }


  // const handleStopMigration = () => {
  //   socket.emit(`run:stop-${eventPostFix}`);
  // }

  useEffect(() => {
    socket.on("connect", () => {
      setLogs([...logs, "[INFO] Connected to server.\n"]);
      if (!running) setRunning(false);
    });

    socket.on("disconnect", () => {
      setLogs([...logs, "[INFO] Disconnected from server.\n"]);
      setRunning(false);
    });

    socket.on("log", (data) => {
      setLogs([...logs, `\n${data}\n`]);

      if (/\[WARN] A process is already running/.test(data)) {
        console.log("already running log - true");
        // Keep as running; user can click Stop if needed
        setRunning(true);
      }
      if (/\[INFO] No running process to stop\./.test(data)) {
        console.log("No running process to stop log - false");
        setRunning(false);
      }
    });

    socket.on("MigrationSuccess", (data) => {
      setMigrationCount(() => migrationCount + data)
    })

    socket.on("MigrationError", (data) => {
      setRunning(false);
      setIsMigrationError({
        message: data,
        value: true
      })
      console.log("MigrationError event ", data);
    })

    socket.on("ARM-status", (data) => {
      setStatus({...status, ARM: data});
    })

    socket.on("X86-status", (data) => {
      setStatus({...status, X86: data});
    })

    socket.on("ARM-DB-OBJECTS", (data) => {
      setDbSizes({...dbSizes, ARM: data});
    })

    socket.on("X86-DB-OBJECTS", (data) => {
      setDbSizes({...dbSizes, X86: data});
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("log");
      socket.off("MigrationSuccess");
      socket.off("MigrationError");
      socket.off("ARM-status");
      socket.off("X86-status");
    };
  }, [dbSizes, logs, migrationCount, running, status]);

  const getFillAndStroke = useCallback((service: string) => {
    let result = {
      "X86": {
        stroke: "#666666",
        fill: "white"
      },
      "ARM": {
        stroke: "#666666",
        fill: "white"
      }
    }

    if (service !== "database") {
      result = {
        "X86": {
          stroke: "#666666",
          fill: "#666666"
        },
        "ARM": {
          stroke: "#666666",
          fill: "#666666"
        }
      }
    }

    // for x86 -> arm
    if (eventPostFix.split("_TO_")[0] === "X86") {
      if (running) {
        if (service === "database") {
          result["X86"] = {
            fill: "white",
            stroke: "red"
          }

          result["ARM"] = {
            fill: "white",
            stroke: "#666666"
          }
        } else {
          result["X86"] = {
            fill: "red",
            stroke: "red"
          }

          result["ARM"] = {
            fill: "#666666",
            stroke: "#666666"
          }
        }
      }

      if (migrationCount == 2) {
        if (service === "database") {
          result["X86"] = {
            fill: "white",
            stroke: "#666666"
          }

          result["ARM"] = {
            fill: "red",
            stroke: "white"
          }
        } else {
          result["X86"] = {
            fill: "#666666",
            stroke: "#666666"
          }

          result["ARM"] = {
            fill: "red",
            stroke: "red"
          }
        }
      }
    }


    // for arm -> x86 side
    if (eventPostFix.split("_TO_")[0] === "ARM") {
      if (running) {
        if (service === "database") {
          result["X86"] = {
            fill: "white",
            stroke: "#666666"
          }

          result["ARM"] = {
            fill: "white",
            stroke: "red"
          }
        } else {
          result["X86"] = {
            fill: "#666666",
            stroke: "#666666"
          }

          result["ARM"] = {
            fill: "red",
            stroke: "red"
          }
        }
      }

      if (migrationCount == 2) {
        if (service === "database") {
          result["X86"] = {
            fill: "red",
            stroke: "white"
          }

          result["ARM"] = {
            fill: "white",
            stroke: "#666666"
          }
        } else {
          result["X86"] = {
            fill: "red",
            stroke: "red"
          }

          result["ARM"] = {
            fill: "#666666",
            stroke: "#666666"
          }
        }
      }
    }

    return result;
  }, [eventPostFix, migrationCount, running]);

  return (
    <Box display={"grid"} gridTemplateColumns={"1.5fr 5fr"} gridColumn={"span 3"} gap={"20px"} paddingX={"20px"}>
      <Card.Root padding={"20px"}>
        <Button backgroundColor={"red"}
                onClick={handleStartMigration}
                disabled={running}
        ><IoMdSwap/> PORT</Button>
        <Box
          mt={"20px"}
          height={"calc(100vh - 320px)"}
          overflowX="auto"
          ref={logsContainerRef}
        >
          {logs.map((log, index) => (
            <Text key={index} marginBlock={"10px"}>
              {log}
            </Text>
          ))}
        </Box>
      </Card.Root>
      <Box>
        <Box display={"grid"} gridTemplateColumns={"2fr 0.5fr 2fr"} gap={"20px"} rowGap={0}>
          <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"} border={"1px solid"}
                   borderColor={"gray.200"}>DSB
            Stack</Heading>
          <Heading padding={"15px"}></Heading>
          <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"} border={"1px solid"}
                   borderColor={"gray.200"}>DSB Stack</Heading>
          <Heading size={"sm"} color={"red.500"} textAlign={"center"} padding={"5px"} border={"1px solid"}
                   borderColor={"gray.200"}>X86</Heading>
          <Box textAlign={"center"} my={"auto"}>
            <Switch.Root checked={checked}
                         disabled={running}
                         onCheckedChange={(e) => {
                           if (migrationCount === 2) {
                             setLogs([""]);
                             setMigrationCount(0);
                             setRunning(false);
                             setIsMigrationError({
                               message: "",
                               value: false
                             })
                             setDbSizes({
                               ARM: 0,
                               X86: 0
                             })
                           }
                           if (e.checked) {
                             setEventPostFix(X86_TO_ARM)
                           } else {
                             setEventPostFix(ARM_TO_X86)
                           }
                           setChecked(!checked)
                         }}>
              <Switch.HiddenInput/>
              <Switch.Label>X86</Switch.Label>
              <Switch.Control>
                <Switch.Thumb/>
              </Switch.Control>
              <Switch.Label>ARM</Switch.Label>
            </Switch.Root>
          </Box>
          <Heading size={"sm"} color={"red.500"} textAlign={"center"} padding={"5px"} border={"1px solid"}
                   borderColor={"gray.200"}>ARM</Heading>
        </Box>
        <Box position="relative" height={"calc(100vh - 320px)"}>
          <Box position="absolute" left="50%" top={0} bottom={0} transform="translateX(-50%)" zIndex={0}
               pointerEvents="none">
          </Box>
          <Box data-id={"database"}>
            <Box display={"grid"} gridTemplateColumns={"2fr 0.5fr 2fr"} gap={"20px"} rowGap={0}>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"} border={"1px solid"}
                         borderColor={"gray.200"}>Current Database: {dbSizes.X86} Objects</Heading>
                <Box border={"1px solid"}
                     borderColor={"gray.200"}
                     padding={"10px"}
                >
                  <Text padding={"0px 20px"} fontSize={"sm"}><Text as={"span"}
                                                                   fontWeight={"bold"}
                                                                   color={status.X86 === 200 ? "green" : "red"}>{status.X86}</Text> http://localhost:8080/api/user/register</Text>
                  <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"}
                       justifyContent={"space-between"}
                  >

                    <Box
                      position={"relative"}
                      className="connector-target-left"
                      data-target="left"
                      borderRadius={"50%"}
                      backgroundColor={"white"}
                      padding={"5px"}
                      width={"70px"}
                      aspectRatio={1}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                    >
                      <Box
                        position={"absolute"}
                        left={"-4px"}
                        filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                        borderRadius={"50%"}
                        width={"20px"}
                        aspectRatio={1}
                        background={"white"}
                        zIndex={1}
                      >
                        {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "X86" ? (
                          <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                      </Box>
                      <Box
                        boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                        filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                        padding={"10px"}
                        borderRadius={"50%"}
                      >
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M31.905 8.11366C31.905 10.5267 25.9032 12.4828 18.4996 12.4828C11.096 12.4828 5.09424 10.5267 5.09424 8.11366M31.905 8.11366C31.905 5.70064 25.9032 3.74451 18.4996 3.74451C11.096 3.74451 5.09424 5.70064 5.09424 8.11366M31.905 8.11366V28.503C31.905 30.9206 25.9471 32.8722 18.4996 32.8722C11.0522 32.8722 5.09424 30.9206 5.09424 28.503V8.11366M31.905 18.3083C31.905 20.7259 25.9471 22.6775 18.4996 22.6775C11.0522 22.6775 5.09424 20.7259 5.09424 18.3083"
                            stroke={getFillAndStroke("database").X86.stroke}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            fill={getFillAndStroke("database").X86.fill}/>
                        </svg>
                        {/*<Image src={"/svg/database.svg"} alt={"db icon"} width={40} height={40}/>*/}
                      </Box>
                    </Box>
                    <Box height="90px" width="250px" overflow="hidden">
                      <iframe src={DSB_MIGRATION_GRAFANA_LINKS.x86.database} width={"100%"} height={"100%"}/>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Connector eventPostFix={eventPostFix} isRunning={running} service={"database"}/>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"} border={"1px solid"}
                         borderColor={"gray.200"}>Current Database: {dbSizes.ARM} Objects</Heading>
                <Box
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  padding={"10px"}
                >
                  {isMigrationError.value ? (<Text>{isMigrationError.value}</Text>) : (
                    <Text padding={"0px 20px"} fontSize={"sm"}><Text as={"span"}
                                                                     fontWeight={"bold"}
                                                                     color={status.ARM === 200 ? "green" : "red"}>{status.ARM}</Text> http://localhost:8080/api/user/register</Text>)}

                  <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"}
                       justifyContent={"space-between"}
                  >
                    <Box
                      position={"relative"}
                      className="connector-target-left"
                      data-target="right"
                      borderRadius={"50%"}
                      backgroundColor={"white"}
                      padding={"5px"}
                      width={"70px"}
                      aspectRatio={1}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                    >
                      <Box
                        position={"absolute"}
                        left={"-4px"}
                        filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                        borderRadius={"50%"}
                        width={"20px"}
                        aspectRatio={1}
                        background={"white"}
                        zIndex={1}
                      >
                        {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "ARM" ? (
                          <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                      </Box>
                      <Box
                        boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                        filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                        padding={"10px"}
                        borderRadius={"50%"}
                      >
                        {/*<Image src={"/svg/database.svg"} alt={"db icon"} width={40} height={40}/>*/}
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M31.905 8.11366C31.905 10.5267 25.9032 12.4828 18.4996 12.4828C11.096 12.4828 5.09424 10.5267 5.09424 8.11366M31.905 8.11366C31.905 5.70064 25.9032 3.74451 18.4996 3.74451C11.096 3.74451 5.09424 5.70064 5.09424 8.11366M31.905 8.11366V28.503C31.905 30.9206 25.9471 32.8722 18.4996 32.8722C11.0522 32.8722 5.09424 30.9206 5.09424 28.503V8.11366M31.905 18.3083C31.905 20.7259 25.9471 22.6775 18.4996 22.6775C11.0522 22.6775 5.09424 20.7259 5.09424 18.3083"
                            stroke={getFillAndStroke("database").ARM.stroke}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            fill={getFillAndStroke("database").ARM.fill}/>
                        </svg>
                      </Box>
                    </Box>
                    <Box height="90px" width="250px" overflow="hidden">
                      <iframe src={DSB_MIGRATION_GRAFANA_LINKS.arm.database} width={"100%"} height={"100%"}/>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box data-id={"cache"}>
            <Box display={"grid"} gridTemplateColumns={"2fr 0.5fr 2fr"} gap={"20px"} rowGap={0}>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"}>Cache</Heading>
                <Box
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  padding={"10px"}
                >
                  <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"}
                       justifyContent={"space-between"}
                  >
                    <Box
                      position={"relative"}
                      className="connector-target-left"
                      data-target="left"
                      borderRadius={"50%"}
                      backgroundColor={"white"}
                      padding={"5px"}
                      width={"70px"}
                      aspectRatio={1}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                    >
                      <Box
                        position={"absolute"}
                        left={"-4px"}
                        filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                        borderRadius={"50%"}
                        width={"20px"}
                        aspectRatio={1}
                        background={"white"}
                        zIndex={1}
                      >
                        {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "X86" ? (
                          <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                      </Box>
                      <Box
                        boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                        filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                        padding={"10px"}
                        borderRadius={"50%"}
                      >
                        <CacheIcon fill={getFillAndStroke("cache").X86.fill}
                                   stroke={getFillAndStroke("cache").X86.stroke}/>
                        {/*<Image src={"/svg/cache.svg"} alt={"db icon"} width={40} height={40}/>*/}
                      </Box>
                    </Box>
                    <Box height="90px" width="250px" overflow="hidden">
                      <iframe src={DSB_MIGRATION_GRAFANA_LINKS.x86.cache} width={"100%"} height={"100%"}/>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Connector eventPostFix={eventPostFix} isRunning={running} service={"cache"}/>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"}>Cache</Heading>
                <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"} justifyContent={"space-between"}
                     border={"1px solid"}
                     borderColor={"gray.200"}
                     padding={"10px"}
                >
                  <Box
                    position={"relative"}
                    className="connector-target-left"
                    data-target="right"
                    borderRadius={"50%"}
                    backgroundColor={"white"}
                    padding={"5px"}
                    width={"70px"}
                    aspectRatio={1}
                    filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                  >
                    <Box
                      position={"absolute"}
                      left={"-4px"}
                      filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                      borderRadius={"50%"}
                      width={"20px"}
                      aspectRatio={1}
                      background={"white"}
                      zIndex={1}
                    >
                      {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "ARM" ? (
                        <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                    </Box>
                    <Box
                      boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                      padding={"10px"}
                      borderRadius={"50%"}
                    >
                      <CacheIcon fill={getFillAndStroke("cache").ARM.fill}
                                 stroke={getFillAndStroke("cache").ARM.stroke}/>
                      {/*<Image src={"/svg/cache.svg"} alt={"db icon"} width={40} height={40}/>*/}
                    </Box>
                  </Box>
                  <Box height="90px" width="250px" overflow="hidden">
                    <iframe src={DSB_MIGRATION_GRAFANA_LINKS.arm.cache} width={"100%"} height={"100%"}/>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box data-id={"webserver"}>
            <Box display={"grid"} gridTemplateColumns={"2fr 0.5fr 2fr"} gap={"20px"} rowGap={0}>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"}>Webserver</Heading>
                <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"} justifyContent={"space-between"}
                     border={"1px solid"}
                     borderColor={"gray.200"}
                     padding={"10px"}
                >
                  <Box
                    position={"relative"}
                    className="connector-target-left"
                    data-target="left"
                    borderRadius={"50%"}
                    backgroundColor={"white"}
                    padding={"5px"}
                    width={"70px"}
                    aspectRatio={1}
                    filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                  >
                    <Box
                      position={"absolute"}
                      left={"-4px"}
                      filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                      borderRadius={"50%"}
                      width={"20px"}
                      aspectRatio={1}
                      background={"white"}
                      zIndex={1}
                    >
                      {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "X86" ? (
                        <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                    </Box>
                    <Box
                      boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                      padding={"10px"}
                      borderRadius={"50%"}
                    >
                      {/*<Image src={"/svg/webServer.svg"} alt={"db icon"} width={40} height={40}/>*/}
                      <WebServerIcon fill={getFillAndStroke("webServer").X86.fill}
                                     stroke={getFillAndStroke("webServer").X86.stroke}/>
                    </Box>
                  </Box>
                  <Box height="90px" width="250px" overflow="hidden">
                    <iframe src={DSB_MIGRATION_GRAFANA_LINKS.x86.webServer} width={"100%"} height={"100%"}/>
                  </Box>
                </Box>
              </Box>
              <Connector eventPostFix={eventPostFix} isRunning={running} service={"WebServer"}/>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"}>Webserver</Heading>
                <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"} justifyContent={"space-between"}
                     border={"1px solid"}
                     borderColor={"gray.200"}
                     padding={"10px"}
                >
                  <Box
                    position={"relative"}
                    className="connector-target-left"
                    data-target="left"
                    borderRadius={"50%"}
                    backgroundColor={"white"}
                    padding={"5px"}
                    width={"70px"}
                    aspectRatio={1}
                    filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                  >
                    <Box
                      position={"absolute"}
                      left={"-4px"}
                      filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                      borderRadius={"50%"}
                      width={"20px"}
                      aspectRatio={1}
                      background={"white"}
                      zIndex={1}
                    >
                      {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "ARM" ? (
                        <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                    </Box>
                    <Box
                      boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                      padding={"10px"}
                      borderRadius={"50%"}
                    >
                      {/*<Image src={"/svg/webServer.svg"} alt={"db icon"} width={40} height={40}/>*/}
                      <WebServerIcon fill={getFillAndStroke("webServer").ARM.fill}
                                     stroke={getFillAndStroke("webServer").ARM.stroke}/>
                    </Box>
                  </Box>
                  <Box height="90px" width="250px" overflow="hidden">
                    <iframe src={DSB_MIGRATION_GRAFANA_LINKS.arm.webServer} width={"100%"} height={"100%"}/>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box data-id={"loadBalancer"}>
            <Box display={"grid"} gridTemplateColumns={"2fr 0.5fr 2fr"} gap={"20px"} rowGap={0}>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"}>LoadBalancer</Heading>
                <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"} justifyContent={"space-between"}
                     border={"1px solid"}
                     borderColor={"gray.200"}
                     padding={"10px"}
                >
                  <Box
                    position={"relative"}
                    className="connector-target-left"
                    data-target="left"
                    borderRadius={"50%"}
                    backgroundColor={"white"}
                    padding={"5px"}
                    width={"70px"}
                    aspectRatio={1}
                    filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                  >
                    <Box
                      position={"absolute"}
                      left={"-4px"}
                      filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                      borderRadius={"50%"}
                      width={"20px"}
                      aspectRatio={1}
                      background={"white"}
                      zIndex={1}
                    >
                      {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "X86" ? (
                        <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                    </Box>
                    <Box
                      boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                      padding={"10px"}
                      borderRadius={"50%"}
                    >
                      {/*<Image src={"/svg/loadBalancer.svg"} alt={"db icon"} width={40} height={40}/>*/}
                      <LoadBalancerIcon fill={getFillAndStroke("loadBalancer").X86.fill}
                                        stroke={getFillAndStroke("loadBalancer").X86.stroke}/>
                    </Box>
                  </Box>
                  <Box height="90px" width="250px" overflow="hidden">
                    <iframe src={DSB_MIGRATION_GRAFANA_LINKS.x86.loadBalancer} width={"100%"} height={"100%"}/>
                  </Box>
                </Box>
              </Box>
              <Box position={"relative"}>
                {/* @ts-expect-error passing additional prop height */}
                <Connector eventPostFix={eventPostFix} isRunning={running} service={"loadBalancer"} height={"100%"}/>
                <Box mt={"100%"} textAlign={"center"} border="1px solid red" position={"absolute"}
                     bottom={"0"} width={"100%"}>WRK</Box>
              </Box>
              <Box>
                <Heading textAlign={"center"} size={"sm"} background={"red.100"} padding={"7px"}>LoadBalancer</Heading>
                <Box width={"100%"} display={"flex"} gap={"20px"} alignItems={"center"} justifyContent={"space-between"}
                     border={"1px solid"}
                     borderColor={"gray.200"}
                     padding={"10px"}
                >
                  <Box
                    position={"relative"}
                    className="connector-target-left"
                    data-target="left"
                    borderRadius={"50%"}
                    backgroundColor={"white"}
                    padding={"5px"}
                    width={"70px"}
                    aspectRatio={1}
                    filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25)) drop-shadow(4px 4px 10px rgba(174, 174, 192, 0.20));"}
                  >
                    <Box
                      position={"absolute"}
                      left={"-4px"}
                      filter={"drop-shadow(0 4px 4px rgba(0, 0, 0, 0.10))"}
                      borderRadius={"50%"}
                      width={"20px"}
                      aspectRatio={1}
                      background={"white"}
                      zIndex={1}
                    >
                      {migrationCount === 2 && eventPostFix.split("_TO_")[0] === "ARM" ? (
                        <IoMdCheckmarkCircleOutline color={"#02CDB7"}/>) : null}
                    </Box>
                    <Box
                      boxShadow={"4px 4px 10px 0 rgba(174, 174, 192, 0.20) inset"}
                      filter={"drop-shadow(-4px -4px 10px rgba(255, 255, 255, 0.25))"}
                      padding={"10px"}
                      borderRadius={"50%"}
                    >
                      {/*<Image src={"/svg/loadBalancer.svg"} alt={"db icon"} width={40} height={40}/>*/}
                      <LoadBalancerIcon fill={getFillAndStroke("loadBalancer").ARM.fill}
                                        stroke={getFillAndStroke("loadBalancer").ARM.stroke}/>
                    </Box>
                  </Box>
                  <Box height="90px" width="250px" overflow="hidden">
                    <iframe src={DSB_MIGRATION_GRAFANA_LINKS.arm.loadBalancer} width={"100%"} height={"100%"}/>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display={"grid"} gridTemplateColumns={"2fr 0.5fr 2fr"} gap={"20px"}>
            <Box>
              <Button backgroundColor={"red"} mr={"10px"} onClick={() => handleFlushDB("X86")}>Flush DB</Button>
              <Button border={"1px solid"} borderColor={"red"} backgroundColor={"white"} color={"red"}
                      onClick={() => handleRunWrk("X86")}>WRK</Button>
            </Box>
            <Box/>
            <Box justifySelf={"end"}>
              <Button backgroundColor={"red"} mr={"10px"} onClick={() => handleFlushDB("ARM")}>Flush DB</Button>
              <Button border={"1px solid"} borderColor={"red"} backgroundColor={"white"} color={"red"}
                      onClick={() => handleRunWrk("ARM")}>WRK</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default DsbMigration

