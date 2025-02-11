import React, {useEffect, useRef, useState} from "react";
import {Box, Text} from "@chakra-ui/react";
import {APP_WITH_NAMESPACES, WEBSITE_MIGRATION} from "@/constants/common";
import {TApps} from "@/types/common";

const getLogs = async (podName: string, podNameSpace: string, containerName: string = "") => {
  if (podName && podNameSpace) {
    try {
      const podLogs = await fetch("/api/getPodLogs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          podName: podName,
          namespace: podNameSpace,
          containerName: containerName
        }),
      });
      const logData = await podLogs?.json();

      return logData;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new Error("Error while fetching logs");
    }
  }
  return null;
}

const Logs = ({activeTabId, tab}: {
  activeTabId: TApps;
  tab: string;
}) => {
  const [logs, setLogs] = useState("");
  const logsContainerRef = useRef(null);

  useEffect(() => {
    let logsIntervalTimer: string | number | NodeJS.Timeout | undefined;
    (async () => {
      if (tab === activeTabId && tab !== WEBSITE_MIGRATION && activeTabId !== WEBSITE_MIGRATION) {
        try {
          setLogs("Loading Logs...");
          const namespace = APP_WITH_NAMESPACES[activeTabId];

          if(namespace){
            const podResponse = await fetch("/api/getPods", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({namespace}),
            });

            const podsData = await podResponse?.json();
            const containerName = podsData[0]?.spec?.containers?.[0]?.name;

            logsIntervalTimer = setInterval(async () => {
              const logData = await getLogs(podsData[0]?.metadata?.name, podsData[0]?.metadata?.namespace, containerName);
              if (logData?.length > 0) {
                setLogs(logData);
              } else {
                setLogs("No logs found");
              }
            }, 5000)
          }
          else{
            setLogs("Error while fetching logs...")
          }
        } catch (error) {
          console.error("Error fetching pods", error);
          setLogs("Error while fetching logs...");
        }
      }
    })()

    return () => {
      clearInterval(logsIntervalTimer)
    }
  }, [activeTabId, tab]);

  useEffect(() => {
    if (logsContainerRef.current) {
      // eslint-disable-next-line
      //@ts-ignore
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logsContainerRef, logs])

  return (
    <Box background={"#F1F1F1"} maxHeight={"calc(100vh - 122px)"} overflowY={"scroll"} padding={"20px"}
         ref={logsContainerRef}>
      {logs.split("\n").map((singleLog, index) => {
        return (
          <Text key={index} marginBlock={"10px"}>
            {singleLog}
          </Text>
        )
      })}
    </Box>
  )
}

export default Logs;
