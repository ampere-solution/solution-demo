"use client"

import React, {useEffect, useRef, useState} from 'react'
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
      <Box style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }} overflowY={"hidden"} paddingBottom={"9px"} maxHeight={"calc(100vh - 251px)"}>
        <Box gridColumn="span 2" color={"black"}
             boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} height={"100%"}>
          <Heading padding={"10px"}>{selectedWebMigrationApp} website on X86</Heading>
            <iframe
                // eslint-disable-next-line
                // @ts-ignore
                key={refreshIframe}
                src={X86Host}
                width="100%" height={"90%"} frameBorder="0"></iframe>
        </Box>
        <Box gridColumn="span 2" color={"black"}
             boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} height={"100%"}>
          <Heading padding={"10px"}>{selectedWebMigrationApp} website on Arm</Heading>
            <iframe
                // eslint-disable-next-line
                // @ts-ignore
                key={refreshIframe}
                src={ArmHost}
                width="100%" height={"90%"} frameBorder="0"></iframe>
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
