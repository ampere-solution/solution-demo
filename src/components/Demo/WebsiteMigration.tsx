"use client"

import React, {useEffect, useRef, useState} from 'react'
import Image from "next/image";
import {Box, Heading, Text} from "@chakra-ui/react";
import {TWebMigrationApps} from "@/types/common";
import {WEB_MIGRATION_APPS} from "@/constants/common";

const WebsiteMigration = ({selectedWebMigrationApp, migrationLogs, isMigrationCompleted}: {selectedWebMigrationApp: TWebMigrationApps, migrationLogs: string[], isMigrationCompleted: boolean}) => {
  const ArmHost = WEB_MIGRATION_APPS[selectedWebMigrationApp].arm.host;
  const X86Host = WEB_MIGRATION_APPS[selectedWebMigrationApp].x86.host;

  const logsContainerRef = useRef(null);
  const [refreshIframe, setIsRefreshCount] = useState(0);

  useEffect(() => {
    if(isMigrationCompleted){
      setIsRefreshCount((prev) => prev + 1);
    }
  },[isMigrationCompleted])

 useEffect(() => {
    if (logsContainerRef.current) {
      // eslint-disable-next-line
      //@ts-ignore
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logsContainerRef, migrationLogs])


  return (
    <>
      <Box>
        <Box>
          <Box style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}>
            <Box gridColumn="span 2" color={"black"}
                 boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}>
              <Heading padding={"10px"}>{selectedWebMigrationApp} website on X86</Heading>
              <Box background={"gray.700"} color={"white"}>
                <iframe
                    // eslint-disable-next-line
                    // @ts-ignore
                    key={refreshIframe}
                    src={X86Host}
                    width="100%" height="300" frameBorder="0"></iframe>
              </Box>
            </Box>
            <Box gridColumn="span 2" color={"black"}
                 boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}>
              <Heading padding={"10px"}>{selectedWebMigrationApp} website on Arm</Heading>
              <Box>
                <iframe
                    // eslint-disable-next-line
                    // @ts-ignore
                    key={refreshIframe}
                    src={ArmHost}
                    width="100%" height="300" frameBorder="0"></iframe>
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
          </Box>
        </Box>
      </Box>
      <Box background={"#F1F1F1"} maxHeight={"calc(100vh - 251px)"} overflowY={"scroll"} padding={"20px"} ref={logsContainerRef}>
        {migrationLogs?.map((log, index) => {
          return <Text key={index}><br/>{log}<br/></Text>;
        })}
      </Box>
    </>
  )
}
export default WebsiteMigration
